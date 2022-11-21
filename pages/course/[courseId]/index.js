import CourseBody from '@/components/CourseBody';
import CourseHero from '@/components/CourseHero';
import CustomVideo from '@/components/CustomVideoPlayer';
import ExamLanding from '@/components/Exams/ExamLanding';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { getTopicExamObj, TopicExamAtom } from '@/state/atoms/module.atoms';
import { getVideoObject, VideoAtom } from '@/state/atoms/video.atom';
import CourseContextProvider from '@/state/contexts/CourseContext';
import ModuleContextProvider from '@/state/contexts/ModuleContext';
import { ApolloProvider } from '@apollo/client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { sliderImages } from '../../../API/DemoSliderData';
import { mutationClient } from '../../../API/Mutations';

export default function Course() {
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const [topicExamData, setTopicExamData] = useRecoilState(TopicExamAtom);
  const startPlayer = videoData.startPlayer;

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
  }, []);

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
              contain: 'paint'
            }}>
            {topicExamData?.id && <ExamLanding isDisplayedInCourse={true} />}

            {startPlayer && <CustomVideo set={setStartPlayer} />}

            {!startPlayer && !topicExamData?.id && <CourseHero set={setStartPlayer} />}

            <CourseBody />
            {/* <CardSlider title="Your Other Subscribed Courses" data={sliderImages} />
            <CardSlider title="Related Courses" data={sliderImages} />
            <CardSlider title="Recomended Courses" data={sliderImages} /> */}

            <ZicopsCarousel title="Your Other Subscribed Courses" data={sliderImages} />
            <ZicopsCarousel title="Courses in this sub-category" data={sliderImages} />
            <ZicopsCarousel title="Courses in this category" data={sliderImages} />
          </div>
        </ModuleContextProvider>
      </CourseContextProvider>
    </ApolloProvider>
  );
}
