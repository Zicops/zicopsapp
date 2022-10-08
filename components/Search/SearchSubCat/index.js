import TwoRowCarousel from '../../common/TwoRowCarousel';
import styles from '../search.module.scss';
import SubCatCard from './SubCatCard';

export default function SearchSubCat({ data }) {
  return (
    <>
      <div className={`${styles.searchBookmarkTitle}`}>Sub Categories</div>
      {data?.length && (
        <TwoRowCarousel
          itemsArr={data}
          carouselProps={{ containerClass: styles.bookmarkContainer }}
          CardComp={SubCatCard}
          // cardProps={{ name: 'Investment & Finance' }}
          responsiveViews={[7, 6, 6]}
        />
      )}
    </>
  );
}
