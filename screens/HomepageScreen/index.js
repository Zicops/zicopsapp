import { GET_LATEST_COURSES } from '@/api/Queries';
import { GET_USER_VENDORS, userQueryClient } from '@/api/UserQueries';
import HomeSlider from '@/components/HomeSlider';
import BigCardSlider from '@/components/medium/BigCardSlider';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import {
  COMMON_LSPS,
  COURSE_MAP_STATUS,
  COURSE_STATUS,
  LANGUAGES,
  USER_LSP_ROLE
} from '@/helper/constants.helper';
import { getUserAssignCourses, sortArrByKeyInOrder } from '@/helper/data.helper';
import useUserCourseData, { useHandleCatSubCat } from '@/helper/hooks.helper';
import { getUnixTimeAt } from '@/helper/utils.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import HomePageLoader from './HomePageLoader';
import styles from './homepageScreen.module.scss';

const skeletonCardCount = 5;
const time = Date.now();
let timer = null;

export default function HomepageScreen() {
  const userData = useRecoilValue(UserDataAtom);
  const userDetails = useRecoilValue(UserStateAtom);

  const router = useRouter();

  const { getUserCourseData, getUserPreferences } = useUserCourseData();
  const userOrg = useRecoilValue(UsersOrganizationAtom);

  const [baseSubcategory, setBaseSubcategory] = useState('');
  const [parentOfBaseSubcategory, setParentOfBaseSubcategory] = useState('');
  const [activeSubcatArr, setActiveSubcatArr] = useState([...Array(skeletonCardCount)]);
  const [ongoingCourses, setOngoingCourses] = useState([...Array(skeletonCardCount)]);
  const [learningFolderCourses, setLearningFolderCourses] = useState([...Array(skeletonCardCount)]);
  const [latestCourses, setLatestCourses] = useState([...Array(skeletonCardCount)]);
  const [learningSpaceCourses, setLearningSpaceCourses] = useState([...Array(skeletonCardCount)]);
  const [baseSubcategoryCourses, setBaseSubcategoryCourses] = useState([
    ...Array(skeletonCardCount)
  ]);
  const [parentOfBaseSubcategoryCourses, setParentOfBaseSubcategoryCourses] = useState([
    ...Array(skeletonCardCount)
  ]);
  // self-help courses to be added after category creation
  const [quickCourses, setQuickCourses] = useState([...Array(skeletonCardCount)]);
  const [slowCourses, setSlowCourses] = useState([...Array(skeletonCardCount)]);
  const [subCategory0Courses, setSubCategory0Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory1Courses, setSubCategory1Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory2Courses, setSubCategory2Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory3Courses, setSubCategory3Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory4Courses, setSubCategory4Courses] = useState([...Array(skeletonCardCount)]);
  const [isLoading, setIsLoading] = useState(null);
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

  async function getLatestCoursesByFilters(filters = {}, pageSize = 28) {
    const zicopsLspId = COMMON_LSPS.zicops;

    // Filter options are : LspId String; Category String; SubCategory String; Language String; DurationMin Int; DurationMax Int; DurationMin Int; Type String;
    const courses = await loadAndCacheDataAsync(GET_LATEST_COURSES, {
      publish_time: getUnixTimeAt(),
      pageSize: pageSize,
      pageCursor: '',
      status: COURSE_STATUS.publish,
      filters: { LspId: zicopsLspId, ...filters }
    });
    const _toBeSortedCourses = structuredClone(courses || {});

    _toBeSortedCourses.latestCourses.courses = sortArrByKeyInOrder(
      [...(_toBeSortedCourses?.latestCourses?.courses || [])],
      'updated_at',
      false
    );
    return _toBeSortedCourses;
  }

  const pageSize = 28;
  const isVendor = userOrg?.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  function clearLoadingState() {
    setActiveSubcatArr([]);
    setOngoingCourses([]);
    setLearningFolderCourses([]);
    setLatestCourses((prev) => (prev.every((val) => val == null) ? [] : prev));
    setLearningSpaceCourses([]);
    setBaseSubcategoryCourses([]);
    setParentOfBaseSubcategoryCourses([]);
    setQuickCourses([]);
    setSlowCourses([]);
    setSubCategory0Courses([]);
    setSubCategory1Courses([]);
    setSubCategory2Courses([]);
    setSubCategory3Courses([]);
    setSubCategory4Courses([]);
    setIsLoading(false);
  }

  useEffect(() => {
    if (isVendor) return clearLoadingState();

    setIsLoading(true);
    if (!userData?.preferences?.length) {
      timer = setTimeout(() => {
        clearLoadingState();
        return clearTimeout(timer);
      }, 3000);
      return;
    }
    clearTimeout(timer);

    async function loadAndSetHomePageRows() {
      setIsLoading(true);
      const subcatArr = userData?.preferences;
      const activeSubcategories = subcatArr?.filter((item) => item?.is_active && !item?.is_base);
      // const activeSubcategories = subcatArr?.filter(
      //   (item) => item?.is_active && item?.sub_category
      // );
      const baseSubcategoryObj = subcatArr?.filter((item) => item?.is_base)[0];
      if (baseSubcategoryObj?.sub_category) setBaseSubcategory(baseSubcategoryObj?.sub_category);

      // const catId = catSubCat?.subCat?.find(
      //   (s) => s?.Name === baseSubcategoryObj?.sub_category
      // )?.CatId;
      // console.log(catId, catSubCat);
      // setParentOfBaseSubcategory(catSubCat?.subCatGrp?.[catId]?.cat?.Name);
      setActiveSubcatArr(activeSubcategories);

      // const userCourseData = await getUserCourseData(28);
      const filters = { status: COURSE_MAP_STATUS.started };
      const _onGoingCourses = await getUserAssignCourses(filters);

      filters.status = COURSE_MAP_STATUS.assign;
      const _coursesInFolder = await getUserAssignCourses(filters);

      let ucidArray = [];
      _coursesInFolder?.forEach((uc) => ucidArray?.push(uc.id));
      _onGoingCourses?.forEach((uc) => ucidArray?.push(uc.id));

      setOngoingCourses(_onGoingCourses);
      setLearningFolderCourses(_coursesInFolder);
      // setOngoingCourses(
      //   userCourseData?.filter(
      //     // (course) => course?.completedPercentage > 0 && course?.completedPercentage < 100
      //     (course) => course?.isCourseStarted && !course?.isCourseCompleted
      //   )
      // );
      // setLearningFolderCourses(
      //   userCourseData?.filter(
      //     (course) =>
      //       // course?.added_by.toLowerCase() === 'self' &&
      //       // parseInt(course?.completedPercentage) === 0 || course?.completedPercentage === 100
      //       !course?.isCourseStarted && !course?.isCourseCompleted
      //   )
      // );

      const getLatestCourses = await getLatestCoursesByFilters({}, pageSize);
      setLatestCourses(
        getLatestCourses?.latestCourses?.courses?.filter(
          (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
        ) || []
      );

      setIsLoading(false);
      const _lspId = sessionStorage?.getItem('lsp_id');
      const getLSPCourses = await getLatestCoursesByFilters({ LspId: _lspId }, pageSize);
      setLearningSpaceCourses(
        getLSPCourses?.latestCourses?.courses?.filter(
          (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
        ) || []
      );

      if (baseSubcategoryObj?.sub_category) {
        let baseSubCatCourses = await getLatestCoursesByFilters(
          { SubCategory: baseSubcategoryObj?.sub_category },
          // { SubCategory: baseSubcategory },
          pageSize
        );
        setBaseSubcategoryCourses(
          baseSubCatCourses?.latestCourses?.courses?.filter(
            (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
          ) || []
        );
      } else {
        setBaseSubcategoryCourses([]);
      }

      const parentOfBase = baseSubcategoryObj?.catData?.Name;
      if (!!parentOfBase) {
        setParentOfBaseSubcategory(parentOfBase);
        let baseSubCatParentCourses = await getLatestCoursesByFilters(
          { Category: parentOfBase },
          pageSize
        );
        setParentOfBaseSubcategoryCourses(
          baseSubCatParentCourses?.latestCourses?.courses?.filter(
            (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
          ) || []
        );
      } else {
        setParentOfBaseSubcategory(null);
        setParentOfBaseSubcategoryCourses([]);
      }

      // activeSubcatArr.slice(0, 4).map(async(subcat) => {
      let prefIndex = 0;
      const courseData = [];
      for (let i = 0; i < activeSubcategories?.length; ++i) {
        if (prefIndex === 5) break;

        const subCategory = activeSubcategories?.[i]?.sub_category;
        if (!subCategory) continue;

        let subCatCourses = await getLatestCoursesByFilters({ SubCategory: subCategory }, pageSize);
        ++prefIndex;
        courseData.push(
          subCatCourses?.latestCourses?.courses?.filter(
            (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
          ) || []
        );
      }

      setSubCategory0Courses(courseData?.[0]);
      setSubCategory1Courses(courseData?.[1]);
      setSubCategory2Courses(courseData?.[2]);
      setSubCategory3Courses(courseData?.[3]);
      setSubCategory4Courses(courseData?.[4]);
      // if (activeSubcategories?.[0]?.sub_category) {
      //   let SubCat1Courses = await getLatestCoursesByFilters(
      //     { SubCategory: activeSubcategories?.[0]?.sub_category },
      //     pageSize
      //   );
      //   setSubCategory1Courses(
      //     SubCat1Courses?.latestCourses?.courses?.filter(
      //       (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      //     ) || []
      //   );
      // }

      // if (activeSubcategories?.[1]?.sub_category) {
      //   let SubCat2Courses = await getLatestCoursesByFilters(
      //     { SubCategory: activeSubcategories?.[1]?.sub_category },
      //     pageSize
      //   );
      //   setSubCategory2Courses(
      //     SubCat2Courses?.latestCourses?.courses?.filter(
      //       (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      //     ) || []
      //   );
      // }

      // if (activeSubcategories?.[2]?.sub_category) {
      //   let SubCat3Courses = await getLatestCoursesByFilters(
      //     { SubCategory: activeSubcategories?.[2]?.sub_category },
      //     pageSize
      //   );
      //   setSubCategory3Courses(
      //     SubCat3Courses?.latestCourses?.courses?.filter(
      //       (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      //     ) || []
      //   );
      // }

      // if (activeSubcategories?.[3]?.sub_category) {
      //   let SubCat4Courses = await getLatestCoursesByFilters(
      //     { SubCategory: activeSubcategories?.[3]?.sub_category },
      //     pageSize
      //   );
      //   setSubCategory4Courses(
      //     SubCat4Courses?.latestCourses?.courses?.filter(
      //       (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      //     ) || []
      //   );
      // }
      // })

      // quickCourses duration less than 1 hour;
      let getQuickCourses = await getLatestCoursesByFilters({ DurationMax: 60 * 60 }, pageSize);
      setQuickCourses(
        getQuickCourses?.latestCourses?.courses?.filter(
          (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
        ) || []
      );
      // slowCourses duration more than 6 hours;
      let getSlowCourses = await getLatestCoursesByFilters({ DurationMin: 360 * 60 }, pageSize);
      setSlowCourses(
        getSlowCourses?.latestCourses?.courses?.filter(
          (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
        ) || []
      );
    }

    loadAndSetHomePageRows();

    return () => clearTimeout(timer);
  }, [userData?.preferences, isVendor]);

  useEffect(async () => {
    if (!isVendor) return;
    if (!userDetails?.id) return;
    if (!userOrg?.lsp_id) return;
    const courseFilters = { LspId: userOrg?.lsp_id };

    const vendorDetail = await loadAndCacheDataAsync(
      GET_USER_VENDORS,
      { user_id: userDetails?.id },
      {},
      userQueryClient
    );
    if (!vendorDetail?.getUserVendor?.[0]?.name) return;

    courseFilters.Owner = vendorDetail?.getUserVendor?.[0]?.name;
    // courseFiltes.Publisher = vendorDetail?.getUserVendor?.[0]?.name;

    const getLatestCourses = await getLatestCoursesByFilters(courseFilters, pageSize);
    setLatestCourses(getLatestCourses?.latestCourses?.courses?.filter((c) => c?.is_active) || []);
  }, [isVendor, userOrg?.lsp_id, userDetails?.id]);

  const [lspId, setLspId] = useState(null);
  useEffect(() => {
    if (!userOrg?.lsp_id) {
      const _lspId = sessionStorage?.getItem('lsp_id');
      if (!_lspId) return router.push('/login');
      console.log(_lspId, 'lsps');
      setLspId(_lspId);
      return;
    }
    return;
  }, []);

  if (isLoading) return <HomePageLoader />;

  return (
    <div className={`${styles.homebody}`}>
      <HomeSlider />

      {!!ongoingCourses?.length && (
        <ZicopsCarousel
          title="Continue with your Courses"
          data={ongoingCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?userCourse=${JSON.stringify({ isOngoing: true })}`,
              '/search-page'
            )
          }
        />
      )}
      {!!learningFolderCourses?.length && (
        <ZicopsCarousel
          title="Courses in your Learning Folder"
          data={learningFolderCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?userCourse=${JSON.stringify({ isOngoing: false })}`,
              '/search-page'
            )
          }
        />
      )}

      {!!latestCourses?.length && (
        <ZicopsCarousel
          title={isVendor ? 'My Courses' : 'Latest Courses'}
          data={latestCourses}
          handleTitleClick={() => {
            if (isVendor) return;

            router.push('/search-page');
          }}
        />
      )}

      {!!learningSpaceCourses?.length && (
        <ZicopsCarousel
          title="Courses from your learning space"
          data={learningSpaceCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?filter=${JSON.stringify({ LspId: sessionStorage?.getItem('lsp_id') })}`,
              '/search-page'
            )
          }
        />
      )}
      {!!baseSubcategoryCourses?.length && (
        <ZicopsCarousel
          title={`Courses in ${baseSubcategory}`}
          data={baseSubcategoryCourses}
          handleTitleClick={() =>
            router.push(`/search-page?subCat=${baseSubcategory}`, '/search-page')
          }
        />
      )}

      <BigCardSlider
        title="Courses in Other Languages"
        data={LANGUAGES}
        slide={realSquare}
        bigBox={true}
        handleTitleClick={() => router.push('/search-page')}
      />
      {!!parentOfBaseSubcategoryCourses?.length && !!parentOfBaseSubcategory && (
        <ZicopsCarousel
          title={`Courses in ${parentOfBaseSubcategory}`}
          data={parentOfBaseSubcategoryCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?cat=${encodeURIComponent(parentOfBaseSubcategory)}`,
              '/search-page'
            )
          }
        />
      )}
      {!!quickCourses?.length && (
        <ZicopsCarousel
          title="Quick Courses"
          data={quickCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?filter=${JSON.stringify({ DurationMax: 60 * 60 })}`,
              '/search-page'
            )
          }
        />
      )}
      {!!subCategory0Courses?.length && (
        <ZicopsCarousel
          title={`Courses in ${activeSubcatArr[0]?.sub_category}`}
          data={subCategory0Courses}
          handleTitleClick={() =>
            router.push(
              `/search-page?subCat=${encodeURIComponent(activeSubcatArr[0]?.sub_category)}`,
              '/search-page'
            )
          }
        />
      )}
      {!!subCategory1Courses?.length && (
        <ZicopsCarousel
          title={`Courses in ${activeSubcatArr[1]?.sub_category}`}
          data={subCategory1Courses}
          handleTitleClick={() =>
            router.push(
              `/search-page?subCat=${encodeURIComponent(activeSubcatArr[1]?.sub_category)}`,
              '/search-page'
            )
          }
        />
      )}
      {!!subCategory2Courses?.length && (
        <ZicopsCarousel
          title={`Courses in ${activeSubcatArr[2]?.sub_category}`}
          data={subCategory2Courses}
          handleTitleClick={() =>
            router.push(
              `/search-page?subCat=${encodeURIComponent(activeSubcatArr[2]?.sub_category)}`,
              '/search-page'
            )
          }
        />
      )}
      {!!subCategory3Courses?.length && (
        <ZicopsCarousel
          title={`Courses in ${activeSubcatArr[3]?.sub_category}`}
          data={subCategory3Courses}
          handleTitleClick={() =>
            router.push(
              `/search-page?subCat=${encodeURIComponent(activeSubcatArr[3]?.sub_category)}`,
              '/search-page'
            )
          }
        />
      )}
      {!!subCategory4Courses?.length && (
        <ZicopsCarousel
          title={`Courses in ${activeSubcatArr[4]?.sub_category}`}
          data={subCategory4Courses}
          handleTitleClick={() =>
            router.push(
              `/search-page?subCat=${encodeURIComponent(activeSubcatArr[4]?.sub_category)}`,
              '/search-page'
            )
          }
        />
      )}

      {!!catSubCat?.cat?.length && (
        <BigCardSlider
          title="Categories"
          data={catSubCat?.cat}
          slide={bigSquare}
          handleTitleClick={() => router.push('/search-page')}
        />
      )}

      {!!slowCourses?.length && (
        <ZicopsCarousel
          title="Slow and Steady Courses"
          data={slowCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?filter=${JSON.stringify({ DurationMin: 360 * 60 })}`,
              '/search-page'
            )
          }
        />
      )}

      <div style={{ height: '40px' }}></div>
    </div>
  );
}
