import Pacman from '../../components/Labs/Pacman';
import ZicopsCarousel from '../../components/ZicopsCarousel';
import { programmingLabs, sliderImages, bigImages, circleImages } from '../../API/DemoSliderData';

export default function LabsPage() {
  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        // marginTop: '50px',
        padding: 0
      }}>
      <div
        style={{
          // display: 'flex',
          marginTop: '70px',
          // padding: '5vh 4vw',
          backgroundColor: 'var(--black)',
          height: '75vh',
          overflow: 'hidden'
        }}>
        <Pacman />
      </div>
      <div>
        <ZicopsCarousel title="Programming Labs" data={programmingLabs} notext={true} />
        <ZicopsCarousel title="Design Labs" data={bigImages} notext={true} />
        <ZicopsCarousel title="Infrastructure Labs" data={circleImages} notext={true} />
        <ZicopsCarousel title="Leadership Labs" data={sliderImages} notext={true} />
      </div>
    </div>
  );
}
