import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { useRef, useState, useEffect } from 'react';
import UploadAndPreview from '@/components/common/FormComponents/UploadAndPreview';
import { CohortMasterData, getCohortMasterObject } from '@/state/atoms/users.atom';
import { useRecoilState } from 'recoil';
import { changeHandler, getCurrentEpochTime } from '@/helper/common.helper';
import { Item } from '@radix-ui/react-navigation-menu';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { useRouter } from 'next/router';
import { useHandleCohortMaster } from '../../Logic/useHandleCohortMaster.helper';
import styles from '../../../userComps.module.scss';
import {
  GET_COHORT_DETAILS,
  GET_COHORT_USERS,
  GET_USERS_FOR_ADMIN,
  GET_USER_DETAIL,
  userQueryClient
} from '@/api/UserQueries';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { userClient } from '@/api/UserMutations';
import useCohortUserData from '../Logic/useCohortUserData';
import { getUsersForCohort } from '../Logic/cohortMaster.helper';

const CohortMaster = ({ isEdit = false }) => {
  const { getCohortUser } = useCohortUserData();
  const [cohortData, setCohortData] = useRecoilState(CohortMasterData);
  const router = useRouter();

  const [cohortManager, setCohortManager] = useState([]);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [image, setImage] = useState(null);
  useEffect(() => {
    setCohortData((prevValue) => ({ ...prevValue, cohort_image: image }));
  }, [image]);

  const difficultyOptions = [
    { value: 'Open', label: 'Open' },
    { value: 'Close', label: 'Close' }
  ];

  const selectedManagers = [];

  // const cohortManager = [
  //   { value: 'John Doe', label: 'John Doe', id: '12' },
  //   { value: 'Rick Nate', label: 'Rick Nate', id: '123' },
  //   { value: 'Abhishek Gosh', label: 'Abhishek Ghosh', id: '2' }
  // ];

  useEffect(() => {
    // console.log(cohortData);
    // console.log(selectedCohortManager);
    setCohortData(getCohortMasterObject({}));
  }, []);

  useEffect(async () => {
    if (!isEdit) {
      const managerList = await getUsersForCohort();
      return setCohortManager([...managerList]);
    }
    const { cohortId } = router?.query;
    if (!cohortId) return;
    const resCohort = await loadQueryDataAsync(
      GET_COHORT_DETAILS,
      { cohort_id: cohortId },
      {},
      userClient
    );

    const managerList = await getUsersForCohort();
    // setCohortManager([...managerList]);

    const cohortDetail = resCohort?.getCohortDetails;
    if (!cohortDetail) return;
    setCohortData(getCohortMasterObject(cohortDetail));

    const data = await getCohortUser(cohortId);
    const cohortManager = data?.map((item) => ({
      value: item?.name,
      label: item?.name,
      id: item?.id
    }));
    setCohortData((prevValue) => ({ ...prevValue, managers: [...cohortManager] }));
  }, [router?.query]);

  cohortData?.managers?.map((item) => {
    selectedManagers.push({ value: item?.value, label: item?.value, id: item?.id });
  });

  const chorotDropdownOptions = {
    inputName: 'managers',
    label: 'Cohort Manager',
    placeholder: 'Select Cohort Manager',
    options: cohortManager,
    value: selectedManagers,
    isSearchEnable: true,
    isMulti: true,
    menuPlacement: 'top'
  };

  function handleMulti(e, state, setState, inputName = null) {
    setState({
      ...state,
      [inputName]: e.map((el) => ({ value: el.value, id: el.id }))
    });
  }

  return (
    <>
      <LabeledInput
        inputOptions={{
          inputName: 'cohort_name',
          label: 'Cohort Name:',
          placeholder: 'Enter Cohort Name (Upto 20 characters)',
          value: cohortData?.cohort_name,
          maxLength: 20
        }}
        changeHandler={(e) => {
          changeHandler(e, cohortData, setCohortData);
        }}
        styleClass={`${styles.inputField}`}
      />

      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'cohort_code',
          label: 'Cohort Code:',
          placeholder: 'Enter Cohort Code (Upto 10 characters)',
          value: cohortData?.cohort_code,
          maxLength: 10
        }}
        changeHandler={(e) => {
          changeHandler(e, cohortData, setCohortData);
        }}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'cohort_type',
          label: 'Type:',
          placeholder: 'Select Cohort Type(Open/Close)',
          options: difficultyOptions,
          value: {
            value: cohortData?.cohort_type,
            label: cohortData?.cohort_type
          },
          menuPlacement: 'top'
        }}
        changeHandler={(e) =>
          setCohortData((prevValue) => ({ ...prevValue, cohort_type: e.value }))
        }
      />

      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter Description (Upto 160 characters)',
          value: cohortData?.description,
          maxLength: 160
        }}
        changeHandler={(e) => {
          changeHandler(e, cohortData, setCohortData);
        }}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={chorotDropdownOptions}
        changeHandler={(e) => {
          handleMulti(e, cohortData, setCohortData, chorotDropdownOptions?.inputName);
        }}
      />

      <UploadAndPreview
        inputName={'cohort_image'}
        label={'Cohort Image'}
        isRemove={true}
        description={false}
        handleChange={setImage}
      />
    </>
  );
};

export default CohortMaster;
