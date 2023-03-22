import { API_LINKS } from '@/api/api.helper';
import {
  GET_CATS_AND_SUB_CAT_MAIN,
  GET_COURSE,
  GET_COURSE_TOPICS,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_TOPIC_EXAMS,
  queryClient
} from '@/api/Queries';
import {
  ADD_USER_ORGANIZATION_MAP,
  UPDATE_COHORT_MAIN,
  UPDATE_USER,
  UPDATE_USER_COHORT,
  UPDATE_USER_LEARNINGSPACE_MAP,
  UPDATE_USER_ORGANIZATION_MAP,
  UPDATE_USER_ROLE,
  userClient,
  USER_LOGIN
} from '@/api/UserMutations';
import {
  GET_COHORT_USERS,
  GET_ORGANIZATIONS_DETAILS,
  GET_USER_COURSE_MAPS,
  GET_USER_COURSE_PROGRESS,
  GET_USER_DETAIL,
  GET_USER_LEARNINGSPACES_DETAILS,
  GET_USER_LSP_MAP_BY_LSPID,
  GET_USER_LSP_ROLES,
  GET_USER_PREFERENCES,
  GET_USER_PREFERENCES_DETAILS,
  userQueryClient
} from '@/api/UserQueries';
import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import { CatSubCatAtom, FeatureFlagsAtom, UserDataAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import {
  DisabledUserAtom,
  getUserObject,
  InviteUserAtom,
  IsUpdatedAtom,
  UsersOrganizationAtom,
  UserStateAtom
} from '@/state/atoms/users.atom';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength
} from 'libphonenumber-js';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loadAndCacheDataAsync, loadQueryDataAsync } from './api.helper';
import { getCurrentEpochTime } from './common.helper';
import {
  COMMON_LSPS,
  COURSE_MAP_STATUS,
  COURSE_STATUS,
  COURSE_TOPIC_STATUS,
  USER_LSP_ROLE,
  USER_MAP_STATUS
} from './constants.helper';
import { getUserData } from './loggeduser.helper';
import { getLspDetails } from './orgdata.helper';
import { parseJson } from './utils.helper';

export function useHandleCatSubCat(selectedCategory) {
  const [catSubCatGlobal, setCatSubCatGlobal] = useRecoilState(CatSubCatAtom);
  const [refetch, setRefetch] = useState(true);
  const [catSubCat, setCatSubCat] = useState({
    cat: [],
    subCat: [],
    allSubCat: [],
    subCatGrp: {},
    isFiltered: null,
    isDataLoaded: null
  });
  // this will have the whole cat object not just id
  const [activeCatId, setActiveCatId] = useState(null);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);

  useEffect(async () => {
    if (!refetch) return;
    // console.log(catSubCat?.subCatGrp);
    // if (Object.keys(catSubCat?.subCatGrp || {})?.length) return setCatSubCatState(catSubCat);
    // console.log('fetch');

    const _lspId = sessionStorage?.getItem('lsp_id');
    const zicopsLsp = COMMON_LSPS.zicops;
    const loadDataFunction = isDev ? loadAndCacheDataAsync : loadQueryDataAsync;
    const zicopsLspData = loadDataFunction(GET_CATS_AND_SUB_CAT_MAIN, {
      lsp_ids: [zicopsLsp]
    });

    let currentLspData = null;
    if (_lspId !== zicopsLsp) {
      currentLspData = loadDataFunction(GET_CATS_AND_SUB_CAT_MAIN, {
        lsp_ids: [_lspId]
      });
    }
    // zicops lsp cat subcat
    const zicopsCats =
      (await zicopsLspData)?.allCatMain?.map((c) => ({ ...c, LspId: zicopsLsp })) || [];
    const zicopsSubCats =
      (await zicopsLspData)?.allSubCatMain?.map((c) => ({ ...c, LspId: zicopsLsp })) || [];

    // current lsp cat subcat
    const currentLspCats =
      (await currentLspData)?.allCatMain?.map((c) => ({ ...c, LspId: _lspId })) || [];
    const currentLspSubCats =
      (await currentLspData)?.allSubCatMain?.map((c) => ({ ...c, LspId: _lspId })) || [];

    // merging both lsp cat subcat
    const catAndSubCatRes = { allSubCatMain: [], allCatMain: [] };
    catAndSubCatRes.allCatMain.push(...[...zicopsCats, ...currentLspCats]);
    catAndSubCatRes.allSubCatMain.push(...[...zicopsSubCats, ...currentLspSubCats]);

    const _subCatGrp = {};
    const allSubCat = catAndSubCatRes?.allSubCatMain?.map((subCat) => {
      return { ...subCat, value: subCat?.Name, label: subCat?.Name };
    });
    const _cat = catAndSubCatRes?.allCatMain?.map((cat) => {
      if (!_subCatGrp[cat?.id]) _subCatGrp[cat?.id] = { cat: cat, subCat: [] };
      _subCatGrp[cat?.id].subCat.push(...allSubCat?.filter((subCat) => subCat?.CatId === cat?.id));

      return { ...cat, value: cat?.Name, label: cat?.Name };
    });
    let _subCat = allSubCat;

    if (!!selectedCategory) {
      const cat = catAndSubCatRes?.allCatMain?.find((cat) => cat?.Name === selectedCategory);
      _subCat = allSubCat?.filter((subCat) => subCat?.CatId === cat?.id);
    }

    setCatSubCat({
      ...catSubCat,
      cat: _cat,
      subCat: _subCat,
      allSubCat: allSubCat,
      subCatGrp: _subCatGrp,
      isFiltered: allSubCat?.length !== _subCat?.length,
      isDataLoaded: true
    });
    setRefetch(null);
  }, [refetch]);

  useEffect(() => {
    if (catSubCat?.isFiltered || !catSubCat?.allSubCat?.length) return;
    let allSubCat = catSubCat?.allSubCat;
    let _subCat = catSubCat?.allSubCat;
    if (selectedCategory) {
      const cat = catSubCat?.cat?.find((cat) => cat?.Name === selectedCategory);
      _subCat = catSubCat?.subCat?.filter((subCat) => subCat?.CatId === cat?.id);
    }

    setCatSubCat({
      ...catSubCat,
      subCat: _subCat,
      isFiltered: allSubCat?.length !== _subCat?.length
    });
  }, [selectedCategory, catSubCat?.isFiltered]);

  useEffect(() => {
    const allSubCat = catSubCat?.allSubCat;
    let _subCat = allSubCat;

    if (activeCatId?.id) {
      _subCat = allSubCat?.filter((subCat) => subCat?.CatId === activeCatId?.id);
    }

    setCatSubCat({ ...catSubCat, subCat: _subCat });
  }, [activeCatId]);

  useEffect(() => {
    // console.log(catSubCatState);
    setCatSubCatGlobal(catSubCat);
  }, [catSubCat]);

  return { catSubCat, activeCatId, setActiveCatId, setRefetch };
}

