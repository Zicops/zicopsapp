import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GET_TOPIC_EXAMS } from '../../../../API/Queries';
import { loadQueryDataAsync } from '../../../../helper/api.helper';
import { filterAndSortTopicsBasedOnModuleId } from '../../../../helper/data.helper';
import {
  getTopicExamObj,
  isLoadingAtom,
  TopicAtom,
  TopicExamAtom
} from '../../../../state/atoms/module.atoms';
import { getVideoObject, VideoAtom } from '../../../../state/atoms/video.atom';
import { updateVideoData } from '../../Logic/courseBody.helper';

let topicInstance = 0;

function* getTopicsIndex(isReset = null) {
  if (isReset) topicInstance = -1;

  yield ++topicInstance;
}

export default function TopicBox({
  topicCount,
  topic,
  topicIndex = null,
  topicContent,
  isFirstChapter = false,
  moduleId,
  getModuleOptions,
  currrentModule,
  setSelectedModule
}) {
  const { name, description, type } = topic;
  const duration = topicContent[0]?.duration.toString();
  const topicData = useRecoilValue(TopicAtom);

  const isLoading = useRecoilValue(isLoadingAtom);
  const allModuleOptions = getModuleOptions();

  const [topicExamData, setTopicExamData] = useRecoilState(TopicExamAtom);
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [topicCountDisplay, setTopicCountDisplay] = useState(0);

  const { allModuleTopic, currentTopicIndex } = videoData;
  const isTopicActive = allModuleTopic ? allModuleTopic[currentTopicIndex].id === topic.id : false;

  // calculate topic Index with generator function
  useEffect(() => {
    if (isFirstChapter) getTopicsIndex(true).next();
    if (topicIndex) return setTopicCountDisplay(topicIndex);

    setTopicCountDisplay(getTopicsIndex().next()?.value);
    return () => getTopicsIndex(true).next();
  }, []);

  // Set default topic image
  let topicImage; // = '/images/media-container.png';
  //check the type of content inside the topic
  switch (type) {
    case 'Lab':
      topicImage = '/images/pdfIcon.png';
      break;
    case 'Assessment':
      topicImage = '/images/media-container.png';
      break;
    case 'Content':
      topicImage = '/images/topicImage.png';
      break;
  }

  // auto play video when next or previous button clciked (module switch)
  useEffect(() => {
    if (
      currrentModule.value !== videoData.currentModuleId &&
      videoData.startPlayer &&
      currrentModule.isVideoControlClicked
    ) {
      const lastModuleIndex = videoData.currentModuleIndex;
      const currentModuleIndex = allModuleOptions.findIndex(
        (m) => m.value === currrentModule.value
      );
      const filteredTopicData = filterAndSortTopicsBasedOnModuleId(topicData, moduleId);

      // to detect is next button clicked or previous button clicked
      let isNextClicked = false;
      if (lastModuleIndex < currentModuleIndex) isNextClicked = true;
      if (isNextClicked && topicCount !== 1) return;
      if (!isNextClicked && topicCount !== filteredTopicData.length) return;

      updateVideoData(
        videoData,
        setVideoData,
        { moduleId: moduleId, topicId: topic.id },
        topicData,
        topicContent,
        allModuleOptions,
        currrentModule,
        setSelectedModule
      );
      setSelectedModule({
        ...currrentModule,
        isVideoControlClicked: false
      });
    }
  }, [currrentModule]);

  async function loadTopicExam() {
    if (topic?.type !== 'Assessment') return;

    const topicExam = await loadQueryDataAsync(GET_TOPIC_EXAMS, { topic_id: topic.id }).then(
      (res) => res.getTopicExams[0]
    );

    if (!topicExam) return setToastMsg({ type: 'danger', message: 'No Exam Added!' });

    // reset recoil and set new data
    setVideoData(getVideoObject());
    setTopicExamData({
      id: topicExam.id,
      topicId: topicExam.topicId,
      courseId: topicExam.courseId,
      examId: topicExam.examId,
      language: topicExam.language
    });
  }

  return (
    <>
      <div
        className="topic"
        onClick={() => {
          if (type === 'Assessment') return loadTopicExam();

          // if (type === 'Content') {
          if (!topicContent.length) return;

          setTopicExamData(getTopicExamObj());
          updateVideoData(
            videoData,
            setVideoData,
            { moduleId: moduleId, topicId: topic.id },
            topicData,
            topicContent,
            allModuleOptions,
            currrentModule,
            setSelectedModule
          );
          // }
        }}>
        <div className="preclassName">
          <div>
            <img src="images/resourcesicon.png" />
            <p>Resources</p>
          </div>
          <div>
            <img src="images/discussicon.png" />
            <p>Discuss</p>
          </div>
        </div>

        <div className={`topic-loop ${isTopicActive ? 'activeTopic' : ''}`}>
          <div className="topic_img">
            <img src={`${topicImage}`} alt="" />
          </div>

          <div className="topic_text">
            <div className="topic_heading">
              <h4>
                <span>
                  {isLoading ? (
                    <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={50} />
                  ) : (
                    topicCountDisplay + '. '
                  )}
                </span>
                {isLoading ? (
                  <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={30} width={150} />
                ) : name ? (
                  name
                ) : (
                  'N/A'
                )}
              </h4>
            </div>
            <div className="topic_description">
              <p>
                {isLoading ? (
                  <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={70} width={500} />
                ) : description ? (
                  description
                ) : (
                  'N/A'
                )}
              </p>
            </div>
          </div>
          {type === 'Content' && (
            <div className="topic_player">
              <div className="progress_bar">
                <img src="images/progressTriangle.png" alt="" />
              </div>
              <div className="details">
                <div>Video + Quiz</div>
                <div>
                  <span>
                    {isLoading ? (
                      <Skeleton
                        sx={{ bgcolor: 'dimgray' }}
                        variant="rectangular"
                        height={20}
                        width={100}
                      />
                    ) : duration ? (
                      `Duration : ${duration}`
                    ) : (
                      'N/A'
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
          {type === 'Assessment' && (
            <div className="topic_player">
              {/* <div className="progress_bar"> */}
              {/* <img src="images/progressTriangle.png" alt="" /> */}
              {/* </div> */}
              Exam block is getting ready!
            </div>
          )}
          {type === 'Lab' && (
            <div className="topic_player">
              <div className="progress_bar">
                <img src="images/progressTriangle.png" alt="" />
              </div>
              <div className="details">
                <div>Video + Quiz</div>
                <div>
                  <span>
                    {isLoading ? (
                      <Skeleton
                        sx={{ bgcolor: 'dimgray' }}
                        variant="rectangular"
                        height={20}
                        width={100}
                      />
                    ) : duration ? (
                      `Duration : ${duration}`
                    ) : (
                      'N/A'
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* move to .scss */}
      <style>
        {`
                .topic{
                    display: flex;
                    flex-direction: column;
                    padding: 0 5%;
                    padding-bottom: 50px;
                }
                
                .topic .preclassName{
                    font-size: 12px;
                    color: #858f8f;
                    display: flex;
                    justify-content: right;
                }
                .topic .preclassName div{
                    margin: 10px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
                .topic .preclassName div:hover{
                    color: #ffffff;
                }
                .topic .preclassName img{
                    width: 20px;
                    margin-right: 10px;
                }
                .topic-loop{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px;
                    border: 1px solid #ffffff;
                    transition: all 0.3s;
                    cursor: pointer;
                }
                .topic-loop:hover, .activeTopic{
                    box-shadow: 0 0 10px 0 #6bcfcf;
                    transform: scale(1.02);
                    background-color: #000000;
                }
                .topic_img{
                    width: 80px;
                    height: 80px;
                    margin: 5px;
                    margin-right: 5%;
                    border: 1px solid #858f8f;
                }
                .topic_img img{
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                }
                .topic_text{
                    width: 50%;
                    margin-right: 5%;
                }
                .topic_text .topic_heading h4{
                    font-size: 14px;
                    color: #ffffff;
                }
                .topic_text .topic_description {
                    font-size: 12px;
                    color: #858f8f;
                    padding: 5px 0 0 0;
                }
                .topic_player{
                    width: 40%;
                    margin-right: 5%;
                    font-size: 12px;
                    color: #858f8f;
                }
                .topic_player .details{
                    display: flex;
                    justify-content: space-between;
                    padding-top: 20px;
                }
                .progress_bar{
                    width: 100%;
                    height: 10px;
                    margin: auto;
                    background: #343535;
                    border: 1px solid #ffffff;
                    position: relative;
                }
                .progress_bar:after{
                    content: '';
                    width: 50%;
                    height: 8px;
                    background: #858f8f;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .progress_bar img{
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translate(-50%, -33%);
                    width: 30px;
                    z-index: 2;
                }
                `}
      </style>
    </>
  );
}
