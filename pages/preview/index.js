import { ApolloProvider } from '@apollo/client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { mutationClient } from '../../API/Mutations';
import CourseBody from '../../components/CourseBody';
import CourseHero from '../../components/CourseHero';
import CustomVideo from '../../components/CustomVideoPlayer';
import ExamLanding from '../../components/Exams/ExamLanding';
import {
  ActiveClassroomTopicIdAtom,
  getTopicExamObj,
  TopicExamAtom
} from '../../state/atoms/module.atoms';
import { getVideoObject, VideoAtom } from '../../state/atoms/video.atom';
import CourseContextProvider from '../../state/contexts/CourseContext';
import ModuleContextProvider from '../../state/contexts/ModuleContext';
import VCtoolStartPage from '@/components/Vctools/VctoolStartPage';

export default function PreviewCourse() {
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const [topicExamData, setTopicExamData] = useRecoilState(TopicExamAtom);
  const startPlayer = videoData.startPlayer;
  const [activeClassroomTopicId, setActiveClassroomTopicId] = useRecoilState(
    ActiveClassroomTopicIdAtom
  );

  function setStartPlayer(val) {
    setVideoData({
      ...videoData,
      startPlayer: !!val
    });
  }
  // reset data on load first time
  useEffect(() => {
    setVideoData(getVideoObject());
    setStartPlayer(false);
    setTopicExamData(getTopicExamObj());
    setActiveClassroomTopicId(null);
  }, []);

  useEffect(() => {
    if (startPlayer || topicExamData?.id) setActiveClassroomTopicId(null);
  }, [startPlayer, topicExamData?.id]);

  return (
    <ApolloProvider client={mutationClient}>
      <CourseContextProvider>
        <ModuleContextProvider>
          {/* move style to .scss */}
          <div
            style={{
              backgroundColor: 'var(--tile-bg)',
              margin: 0,
              padding: 0,
              overflow: 'clip'
              // contain: 'paint'
            }}>
            {topicExamData?.id && <ExamLanding isDisplayedInCourse={true} />}

            {!!activeClassroomTopicId && <VCtoolStartPage topicId={activeClassroomTopicId} />}

            {startPlayer && <CustomVideo set={setStartPlayer} isPreview={true} />}

            {!startPlayer && !topicExamData?.id && !activeClassroomTopicId && (
              <CourseHero set={setStartPlayer} isPreview={true} />
            )}

            <CourseBody isPreview={true} />
            {/* <CardSlider title="Your Other Subscribed Courses" data={sliderImages} />
            <CardSlider title="Related Courses" data={sliderImages} />
            <CardSlider title="Recomended Courses" data={sliderImages} /> */}
          </div>
        </ModuleContextProvider>
      </CourseContextProvider>
    </ApolloProvider>
  );
}