// export default function useHandleUserDetails() {
//   const [updateAbout, { error: createError }] = useMutation(UPDATE_USER, {
//     client: userClient
//   });

//   //recoil states
//   const userDataAbout = useRecoilValue(UserStateAtom);

// const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

//   // local state
//   const [userAboutData, setUserAboutData] = useState(getUserObject());

//   // setting up local states
//   useEffect(() => {
//     setUserAboutData(getUserObject(userDataAbout));

//   }, [userData]);

//   async function updateAboutUser() {
//     const sendUserData = {
//     id: userAboutData?.id,
//       first_name: userAboutData?.first_name,
//       last_name: userAboutData?.last_name,

//       status: userAboutData?.status,
//       role: userAboutData?.role || 'Learner',
//       email: userAboutData?.email,
//       phone: userAboutData?.phone,
//       photo_url: userAboutData?.photo_url || null,
//       Photo: userAboutData?.photo || null,
//       gender: userAboutData?.gender,

//       is_verified: true,
//       is_active: true,

//       created_by: userAboutData?.created_by || 'Zicops',
//       updated_by: userAboutData?.updated_by || 'Zicops'
//     };

//     console.log(sendUserData, 'updateAboutUser');

//     let isError = false;
//     const res = await updateAbout({ variables: sendUserData }).catch((err) => {
//       console.log(err);
//       isError = !!err;
//       return setToastMsg({ type: 'danger', message: 'Update User Error' });
//     });

//     console.log(res);
//   }

//   return { updateAboutUser };
// }

