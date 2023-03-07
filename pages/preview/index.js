import TopicPdfViews from '@/components/CourseComps/TopicPdfViews';
import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sliderImages } from '../../API/DemoSliderData';
import { mutationClient } from '../../API/Mutations';
import CourseBody from '../../components/CourseBody';
import CourseHero from '../../components/CourseHero';
import CustomVideo from '../../components/CustomVideoPlayer';
import ExamLanding from '../../components/Exams/ExamLanding';
import CardSlider from '../../components/medium/CardSlider';
import {
  getTopicExamObj,
  TopicExamAtom,
  TopicFileViewDataAtom
} from '../../state/atoms/module.atoms';
import { getVideoObject, VideoAtom } from '../../state/atoms/video.atom';
import CourseContextProvider from '../../state/contexts/CourseContext';
import ModuleContextProvider from '../../state/contexts/ModuleContext';

export default function PreviewCourse() {
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const [topicExamData, setTopicExamData] = useRecoilState(TopicExamAtom);
  const [topicFileViewData, setTopicFileViewData] = useRecoilState(TopicFileViewDataAtom);
  const startPlayer = videoData.startPlayer;

  function setStartPlayer(val) {
    setVideoData({
      ...videoData,
      startPlayer: !!val
    });
  }

  useEffect(() => {
    setVideoData(getVideoObject());
    setStartPlayer(false);
    setTopicExamData(getTopicExamObj());
    if (!topicFileViewData) setTopicFileViewData(null);
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
              overflow: 'clip'
              // contain: 'paint'
            }}>
            {topicExamData?.id && <ExamLanding isDisplayedInCourse={true} />}

            {!!topicFileViewData?.topicContent && <TopicPdfViews />}

            {startPlayer && <CustomVideo set={setStartPlayer} isPreview={true} />}

            {!startPlayer && !topicExamData?.id && !topicFileViewData && (
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
