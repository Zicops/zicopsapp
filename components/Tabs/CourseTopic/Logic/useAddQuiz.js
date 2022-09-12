import { acceptedFileTypes } from '@/components/AdminExamComps/QuestionBanks/Logic/questionBank.helper';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getQuizObject, QuizAtom, TopicContentAtom } from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';

export default function useAddQuiz(courseId = '', topicId = '') {
  // recoil state
  const [quizzes, addQuizzes] = useRecoilState(QuizAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const topicContent = useRecoilValue(TopicContentAtom);

  // local state
  const [isQuizFormVisible, setIsQuizFormVisible] = useState(false);
  const [isQuizReady, setIsQuizReady] = useState(false);
  const [newQuiz, setNewQuiz] = useState(getQuizObject({ courseId, topicId }));

  // update resouce courseid and topicid
  useEffect(() => {
    setNewQuiz({ ...newQuiz, topicId: topicId, courseId: courseId });
  }, [topicId, courseId]);

  useEffect(() => {
    setIsQuizReady(
      newQuiz.name &&
        newQuiz.type &&
        (newQuiz?.startTimeMin || newQuiz?.startTimeSec) &&
        (newQuiz?.question || newQuiz?.questionFile) &&
        newQuiz?.options?.every((op) => op?.option || op?.file) &&
        newQuiz?.options?.some((op) => op?.isCorrect)
    );
  }, [newQuiz]);

  // validate the start time input after input
  useEffect(() => {
    const videoDuration = +topicContent[0]?.duration;
    if (isNaN(videoDuration)) return;

    const { startTimeMin, startTimeSec } = newQuiz;
    const _newQuiz = { ...newQuiz };
    let isInValidData = false;

    const startTime = +startTimeMin * 60 + +startTimeSec;

    // start time
    if (startTimeMin < 0) {
      _newQuiz.startTimeMin = '';
      isInValidData = true;
    }
    if (startTimeSec < 0) {
      _newQuiz.startTimeSec = '';
      isInValidData = true;
    }
    if (startTime > videoDuration) {
      isInValidData = true;
      _newQuiz.startTimeMin = Math.floor(videoDuration / 60);
      _newQuiz.startTimeSec = videoDuration % 60;
    }

    if (isInValidData) return setNewQuiz({ ...newQuiz, ..._newQuiz });
  }, [newQuiz]);

  function toggleQuizForm() {
    setIsQuizFormVisible(!isQuizFormVisible);
  }

  // validation for only taking only accepted type images
  function isImageValid(e) {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      if (!file) return false;
      if (!acceptedFileTypes.includes(file?.type)) {
        setToastMsg({ type: 'danger', message: `${acceptedFileTypes.join(', ')} only accepted` });
        return false;
      }
    }

    return true;
  }

  function isOptionsDuplicate() {
    var optionArr = newQuiz?.options?.map(function (op) {
      return op.description?.trim();
    });
    var isDuplicate = optionArr.some((op, i) => {
      if (!op) return;

      return optionArr.indexOf(op) != i;
    });

    if (isDuplicate) setToastMsg({ type: 'danger', message: 'Options cannot be same.' });
    return isDuplicate;
  }

  // input handler
  function handleQuizInput(e, index = null) {
    if (e?.value) setNewQuiz({ ...newQuiz, type: e.value });

    if (index != null) {
      const updatedOption = { ...newQuiz?.options[index] };

      if (e.target.type === 'file') {
        const file = e.target.files[0];
        if (!file) return;
        if (!isImageValid(e)) return;

        updatedOption.file = e.target.files[0];
        updatedOption.attachmentType = e.target.files[0]?.type;
      } else if (e.target.type === 'checkbox') {
        updatedOption.isCorrect = e.target.checked;
      } else {
        updatedOption[e.target.name] = e.target.value;
      }

      return setNewQuiz({
        ...newQuiz,
        options: newQuiz?.options?.map((o, i) => (i === index ? updatedOption : o))
      });
    }

    if (e.target.type === 'checkbox') {
      return setNewQuiz({ ...newQuiz, [e.target.name]: e.target.checked });
    }

    if (e.target.type == 'file') {
      const file = e.target.files[0];
      if (!file) return;
      if (!isImageValid(e)) return;

      return setNewQuiz({
        ...newQuiz,
        questionFile: e.target.files[0],
        attachmentType: e.target.files[0]?.type
      });
    }

    setNewQuiz({ ...newQuiz, [e.target.name]: e.target.value });
  }

  // save in recoil state
  function addNewQuiz() {
    if (isOptionsDuplicate()) return;
    if (
      quizzes?.some((q) => q?.name?.toLowerCase()?.trim() === newQuiz?.name?.toLowerCase()?.trim())
    )
      return setToastMsg({ type: 'danger', message: 'Quiz name cannot be same in one topic.' });

    addQuizzes([...quizzes, newQuiz]);
    setNewQuiz(getQuizObject({ courseId, topicId }));
    setIsQuizFormVisible(false);
  }

  return {
    newQuiz,
    setNewQuiz,
    handleQuizInput,
    addNewQuiz,
    isQuizFormVisible,
    toggleQuizForm,
    isQuizReady
  };
}
