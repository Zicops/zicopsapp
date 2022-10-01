import { GET_LATEST_COURSES } from '@/api/Queries';
import HomeSlider from '@/components/HomeSlider';
import { loadQueryDataAsync } from '@/helper/api.helper';
import useUserCourseData, { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useEffect, useState } from 'react';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { LANGUAGES } from '@/helper/constants.helper';
import BigCardSlider from '@/components/medium/BigCardSlider';
import { useRecoilValue } from 'recoil';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import styles from './homepageScreen.module.scss';
import { bigImages } from '@/api/DemoSliderData';

export default function HomepageScreen() {
  const { getUserCourseData, getUserPreferences } = useUserCourseData();
  const userOrg = useRecoilValue(UsersOrganizationAtom);
  const [baseSubcategory, setBaseSubcategory] = useState('');
  const [parentOfBaseSubcategory, setParentOfBaseSubcategory] = useState('');
  const [activeSubcatArr, setActiveSubcatArr] = useState([]);
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [learningFolderCourses, setLearningFolderCourses] = useState([]);
  const [latestCourses, setLatestCourses] = useState([]);
  const [learningSpaceCourses, setLearningSpaceCourses] = useState([]);
  const [baseSubcategoryCourses, setBaseSubcategoryCourses] = useState([]);
  const [parentOfBaseSubcategoryCourses, setParentOfBaseSubcategoryCourses] = useState([]);
  // self-help courses to be added after category creation
  const [quickCourses, setQuickCourses] = useState([]);
  const [slowCourses, setSlowCourses] = useState([]);
  const [subCategory1Courses, setSubCategory1Courses] = useState([]);
  const [subCategory2Courses, setSubCategory2Courses] = useState([]);
  const [subCategory3Courses, setSubCategory3Courses] = useState([]);
  const [subCategory4Courses, setSubCategory4Courses] = useState([]);
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();
  const realSquare = {
    desktop: {
      breakpoint: { max: 3000, min: 1530 },
      items: 5,
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
  const bigSquare = {
    desktop: {
      breakpoint: { max: 3000, min: 1530 },
      items: 4,
      slidesToSlide: 1
    },
    laptop: {
      breakpoint: { max: 1530, min: 1024 },
      items: 4,
      slidesToSlide: 1
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
  async function getLatestCoursesByFilters(filters, pageSize) {
    // Filter options are : LspId String; Category String; SubCategory String; Language String; DurationMin Int; DurationMax Int; DurationMin Int; Type String;
    const courses = await loadQueryDataAsync(GET_LATEST_COURSES, {
      publish_time: Date.now(),
      pageSize: pageSize,
      pageCursor: '',
      filters: filters
    });
    return courses;
  }

  const pageSize = 28;

  useEffect(async () => {
    // console.log(catSubCat?.cat);
    const subcatArr = await getUserPreferences();
    const activeSubcategories = subcatArr?.filter(
      (item) => item?.is_active === true && item?.is_base !== true
    );
    const baseSubcategoryObj = subcatArr?.filter((item) => item?.is_base === true)[0];
    setBaseSubcategory(baseSubcategoryObj?.name);
    setParentOfBaseSubcategory(baseSubcategoryObj?.category);
    setActiveSubcatArr(activeSubcategories);

    const userCourseData = await getUserCourseData();
    let ucidArray = [];
    userCourseData?.map((uc) => {
      ucidArray?.push(uc.id);
    });

    setOngoingCourses(
      userCourseData?.filter(
        (course) => course?.completedPercentage > 0 && course?.completedPercentage < 100
      )
    );
    setLearningFolderCourses(
      userCourseData?.filter(
        (course) =>
          course?.added_by.toLowerCase() === 'self' &&
          (parseInt(course?.completedPercentage) === 0 || course?.completedPercentage === 100)
      )
    );

    const getLatestCourses = await getLatestCoursesByFilters({}, pageSize);
    setLatestCourses(
      getLatestCourses?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || []
    );

    const getLSPCourses = await getLatestCoursesByFilters({ LspId: userOrg?.lsp_id }, pageSize);
    setLearningSpaceCourses(
      getLSPCourses?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || []
    );

    let baseSubCatCourses = await getLatestCoursesByFilters(
      { SubCategory: baseSubcategory },
      pageSize
    );
    setBaseSubcategoryCourses(
      baseSubCatCourses?.latestCourses?.courses?.filter((c) => c?.is_active && c?.is_display) || []
    );
    let baseSubCatParentCourses = await getLatestCoursesByFilters(
      { Category: parentOfBaseSubcategory },
      pageSize
    );
    setParentOfBaseSubcategoryCourses(
      baseSubCatParentCourses?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || []
    );

    // Todo : Make it a loop
    // activeSubcatArr.slice(0, 4).map(async(subcat) => {
    let SubCat1Courses = await getLatestCoursesByFilters(
      { SubCategory: activeSubcatArr[0]?.name },
      pageSize
    );
    setSubCategory1Courses(
      SubCat1Courses?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || []
    );
    let SubCat2Courses = await getLatestCoursesByFilters(
      { SubCategory: activeSubcatArr[1]?.name },
      pageSize
    );
    setSubCategory2Courses(
      SubCat2Courses?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || []
    );
    let SubCat3Courses = await getLatestCoursesByFilters(
      { SubCategory: activeSubcatArr[2]?.name },
      pageSize
    );
    setSubCategory3Courses(
      SubCat3Courses?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || []
    );
    let SubCat4Courses = await getLatestCoursesByFilters(
      { SubCategory: activeSubcatArr[3]?.name },
      pageSize
    );
    setSubCategory4Courses(
      SubCat4Courses?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || []
    );
    // })

    // quickCourses duration less than 1 hour;
    let getQuickCourses = await getLatestCoursesByFilters({ DurationMax: 60 }, pageSize);
    setQuickCourses(
      getQuickCourses?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || []
    );
    // slowCourses duration more than 6 hours;
    let getSlowCourses = await getLatestCoursesByFilters({ DurationMin: 360 }, pageSize);
    setSlowCourses(
      getSlowCourses?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || []
    );
  }, [latestCourses, baseSubcategory]);
  return (
    <div className={`${styles.homebody}`}>
      <HomeSlider />
      {ongoingCourses?.length ? (
        <ZicopsCarousel title="Continue with your Courses" data={ongoingCourses} />
      ) : (
        ''
      )}
      {learningFolderCourses?.length ? (
        <ZicopsCarousel title="Courses in your Learning Folder" data={learningFolderCourses} />
      ) : (
        ''
      )}
      {latestCourses?.length ? <ZicopsCarousel title="Latest Courses" data={latestCourses} /> : ''}
      {learningSpaceCourses?.length ? (
        <ZicopsCarousel title="Courses from your learning space" data={learningSpaceCourses} />
      ) : (
        ''
      )}
      {baseSubcategoryCourses?.length ? (
        <ZicopsCarousel title={`Courses in ${baseSubcategory}`} data={baseSubcategoryCourses} />
      ) : (
        ''
      )}
      <BigCardSlider
        title="Courses in Other Languages"
        data={LANGUAGES}
        slide={realSquare}
        bigBox={true}
      />
      {parentOfBaseSubcategoryCourses?.length ? (
        <ZicopsCarousel
          title={`Courses in ${parentOfBaseSubcategory}`}
          data={parentOfBaseSubcategoryCourses}
        />
      ) : (
        ''
      )}
      {quickCourses?.length ? <ZicopsCarousel title="Quick Courses" data={quickCourses} /> : ''}
      {subCategory1Courses?.length ? (
        <ZicopsCarousel
          title={`Courses in ${activeSubcatArr[0]?.name}`}
          data={subCategory1Courses}
        />
      ) : (
        ''
      )}
      {subCategory2Courses?.length ? (
        <ZicopsCarousel
          title={`Courses in ${activeSubcatArr[1]?.name}`}
          data={subCategory2Courses}
        />
      ) : (
        ''
      )}
      {subCategory3Courses?.length ? (
        <ZicopsCarousel
          title={`Courses in ${activeSubcatArr[2]?.name}`}
          data={subCategory3Courses}
        />
      ) : (
        ''
      )}
      {subCategory4Courses?.length ? (
        <ZicopsCarousel
          title={`Courses in ${activeSubcatArr[3]?.name}`}
          data={subCategory4Courses}
        />
      ) : (
        ''
      )}
      <BigCardSlider title="Categories" data={catSubCat?.cat} slide={bigSquare} />
      {slowCourses?.length ? (
        <ZicopsCarousel title="Slow and Steady Courses" data={slowCourses} />
      ) : (
        ''
      )}
    </div>
  );
}
