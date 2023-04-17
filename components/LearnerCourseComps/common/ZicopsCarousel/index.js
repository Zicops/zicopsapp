import PropTypes from 'prop-types';
import { Children } from 'react';
import SwiperComp, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './zicopsCarousel.module.scss';

export default function ZicopsCarousel({
  isLoop,
  isNavigation,
  isCenteredSlides,
  isSlidesPerGroup,
  isSpaceBetween,
  isSlidesPerView,
  children,
  showAutoPlay,
  showPagination,
  showGrid,
}) {
  const arrayChildren = Children.toArray(children);

  SwiperComp.use([Navigation]);

  return (
    <div className={`${styles.zicopsCarousel}`}>
      <Swiper
        spaceBetween={isSpaceBetween}
        slidesPerView={isSlidesPerView}
        centeredSlides={isCenteredSlides}
        slidesPerGroup={isSlidesPerGroup}
        loop={isLoop}
        autoplay={showAutoPlay}
        pagination={showPagination}
        navigation={isNavigation}
        grid={showGrid}
        showModules={[Autoplay, Pagination, Navigation]}
        className={`${styles.zicopsSwiper}`}>
        {arrayChildren?.map((child) => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

ZicopsCarousel.PropTypes = {
  isNavigation: PropTypes.bool,
  isCenteredSlides: PropTypes.bool,
  isSpaceBetween: PropTypes.number,
  isSlidesPerView: PropTypes.number,
  isSlidesPerGroup: PropTypes.number,
  isLoop: PropTypes.bool,
};

ZicopsCarousel.defaultProps = {
  isNavigation: false,
  isCenteredSlides: false,
  isSlidesPerView: 1,
  isSlidesPerGroup: 1,
  isSpaceBetween: 30,
  isLoop: false,
  showAutoPlay: { delay: 3500, disableOnInteraction: false },
  showPagination: { clickable: true },
  children: null,
};
