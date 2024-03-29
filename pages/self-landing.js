import HeroSliderContainer from '@/components/HeroSliderContainer';
import SearchSubCat from '@/components/Search/SearchSubCat';
import SelfPageBanner from '@/components/SelfPageBanner';
import { selfPageData } from '@/components/SelfPageBanner/selfPageBanner.helper';
import { COURSE_MAP_STATUS, COURSE_TYPES } from '@/helper/constants.helper';
import { getLatestCoursesByFilters, getUserAssignCourses } from '@/helper/data.helper';
import useUserCourseData, { useHandleCatSubCat } from '@/helper/hooks.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import FavouriteDndCourses from '../components/FavouriteDndCourses';
import ZicopsCarousel from '../components/ZicopsCarousel';
import HomePageLoader from '../screens/HomepageScreen/HomePageLoader';

const skeletonCardCount = 5;
const time = Date.now();
let timer = null;

export default function Self() {
  const userData = useRecoilValue(UserDataAtom);
  const { getUserCourseData, getUserPreferences } = useUserCourseData();

  const router = useRouter();

  const userOrg = useRecoilValue(UsersOrganizationAtom);
  const [baseSubcategory, setBaseSubcategory] = useState('');
  const [parentOfBaseSubcategory, setParentOfBaseSubcategory] = useState('');
  const [activeSubcatArr, setActiveSubcatArr] = useState([...Array(skeletonCardCount)]);

  const [onGoingCourses, setOnGoingCourses] = useState([...Array(skeletonCardCount)]);
  const [mandatoryCourses, setMandatoryCourses] = useState([...Array(skeletonCardCount)]);

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

  // async function getLatestCoursesByFilters(filters, pageSize = 28) {
  //   const _lspId = sessionStorage?.getItem('lsp_id');
  //   // Filter options are : LspId String; Category String; SubCategory String; Language String; DurationMin Int; DurationMax Int; DurationMin Int; Type String;
  //   const courses = await loadAndCacheDataAsync(GET_LATEST_COURSES, {
  //     publish_time: time,
  //     pageSize: pageSize,
  //     pageCursor: '',
  //     status: COURSE_STATUS.publish,
  //     filters: { LspId: _lspId, ...filters }
  //   });
  //   return courses;
  // }

  const pageSize = 28;
  useEffect(() => {
    setIsLoading(true);

    async function loadAndSetHomePageRows() {
      setIsLoading(true);
      const subcatArr = userData?.preferences;
      // const activeSubcategories = subcatArr?.filter((item) => item?.is_active && !item?.is_base);
      const activeSubcategories = subcatArr?.filter(
        (item) => item?.is_active && item?.sub_category
      );
      const baseSubcategoryObj = subcatArr?.filter((item) => item?.is_base)[0];
      if (baseSubcategoryObj?.sub_category) setBaseSubcategory(baseSubcategoryObj?.sub_category);

      setActiveSubcatArr(activeSubcategories);

      // const userCourseData = await getUserCourseData(28);

      const filters = { status: COURSE_MAP_STATUS.started, type: COURSE_TYPES[0] };
      const _onGoingCourses = await getUserAssignCourses(filters);

      delete filters.status;
      filters.is_mandatory = true;
      const _mandatoryCourses = await getUserAssignCourses(filters);

      let ucidArray = [];
      _mandatoryCourses?.forEach((uc) => ucidArray?.push(uc.id));
      _onGoingCourses?.forEach((uc) => ucidArray?.push(uc.id));

      setOnGoingCourses(_onGoingCourses);
      setMandatoryCourses(_mandatoryCourses);
      // setOnGoingCourses(
      //   userCourseData?.filter(
      //     (course) =>
      //       course?.course_type === COURSE_TYPES[0] &&
      //       course?.isCourseStarted &&
      //       !course?.isCourseCompleted
      //   )
      // );
      // setMandatoryCourses(
      //   userCourseData?.filter(
      //     (course) =>
      //       course?.course_type === COURSE_TYPES[0] &&
      //       // (+course?.completedPercentage === 0 || course?.completedPercentage === 100)
      //       !course?.isCourseStarted &&
      //       !course?.isCourseCompleted &&
      //       course?.is_mandatory
      //   )
      // );

      const getLatestCourses = await getLatestCoursesByFilters({ Type: COURSE_TYPES[0] }, pageSize);
      setLatestCourses(
        getLatestCourses?.latestCourses?.courses?.filter(
          (c) =>
            c?.type === COURSE_TYPES[0] &&
            c?.is_active &&
            c?.is_display &&
            !ucidArray.includes(c.id)
        ) || []
      );

      if (baseSubcategoryObj?.sub_category) {
        let baseSubCatCourses = await getLatestCoursesByFilters(
          { SubCategory: baseSubcategory, Type: COURSE_TYPES[0] },
          pageSize
        );
        setBaseSubcategoryCourses(
          baseSubCatCourses?.latestCourses?.courses?.filter(
            (c) =>
              c?.type === COURSE_TYPES[0] &&
              c?.is_active &&
              c?.is_display &&
              !ucidArray.includes(c.id)
          ) || []
        );
      } else {
        setBaseSubcategoryCourses([]);
      }

      const parentOfBase = baseSubcategoryObj?.catData?.Name;
      if (!!parentOfBase) {
        setParentOfBaseSubcategory(parentOfBase);
        let baseSubCatParentCourses = await getLatestCoursesByFilters(
          { Category: parentOfBase, Type: COURSE_TYPES[0] },
          pageSize
        );
        setParentOfBaseSubcategoryCourses(
          baseSubCatParentCourses?.latestCourses?.courses?.filter(
            (c) =>
              c?.type === COURSE_TYPES[0] &&
              c?.is_active &&
              c?.is_display &&
              !ucidArray.includes(c.id)
          ) || []
        );
      } else {
        setParentOfBaseSubcategory(null);
        setParentOfBaseSubcategoryCourses([]);
      }

      const getLSPCourses = await getLatestCoursesByFilters(
        { LspId: userOrg?.lsp_id, Type: COURSE_TYPES[0] },
        pageSize
      );
      setLearningSpaceCourses(
        getLSPCourses?.latestCourses?.courses?.filter(
          (c) =>
            c?.type === COURSE_TYPES[0] &&
            c?.is_active &&
            c?.is_display &&
            !ucidArray.includes(c.id)
        ) || []
      );
    }

    loadAndSetHomePageRows();
  }, [userData?.preferences]);

  const courseFromPrefernces = latestCourses?.filter(
    (c) => !!activeSubcatArr?.find((pref) => pref?.sub_category === c?.sub_category)
  );

  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflowX: 'clip',
        margin: 0,
        padding: '70px 0 20px 0'
      }}>
      {isLoading && <HomePageLoader heroHeight={550} />}

      {/*<HeroSlider />*/}
      <FavouriteDndCourses isLoading={setIsLoading} />

      {!!mandatoryCourses?.length && (
        <ZicopsCarousel
          title="Mandatory Courses"
          data={mandatoryCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?userCourse=${JSON.stringify({ isMandatory: true })}&type=${
                COURSE_TYPES[0]
              }`,
              '/search-page'
            )
          }
        />
      )}
      {!!onGoingCourses?.length && (
        <ZicopsCarousel
          title="Continue with your Courses"
          data={onGoingCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?userCourse=${JSON.stringify({ isOngoing: true })}&type=${
                COURSE_TYPES[0]
              }`,
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
            router.push(
              `/search-page?subCat=${baseSubcategory}&type=${COURSE_TYPES[0]}`,
              '/search-page'
            )
          }
        />
      )}

      <HeroSliderContainer>
        {selfPageData.map((item) => (
          <SelfPageBanner data={item} />
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

      {!!parentOfBaseSubcategoryCourses?.length && (
        <ZicopsCarousel
          title={`Courses in ${parentOfBaseSubcategory}`}
          data={parentOfBaseSubcategoryCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?cat=${parentOfBaseSubcategory}&type=${COURSE_TYPES[0]}`,
              '/search-page'
            )
          }
        />
      )}

      {!!learningSpaceCourses?.length && (
        <ZicopsCarousel
          title="Courses from your learning space"
          data={learningSpaceCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?filter=${JSON.stringify({ LspId: userOrg?.lsp_id })}&type=${
                COURSE_TYPES[0]
              }`,
              '/search-page'
            )
          }
        />
      )}
      {!!latestCourses?.length && (
        <ZicopsCarousel
          title="Trending Courses"
          data={latestCourses}
          handleTitleClick={() =>
            router.push(`/search-page?&type=${COURSE_TYPES[0]}`, '/search-page')
          }
        />
      )}
      <br />
      <br />
      <SearchSubCat
        data={catSubCat?.subCat?.map((s) => ({
          ...s,
          name: s?.Name,
          img: s?.ImageUrl,
          handleClick: (subCat) =>
            router.push(`/search-page?subCat=${subCat}&type=${COURSE_TYPES[0]}`, '/search-page')
        }))}
        // handleTitleClick={() => router.push(`/search-page?cat=${}&isSelfPaced=true`, '/search-page')}
      />
      <br />
      <br />
      {!!courseFromPrefernces?.length && (
        // <ZicopsCarousel title="Latest Courses" data={latestCourses} />
        <ZicopsCarousel
          title="Courses from your Preferred Sub-Categories"
          data={courseFromPrefernces}
          handleTitleClick={() =>
            router.push(`/search-page?preferredSubCat=true&type=${COURSE_TYPES[0]}`, '/search-page')
          }
        />
      )}

      {!!latestCourses?.length && (
        <ZicopsCarousel
          title="Latest Courses"
          data={latestCourses}
          handleTitleClick={() =>
            router.push(`/search-page?type=${COURSE_TYPES[0]}`, '/search-page')
          }
        />
      )}
    </div>
  );
}
