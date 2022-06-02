import 'react-multi-carousel/lib/styles.css';
import TwoRowCarousel from '../../common/TwoRowCarousel';
import TopicFiles from './TopicFiles';

export default function TopicFileSlider({ itemsArr, showResources, isResourceShown }) {
  return (
    <div style={{ position: 'relative' }}>
      <TwoRowCarousel
        itemsArr={itemsArr}
        carouselProps={{ containerClass: 'itsItemContainer' }}
        CardComp={TopicFiles}
        cardProps={{ handleClick: showResources, isResourceShown: isResourceShown }}
      />

      {/* move to .scss */}
      <style jsx>
        {`
          .busterCards {
          }
          .item {
            // display: flex;
            // background-color: var(--primary);
            padding: 20px;
          }
        `}
      </style>
    </div>
  );
}
