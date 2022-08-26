import 'react-multi-carousel/lib/styles.css';
import TwoRowCarousel from '../../common/TwoRowCarousel';
import TopicFiles from './TopicFiles';

export default function TopicFileSlider({
  itemsArr,
  showResources,
  isResourceShown,
  isNotes = null
}) {
  return (
    <div style={{ position: 'relative' }}>
      <TwoRowCarousel
        itemsArr={itemsArr}
        carouselProps={{ containerClass: 'itsItemContainer' }}
        CardComp={TopicFiles}
        cardProps={{
          handleClick: showResources,
          isResourceShown: isResourceShown,
          isNotes,
          customStyles: { padding: '5px' }
        }}
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
