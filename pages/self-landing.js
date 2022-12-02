import { GET_LATEST_COURSES } from '@/api/Queries';
import ClassRoomBanner from '@/components/ClassRoomBanner';
import { classroomData } from '@/components/ClassRoomBanner/classRoomBanner.helper';
import HeroSliderContainer from '@/components/HeroSliderContainer';
import SearchSubCat from '@/components/Search/SearchSubCat';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { COURSE_STATUS, COURSE_TYPES } from '@/helper/constants.helper';
import useUserCourseData, { useHandleCatSubCat } from '@/helper/hooks.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
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

  async function getLatestCoursesByFilters(filters, pageSize = 28) {
    const _lspId = sessionStorage?.getItem('lsp_id');
    // Filter options are : LspId String; Category String; SubCategory String; Language String; DurationMin Int; DurationMax Int; DurationMin Int; Type String;
    const courses = await loadAndCacheDataAsync(GET_LATEST_COURSES, {
      publish_time: time,
      pageSize: pageSize,
      pageCursor: '',
      status: COURSE_STATUS.publish,
      filters: { LspId: _lspId, ...filters }
    });
    return courses;
  }

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

      const userCourseData = await getUserCourseData(28);
      let ucidArray = [];
      userCourseData?.map((uc) => ucidArray?.push(uc.id));

      setOnGoingCourses(
        userCourseData?.filter(
          (course) =>
            course?.completedPercentage > 0 &&
            course?.completedPercentage < 100 &&
            course?.course_type === COURSE_TYPES[0]
        )
      );
      setMandatoryCourses(
        userCourseData?.filter(
          (course) =>
            (parseInt(course?.completedPercentage) === 0 || course?.completedPercentage === 100) &&
            course?.course_type === COURSE_TYPES[0] &&
            course?.is_mandatory
        )
      );

      const getLatestCourses = await getLatestCoursesByFilters({}, pageSize);
      setLatestCourses(
        getLatestCourses?.latestCourses?.courses?.filter(
          (c) =>
            c?.is_active &&
            c?.is_display &&
            !ucidArray.includes(c.id) &&
            c?.type === COURSE_TYPES[0]
        ) || []
      );

      if (baseSubcategoryObj?.sub_category) {
        let baseSubCatCourses = await getLatestCoursesByFilters(
          { SubCategory: baseSubcategory },
          pageSize
        );
        setBaseSubcategoryCourses(
          baseSubCatCourses?.latestCourses?.courses?.filter(
            (c) =>
              c?.is_active &&
              c?.is_display &&
              !ucidArray.includes(c.id) &&
              c?.type === COURSE_TYPES[0]
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
            (c) =>
              c?.is_active &&
              c?.is_display &&
              !ucidArray.includes(c.id) &&
              c?.type === COURSE_TYPES[0]
          ) || []
        );
      } else {
        setParentOfBaseSubcategory(null);
        setParentOfBaseSubcategoryCourses([]);
      }

      const getLSPCourses = await getLatestCoursesByFilters({ LspId: userOrg?.lsp_id }, pageSize);
      setLearningSpaceCourses(
        getLSPCourses?.latestCourses?.courses?.filter(
          (c) =>
            c?.is_active &&
            c?.is_display &&
            !ucidArray.includes(c.id) &&
            c?.type === COURSE_TYPES[0]
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
        overflow: 'hidden',
        margin: 0,
        padding: '70px 0 0 0'
      }}>
      {isLoading && <HomePageLoader heroHeight={550} />}

      {/*<HeroSlider />*/}
      <FavouriteDndCourses isLoading={setIsLoading} />

      {!!mandatoryCourses?.length && (
        <ZicopsCarousel title="Mandatory Courses" data={mandatoryCourses} />
      )}
      {!!onGoingCourses?.length && (
        <ZicopsCarousel title="Continue with your Courses" data={onGoingCourses} />
      )}

      {!!baseSubcategoryCourses?.length && (
        <ZicopsCarousel title={`Courses in ${baseSubcategory}`} data={baseSubcategoryCourses} />
      )}

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

      {!!parentOfBaseSubcategoryCourses?.length && (
        <ZicopsCarousel
          title={`Courses in ${parentOfBaseSubcategory}`}
          data={parentOfBaseSubcategoryCourses}
        />
      )}

      {!!learningSpaceCourses?.length && (
        <ZicopsCarousel title="Courses from your learning space" data={learningSpaceCourses} />
      )}
      {!!latestCourses?.length && <ZicopsCarousel title="Trending Courses" data={latestCourses} />}

      <SearchSubCat
        data={catSubCat?.subCat?.map((s) => ({
          ...s,
          name: s?.Name,
          img: s?.ImageUrl,
          handleClick: (subCat) => setFilters({ ...filters, subCategory: subCat })
        }))}
      />

      {!!courseFromPrefernces?.length && (
        // <ZicopsCarousel title="Latest Courses" data={latestCourses} />
        <ZicopsCarousel
          title="Courses from your Preferred Sub-Categories"
          data={courseFromPrefernces}
        />
      )}

      {!!latestCourses?.length && <ZicopsCarousel title="Latest Courses" data={latestCourses} />}
    </div>
  );
}