//added common hook for userCourse progress
export default function useUserCourseData() {
  const [userDataGlobal, setUserDataGlobal] = useRecoilState(UserDataAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [userLogin, { loading: loginLoading, error: loginError }] = useMutation(USER_LOGIN, {
    client: userClient
  });

  async function getUserCourseData(pageSize = 999999999, userId = null) {
    const { id } = getUserData();
    const user_lsp_id = sessionStorage?.getItem('user_lsp_id');
    let currentUserId = !!userId ? userId : id;
    if (!currentUserId) return;
    // return setToastMsg({
    //   type: 'danger',
    //   message: 'Need to provide user id for course progress!'
    // });

    const assignedCoursesRes = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS,
      {
        user_id: currentUserId,
        publish_time: getCurrentEpochTime(),
        pageCursor: '',
        pageSize: pageSize
      },
      {},
      userClient
    );

    if (assignedCoursesRes?.error)
      return setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });

    const _assignedCourses = assignedCoursesRes?.getUserCourseMaps?.user_courses?.filter(
      (course) => course?.course_status?.toLowerCase() !== COURSE_MAP_STATUS?.disable
    );

    const currentLspId = sessionStorage.getItem('lsp_id');
    const zicopsLspId = COMMON_LSPS.zicops;

    const currentLspCourses = _assignedCourses?.filter((courseMap) =>
      [currentLspId, zicopsLspId]?.includes(courseMap?.lsp_id)
    );

    const assignedCoursesToUser = currentLspCourses;

    const userCourseId = [];
    const courseIdArr = [];

    let totalSelfCourseCount = 0;

    const allAssignedCourses = [];
    for (let i = 0; i < assignedCoursesToUser?.length; i++) {
      const courseMap = assignedCoursesToUser[i];
      // const mapId = courseMap?.user_course_id;
      // const course_id = courseMap?.course_id;
      userCourseId.push(courseMap?.user_course_id);
      courseIdArr.push(courseMap?.course_id);
    }

    // if (course_id === '') continue;
    const courseProgressRes = await loadQueryDataAsync(
      GET_USER_COURSE_PROGRESS,
      { userId: currentUserId, userCourseId: userCourseId },
      {},
      userClient
    );

    // load all courses details
    const courseRes = await loadAndCacheDataAsync(GET_COURSE, {
      course_id: courseIdArr
    });
    if (courseRes?.error) {
      setToastMsg({ type: 'danger', message: 'Course Load Error' });
      return;
    }
    const allCourseDetails = courseRes?.getCourse;

    if (courseProgressRes?.error) {
      setToastMsg({ type: 'danger', message: 'Course Progress Load Error' });
      return;
    }

    courseProgressRes?.getUserCourseProgressByMapId?.map((cpByMapId) => {});

    const coursesMeta = [];
    assignedCoursesToUser?.forEach((courseMap, i) => {
      const data = courseProgressRes?.getUserCourseProgressByMapId?.filter(
        (cpByMapId) => cpByMapId?.user_course_id === courseMap?.user_course_id
      );
      const courseDetails = allCourseDetails?.find((c) => c?.id === courseMap?.course_id) || {};
      coursesMeta.push({ ...courseMap, ...courseDetails, courseProgres: [...data] });
    });

    let userCourseArray = [];

    for (let i = 0; i < coursesMeta?.length; i++) {
      const _courseData = coursesMeta[i];

      let topicsCompleted = 0;
      let topicsStarted = 0;
      let userProgressArr = _courseData?.courseProgres;
      // loop through each topic and update the variable for getting the course progress status
      userProgressArr?.map((topic) => {
        if (topic?.status !== COURSE_TOPIC_STATUS.assign) ++topicsStarted;
        if (topic?.status === COURSE_TOPIC_STATUS.completed) ++topicsCompleted;
      });

      const courseProgress = userProgressArr?.length
        ? Math.floor((topicsStarted * 100) / userProgressArr?.length)
        : 0;

      let added_by = parseJson(_courseData?.added_by)?.role || _courseData?.added_by;

      if (added_by?.toLowerCase() === 'self') ++totalSelfCourseCount;

      const courseDuraton = +_courseData?.duration;
      const progressPercent = userProgressArr?.length ? courseProgress : '0';
      const completedPercent = userProgressArr?.length
        ? Math.floor((topicsCompleted * 100) / userProgressArr?.length)
        : 0;

      if (_courseData?.status !== COURSE_STATUS.publish) continue;

      let completedDate = 0;
      if (topicsCompleted === userProgressArr?.length)
        userProgressArr?.forEach((courseProgress) => {
          if (courseProgress?.updated_at > completedDate) {
            completedDate = courseProgress?.updated_at;
          }
        });

      userCourseArray.push({
        ..._courseData,
        //added same as created_at because if it might be used somewhere else so ....(dont want to break stuffs)
        addedOn: moment.unix(_courseData?.created_at).format('DD/MM/YYYY'),
        created_at: moment.unix(_courseData?.created_at).format('DD/MM/YYYY'),
        expected_completion: moment.unix(_courseData?.end_date).format('D MMM YYYY'),
        timeLeft: courseDuraton - (courseDuraton * (+completedPercent || 0)) / 100,
        added_by: added_by,
        isCourseCompleted:
          topicsCompleted === 0 ? false : topicsCompleted === userProgressArr?.length,
        isCourseStarted: topicsStarted > 0,
        completedPercentage: completedPercent,
        topicsStartedPercentage: progressPercent,
        scheduleDate: _courseData?.end_date,
        dataType: 'course',
        completedOn: !!completedDate ? moment.unix(completedDate).format('D MMM YYYY') : 'Not Valid'
        // remove this value or below value
        // completedPercentage: progressPercent,
        // course completed percentage replace this with above value
        // topic started percentage (used for home page for now)
        // userProgressArr?.length
        //   ? Math.floor((topicsStarted * 100) / userProgressArr?.length)
        //   : 0
      });
    }

    const _userCourses = userCourseArray?.filter((course) => course?.name?.length);
    // for (let i = 0; i < courseProgressRes?.getUserCourseProgressByMapId?.length; i++) {
    // }
    // const userProgressArr = courseProgressRes?.getUserCourseProgressByMapId;

    // if (!userProgressArr?.length) continue;

    // let topicsStarted = 0;
    // userProgressArr?.map((topic) => {
    //   if (topic?.status !== 'not-started') ++topicsStarted;
    // });

    // const courseProgress = userProgressArr?.length
    //   ? Math.floor((topicsStarted * 100) / userProgressArr?.length)
    //   : 0;

    // const courseRes = await loadAndCacheDataAsync(GET_COURSE, { course_id: course_id });
    // if (courseRes?.error) {
    //   setToastMsg({ type: 'danger', message: 'Course Load Error' });
    //   continue;
    // }

    // let added_by =
    //   parseJson(assignedCoursesToUser[i]?.added_by)?.role || assignedCoursesToUser[i]?.added_by;

    // // const added_by = JSON.parse(assignedCoursesToUser[i]?.added_by);
    // const courseDuraton = +courseRes?.getCourse?.duration / (60*60);
    // const progressPercent = userProgressArr?.length ? courseProgress : '0';
    // allAssignedCourses.push({
    //   ...courseRes?.getCourse,
    //   ...assignedCoursesToUser[i],
    //   //added same as created_at because if it might be used somewhere else so ....(dont want to break stuffs)
    //   addedOn: moment.unix(assignedCoursesToUser[i]?.created_at).format('DD/MM/YYYY'),
    //   completedPercentage: progressPercent,
    //   created_at: moment.unix(assignedCoursesToUser[i]?.created_at).format('DD/MM/YYYY'),
    //   expected_completion: moment.unix(assignedCoursesToUser[i]?.end_date).format('DD/MM/YYYY'),
    //   timeLeft: (courseDuraton - (courseDuraton * (+progressPercent || 0)) / 100).toFixed(2),
    //   added_by: added_by,
    // });
    // }
    // end of for loop

    // to filter duplicate  assigned courses if any
    const userCourses = _userCourses.filter(
      (v, i, a) => a.findIndex((v2) => v2?.id === v?.id) === i
    );

    setUserOrgData((prevValue) => ({ ...prevValue, self_course_count: totalSelfCourseCount }));
    if (!userCourses?.length)
      return setToastMsg({ type: 'info', message: 'No courses in your learning folder' });

    return userCourses;
  }

  async function getTopics(courseId = null) {
    //return an empty array in case of error

    if (!courseId) return [];
    const topicRes = await loadQueryDataAsync(
      GET_COURSE_TOPICS,
      { course_id: courseId },
      {},
      queryClient
    );
    if (topicRes?.error) return [];
    if (!topicRes?.getTopics?.length) return [];
    return [...topicRes?.getTopics];
  }

  async function getTopicExams(topicId = null) {
    if (!topicId) return [];
    const examRes = await loadQueryDataAsync(
      GET_TOPIC_EXAMS,
      { topic_id: topicId },
      {},
      queryClient
    );
    if (examRes?.error) return [];
    if (!examRes?.getTopicExams?.length) return [];
    return [...examRes?.getTopicExams];
  }

  async function getExamsMeta(examIds = []) {
    if (!examIds?.length) return;
    const examMetaRes = await loadQueryDataAsync(
      GET_EXAM_META,
      { exam_ids: examIds },
      {},
      queryClient
    );
    if (examMetaRes?.error) return [];
    if (!examMetaRes?.getExamsMeta?.length) return [];
    return [...examMetaRes?.getExamsMeta];
  }

  async function getExamSchedule(examId = null) {
    if (!examId) return [];
    const examSchedule = await loadQueryDataAsync(
      GET_EXAM_SCHEDULE,
      { exam_id: examId },
      {},
      queryClient
    );
    if (examSchedule?.error) return [];
    if (!examSchedule?.getExamSchedule?.length) return [];
    return [...examSchedule?.getExamSchedule];
  }

  async function getScheduleExams(courseData = []) {
    const { id } = getUserData();
    const user_lsp_id = sessionStorage?.getItem('user_lsp_id');
    let currentUserId = id;
    if (!currentUserId) return;

    const _assignedCourses = courseData;

    let topicCourseMap = [];

    if (!_assignedCourses?.length) return [];
    let assessmentTopics = [];
    // need later for courses down exam
    let assessmentCourses = [];
    for (let i = 0; i < _assignedCourses?.length; i++) {
      const courseTopics = await getTopics(_assignedCourses[i]?.id);
      if (!courseTopics?.length) continue;
      const filteredTopics = courseTopics?.filter(
        (topic) => topic?.type?.toLowerCase() === 'assessment'
      );
      if (!filteredTopics?.length) continue;
      assessmentTopics = assessmentTopics.concat(filteredTopics);
      assessmentCourses = assessmentCourses.concat(_assignedCourses[i]);
      // resultData.push({courseName:_courseData[i]?.name , topics: filteredTopics});
      for (let j = 0; j < filteredTopics?.length; j++) {
        if (!_assignedCourses[i]?.id?.length) continue;
        topicCourseMap.push({
          [`${filteredTopics[j]?.id}`]: {
            courseName: _assignedCourses[i]?.name,
            topicId: filteredTopics[j]?.id,
            courseId: _assignedCourses[i]?.id,
            image: _assignedCourses[i]?.image,
            topicDescription: filteredTopics[j]?.description
          }
        });
      }
    }

    // console.log(assessmentTopics,'assasas',topicDataData)
    if (!assessmentTopics?.length) return setLoading(false);

    const examCourseMap = [];

    // load topic exams
    let exams = [];
    for (let i = 0; i < assessmentTopics?.length; i++) {
      const topicExams = await getTopicExams(assessmentTopics[i]?.id);
      if (!topicExams?.length) continue;
      examCourseMap.push({
        [`${topicExams[0]?.examId}`]: {
          courseName: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.courseName,
          examId: topicExams[0]?.examId,
          topicId: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.topicId,
          courseId: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.courseId,
          image: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.image,
          topicDescription: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.topicDescription
        }
      });
      exams = exams.concat(topicExams);
    }

    //loop to take exam related data in one piece

    if (!exams?.length) return setLoading(false);

    // to get exam metas
    const examsIds = exams?.map((exam) => exam?.examId);
    const examMetas = await getExamsMeta(examsIds);

    let scheduleExams = [];

    examMetas?.forEach((exam, index) => {
      if (exam?.ScheduleType?.toLowerCase() === SCHEDULE_TYPE[0]) {
        scheduleExams.push({ ...exam, ...examCourseMap[index]?.[`${exam?.id}`] });
        return;
      }
    });

    if (scheduleExams.length) {
      for (let i = 0; i < scheduleExams?.length; i++) {
        const schedule = await getExamSchedule(scheduleExams[i]?.id);
        if (!schedule?.length) continue;
        scheduleExams[i] = { ...scheduleExams[i], ...schedule[0] };
      }

      const _scheduleExams = scheduleExams?.map((exam) => {
        let end = !!parseInt(exam?.End)
          ? exam?.End
          : parseInt(exam?.Start) + parseInt(exam?.BufferTime) * 60;
        return {
          ...exam,
          description: exam?.topicDescription,
          name: exam?.Name,
          endTime: end,
          scheduleDate: exam?.Start,
          dataType: 'exam'
        };
      });
      return _scheduleExams;
    } else return [];
  }

  async function getUserPreferences() {
    // if(!userLspId) setToastMsg({type:'danger' , message:'Need to provide user lsp id^!'});
    // console.log('user pref called')
    const userData = getUserData();
    let userLspData = parseJson(sessionStorage?.getItem('lspData'));
    const lspId = sessionStorage.getItem('lsp_id');
    if (userData === 'User Data Not Found' && !userLspData) return;
    const { id } = getUserData();
    if (!userLspData?.user_lsp_id) {
      // console.log('userLspCalled 3')

      if (!lspId) return;
      const userLearningSpaceData = await loadQueryDataAsync(
        GET_USER_LEARNINGSPACES_DETAILS,
        { user_id: id, lsp_id: lspId },
        {},
        userQueryClient
      );
      if (userLearningSpaceData?.error)
        return setToastMsg({ type: 'danger', message: 'Error while loading user preferences^!' });
      //temporary solution only valid for one lsp...need to change later!
      // if (userLearningSpaceData?.getUserLspByLspId)
      //   sessionStorage?.setItem(
      //     'lspData',
      //     JSON.stringify(userLearningSpaceData?.getUserLspByLspId)
      //   );
      // console.log(userLearningSpaceData?.getUserLspByLspId?.user_lsp_id,'lsp')
      // setUserOrgData(
      //   getUserOrgObject({ user_lsp_id: userLearningSpaceData?.getUserLspByLspId?.user_lsp_id })
      // );
    }
    // const { user_lsp_id } = parseJson(sessionStorage?.getItem('lspData'));
    const user_lsp_id = sessionStorage?.getItem('user_lsp_id');

    // if (!user_lsp_id) setToastMsg({ type: 'danger', message: 'Need to provide user lsp id!' });

    if (!user_lsp_id) return;

    const resPref = await loadQueryDataAsync(
      GET_USER_PREFERENCES,
      { user_id: id },
      {},
      userQueryClient
    );

    const zicopsLsp = COMMON_LSPS.zicops;
    const zicopsCatSubCatData =
      zicopsLsp !== lspId
        ? await loadQueryDataAsync(GET_CATS_AND_SUB_CAT_MAIN, { lsp_ids: [zicopsLsp] })
        : { allCatMain: [], allSubCatMain: [] };
    const currentCatSubCatData = await loadQueryDataAsync(GET_CATS_AND_SUB_CAT_MAIN, {
      lsp_ids: [lspId]
    });

    const catAndSubCatRes = {
      allCatMain: [
        ...(zicopsCatSubCatData?.allCatMain || []),
        ...(currentCatSubCatData?.allCatMain || [])
      ],
      allSubCatMain: [
        ...(zicopsCatSubCatData?.allSubCatMain || []),
        ...(currentCatSubCatData?.allSubCatMain || [])
      ]
    };

    if (!resPref?.getUserPreferences?.length) return [];

    const _subCatGrp = {};
    const allSubCat = catAndSubCatRes?.allSubCatMain?.map((subCat) => {
      return { ...subCat, value: subCat?.Name, label: subCat?.Name };
    });
    catAndSubCatRes?.allCatMain?.forEach((cat) => {
      if (!_subCatGrp[cat?.id]) _subCatGrp[cat?.id] = { cat: cat, subCat: [] };
      _subCatGrp[cat?.id].subCat.push(...allSubCat?.filter((subCat) => subCat?.CatId === cat?.id));

      return { ...cat, value: cat?.Name, label: cat?.Name };
    });

    //    subCatGrp: _subCatGrp,
    // console.log(resPref,'prefdata');

    if (resPref?.error)
      return setToastMsg({ type: 'danger', message: 'Error while loading user preferences^!' });

    const data = resPref?.getUserPreferences;

    // let uLspId = user_lsp_id ? user_lsp_id : userLspId;
    // console.log(user_lsp_id, uLspId);
    // console.log(data);
    const prefData = data?.filter((item) => {
      return item?.user_lsp_id === user_lsp_id && item?.is_active;
    });

    const prefArr = [];
    for (let i = 0; i < prefData?.length; i++) {
      const pref = prefData[i];
      const subCatData = allSubCat?.find((s) => s?.Name === pref?.sub_category);

      prefArr.push({
        ...pref,
        subCatData,
        catData: _subCatGrp?.[subCatData?.CatId]?.cat
      });

      //   for (let j = 0; j < subCategories?.length; j++) {
      //     if (prefData[i].sub_category === subCategories[j].name) {
      //       prefArr.push({
      //         ...subCategories[j],
      //         user_preference_id: prefData[i]?.user_preference_id,
      //         sub_category: subCategories[j].name,
      //         user_id: prefData[i]?.user_id,
      //         user_lsp_id: prefData[i]?.user_lsp_id,
      //         is_base: prefData[i]?.is_base,
      //         is_active: prefData[i]?.is_active
      //       });
      //     }
      //   }
    }

    const basePreference = prefData?.filter((item) => item?.is_base && item?.is_active);
    // console.log(basePreference,'base');
    const preferences = prefData?.filter((item) => item?.is_active && !item?.is_base);
    // console.log('preferences', preferences);
    setUserOrgData((prevValue) => ({
      ...prevValue,
      sub_category: basePreference?.[0]?.sub_category,
      sub_categories: preferences
    }));
    setUserDataGlobal({ ...userDataGlobal, preferences: prefArr, isPrefAdded: true });
    return prefArr;
  }

  async function getCohortUserData(cohortId = null, cohortDetails = false) {
    if (!cohortId) return;
    const sendData = {
      cohort_id: cohortId,
      publish_time: getCurrentEpochTime(),
      pageCursor: '',
      pageSize: 99999
    };
    const resUsers = await loadQueryDataAsync(
      GET_COHORT_USERS,
      { ...sendData },
      {},
      userQueryClient
    );
    if (!resUsers?.getCohortUsers?.cohorts?.length) return;
    const cohortUsers = resUsers?.getCohortUsers?.cohorts;
    if (cohortDetails) return cohortUsers;
    const cohortUserIds = cohortUsers?.map((item) => item?.user_id);
    const cohortUserData = [];

    const userListData = await loadQueryDataAsync(
      GET_USER_DETAIL,
      { user_id: cohortUserIds },
      {},
      userQueryClient
    );
    // console.log(userListData?.getUserDetails);
    const userList = userListData?.getUserDetails;

    for (let i = 0; i < userList?.length; i++) {
      for (let j = 0; j < cohortUsers.length; j++) {
        if (userList[i]?.id === cohortUsers[j]?.user_id) {
          cohortUserData.push({
            user_id: userList[i]?.id,
            role: cohortUsers[j]?.role,
            name: userList[i]?.first_name
              ? `${userList[i]?.first_name} ${userList[i]?.last_name}`
              : '',
            email: userList[i]?.email,
            first_name: userList[i]?.first_name,
            last_name: userList[i]?.last_name,
            membership_status: cohortUsers[j]?.membership_status,
            photo_url: userList[i]?.photo_url || '',
            joined_on: moment.unix(cohortUsers[j]?.created_at).format('DD/MM/YYYY'),
            ...cohortUsers[j]
          });
          break;
        }
      }
    }
    return cohortUserData;
  }

  async function getUsersForAdmin() {
    if (!userOrgData?.lsp_id?.length) return;
    const resLspUser = await loadQueryDataAsync(
      GET_USER_LSP_MAP_BY_LSPID,
      { lsp_id: userOrgData?.lsp_id, pageCursor: '', Direction: '', pageSize: 1000 },
      {},
      userQueryClient
    );
    if (resLspUser?.error) return { error: 'Error while while loading lsp maps!' };

    const userLspMaps = resLspUser?.getUserLspMapsByLspId?.user_lsp_maps?.filter(
      (user) => !!user?.user_id
    );

    //removing duplicate values
    const users = userLspMaps?.filter(
      (v, i, a) => a?.findIndex((v2) => v2?.user_id === v?.user_id) === i
    );

    const userIds = users?.map((user) => user?.user_id);

    const resUserDetails = await loadQueryDataAsync(
      GET_USER_DETAIL,
      { user_id: userIds },
      {},
      userQueryClient
    );

    if (resUserDetails?.error) return { error: 'Error while while loading user detail!' };

    const userData = resUserDetails?.getUserDetails?.map((item) => ({
      id: item?.id,
      email: item?.email,
      first_name: item?.first_name,
      last_name: item?.last_name,
      status: item?.status,
      role: item?.role,
      full_name: `${item?.first_name} ${item?.last_name}`
    }));

    if (!userData?.length) return { error: 'No users found!' };
    return userData;
  }

  const [getOrgDetails] = useLazyQuery(GET_ORGANIZATIONS_DETAILS, {
    client: userClient
  });

  const OrgDetails = async (loadLsp = false) => {
    const orgId = sessionStorage.getItem('org_id');
    const lspId = sessionStorage.getItem('lsp_id');
    if (!orgId) return;
    const res = await getOrgDetails({
      variables: { org_ids: orgId }
    }).catch((err) => {
      console.error(err);
    });
    setUserOrgData((prevValue) => ({
      ...prevValue,
      logo_url: res?.data?.getOrganizations?.[0]?.logo_url || ''
    }));
    if (loadLsp) {
      const lspData = await getLspDetails([lspId]);

      setUserOrgData((prev) => ({
        ...prev,
        lsp_logo_url: lspData?.getLearningSpaceDetails?.[0]?.logo_url || ''
      }));
    }
  };

  async function getUserLspRoleLatest(userId = null, userLspId = null) {
    if (!userLspId || !userId) return;
    //this function gets users lsp role and return the latest one
    const lspRoleArr = await loadAndCacheDataAsync(
      GET_USER_LSP_ROLES,
      { user_id: userId, user_lsp_ids: [userLspId] },
      {},
      userQueryClient
    );
    const lspRoles = structuredClone(lspRoleArr?.getUserLspRoles);
    const _isVendor = lspRoles?.filter((lsp) => lsp?.role === USER_LSP_ROLE.vendor)?.length > 0;
    let userLspRole = 'learner';
    if (_isVendor) {
      userLspRole = USER_LSP_ROLE.vendor;
      return userLspRole;
    }
    if (lspRoles?.length > 1) {
      let latestUpdatedRole = lspRoles?.sort((a, b) => a?.updated_at - b?.updated_at);
      userLspRole = latestUpdatedRole?.pop()?.role;
    } else {
      userLspRole = lspRoles?.[0]?.role ?? 'learner';
    }
    return userLspRole;
  }

  async function getOrgByDomain() {
    if (!API_LINKS?.getOrg?.split('/')?.[0]) return {};
    const data = await fetch(API_LINKS?.getOrg);
    const orgData = await data?.json();
    return orgData?.data;
  }

  async function getLoggedUserInfo() {
    if (!sessionStorage?.getItem('tokenF') && !sessionStorage.getItem('loggedUser')) return;
    if (userDataGlobal?.id) return;
    let isError = false;

    const res = {};
    for (let i = 0; i < 4; i++) {
      let _res = await userLogin().catch((err) => {
        console.log(err);
        isError = !!err;
      });
      if (_res?.data?.login?.first_name) {
        res.data = _res?.data;
        break;
      }
    }

    if (isError) return {};

    return res?.data?.login || getUserObject();
  }

  return {
    getUserCourseData,
    getUserPreferences,
    getCohortUserData,
    getUsersForAdmin,
    getScheduleExams,
    OrgDetails,
    getUserLspRoleLatest,
    getOrgByDomain,
    getLoggedUserInfo
  };
}

