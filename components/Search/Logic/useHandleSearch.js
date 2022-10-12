import useUserCourseData from '@/helper/hooks.helper';
import { parseJson } from '@/helper/utils.helper';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
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
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const lastItemRef = useRef(null);

  // state for storing courses data
  const [courses, setCourses] = useState([]);
  const [pageCursor, setPageCursor] = useState(null);
  const [refetchData, setRefetchData] = useState(null);

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
    if (courses?.length) return;

    if (userCourse) {
      setIsLoading(true);
      const userCourseObj = parseJson(userCourse);
      const userCourseData = await getUserCourseData();

      const _allUserCourses = userCourseData?.filter((course) => {
        const isOngoing = course?.completedPercentage > 0 && course?.completedPercentage < 100;
        const isAssigned =
          parseInt(course?.completedPercentage) === 0 || course?.completedPercentage === 100;
        return userCourseObj?.isOngoing ? isOngoing : isAssigned;
      });

      setCourses(
        _allUserCourses?.map((c) => ({ ...c, duration: Math.floor(c?.duration / 60) })) || []
      );
      return;
    }

    const queryVariables = { publish_time: time, pageSize: 999, pageCursor: '', filters: {} };
    if (searchQuery) queryVariables.filters.SearchText = searchQuery;
    if (filters.category) queryVariables.filters.Category = filters.category;
    if (filters.subCategory) queryVariables.filters.SubCategory = filters.subCategory;
    if (filters.type) queryVariables.filters.Type = filters.type;
    if (filters.lang) queryVariables.filters.Language = filters.lang;

    const filterObj = parseJson(filter);
    // console.log(filterObj, filter);
    if (filterObj?.DurationMin) queryVariables.filters.DurationMin = filterObj.DurationMin;
    if (filterObj?.DurationMax) queryVariables.filters.DurationMax = filterObj.DurationMax;
    if (filterObj?.LspId) queryVariables.filters.DurationMax = filterObj.LspId;

    loadCourses({ variables: queryVariables }).then(({ data }) => {
      if (loadCoursesError) return setToastMsg({ type: 'danger', message: 'course load error' });

      const courseData = data?.latestCourses;
      setPageCursor(courseData?.pageCursor || null);
      setCourses(
        courseData?.courses
          ?.filter((c) => c?.is_active && c?.is_display)
          ?.map((c) => ({ ...c, duration: Math.floor(c?.duration / 60) })) || []
      );
    });
  }, [filters, filter, searchQuery]);

  useEffect(() => {
    setIsLoading(courseLoading);
  }, [courseLoading]);

  useEffect(() => {
    if (!courses?.length) return;

    const _filteredCourses = courses?.filter((course, i) => {
      const nameFilter = course?.name
        ?.trim()
        ?.toLowerCase()
        ?.includes(searchQuery?.trim()?.toLowerCase());
      let langFilter = true,
        catFilter = true,
        subCatFilter = true,
        typeFilter = true;

      if (filters?.lang)
        langFilter = course?.language
          ?.map((lang) => lang?.toLowerCase()?.trim())
          ?.includes(filters?.lang?.trim()?.toLowerCase());
      if (filters?.category)
        catFilter = course?.category
          ?.trim()
          ?.toLowerCase()
          ?.includes(filters?.category?.trim()?.toLowerCase());
      if (filters?.subCategory)
        subCatFilter =
          course?.sub_categories?.findIndex((subCat) =>
            subCat?.name
              ?.trim()
              ?.toLowerCase()
              ?.includes(filters?.subCategory?.trim()?.toLowerCase())
          ) > 0 ||
          course?.sub_category
            ?.trim()
            ?.toLowerCase()
            ?.includes(filters?.subCategory?.trim()?.toLowerCase());
      if (filters?.type)
        typeFilter = course?.type
          ?.trim()
          ?.toLowerCase()
          ?.includes(filters?.type?.trim()?.toLowerCase());

      return nameFilter && langFilter && catFilter && subCatFilter && typeFilter;
    });

    setFilteredCourses(_filteredCourses);
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

  function refetchNextCourses() {
    if (!pageCursor) return;
    refetchCourses({ pageCursor: pageCursor }).then(({ data: { latestCourses } }) => {
      console.log('refecth', 'course length', courses.length + latestCourses?.courses?.length);
      setPageCursor(latestCourses?.pageCursor || null);
      setCourses([...courses, ...latestCourses?.courses]);
    });

    if (loadCoursesError) return setToastMsg({ type: 'danger', message: 'course load error' });
  }

  function clearAllFilters() {
    setFilters({ lang: null, category: null, subCategory: null, type: null });
  }

  return {
    courses: filteredCourses,
    isLoading,
    lastItemRef,
    filters,
    setFilters,
    clearAllFilters
  };
}
