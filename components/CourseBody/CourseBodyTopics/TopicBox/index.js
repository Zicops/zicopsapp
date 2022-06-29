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
import styles from '../../courseBody.module.scss';

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

  //dummy data for examTopic part
  const topicAssData = [
    {
      type: 'Take Anytime',
      duration: '3hrs',
      attempts: '0/1',
      marks: 100,
      passingCriteria: '60%',
      expertiseLevel: 'Competent'
    },
    {
      type: 'Schedule',
      duration: '3hrs',
      attempts: '0/1',
      date: '25th June, 2022',
      startTime: '11:00AM',
      endTime: '2:00PM',
      marks: 100,
      passingCriteria: '60%',
      expertiseLevel: 'Beginner'
    }
  ];
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
        className={`${styles.topic}`}
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
        <div className={`${styles.preclassName}`}>
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
          <div className={`${styles.topic_img}`}>
            <img src={`${topicImage}`} alt="" />
          </div>

          <div className={`${styles.topic_text}`}>
            <div className={`${styles.topic_heading}`}>
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
            <div className={`${styles.topicKeyword}`}>
              {type === 'Assessment' && (
                <>
                  <span>Marks: {topicAssData[1].marks}</span>
                  <span>Passing Criteria: {topicAssData[1].passingCriteria}</span>
                </>
              )}
            </div>
            <div className={`${styles.topic_description}`}>
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
            <div className={`${styles.topic_player}`}>
              <div className={`${styles.progress_bar}`}>
                <img src="images/progressTriangle.png" alt="" />
              </div>
              <div className={`${styles.details}`}>
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
            <div className={`${styles.topic_assesment}`}>
              <div className={`${styles.assesmentType}`}>
                {topicAssData[1].type === 'Schedule' ? (
                  <div>
                    <span>{topicAssData[1].date}</span>
                    <span>
                      {topicAssData[1].startTime}-{topicAssData[1].endTime}
                    </span>
                    <span>{topicAssData[1].type}</span>
                  </div>
                ) : (
                  <h4>Take Anytime</h4>
                )}
              </div>
              <div className={`${styles.assesmentInfo}`}>
                <span>{topicAssData[1].expertiseLevel}</span>
                <span>Attempt: {topicAssData[1].attempts}</span>
                <span>Duration: {topicAssData[1].duration}</span>
              </div>
            </div>
          )}
          {type === 'Lab' && (
            <div className="topic_player">
              <div className="progress_bar">
                <img src="images/progressTriangle.png" alt="" />
              </div>
              <div className={`${styles.details}`}>
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
                
                `}
      </style>
    </>
  );
}
