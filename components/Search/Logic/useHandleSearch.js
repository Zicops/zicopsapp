import { userClient } from '@/api/UserMutations';
import { GET_USER_BOOKMARKS } from '@/api/UserQueries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { COMMON_LSPS, COURSE_STATUS } from '@/helper/constants.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { parseJson } from '@/helper/utils.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { OnGoingExamAtom } from 'pages/exams';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GET_LATEST_COURSES, queryClient } from '../../../API/Queries';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';

export default function useHandleSearch() {
  const [
    loadCourses,
    { loading: courseLoading, error: loadCoursesError, refetch: refetchCourses }
  ] = useLazyQuery(GET_LATEST_COURSES, { client: queryClient });

  const router = useRouter();
  const searchQuery = router.query?.searchQuery || '';
  const filter = router.query?.filter || null;
  const userCourse = router.query?.userCourse || null;
  const preferredSubCat = router.query?.preferredSubCat || null;

  const userDataGlobal = useRecoilValue(UserDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const examOngoingData = useRecoilValue(OnGoingExamAtom);

  const lastItemRef = useRef(null);

  // state for storing courses data
  const [courses, setCourses] = useState([]);
  const [pageCursor, setPageCursor] = useState({ zicops: null, currentLsp: null });
  const [refetchData, setRefetchData] = useState(null);
  const [bookmarkData, setBookmarkData] = useState({
    isLoading: false,
    bookmarks: []
  });

  // filters in search header
  const [filters, setFilters] = useState({
    lang: null,
    category: null,
    subCategory: null,
    type: null
  });

  const [isLoading, setIsLoading] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const { getUserCourseData } = useUserCourseData();

  // load table data
  const time = Date.now();
  useEffect(async () => {
    // return if router is not ready
    if (!router.isReady) return;
    if (isLoading) return;
    setIsLoading(true);

    // return if state is updated and same as query params
    const { subCat, lang, cat, type } = router.query;
    if (cat != null && !filters.category) return setIsLoading(false);
    if (subCat != null && !filters.subCategory) return setIsLoading(false);
    if (lang != null && !filters.lang) return setIsLoading(false);
    if (type != null && !filters.type) return setIsLoading(false);

    // reset query params to not affect future query calls by returning due to above condition
    router.query.cat = null;
    router.query.subCat = null;
    router.query.lang = null;
    router.query.type = null;

    if (preferredSubCat && !userDataGlobal?.preferences?.length) return setIsLoading(false);

    if (userCourse) {
      setIsLoading(true);
      const userCourseObj = parseJson(userCourse);
      if (userCourseObj.onGoingExam) return setCourses(onGoingExam || []);

      const userCourseData = await getUserCourseData();

      const _allUserCourses = userCourseData
        ?.filter((course) => {
          const isOngoing = course?.isCourseStarted && !course?.isCourseCompleted;
          const isAssigned = course?.isCourseStarted && course?.isCourseCompleted;
          const isMandatory = !course?.isCourseStarted && !course?.isCourseCompleted;

          if (userCourseObj?.isMandatory) return isMandatory;
          if (userCourseObj?.isOngoing) return isOngoing;

          return isAssigned;
        })
        ?.filter((course) => {
          if (type) return course?.course_type === type;

          return true;
        });

      setCourses(
        _allUserCourses?.map((c) => ({ ...c, duration: Math.floor(c?.duration / 60) })) || []
      );
      return setIsLoading(false);
    }

    // const _lspId = sessionStorage?.getItem('lsp_id');
    const zicopsLspId = COMMON_LSPS.zicops;
    const currentLspId = sessionStorage.getItem('lsp_id');

    const queryVariables = {
      publish_time: time,
      pageSize: 50,
      pageCursor: '',
      status: COURSE_STATUS.publish,
      filters: { LspId: currentLspId }
    };
    if (searchQuery) {
      queryVariables.filters.SearchText = searchQuery;
      setBookmarkData({ ...bookmarkData, isLoading: true });
    }
    if (filters.category) queryVariables.filters.Category = filters.category;
    if (filters.subCategory) queryVariables.filters.SubCategory = filters.subCategory;
    if (filters.type) queryVariables.filters.Type = filters.type;
    if (filters.lang) queryVariables.filters.Language = filters.lang;

    const filterObj = parseJson(filter);
    // console.log(filterObj, filter);
    if (filterObj?.DurationMin) queryVariables.filters.DurationMin = filterObj.DurationMin;
    if (filterObj?.DurationMax) queryVariables.filters.DurationMax = filterObj.DurationMax;
    if (filterObj?.LspId) queryVariables.filters.LspId = filterObj.LspId;

    const currentCourseRes = await loadCourses({ variables: queryVariables })?.catch((err) =>
      console.error(err)
    );

    // replace lsp id with zicops lsp id
    queryVariables.filters.LspId = zicopsLspId;
    const zicopsCourseRes =
      !filterObj.LspId &&
      queryVariables.filters.LspId === zicopsLspId &&
      zicopsLspId !== currentLspId
        ? await loadCourses({ variables: queryVariables })?.catch((err) => console.error(err))
        : {};
    if (loadCoursesError) {
      setToastMsg({ type: 'danger', message: 'course load error' });
      return setIsLoading(false);
    }

    const subcatArr = userDataGlobal?.preferences;
    // const activeSubcategories = subcatArr?.filter((item) => item?.is_active && !item?.is_base);
    const activeSubcategories = subcatArr?.filter((item) => item?.is_active && item?.sub_category);

    const zicopsCourseData = zicopsCourseRes?.data?.latestCourses || {};
    const currentLspCourseData = currentCourseRes?.data?.latestCourses || {};

    const courseData = [
      ...(currentLspCourseData?.courses || []),
      ...(zicopsCourseData?.courses || [])
    ];
    setPageCursor({
      zicops: zicopsCourseData?.pageCursor || null,
      currentLsp: currentLspCourseData?.pageCursor || null
    });

    setCourses(
      courseData
        ?.filter((c) => c?.is_active && c?.is_display)
        ?.filter((c) => {
          if (preferredSubCat)
            return !!activeSubcategories?.find((pref) => pref?.sub_category === c?.sub_category);

          return true;
        })
      // ?.map((c) => ({ ...c, duration: Math.floor(c?.duration / 60) })) || []
    );

    if (searchQuery) {
      const bookmarkDataRes = await loadAndCacheDataAsync(
        GET_USER_BOOKMARKS,
        {
          user_id: userDataGlobal?.userDetails?.id,
          publish_time: time,
          pageCursor: '',
          pageSize: 99999998
        },
        {},
        userClient
      );
      // console.log(bookmarkDataRes?.getUserBookmarks?.bookmarks)
      setBookmarkData({
        isLoading: false,
        bookmarks:
          bookmarkDataRes?.getUserBookmarks?.bookmarks
            ?.map((bm) => {
              const bookmarkCourse = courseData?.find((c) => c?.id === bm?.course_id);
              if (!bookmarkCourse) return null;

              return {
                ...bm,
                course: bookmarkCourse,
                timestamp: bm?.time_stamp,
                courseName: bookmarkCourse?.name,
                title: bm?.name
              };
            })
            ?.filter((bm) => bm) || []
      });
    }
    setIsLoading(false);
  }, [
    router.isReady,
    filters.category,
    filters.subCategory,
    filters.lang,
    filters.type,
    filter,
    searchQuery,
    preferredSubCat ? userDataGlobal?.preferences?.length : 0,
    preferredSubCat
  ]);

  useEffect(() => {
    // if (!courses?.length) return;

    // const _filteredCourses = courses?.filter((course, i) => {
    //   // const nameFilter = course?.name
    //   //   ?.trim()
    //   //   ?.toLowerCase()
    //   //   ?.includes(searchQuery?.trim()?.toLowerCase());
    //   let langFilter = true,
    //     catFilter = true,
    //     subCatFilter = true,
    //     typeFilter = true;

    //   if (filters?.lang)
    //     langFilter = course?.language
    //       ?.map((lang) => lang?.toLowerCase()?.trim())
    //       ?.includes(filters?.lang?.trim()?.toLowerCase());
    //   if (filters?.category)
    //     catFilter = course?.category
    //       ?.trim()
    //       ?.toLowerCase()
    //       ?.includes(filters?.category?.trim()?.toLowerCase());
    //   if (filters?.subCategory)
    //     subCatFilter =
    //       course?.sub_categories?.findIndex((subCat) =>
    //         subCat?.name
    //           ?.trim()
    //           ?.toLowerCase()
    //           ?.includes(filters?.subCategory?.trim()?.toLowerCase())
    //       ) > 0 ||
    //       course?.sub_category
    //         ?.trim()
    //         ?.toLowerCase()
    //         ?.includes(filters?.subCategory?.trim()?.toLowerCase());
    //   if (filters?.type)
    //     typeFilter = course?.type
    //       ?.trim()
    //       ?.toLowerCase()
    //       ?.includes(filters?.type?.trim()?.toLowerCase());

    //   // return nameFilter && langFilter && catFilter && subCatFilter && typeFilter;
    //   return langFilter && catFilter && subCatFilter && typeFilter;
    // });

    // setFilteredCourses(_filteredCourses);
    setFilteredCourses(courses);
    setIsLoading(false);
  }, [courses, filters, searchQuery]);

  // for reloading new courses
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setRefetchData(true);
      }
    }, options);
    if (lastItemRef?.current) observer.observe(lastItemRef?.current);
  }, []);

  useEffect(() => {
    if (refetchData) {
      refetchNextCourses();
      setRefetchData(false);
    }
  }, [refetchData]);

  async function refetchNextCourses() {
    if (!pageCursor?.currentLsp && !pageCursor?.zicops) return;

    const currentLspId = sessionStorage.getItem('lsp_id');
    const zicopsLspId = COMMON_LSPS.zicops;

    const zicopsCourseRes =
      !!pageCursor?.currentLsp && zicopsLspId !== currentLspId
        ? await refetchCourses({ pageCursor: pageCursor?.zicops })
        : {};
    const currentCourseRes = !!pageCursor?.currentLsp
      ? await refetchCourses({ pageCursor: pageCursor?.currentLsp })
      : {};

    const zicopsCourseData = zicopsCourseRes?.data?.latestCourses || {};
    const currentLspCourseData = currentCourseRes?.data?.latestCourses || {};

    const courseData = [...(currentLspCourseData?.courses || []), ...zicopsCourseData?.courses];

    // refetchCourses({ pageCursor: pageCursor }).then(({ data: { latestCourses } }) => {
    console.log('refecth', 'course length', courses.length + courseData?.length);
    setPageCursor({
      zicops: zicopsCourseData?.pageCursor || null,
      currentLsp: currentLspCourseData?.pageCursor || null
    });
    setCourses([...courses, ...courseData]);
    // });

    if (loadCoursesError) return setToastMsg({ type: 'danger', message: 'course load error' });
  }

  function clearAllFilters() {
    setFilters({ lang: null, category: null, subCategory: null, type: null });
  }

  return {
    courses: filteredCourses,
    bookmarkData,
    isLoading,
    lastItemRef,
    filters,
    setFilters,
    clearAllFilters
  };
}
