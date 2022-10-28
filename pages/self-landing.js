import ClassRoomBanner from '@/components/ClassRoomBanner';
import { classroomData } from '@/components/ClassRoomBanner/classRoomBanner.helper';
import HeroSliderContainer from '@/components/HeroSliderContainer';
import SearchSubCat from '@/components/Search/SearchSubCat';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useEffect } from 'react';
import { bigImages, sliderImages } from '../API/DemoSliderData';
import CommonCalendar from '../components/common/CommonCalendar';
import SimpleTable from '../components/common/SimpleTable';
import FavouriteDndCourses from '../components/FavouriteDndCourses';
import BigCardSlider from '../components/medium/BigCardSlider';
import ZicopsCarousel from '../components/ZicopsCarousel';

export default function Self() {
  const realSquare = {
    desktop: {
      breakpoint: { max: 3000, min: 1530 },
      items: 4,
      slidesToSlide: 1
    },
    laptop: {
      breakpoint: { max: 1530, min: 1024 },
      items: 4,
      slidesToSlide: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  const smallSquare = {
    desktop: {
      breakpoint: { max: 3000, min: 1530 },
      items: 10,
      slidesToSlide: 1
    },
    laptop: {
      breakpoint: { max: 1530, min: 1024 },
      items: 5,
      slidesToSlide: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  const one = {
    all: {
      breakpoint: { max: 3000, min: 1530 },
      items: 1,
      slidesToSlide: 1
    }
  };
  const bigSquare = {
    desktop: {
      breakpoint: { max: 3000, min: 1530 },
      items: 4,
      slidesToSlide: 1
    },
    laptop: {
      breakpoint: { max: 1530, min: 1024 },
      items: 5,
      slidesToSlide: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const tableData = {
    columnHeader: ['Course Name', 'End Date', 'Sub Category', 'Completion'],
    rowData: [
      ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
      ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
      ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
      ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
      ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
      ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
      ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
      ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
      ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
      ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%']
    ]
  };

  const { catSubCat, setActiveCatId } = useHandleCatSubCat();

  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        padding: '70px 0 0 0'
      }}>
      {/*<HeroSlider />*/}
      <FavouriteDndCourses />
      <ZicopsCarousel title="Mandatory Courses" data={sliderImages} />
      <ZicopsCarousel title="Continue with your Courses" data={sliderImages} />
      <ZicopsCarousel title="Courses in <Base Subcategory>" data={sliderImages} />

      <HeroSliderContainer>
        {classroomData.map((item) => (
          <ClassRoomBanner data={item} />
        ))}
      </HeroSliderContainer>
      {/* <div style={{ display: 'flex', padding: '70px 0', backgroundColor: 'var(--black)' }}>
        <div className="w-60 border_right">
          <SimpleTable tableData={tableData} tableHeight="70vh" tableHeading="Mandatory Courses" />
        </div>
        <div className="w-40 calender_box">
          <CommonCalendar />
        </div>
      </div> */}
      {/* <SelfPacedMiddle /> */}
      <ZicopsCarousel title="Courses in <Base Category>" data={sliderImages} />
      <ZicopsCarousel title="Courses from your learning space" data={sliderImages} />
      <ZicopsCarousel title="Trending Courses" data={sliderImages} />
      
      <SearchSubCat
        data={catSubCat?.subCat?.map((s) => ({
          ...s,
          name: s?.Name,
          img: s?.ImageUrl,
          handleClick: (subCat) => setFilters({ ...filters, subCategory: subCat })
        }))}
      />

      <ZicopsCarousel title="Courses from your Preferred Sub-Categories" data={sliderImages} />
      <ZicopsCarousel title="Latest Courses" data={sliderImages} />

    </div>
  );
}
