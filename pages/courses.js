import CardSlider from '../components/medium/CardSlider';
import { sliderImages } from '../API/DemoSliderData';
import { useState } from 'react';
import CourseHero from '../components/large/CourseHero';
import CourseBody from '../components/large/CourseBody';
// import ContentPlayer from '../components/large/ContentPayer'
import CustomVideo from '../components/CustomVideoPlayer';
import UserContextProvider from '../state/contexts/UserContext';
import CourseContextProvider from '../state/contexts/CourseContext';

const Courses = () => {
  const [startPlayer, setStartPlayer] = useState(false);

  return (
    <CourseContextProvider>
      <UserContextProvider>
        <div
          style={{
            backgroundColor: 'var(--tile-bg)',
            overflow: 'hidden',
            margin: 0,
            padding: 0
          }}>
          {startPlayer ? <CustomVideo set={setStartPlayer} /> : <CourseHero set={setStartPlayer} />}
          <CourseBody />
          <CardSlider title="Your Other Subscribed Courses" data={sliderImages} />
          <CardSlider title="Related Courses" data={sliderImages} />
          <CardSlider title="Recomended Courses" data={sliderImages} />
        </div>
      </UserContextProvider>
    </CourseContextProvider>
  );
};

export default Courses;
