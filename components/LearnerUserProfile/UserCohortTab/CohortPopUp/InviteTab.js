// components\LearnerUserProfile\UserCohortTab\CohortPopUp\InviteTab.js
import styles from '../../learnerUserProfile.module.scss';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import InviteUserLearner from '../InviteUserLearner';
import CheckBoxField from '@/components/common/CheckBoxField';
import { inviteTabData } from '../../Logic/userBody.helper';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import useUserCourseData from '@/helper/hooks.helper';
import UserButton from '@/components/common/UserButton';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import useHandleCohortTab from '../../Logic/useHandleCohortTab';
import _styles from '../InviteUserLearner/inviteUserLearner.module.scss';
// import addUserData from '@/components/UserComps/UserCohorts/ChortMasterTab/Logic/addUserData';


export default function InviteTab() {

  const [userId,setUserId] = useState([]);
  const [usersForCohort , setUsersForCohort] = useState([]);
  const [selectedCohortData, setSelectedCohortData] = useRecoilState(SelectedCohortDataAtom);
  const [loading, setLoading] = useState(false);
  const [toastMsg , setToastMsg] = useRecoilState(ToastMsgAtom);
  const {addUserToCohort} = useHandleCohortTab();
  const { getCohortUserData } = useUserCourseData();

  const {getUsersForAdmin} = useUserCourseData();
  function handleSelect(id){
   if(!userId?.length) return setUserId([id]);
   if(userId?.includes(id)){
    const newIds = userId?.filter((item) => item !== id);
    setUserId([...newIds]);
    return;
   }
   setUserId((prevValue) => [...prevValue , id]);
   return;
  }

  useEffect(async()=>{
    if(selectedCohortData?.userCohort?.role?.toLowerCase() !== 'manager') return;
    if(selectedCohortData?.inviteUser?.length) return setUsersForCohort([...selectedCohortData?.inviteUser],setLoading(false));
    setLoading(true);
    let cohortUser = [];
    if(!selectedCohortData?.cohortUsers?.length){
    const cohortUsers = await getCohortUserData(selectedCohortData?.main?.cohort_id);

    if (cohortUsers?.error)
      return setToastMsg({ type: 'danger', message: 'Error while loading cohort users!' });

    if (!cohortUsers?.length) return setLoading(false);

    //removing duplicate data
    const _users = [...new Map(cohortUsers.map((m) => [m?.user_id, m])).values()]; 
    
    cohortUser = [..._users];

  }

    // console.log(selectedCohortData , 'cohort users',cohortUser)
    if(!cohortUser?.length) cohortUser = [...selectedCohortData?.cohortUsers]
    
    const users = await getUsersForAdmin();
    if(!users?.length) return setLoading(false);

    const _users = users?.filter((item) => item?.status?.toLowerCase() === 'active') ;
    // console.log(_users);
    
    // flitering users who are not in cohort
    // console.log(users , selectedCohortData?.cohortUsers) ;
    const inviteUserList = _users.filter(
      ({ id: id1 }) => !cohortUser?.some(({ user_id: id2 }) => id2 === id1)
    );

    // console.log(inviteUserList);

    if(!inviteUserList?.length) return ;
    setSelectedCohortData((prevValue) => ({...prevValue , inviteUser:[...inviteUserList]}))
    return setUsersForCohort([...inviteUserList],setLoading(false));
  },[selectedCohortData])

  // useEffect(()=>{
  //   console.log(userId);
  // },[userId])

  async function addUsersToCohort(){
    if(!userId?.length) return setToastMsg({type:'info' , message:'Please add atleast one user!'});
    const isAdded = await addUserToCohort(userId,selectedCohortData?.main?.cohort_id,selectedCohortData);
    // console.log(isAdded,'added users');
    const updateUsers =  usersForCohort.filter(({ id: id1 }) => !isAdded.some((id) => id === id1));
    return setUsersForCohort(updateUsers);
  }

  return (
    <>
      <div className={`${styles.courseTabContainer}`}>
        <div style={{ padding: '0px 5px 15px' }}>
          <SearchBar
            inputDataObj={{
              inputOptions: {
                inputName: 'filter',
                placeholder: 'Search'
              }
            }}
          />
        </div>
        <div className={`${styles.head}`}>
        <div className={`${styles.checkBoxContainer}`}><LabeledRadioCheckbox type="checkbox" changeHandler={handleSelect}/></div>

          <p className={`${styles.firstName}`}>First Name</p>
          <p className={`${styles.lastName}`}>Last Name</p>
          <p className={`${styles.email}`}>Email Id</p>
        </div>
        <div className={`${styles.inviteComponents}`}>
         

{loading ? (
        <strong className={`${styles.fallbackMsg}`}>Loading Users...</strong>
      ) : (
        !usersForCohort?.length && <strong className={`${styles.fallbackMsg}`}>No Users Found</strong>
      )}
       {usersForCohort?.map((invite) => {
            return <InviteUserLearner inviteTabData={invite} key={invite.id} handleSelect={()=>handleSelect(invite.id)}/>;
          })}
        </div>
        <div className={`${styles.addUserBottomContainer}`}>
          <div className={`${styles.leftSide}`}>
            Users selected: <span>{userId?.length}</span>
          </div>
          <div className={`${styles.buttonContainer}`}>
            {/* <button className={`${styles.cohortButton3}`}>Cancel</button>
            <button className={`${styles.cohortButton1}`}>Add</button> */}
            <UserButton text={'Cancel'} isPrimary={false} clickHandler={()=>{setUserId([])}}/>
            <UserButton text={'Add'} clickHandler={addUsersToCohort}/>
          </div>
        </div>
      </div>
    </>
  );
}
