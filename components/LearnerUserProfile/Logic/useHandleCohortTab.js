import { GET_COHORT_COURSES, queryClient } from '@/api/Queries';
import { ADD_USER_COHORT, ADD_USER_COURSE, UPDATE_USER_COURSE, userClient } from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS, GET_USER_LEARNINGSPACES_DETAILS, GET_USER_ORGANIZATION_DETAIL, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CohortMasterData, SelectedCohortDataAtom, UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { cohortTabData } from './userBody.helper';

export default function useHandleCohortTab() {
  const [cohortTab, setCohortTab] = useState(cohortTabData[0].name);
  const [userOrgData,setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [selectedCohort , setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);

  //for adding user to cohorts

  const [addToCohort, { error, loading }] = useMutation(ADD_USER_COHORT, {
    client: userClient
  });

  const [addUserCourse] = useMutation(ADD_USER_COURSE, {
    client: userClient
  });

  const [updateUserCourse] = useMutation(UPDATE_USER_COURSE, {
    client: userClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  


  function showActiveTab(tab) {
    const index = cohortTabData.findIndex((t) => {
      return t.name === tab;
    });

    if (index >= 0) return cohortTabData[index].component;
    return cohortTabData[0].component;
  }

  async function assignCourseToUser(userId=null,userLspId = null,cohort_id = null){
    const {id} = getUserData();
    // if(!courseId) return false;
    if(!cohort_id) return false;
    if(!userId) return false;
    if(!userLspId) return false;

    const userCoursesMaps = await loadQueryDataAsync(GET_USER_COURSE_MAPS,{user_id: userId,
      publish_time: getCurrentEpochTime(),
      pageCursor: "",
      pageSize: 1000},{},userQueryClient);

    if(userCoursesMaps?.error) return setToastMsg({ type: 'danger', message: 'Error occured while loading user course map' });

    //filtering the courses based on user_lsp_id
    const courses = userCoursesMaps?.getUserCourseMaps?.user_courses?.filter((item) => item?.user_lsp_id === userLspId );
      const cohortCourses = await loadQueryDataAsync(GET_COHORT_COURSES,{cohort_id:cohort_id},{},queryClient);
      if(cohortCourses?.error) return setToastMsg({type:'danger',message:'Error while loading cohort courses!'});
   
      // const courseIds = cohortCourses?.getCohortCourseMaps?.length? (cohortCourses?.getCohortCourseMaps?.map((item)=> {item?.CourseId})):[];
      const _cohortCourses = cohortCourses?.getCohortCourseMaps;
      //console.log(_cohortCourses,'cohort courses')
      if(_cohortCourses?.length){
      setSelectedCohort((prevValue) => ({...prevValue , cohortCourses:[..._cohortCourses]}));}
      
      const addNewCourses = _cohortCourses?.filter(({CourseId:id1}) => !courses?.some(({ course_id: id2 }) => id2 === id1))
      const oldCourses = courses?.filter(({ course_id: id1}) => _cohortCourses?.some(({ CourseId:id2 }) => id2 === id1))
      
      let isError = false;
      //addding course map if user doesnt have course assigned
      if(addNewCourses?.length){
        for(let i = 0 ; i < addNewCourses?.length ; i++){
          const endDate = new Date();
          endDate.setDate(endDate.getDate()+parseInt(addNewCourses[i]?.ExpectedCompletion));
          const sendData = {          
            userId:userId,
            userLspId:userLspId,
            courseId:addNewCourses[i]?.CourseId,
            courseType:addNewCourses[i]?.CourseType,
            courseStatus:'not-started',
            addedBy:JSON.stringify({user_id:id , role:'Cohort'}),
            isMandatory:addNewCourses[i]?.isMandatory,
            endDate:endDate
          }

          const res = await addUserCourse({variables:sendData}).catch((err) => {
            console.log(err);
            isError = !!false;
            // return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
            return;
          });

          console.log(res)

          if(isError) return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
        }
      }

      console.log(oldCourses,'oldCOurses',addNewCourses)
      // need to update old courses. check if it is assigned by admin or cohort
      if(oldCourses?.length){
        for(let i = 0 ; i < oldCourses?.length ; i++){
          let addedBy = null ;
          try{
            addedBy = JSON.parse(oldCourses[i]?.added_by);
          }catch(e){
            console.log(e,'error in try catch course assign');
          }
          console.log(addedBy,'added by')
          if(addedBy?.role?.toLowerCase() === 'self' ){
          const sendData ={
            userCourseId: oldCourses[i]?.user_course_id,
            userId: oldCourses[i]?.user_id,
            userLspId: oldCourses[i]?.user_lsp_id,
            courseId: oldCourses[i]?.course_id,
            addedBy: JSON.stringify({ userId: id, role: 'cohort' }),
            courseType: oldCourses[i]?.course_type,
            isMandatory: oldCourses[i]?.is_mandatory,
            courseStatus: 'open',
            endDate: oldCourses[i]?.end_date
          }

          // console.log(sendData,'updateCourse send data');
          const res = await updateUserCourse({variables:sendData}).catch((err)=>{
            isError = !!err;
          })
          if(isError) return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
          console.log(res);
         }
         continue;
        }
      }

      if(isError) return false;
    
      return true;

  }

  async function getUserLspData(user_id=null,lsp_id=null){
    if(!user_id) return false;

    const resLsp = await loadQueryDataAsync(GET_USER_LEARNINGSPACES_DETAILS,{lsp_id:lsp_id, user_id:user_id},{},userQueryClient);
        if(resLsp?.error) return false;
        console.log(resLsp?.getUserLspByLspId);
        return resLsp?.getUserLspByLspId ;  
  }

  async function addUserToCohort(userIds = [] , cohortId = null){

      if(!userOrgData?.lsp_id) return ;

      if(!userIds?.length) return setToastMsg({type:'info',message:'Make sure to add users!'});

      const {id,role} = getUserData();

      for(let i = 0 ; i < userIds?.length ; i++){

        const userLspData = await getUserLspData(userIds[i],userOrgData?.lsp_id);
        if(!userLspData) return setToastMsg({ type: 'danger', message: 'Error occured while loading user lsp id' });
        
        const sendCohortData = {
          user_id:userIds[i],
          user_lsp_id: userLspData?.user_lsp_id,
          cohort_id: cohortId,
          added_by: JSON.stringify({user_id: id, role:role}),
          membership_status:'Active',
          role: 'Learner'
        }

      let isError = false;
      const resCohort = await addToCohort({ variables: { userCohort: sendCohortData } }).catch(
        (err) => {
          console.log(err);
          isError = !!err;
        }
      );
      if (isError)
       return setToastMsg({ type: 'danger', message: 'error occured while adding user cohort mapping' });


       // check if user have cohort courses
     const assignCourse = await assignCourseToUser(userIds[i],userLspData?.user_lsp_id,cohortId);

     if(!assignCourse) return setToastMsg({ type: 'danger', message: 'Error occured while assigning courses to user' });   
      
}



      return userIds;

    }

  async function getUsersOrgDetails(userData = []) {
    if (!userOrgData?.lsp_id) return false;
    if (!userData?.length) return false;
    const updateUserData = [];
    for (let i = 0; i < userData?.length; i++) {
      const userLspData = await getUserLspData(userData[i]?.user_id, userOrgData?.lsp_id);
      const organizationData = await loadQueryDataAsync(
        GET_USER_ORGANIZATION_DETAIL,
        { user_id: userData[i]?.user_id, user_lsp_id: userLspData?.user_lsp_id },
        {},
        userQueryClient
      );
      if (organizationData?.error)
        return setToastMsg({ type: 'danger', message: 'Organization load error!' });
      updateUserData.push({
        ...userData[i],
        role_in_organization: organizationData?.getUserOrgDetails?.organization_role
      });
    }

    if (!updateUserData?.length) return userData;
    return updateUserData;
  }
  

  return { cohortTab, setCohortTab, showActiveTab , addUserToCohort , getUsersOrgDetails }
}
