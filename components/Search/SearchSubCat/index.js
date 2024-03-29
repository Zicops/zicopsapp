import TwoRowCarousel from '../../common/TwoRowCarousel';
import styles from '../search.module.scss';
import SubCatCard from './SubCatCard';

export default function SearchSubCat({ data, handleTitleClick = null }) {
  return (
    <>
      <div
        className={`${styles.searchBookmarkTitle}`}
        onClick={!!handleTitleClick ? handleTitleClick : ()=>{}}
        style={!!handleTitleClick ? { cursor: 'pointer' } : {}}>
        Sub Categories
      </div>
      {data?.length ? (
        <TwoRowCarousel
          itemsArr={data}
          carouselProps={{
            containerClass: styles.bookmarkContainer,
            twoRowCarouselClass: styles.subcatContainer
          }}
          CardComp={SubCatCard}
          // cardProps={{ name: 'Investment & Finance' }}
          responsiveViews={[7, 6, 6]}
        />
      ) : (
        <div className={`${styles.notFound}`}>No Sub Category Found</div>
      )}
    </>
  );
}
