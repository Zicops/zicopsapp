import { DELETE_COURSE_TOPIC_CONTENT } from '@/api/Mutations';
import DeleteBtn from '@/components/common/DeleteBtn';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  QuizAtom,
  TopicContentAtom,
  TopicSubtitleAtom,
  uploadStatusAtom
} from '../../../../../state/atoms/module.atoms';

export default function TopicContentView({ topicContent, toggleTopicContentForm }) {
  const topicSubtitle = useRecoilValue(TopicSubtitleAtom);
  const uploadStatus = useRecoilValue(uploadStatusAtom);
  const quizzes = useRecoilValue(QuizAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [topicContentArr, setTopicContentArr] = useRecoilState(TopicContentAtom);

  return (
    <>
      {topicContent && !!topicContent.length && (
        <>
          {topicContent.map((content, index) => {
            const isSubtitleAdded = topicSubtitle[index]?.file || topicSubtitle[index]?.subtitleUrl;
            const isContentUrlPresent = (!!content?.id && !content?.contentUrl) || false;

            return (
              <div className="content_added" key={content?.id + content.language}>
                <div className="content_details">
                  <div className="content_top">
                    <span className="label">Content Type :</span>
                    <span className="value">{content.type}</span>
                  </div>
                  <div className="content_top">
                    <span className="label">Duration :</span>
                    <span className="value">{content.duration + ' Sec'}</span>
                  </div>
                </div>
                <div
                  className="content_bar"
                  style={{
                    background: isContentUrlPresent
                      ? '#cf3e3e'
                      : `linear-gradient(90deg, #86D386 ${
                          uploadStatus ? uploadStatus[content.language] * 100 : 0
                        }%, #868686 0%, #868686 100%)`
                  }}>
                  <div className="language">{content.language}</div>
                  <div className="text">
                    {isContentUrlPresent ? (
                      'No Content URL Found'
                    ) : (
                      <>
                        Content Added {isSubtitleAdded ? 'With Subtitle' : ''}{' '}
                        {content.is_default ? `(default)` : ''}
                      </>
                    )}
                  </div>

                  <DeleteBtn
                    id={content?.id}
                    resKey="deleteTopicContent"
                    mutation={DELETE_COURSE_TOPIC_CONTENT}
                    // deleteCondition={() => {
                    //   // const isSubsExists = !!subtitles?.length;
                    //   // if (isSubsExists) {
                    //   //   setToastMsg({ type: 'danger', message: 'Delete All Subtitles First' });
                    //   //   return false;
                    //   // }

                    //   const isQuizExists = !!quizzes?.length;
                    //   if (isQuizExists) {
                    //     setToastMsg({ type: 'danger', message: 'Delete All Quiz First' });
                    //     return false;
                    //   }

                    //   return true;
                    // }}
                    onDelete={() => {
                      const _topicContentArr = structuredClone(topicContentArr);
                      const currentTopicIndex = _topicContentArr?.findIndex(
                        (tc) => tc?.id === content?.id
                      );
                      if (currentTopicIndex >= 0) {
                        _topicContentArr?.splice(currentTopicIndex, 1);
                      }

                      if (!_topicContentArr?.length) toggleTopicContentForm();
                      setTopicContentArr(_topicContentArr);
                    }}
                  />
                </div>
              </div>
            );
          })}

          <button className="transparent_button" onClick={toggleTopicContentForm}>
            <span>
              <img src="/images/plus.png" alt="" />
            </span>
            <span>Add Language</span>
          </button>
        </>
      )}

      <style jsx>{`
        .content_added {
          margin: 10px 30px;
        }
        .content_details {
          font-size: 13px;
          display: flex;
          justify-content: space-between;
        }
        .content_details .label {
          color: #868f8f;
        }
        .content_details .value {
          margin-left: 5px;
        }

        .content_bar {
          margin: 10px 0;
          padding: 5px 20px;
          border-radius: 8px;
          display: flex;

          color: #000000;
          background-color: #868f8f;

          font-size: 14px;
          font-width: 700;
          text-transform: uppercase;
        }
        .content_bar .language {
        }
        .content_bar .text {
          margin: auto;
        }

        .transparent_button {
          background-color: transparent;
          color: #868f8f;
          font-family: 'Poppins';
          border: none;

          cursor: pointer;
          transition: all 0.3s;

          display: flex;
          margin-left: auto;
        }
        .transparent_button:hover {
          color: #ffffff;
        }
        .transparent_button span img {
          width: 13px;
          height: 13px;
          margin-right: 10px;
        }
      `}</style>
    </>
  );
}
