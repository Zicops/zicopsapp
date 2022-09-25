import { GET_COURSE } from '@/api/Queries';
import { userClient } from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS, GET_USER_COURSE_PROGRESS, GET_USER_LEARNINGSPACES_DETAILS, GET_USER_PREFERENCES, userQueryClient } from '@/api/UserQueries';
import { subCategories } from '@/components/LoginComp/ProfilePreferences/Logic/profilePreferencesHelper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { getUserOrgObject, UsersOrganizationAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { loadQueryDataAsync } from './api.helper';
import { getCurrentEpochTime } from './common.helper';
import { LEARNING_SPACE_ID } from './constants.helper';
import { getUserData } from './loggeduser.helper';

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
export default function useUserCourseData(){

  const [userOrgData , setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  async function getUserCourseData(currentUserId=null){
    if(!currentUserId) return setToastMsg({type:'danger' , message:'Need to provide user id for course progress!'});
    
    const assignedCoursesRes = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS,
      {
        user_id: currentUserId,
        publish_time: getCurrentEpochTime(),
        pageCursor: '',
        pageSize: 999999999
      },
      {},
      userClient
    );

    if (assignedCoursesRes?.error)
      return setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });
    const assignedCoursesToUser = assignedCoursesRes?.getUserCourseMaps?.user_courses;

    const allAssignedCourses = [];
    for (let i = 0; i < assignedCoursesToUser.length; i++) {
      const courseMap = assignedCoursesToUser[i];
      const mapId = courseMap?.user_course_id;
      const course_id = courseMap?.course_id;

      const courseProgressRes = await loadQueryDataAsync(
        GET_USER_COURSE_PROGRESS,
        { userId: currentUserId, userCourseId: mapId },
        {},
        userClient
      );

      if (courseProgressRes?.error) {
        setToastMsg({ type: 'danger', message: 'Course Progress Load Error' });
        continue;
      }
      const userProgressArr = courseProgressRes?.getUserCourseProgressByMapId;

      // if (!userProgressArr?.length) continue;

      let topicsStarted = 0;
      userProgressArr?.map((topic) => {
        if (topic?.status !== 'not-started') ++topicsStarted;
      });
      // console.log(topicsStarted);
      const courseProgress = userProgressArr?.length
        ? Math.floor((topicsStarted * 100) / userProgressArr?.length)
        : 0;

      const courseRes = await loadQueryDataAsync(GET_COURSE, { course_id: course_id });
      if (courseRes?.error) {
        setToastMsg({ type: 'danger', message: 'Course Load Error' });
        continue;
      }

      const added_by = JSON.parse(assignedCoursesToUser[i]?.added_by);
      allAssignedCourses.push({
        ...courseRes?.getCourse,
        completedPercentage: userProgressArr?.length ? courseProgress : '0',
        added_by: added_by?.role,
        created_at: moment.unix(assignedCoursesToUser[i]?.created_at).format('DD/MM/YYYY'),
        expected_completion: moment.unix(assignedCoursesToUser[i]?.end_date).format('DD/MM/YYYY')
      });
    }

    const userCourses = allAssignedCourses.filter(
      (v, i, a) => a.findIndex((v2) => v2?.id === v?.id) === i
    );

    if(!userCourses?.length) return setToastMsg({ type: 'info', message: 'No courses found!' })

    return userCourses ;
  }

  async function getUserPreferences() {
    // if(!userLspId) setToastMsg({type:'danger' , message:'Need to provide user lsp id^!'});
    const userData = getUserData();
    const userLspData = JSON.parse(sessionStorage?.getItem('lspData'));
    if (userData === 'User Data Not Found') return;
    const { id } = getUserData();
    if(!userLspData?.user_lsp_id){
      const userLearningSpaceData =  await loadQueryDataAsync(GET_USER_LEARNINGSPACES_DETAILS,{user_id:id,lsp_id:LEARNING_SPACE_ID},{},userQueryClient);
      if(userLearningSpaceData?.error) return setToastMsg({type:'danger' , message:'Error while loading user preferences^!'});
      //temporary solution only valid for one lsp...need to change later!
      sessionStorage?.setItem('lspData',JSON.stringify(userLearningSpaceData?.getUserLspByLspId));
      // console.log(userLearningSpaceData?.getUserLspByLspId?.user_lsp_id,'lsp')
      setUserOrgData(getUserOrgObject({user_lsp_id:userLearningSpaceData?.getUserLspByLspId?.user_lsp_id}));
    }
    const { user_lsp_id } = JSON.parse(sessionStorage?.getItem('lspData'));

    if(!user_lsp_id) setToastMsg({type:'danger' , message:'Need to provide user lsp id^!'});
    
    const resPref = await loadQueryDataAsync(GET_USER_PREFERENCES,{user_id:id},{},userQueryClient);
    // console.log(resPref,'prefdata');

    if(resPref?.error) return setToastMsg({type:'danger' , message:'Error while loading user preferences^!'});

    const data = resPref?.getUserPreferences ;

    // let uLspId = user_lsp_id ? user_lsp_id : userLspId;
    // console.log(user_lsp_id, uLspId);
    // console.log(data);
    const prefData = data?.filter((item) => {
      return item?.user_lsp_id === user_lsp_id;
    });
    // console.log(prefData);
    const prefArr = [];
    for (let i = 0; i < prefData?.length; i++) {
      for (let j = 0; j < subCategories?.length; j++) {
        if (prefData[i].sub_category === subCategories[j].name) {
          prefArr.push({
            ...subCategories[j],
            user_preference_id: prefData[i]?.user_preference_id,
            sub_category: subCategories[j].name,
            user_id: prefData[i]?.user_id,
            user_lsp_id: prefData[i]?.user_lsp_id,
            is_base: prefData[i]?.is_base,
            is_active: prefData[i]?.is_active
          });
        }
      }
    }

    const basePreference = prefData?.filter((item)=> item?.is_base && item?.is_active);
    // console.log(basePreference,'base');
    const preferences = prefData?.filter((item)=> item?.is_active && !item?.is_base);
    setUserOrgData(prevValue => ({...prevValue ,sub_category:basePreference[0]?.sub_category,sub_categories:preferences}));
    return prefArr;
  }
  
  return {getUserCourseData,getUserPreferences}
}