export function getUserAboutObject(data = {}) {
  return {
    id: data?.id || null,
    user_id: data?.user_id || null,
    user_lsp_id: data?.user_lsp_id || null,
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
    status: data?.status || null,
    role: data?.role || 'Learner',

    //for now dont update email
    email: data?.email || '',
    phone: data?.phone || '',
    phoneCode: data?.phoneCode || 'IN',
    photo_url: data?.photo_url || null,
    Photo: data?.Photo || null,
    gender: data?.gender || null,

    //only do isVerified true when users do its basic account setup
    is_verified: data?.is_verified || false,
    is_active: data?.is_active || true,
    created_by: data?.created_by || '',
    updated_by: data?.updated_by || '',
    created_at: data?.created_at || null,
    updated_at: data?.updated_at || null
  };
}

export function useUpdateUserAboutData() {
  //have to delete updateAbout later
  const [updateAbout, { error: updateAboutErr }] = useMutation(UPDATE_USER, {
    client: userClient
  });

  // recoil
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [userDataAbout, setUserDataAbout] = useRecoilState(UserStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [updateLsp, { error: createLspError }] = useMutation(UPDATE_USER_LEARNINGSPACE_MAP, {
    client: userClient
  });
  const [updateRole, { error: createRoleError }] = useMutation(UPDATE_USER_ROLE, {
    client: userClient
  });

  // local state
  const [multiUserArr, setMultiUserArr] = useState([]);
  const [newUserAboutData, setNewUserAboutData] = useState(getUserAboutObject({ is_active: true }));
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [disabledUserList, setDisabledUserList] = useRecoilState(DisabledUserAtom);
  const [invitedUsers, setInvitedUsers] = useRecoilState(InviteUserAtom);
  const [isConfirmPopUpDisable, setIsConfirmPopUpDisable] = useState(false);
  const [getPrefData, { loading, error, data }] = useLazyQuery(GET_USER_PREFERENCES_DETAILS, {
    client: userQueryClient
  });

  useEffect(() => {
    let isPhValid = false;

    if (newUserAboutData?.phone?.length > 10) {
      isPhValid =
        isPossiblePhoneNumber(
          `${newUserAboutData?.phone || 123456}`,
          newUserAboutData?.phoneCode
        ) &&
        isValidPhoneNumber(`${newUserAboutData?.phone || 123456}`, newUserAboutData?.phoneCode) &&
        !validatePhoneNumberLength(
          `${newUserAboutData?.phone || 123456}`,
          newUserAboutData?.phoneCode
        );
    }

    setIsFormCompleted(
      newUserAboutData?.first_name &&
        newUserAboutData?.last_name &&
        newUserAboutData?.role &&
        newUserAboutData?.email &&
        isPhValid &&
        newUserAboutData?.gender
    );
  }, [newUserAboutData]);

  async function updateUserLsp(userData = null) {
    userData = userData ? userData : newUserAboutData;

    if (userData?.status?.toLowerCase() === USER_MAP_STATUS?.activate?.toLowerCase()) {
      const res = await getPrefData({
        variables: { user_id: userData?.id, user_lsp_id: userData?.user_lsp_id }
      })?.catch((err) => console.log(err));
      if (!res?.data?.getUserPreferenceForLsp) userData.status = ' ';
    }

    const sendLspData = {
      user_id: userData?.id,
      user_lsp_id: userData?.user_lsp_id,
      lsp_id: userOrgData?.lsp_id || sessionStorage.getItem('lsp_id'),
      status: userData?.status
    };

    let isError = false;
    const res = await updateLsp({ variables: sendLspData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User LSP Error' });
    });

    if (sendLspData?.status === '') {
      setInvitedUsers((prev) => [...prev, userData?.user_id]);
    }

    if (!isError)
      setNewUserAboutData((prev) => ({ ...prev, status: userData.status }));
    return !isError;
  }

  async function updateUserRole(userData = null) {
    const userRoleData = userData ? userData?.roleData : newUserAboutData;

    if (!userData?.roleData?.user_role_id) return false;

    // console.log(userData?.roleData, 'sifhishfi');
    // return ;
    const sendRoleData = {
      user_role_id: userRoleData?.user_role_id,
      user_id: userData?.id,
      user_lsp_id: userData?.user_lsp_id,
      role: userData?.updateTo,
      is_active: true
    };

    let isError = false;
    const res = await updateRole({ variables: sendRoleData }).catch((err) => {
      isError = !!err;
    });

    // console.log(res,'update role data');
    if (isError) return isError;
    return res?.data?.updateUserRole;
  }

  async function updateAboutUser(userData = null) {
    userData = userData ? userData : newUserAboutData;
    const sendUserData = {
      id: userData?.id,
      first_name: userData?.first_name,
      last_name: userData?.last_name,

      status: userData?.status || 'Active',
      role: userData?.role || 'Learner',
      email: userData?.email,
      phone: userData?.phone,

      gender: userData?.gender,
      photo_url: userData?.photo_url,

      is_verified: true,
      is_active: userData?.is_active || true,

      created_by: userData?.created_by || 'Zicops',
      updated_by: userData?.updated_by || 'Zicops'
    };

    if (userData?.Photo) sendUserData.Photo = userData?.Photo;
    // if (userAboutData?.photo_url) sendUserData.photo_url = userAboutData?.photo_url;

    console.log(sendUserData, 'updateAboutUser');

    let isError = false;
    const res = await updateAbout({ variables: sendUserData }).catch((err) => {
      console.log(err);
      isError = !!err;
    });

    if (isError || updateAboutErr)
      return setToastMsg({ type: 'danger', message: `Failed To Disable ${sendUserData?.email}` });

    const data = res?.data?.updateUser;
    const _userData = { ...userData, ...data };
    // if (data?.photo_url.length > 0) data.photo_url = userAboutData?.photo_url;
    setUserDataAbout(_userData);
    sessionStorage.setItem('loggedUser', JSON.stringify(_userData));
  }

  async function disableMultiUser(users = []) {
    if (!users?.length) return;
    let userIds = [];
    let isError = false;
    for (let i = 0; i < users?.length; i++) {
      const user = users[i];
      if (user?.id === userDataAbout?.id) continue;
      if (disabledUserList?.includes(user?.id)) continue;
      if (user?.lsp_status?.toLowerCase() !== USER_MAP_STATUS?.disable?.toLowerCase()) {
        const userSendLspData = {
          id: user?.id,
          user_lsp_id: user?.user_lsp_id,
          status: USER_MAP_STATUS?.disable
        };
        const isDisable = await updateUserLsp(userSendLspData);
        if (!isDisable) {
          isError = true;
          break;
        }
        userIds?.push(user?.id);
      }
    }
    if (!isError) {
      if (!userIds?.length) return !isError;
      setDisabledUserList((prev) => [...prev, ...userIds]);
    }
    return !isError;
  }
  async function updateMultiUserAbout() {
    for (let i = 0; i < multiUserArr.length; i++) {
      const user = multiUserArr[i];
      await updateAboutUser(user);
    }
  }

  async function resetPassword(email = '') {
    if (email === '' || !email) return false;
    const sendData = {
      email: email
    };

    const data = await fetch(API_LINKS?.resetPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    });

    // console.log(data?.status, 'status');
    let isError = false;
    if (!data?.status === 200) isError = true;
    return !isError;
  }

  async function resetMultiPassword(users = []) {
    const emails = users?.map((user) => user?.email);
    let isError = false;
    if (!emails?.length) return !isError;
    for (let i = 0; i < emails?.length; i++) {
      const isEmailSent = await resetPassword(emails[i]);
      if (!isEmailSent) isError = true;
    }
    return !isError;
  }
  return {
    newUserAboutData,
    setNewUserAboutData,
    multiUserArr,
    setMultiUserArr,
    isFormCompleted,
    updateAboutUser,
    updateMultiUserAbout,
    updateUserLsp,
    updateUserRole,
    disableMultiUser,
    resetPassword,
    isConfirmPopUpDisable,
    resetMultiPassword
  };
}

