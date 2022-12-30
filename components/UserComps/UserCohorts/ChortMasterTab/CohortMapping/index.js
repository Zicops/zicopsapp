import { DELETE_COHORT_COURSE, mutationClient } from '@/api/Mutations';
import { ADD_COURSE_COHORT_MAP } from '@/api/UserMutations';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import PopUp from '@/components/common/PopUp';
import UserButton from '@/components/common/UserButton';
import { getUserData } from '@/helper/loggeduser.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CohortMasterData, UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../../userComps.module.scss';
import assignCourseToUser from '../Logic/assignCourseToUser';
import { getCohortCourses } from '../Logic/cohortMaster.helper';
import AllCourses from './AllCourses';
import CohortAssignedCourses from './CohortAssignedCourses';

const CohortMapping = ({ isReadOnly = false }) => {
  const [courseAssignData, setCourseAssignData] = useState({
    expectedCompletionDays: 1,
    isMandatory: false,
    isCourseAssigned: false
  });

  const [deleteCohortCourse] = useMutation(DELETE_COHORT_COURSE, { client: mutationClient });
  const [loading, setLoading] = useState(false);
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
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);

  const { assignCourseToOldUser, removeUserCohortCourses } = assignCourseToUser();

  function handleAssign(item, isRemove = false) {
    if (isReadOnly) return;
    setSelectedCourse({ ...item, isMandatory: courseAssignData?.isMandatory });
    // setSelectedCourse({ ...item });
    if (!isRemove) return setIsAssignPopUpOpen(true);

    return setShowConfirmBox(true);
  }

  async function handleSubmit() {
    setLoading(true);
    const { id, email } = getUserData();

    //adding end date after adding duration
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(courseAssignData?.expectedCompletionDays));

    const sendData = {
      CourseId: selectedCourse?.id,
      CohortId: router?.query?.cohortId || cohortData?.id,
      CourseType: selectedCourse?.type,
      LspId: userOrgData?.lsp_id,
      CohortCode: cohortData?.cohort_code,
      isMandatory: courseAssignData?.isMandatory,
      CourseStatus: selectedCourse?.status,
      AddedBy: JSON.stringify({ user_id: id, role: 'admin' }),
      CreatedBy: email,
      UpdatedBy: email,
      IsActive: true,
      ExpectedCompletion: courseAssignData?.expectedCompletionDays
    };
    console.log({ ...selectedCourse, endDate: endDate }, 'selected course', sendData);
    let isError = false;
    // return ;
    const resCohortCourse = await addCohortCourse({ variables: sendData }).catch((err) => {
      isError = !!err;
    });
    if (isError)
      return setToastMsg({ type: 'danger', message: 'error while assigning course to cohort!' });
    // console.log(resCohortCourse);
    const isCourseAssigned = await assignCourseToOldUser(router?.query?.cohortId, {
      ...selectedCourse,
      endDate: endDate,
      ...sendData
    },cohortData);
    if (!isCourseAssigned)
      return setToastMsg({ type: 'danger', message: 'error while assigning course to users!' });
    setToastMsg({ type: 'success', message: 'Course added succesfully!' });
    setIsAssignPopUpOpen(false);
    await loadAssignCourses(false);
    setCourseAssignData({
      expectedCompletionDays: 1,
      isMandatory: false,
      isCourseAssigned: false
    });
    return setLoading(false);
  }

  async function handleRemove() {
    // console.log(selectedCourse,'selected course');
    setLoading(true);
    if (!selectedCourse?.cohortCourseId)
      return setToastMsg({ type: 'danger', message: 'Error while removing courses!' });
    const res = await deleteCohortCourse({
      variables: { id: selectedCourse?.cohortCourseId }
    }).catch((err) => {
      console.log(err);
    });
    // if(res?.deleteCourseCohort) return setToastMsg({ type: 'danger', message: 'Error while removing courses!' });
    const isRemoved = await removeUserCohortCourses(router?.query?.cohortId, selectedCourse?.id,selectedCourse?.name,cohortData);
    if (!isRemoved)
      return setToastMsg({ type: 'danger', message: 'Error while removing course from user!' });
    setToastMsg({ type: 'success', message: 'Course removed from cohort!' });
    await loadAssignCourses(false);
    setShowConfirmBox(false);
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
    loadAssignCourses();
  }, [router?.query]);

  async function loadAssignCourses(isAssign = true) {
    if (!router?.query?.cohortId) {
      // console.log(cohortData?.id);
      if (!cohortData?.id)
        return setToastMsg({ type: 'danger', message: 'Add Cohort Master First!' });
      const data = await getCohortCourses(cohortData?.id);
      setLoading(isAssign);
      if (data?.error) return setToastMsg({ type: 'danger', message: data?.error });
      if (data?.allCourses) {
        return setCourseData([...data?.allCourses], setLoading(false));
      }
      return;
    }
    setLoading(isAssign);
    const data = await getCohortCourses(router?.query?.cohortId);
    if (data?.error) {
      setLoading(false);
      setToastMsg({ type: 'danger', message: data?.error });
      return;
    }
    if (data?.allCourses && data?.assignedCourses) {
      // console.log(data?.assignedCourses,'assifnefa')
      setCourseData([...data?.allCourses]);
      setLoading(false);
      return setAssignedCourses([...data?.assignedCourses]);
    }
    setLoading(false);
    setAssignedCourses([]);
    return setCourseData([...data?.allCourses]);
  }
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
            <div className={`${styles.assignedCoursesContainer}`}>
              <span>Assigned Courses:</span>
              <span>{assignedCourses?.length}</span>
            </div>

            {!isReadOnly && (
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
            )}
          </div>
        )}
      </div>
      {page === 'Assigned Courses' && (
        <CohortAssignedCourses
          section={courseSections[0]}
          handleSubmit={handleAssign}
          isRemove={true}
          isLoading={loading}
        />
      )}
      {page === 'Assign Courses' && (
        <AllCourses section={courseSections[1]} handleSubmit={handleAssign} isLoading={loading} />
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
            <p htmlFor="endDate">Expected Duration of Completion in days:</p>
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
            leftIsDisable: loading,
            rightIsDisable: loading,
            handleClickLeft: () => handleRemove(),
            handleClickRight: () => setShowConfirmBox(false)
          }}
        />
      )}
    </>
  );
};

export default CohortMapping;
