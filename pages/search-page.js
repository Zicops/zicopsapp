import CardSlider from '../components/medium/CardSlider';
import { sliderImages } from '../API/DemoSliderData';
import { useState } from 'react';
import CourseHero from '../components/large/CourseHero';
import CourseBody from '../components/large/CourseBody';
// import ContentPlayer from '../components/large/ContentPayer'
import CustomVideo from '../components/CustomVideoPlayer';
import UserContextProvider from '../state/contexts/UserContext';
import CourseContextProvider from '../state/contexts/CourseContext';
import SearchHeader from '../components/SearchHeader';

const Search = () => {
  const [startPlayer, setStartPlayer] = useState(false);

  return (
    <div
        style={{
            backgroundColor: 'var(--tile-bg)',
        //   overflow: 'hidden',
            paddingTop: '70px',
            // margin: 0,
            // padding: 0
          }}>
          <SearchHeader/>
          <CardSlider data={sliderImages} />
          <CardSlider data={sliderImages} />
          <CardSlider data={sliderImages} />
    </div>
  );
};

export default Search;