export function getUserOrgMapObject(data = {}) {
  return {
    user_organization_id: data?.user_organization_id || null,
    user_id: data?.user_id || null,
    user_lsp_id: data?.user_lsp_id || null,

    organization_id: data?.organization_id || null,
    organization_role: data?.organization_role || '',
    employee_id: data?.employee_id || '',

    is_active: data?.is_active || true,
    created_by: data?.created_by || '',
    updated_by: data?.updated_by || '',
    created_at: data?.created_at || '',
    updated_at: data?.updated_at || ''
  };
}

export function useUpdateUserOrgData() {
  //have to delete updateAbout later
  const [updateOrg, { error: updateOrgErr }] = useMutation(UPDATE_USER_ORGANIZATION_MAP, {
    client: userClient
  });

  const [addOrg, { error: createOrgError }] = useMutation(ADD_USER_ORGANIZATION_MAP, {
    client: userClient
  });

  // recoil
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [newUserOrgData, setNewUserOrgData] = useState(getUserOrgMapObject({ is_active: true }));
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  useEffect(() => {
    setIsFormCompleted(newUserOrgData?.organization_role && newUserOrgData?.employee_id);
  }, [newUserOrgData]);

  async function updateUserOrg() {
    const sendUserData = {
      user_organization_id: newUserOrgData?.user_organization_id || null,
      user_id: newUserOrgData?.user_id || null,
      user_lsp_id: newUserOrgData?.user_lsp_id || null,

      organization_id: newUserOrgData?.organization_id || null,
      organization_role: newUserOrgData?.organization_role || '',
      employee_id: newUserOrgData?.employee_id || '',

      is_active: newUserOrgData?.is_active || true
    };

    console.log(sendUserData, 'updateAboutUser');

    let isError = false;
    const res = await updateOrg({ variables: sendUserData }).catch((err) => {
      console.log(err);
      isError = !!err;
    });

    if (isError || updateOrgErr)
      return setToastMsg({ type: 'danger', message: 'Update User Org Error' });

    const data = res?.data?.updateUser;
    const _userData = { ...newUserOrgData, ...data };
    setUserOrgData(_userData);
    sessionStorage.setItem('userAccountSetupData', JSON.stringify(_userData));
    return _userData;
  }

  async function addUserOrg(userData = null) {
    if (!userData) return false;
    let isError = false;
    const res = await addOrg({ variables: userData }).catch((err) => {
      console.log(err);
      isError = !!err;
    });

    if (isError) return setToastMsg({ type: 'danger', message: 'Add User Org Error' });

    const data = res?.data?.addUserOrganizationMap[0];
    const _userData = { ...newUserOrgData, ...data };
    setUserOrgData(_userData);
    return _userData;
  }

  return {
    newUserOrgData,
    setNewUserOrgData,
    updateUserOrg,
    isFormCompleted,
    addUserOrg
  };
}

