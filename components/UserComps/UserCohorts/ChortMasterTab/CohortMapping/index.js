import { courseData } from '@/components/LearnerUserProfile/Logic/userBody.helper';
import CoursesAccHead from '@/components/UserProfile/CoursesAccHead';
import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';
import styles from '../../../userComps.module.scss';
import CohortAssignedCourses from './CohortAssignedCourses';
import { useEffect, useState } from 'react';
import AllCourses from './AllCourses';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { CohortMasterData } from '@/state/atoms/users.atom';
import { GET_COHORT_COURSES, GET_COURSE, GET_LATEST_COURSES, queryClient } from '@/api/Queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import { loadQueryDataAsync } from '@/helper/api.helper';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import UserButton from '@/components/common/UserButton';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import PopUp from '@/components/common/PopUp';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { getCohortCourses } from '../Logic/cohortMaster.helper';
import assignCourseToUser from '../Logic/assignCourseToUser';
import { ADD_COURSE_COHORT_MAP } from '@/api/UserMutations';
import { userQueryClient } from '@/api/UserQueries';
import { LEARNING_SPACE_ID } from '@/helper/constants.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { mutationClient } from '@/api/Mutations';

const CohortMapping = () => {
  const [courseAssignData, setCourseAssignData] = useState({
    expectedCompletionDays: null,
    isMandatory: false,
    isCourseAssigned: false
  });


  const [loading , setLoading] = useState(false);
  const [addCohortCourse] = useMutation(ADD_COURSE_COHORT_MAP, {
    client: mutationClient
  });

  const [cohortData, setCohortData] = useRecoilState(CohortMasterData);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const courseSections = [
    // { displayType: 'Ongoing Courses', footerType: 'onGoing', data: courseData },
    // { displayType: 'Courses Added by Me', footerType: 'added', data: courseData },
    { displayType: 'Assigned Course', footerType: 'adminFooter', data: assignedCourses },
    { displayType: 'All Course', footerType: 'adminFooter', data: courseData }
  ];

  const [isAssigned, setIsAssigned] = useState(false);
  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useState(false);
  const [page, setPage] = useState('Assigned Courses');
  const [selected, setSelected] = useState(1);
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const { assignCourseToOldUser } = assignCourseToUser();

  function handleAssign(item, isRemove = false) {

    setSelectedCourse({...item, isMandatory:courseAssignData?.isMandatory})
    // setSelectedCourse({ ...item });
    if (!isRemove) return setIsAssignPopUpOpen(true);

    return setShowConfirmBox(true);
  }

  async function handleSubmit() {
    setLoading(true);
    const {id,email} = getUserData();
    
    //adding end date after adding duration
    const endDate = new Date();
    endDate.setDate(endDate.getDate()+parseInt(courseAssignData?.expectedCompletionDays));
    
    const sendData = {
      CourseId:selectedCourse?.id,
      CohortId:router?.query?.cohortId || cohortData?.id,
      CourseType:selectedCourse?.type,
      LspId:LEARNING_SPACE_ID,
      CohortCode:cohortData?.cohort_code,
      isMandatory:courseAssignData?.isMandatory,
      CourseStatus:selectedCourse?.status,
      AddedBy:JSON.stringify({user_id:id,role:'admin'}),
      CreatedBy:email,
      UpdatedBy:email,
      IsActive:true,
      ExpectedCompletion:courseAssignData?.expectedCompletionDays
    }
    console.log({...selectedCourse,endDate:endDate},'selected course');
    let isError = false ;
    const resCohortCourse = await addCohortCourse({variables:sendData}).catch((err)=>{isError = !!err});
    if(isError) return setToastMsg({type:'danger',message:'error while assigning course to cohort!'})
    // console.log(resCohortCourse);
    const isCourseAssigned = await assignCourseToOldUser(router?.query?.cohortId,{...selectedCourse,endDate:endDate});
    if(!isCourseAssigned) return setToastMsg({type:'danger',message:'error while assigning course to users!'})
    setIsAssignPopUpOpen(false);
    return setLoading(false);
  }

  const [lists, setLists] = useState([
    { id: 1, component: 'Assigned Courses', onClick: true },
    {
      id: 2,
      component: (
        <svg
          width="24"
          height="25"
          viewBox="0 -3 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <mask
            id="mask0_978_6473"
            // style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="25">
            <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_978_6473)">
            <path
              d="M8.02505 22.7008L6.05005 20.7258L14.275 12.5008L6.05005 4.27578L8.02505 2.30078L18.225 12.5008L8.02505 22.7008Z"
              fill="#ACACAC"
            />
          </g>
        </svg>
      ),
      onClick: false
    },
    { id: 3, component: 'Assign Courses', onClick: true }
  ]);

  function handleNode(item) {
    if (item.component === 'Assigned Courses') {
      if (lists.length > 3) {
        lists.pop();
        lists.pop();
      }
      setIsAssigned(!isAssigned);
      setPage(item.component);
      setSelected(item.id);
    }
    if (item.component === 'Assign Courses') {
      if (lists.length > 3) {
        lists.pop();
        lists.pop();
      }
      // setSelected(item.id);
      // setSelectedPage(item.component);
    }
    setSelected(item.id);
    setPage(item.component);
  }

  useEffect(async () => {
    if (!router?.query?.cohortId) {
      console.log(cohortData?.id);
      if (!cohortData?.id) return setToastMsg({ type: 'danger', message: 'Add Cohort Master First!' });
      const data = await getCohortCourses(cohortData?.id);
      if (data?.error) return setToastMsg({ type: 'danger', message: data?.error });
      if (data?.allCourses) {
        return setCourseData([...data?.allCourses]);
      }
      return;
    }
    const data = await getCohortCourses(router?.query?.cohortId);
    if (data?.error) return setToastMsg({ type: 'danger', message: data?.error });
    if (data?.allCourses && data?.assignedCourses) {
      setCourseData([...data?.allCourses]);
      return setAssignedCourses([...data?.assignedCourses]);
    }
    return setCourseData([...data?.allCourses]);
  }, [router?.query]);
  return (
    <>
      <div className={`${styles.courses_acc_head}`}>
        {isAssigned && (
          <div
            className={`${styles.current_courses} ${lists?.length > 3 ? styles.marginBottom : ''}`}>
            {lists.map((item) => (
              <div
                key={item.id}
                onClick={item.onClick ? () => handleNode(item) : () => {}}
                style={{ color: item.id === selected ? 'var(--primary)' : '' }}>
                {item.component}
              </div>
            ))}
          </div>
        )}
        {!isAssigned && (
          <div className={`${styles.assign}`}>
            <div>Assigned Courses:{assignedCourses?.length}</div>

            <div
              onClick={() => {
                setIsAssigned(!isAssigned);
                setPage('Assign Courses');
                setSelected(3);
              }}
              className={`${styles.assignInner}`}>
              <img src="/images/svg/add-line-blue.svg" />
              Assign Courses
            </div>
          </div>
        )}
      </div>
      {page === 'Assigned Courses' && (
        <CohortAssignedCourses
          section={courseSections[0]}
          handleSubmit={handleAssign}
          isRemove={true}
        />
      )}
      {page === 'Assign Courses' && (
        <AllCourses section={courseSections[1]} handleSubmit={handleAssign} />
      )}
      <PopUp
        // title="Course Mapping Configuration"
        // submitBtn={{ handleClick: handleSubmit }}
        popUpState={[isAssignPopUpOpen, setIsAssignPopUpOpen]}
        // size="smaller"
        customStyles={{ width: '400px' }}
        isFooterVisible={false}
        positionLeft="50%">
        <div className={`${styles.assignCoursePopUp}`}>
          <p className={`${styles.assignCoursePopUpTitle}`}>Course Mapping Configuration</p>
          <LabeledRadioCheckbox
            type="checkbox"
            label="Course Mandatory"
            name="isMandatory"
            isChecked={courseAssignData?.isMandatory}
            changeHandler={(e) =>
              setCourseAssignData({ ...courseAssignData, isMandatory: e.target.checked })
            }
          />
          <section>
            <p htmlFor="endDate">Expected Duration of Completion:</p>
            <LabeledInput
              inputOptions={{
                inputName: 'expectedCompletionDays',
                placeholder: 'Enter No. of Days',
                value: courseAssignData?.expectedCompletionDays,
                isNumericOnly: true
              }}
              changeHandler={(e) => {
                setCourseAssignData({
                  ...courseAssignData,
                  expectedCompletionDays: e.target.value
                });
              }}
            />
          </section>
          <div className={`${styles.assignCourseButtonContainer}`}>
            <UserButton
              text={'Cancel'}
              isPrimary={false}
              type={'button'}
              clickHandler={() => {
                setIsAssignPopUpOpen(false);
                setCourseAssignData({ ...courseAssignData, endDate: new Date() });
              }}
            />
            <UserButton
              text={'Save'}
              type={'button'}
              clickHandler={() => {
                handleSubmit();
              }}
              isDisabled={loading}
            />
          </div>
        </div>
      </PopUp>

      {showConfirmBox && (
        <ConfirmPopUp
          title={'Are you sure you want to proceed?'}
          message={
            "Learners in the cohort won't be able to access the course once unassigned. Do you still wish to continue?"
          }
          btnObj={{
            handleClickLeft: () => handleRemove(),
            handleClickRight: () => setShowConfirmBox(false)
          }}
        />
      )}
    </>
  );
};

export default CohortMapping;
