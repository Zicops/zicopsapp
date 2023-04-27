import { ADD_QUIZ_TO_CLASSROOM_FLAGS, notificationClient } from '@/api/NotificationClient';
import { GET_QUESTION_BY_ID, GET_QUESTION_OPTIONS } from '@/api/Queries';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import Spinner from '@/components/common/Spinner';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import { db } from '@/helper/firebaseUtil/firestore.helper';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { ClassRoomFlagsInput, CurrentParticipantDataAtom } from '@/state/atoms/vctool.atoms';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';

// for moderator
const QuizQuestion = ({ quizData = null, publishQuiz, quiztype }) => {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [controls, setControls] = useRecoilState(ClassRoomFlagsInput);
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);

  const [mcqData, setMcqData] = useState(null);
  const [expand, setexpand] = useState(true);

  const isActive = controls?.quiz?.includes(quizData?.id);

  // question option loader
  useEffect(() => {
    if (!quizData?.questionId) return;

    loadMcqData();

    async function loadMcqData() {
      const questionRes = await loadQueryDataAsync(GET_QUESTION_BY_ID, {
        question_ids: [quizData?.questionId],
      });
      if (!questionRes?.getQuestionsById) return setToastMessage('Question Load Error');

      const _question = questionRes?.getQuestionsById[0];
      const questionData = {
        id: _question?.id,
        name: _question?.Name,
        description: _question?.Description,
        type: _question?.Type,
        difficulty: _question?.Difficulty,
        attachment: _question?.Attachment,
        attachmentType: _question?.AttachmentType,
        hint: _question?.Hint,
        qbId: _question?.QbmId,
        status: _question?.Status,
      };

      const optionRes = await loadQueryDataAsync(GET_QUESTION_OPTIONS, {
        question_id: quizData?.questionId,
      });
      if (!optionRes?.getOptionsForQuestions) return setToastMessage('Question Load Error');

      const _option = optionRes?.getOptionsForQuestions[0]?.options;
      const optionData = _option?.map((op) => ({
        id: op?.id,
        qmId: op?.QmId,
        description: op?.Description,
        attachmentType: op?.AttachmentType,
        attachment: op?.Attachment,
        isActive: op?.IsActive,
        isCorrect: op?.IsCorrect,
      }));

      const _mcqData = { question: questionData, options: optionData };
      setMcqData(_mcqData);
    }
  }, [quizData?.questionId, currentParticipantData?.isModerator]);

  // firebase listener
  useEffect(async () => {
    const classroomFlagsRef = collection(db, 'ClassroomFlags');
    const docRef = doc(classroomFlagsRef, activeClassroomTopicId);

    const unsub = onSnapshot(docRef, (querySnapshot) => {
      if (!querySnapshot.exists()) return;

      setControls({ id: querySnapshot.id, ...querySnapshot.data() });
    });

    return () => unsub();
  }, []);

  async function handlePublish() {
    const sendData = { id: activeClassroomTopicId, quizId: quizData?.id };
    await mutateData(
      ADD_QUIZ_TO_CLASSROOM_FLAGS,
      sendData,
      { context: { headers: { 'fcm-token': 'notactualtoken' } } },
      notificationClient,
    )
      .then((res) => {
        if (res?.addQuizToClassroomFlags) return;

        setToastMessage('Quiz Publish Error');
      })
      .catch(() => setToastMessage('Quiz Publish Error'));
  }

  if (mcqData == null) return <Spinner />;

  return (
    <div className={`${styles.quizQuestion}`}>
      <div className={`${styles.quizQuestionhead}`} onClick={() => setexpand(!expand)}>
        <div className={`${styles.quizLable}`}>
          <img src="/images/svg/vctool/quiz-1.svg" />
          <div
            style={{
              color: 'white',
              fontSize: '14px',
            }}>
            {quizData?.name}
          </div>
        </div>
        <div className={`${styles.quizeExpand}`}>
          {!controls?.quiz?.includes(quizData?.id) && (
            <p id={`${styles.quizPublishBtn}`} onClick={handlePublish}>
              Publish
            </p>
          )}

          <button>
            {
              <img
                src={
                  expand
                    ? '/images/svg/vctool/expand-more.svg'
                    : '/images/svg/vctool/expand-less.svg'
                }
              />
            }
          </button>
        </div>
      </div>

      <div>
        {!expand ? (
          <div className={`${styles.pollQuestionScreen}`}>
            <div className={`${isActive ? styles.pollActiveLabel : styles.pollSavedLabel}`}>
              {isActive ? 'Active' : 'Saved'}
            </div>

            <div className={`${styles.pollQuestions}`}>
              {!!mcqData?.question?.attachment && (
                <div className={`${styles.attachment}`}>
                  {mcqData?.question?.attachmentType.includes('image') && (
                    <img src={mcqData?.question.attachment} alt="image" />
                  )}

                  {mcqData?.question?.attachmentType.includes('video') && (
                    <video controls src={mcqData?.question.attachment} alt="video" />
                  )}
                  {mcqData?.question?.attachmentType.includes('audio') && (
                    <audio controls src={mcqData?.question.attachment} alt="audio" />
                  )}
                </div>
              )}

              {mcqData?.question?.description}
            </div>
            <div className={`${styles.pollBoxOptions} ${styles.options}`}>
              {mcqData?.options?.slice(0, 4)?.map((op) => {
                const isAttachmentPresent = !!op?.attachment;
                const type = op?.attachmentType;

                if (isActive)
                  return (
                    <section>
                      <LabeledRadioCheckbox type="radio" isChecked={op?.isCorrect} />

                      <div className={`${styles.optionVal}`}>
                        {isAttachmentPresent && (
                          <div className={`${styles.attachment}`}>
                            {type.includes('image') && <img src={op.attachment} alt="image" />}
                            {type.includes('video') && (
                              <video controls src={op.attachment} alt="video" />
                            )}
                            {type.includes('audio') && (
                              <audio controls src={op.attachment} alt="audio" />
                            )}
                          </div>
                        )}

                        {op?.description}
                      </div>
                    </section>
                  );

                return (
                  <div>
                    <img
                      src={`/images/svg/vctool/${op?.isCorrect ? 'correct-ans' : 'wrong-ans'}.svg`}
                    />

                    <div className={`${styles.optionVal}`}>
                      {isAttachmentPresent && (
                        <div className={`${styles.attachment}`}>
                          {type.includes('image') && <img src={op.attachment} alt="image" />}
                          {type.includes('video') && (
                            <video controls src={op.attachment} alt="video" />
                          )}
                          {type.includes('audio') && (
                            <audio controls src={op.attachment} alt="audio" />
                          )}
                        </div>
                      )}

                      {op?.description}
                    </div>
                  </div>
                );
              })}
            </div>

            {!!quiztype === 'Saved' && !!currentParticipantData?.isModerator && (
              <div className={`${styles.quizBoxBtns}`}>
                <button className={`${styles.quizBoxEditBtn}`}>Edit</button>
                <button className={`${styles.quizBoxPublishBtn}`} onClick={() => publishQuiz()}>
                  publish
                </button>
              </div>
            )}

            {/* <button className={`${styles.publishPoll}`}>Publish</button> */}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default QuizQuestion;