export function useHandleCohortUsers() {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isUpdated, setIsUpdated] = useRecoilState(IsUpdatedAtom);

  const [updateCohortMain, { error: updateCohortError }] = useMutation(UPDATE_COHORT_MAIN, {
    client: userClient
  });

  const [updateUserCohort, { error: updateError }] = useMutation(UPDATE_USER_COHORT, {
    client: userClient
  });

  async function removeCohortUser(userData = null, cohortData = null, cohortSize = null) {
    const { id } = getUserData();
    if (!userData) return false;
    if (!cohortSize) return false;
    const sendData = {
      user_cohort_id: userData?.user_cohort_id,
      user_id: userData?.user_id,
      user_lsp_id: userData?.user_lsp_id,
      cohort_id: userData?.cohort_id,
      added_by: JSON.stringify({ user_id: id, role: 'Admin' }),
      membership_status: 'Disable',
      role: userData?.role
    };
    // console.log(sendData)
    let isError = false;
    const res = await updateUserCohort({ variables: sendData }).catch((err) => {
      isError = true;
      if (!!err) setToastMsg({ type: 'danger', message: 'Error while removing user' });
    });

    setIsUpdated(true);
    const sendCohortData = {
      cohort_id: cohortData?.cohort_id,
      name: cohortData?.name,
      description: cohortData?.description,
      lsp_id: cohortData?.lsp_id || lspData?.lsp_id,
      code: cohortData?.code,
      status: 'SAVED',
      type: cohortData?.type,
      is_active: true,
      size: cohortSize - 1
    };

    const resCohort = await updateCohortMain({ variables: sendCohortData }).catch((err) => {
      // console.log(err);
      isError = !!err;
    });

    // console.log(res);
    return !isError;
  }

  return { removeCohortUser };
}

// https://stackoverflow.com/a/60907638/13419786
export function useAsync(asyncFn, onSuccess) {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((data) => {
      if (isActive) onSuccess(data);
    });
    return () => {
      isActive = false;
    };
  }, [asyncFn, onSuccess]);
}

// https://usehooks.com/useDebounce/
export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
