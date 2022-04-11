import { ApolloProvider } from '@apollo/client';
import { useState } from 'react';
import { sliderImages } from '../../API/DemoSliderData';
import { mutationClient } from '../../API/Mutations';
import CourseBody from '../../components/CourseBody';
import CourseHero from '../../components/CourseHero';
import CustomVideo from '../../components/CustomVideoPlayer';
import CardSlider from '../../components/medium/CardSlider';
import CourseContextProvider from '../../state/contexts/CourseContext';
import ModuleContextProvider from '../../state/contexts/ModuleContext';

export default function PreviewCourse() {
  const [startPlayer, setStartPlayer] = useState(false);

  return (
    <ApolloProvider client={mutationClient}>
      <CourseContextProvider>
        <ModuleContextProvider>
          {/* move style to .scss */}
          <div
            style={{
              backgroundColor: 'var(--tile-bg)',
              overflow: 'hidden',
              margin: 0,
              padding: 0
            }}>
            {startPlayer ? (
              <CustomVideo set={setStartPlayer} />
            ) : (
              <CourseHero set={setStartPlayer} />
            )}

            <CourseBody />
            <CardSlider title="Your Other Subscribed Courses" data={sliderImages} />
            <CardSlider title="Related Courses" data={sliderImages} />
            <CardSlider title="Recomended Courses" data={sliderImages} />
          </div>
        </ModuleContextProvider>
      </CourseContextProvider>
    </ApolloProvider>
  );
}
