import { userClient } from '@/api/UserMutations';
import { GET_COHORT_DETAILS } from '@/api/UserQueries';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import UploadAndPreview from '@/components/common/FormComponents/UploadAndPreview';
import Loader from '@/components/common/Loader';
import { ADMIN_USERS } from '@/components/common/ToolTip/tooltip.helper';
import { getUsersForAdmin } from '@/components/UserComps/Logic/getUsersForAdmin';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { changeHandler } from '@/helper/common.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CohortMasterData, getCohortMasterObject } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../../userComps.module.scss';
import useCohortUserData from '../Logic/useCohortUserData';

const CohortMaster = ({ isEdit = false, isReadOnly = false }) => {
  const { getCohortManager } = useCohortUserData();
  const [cohortData, setCohortData] = useRecoilState(CohortMasterData);

  const router = useRouter();
  const cohortId = router?.query?.cohortId || null;

  const [cohortManager, setCohortManager] = useState([]);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [image, setImage] = useState(null);
  useEffect(() => {
    if (!image) return setCohortData((prev) => ({ ...prev, cohort_image: null }));

    const _cohortData = structuredClone(cohortData);

    const isUrlPresent = cohortData?.image_url;
    _cohortData.cohort_image = isUrlPresent ? image : null;
    if (!isUrlPresent) {
      setImage(null);
    }
    setCohortData(_cohortData);
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

  function formatUsers(userArr = null) {
    if (!userArr?.length) return setToastMsg({ type: 'danger', message: 'No user found!' });
    const data = userArr
      ?.filter((user) => user?.status?.toLowerCase() === 'active')
      ?.map((item) => {
        return {
          value: item?.full_name,
          label: item?.full_name,
          id: item?.id,
          user_lsp_id: item?.user_lsp_id,
          email: item?.email
        };
      });
    return data;
  }

  useEffect(async () => {
    if (!isEdit) {
      const userList = await getUsersForAdmin(true);
      // console.log(userList,'list')
      if (userList?.error) return setToastMsg({ type: 'danger', message: userList?.error });
      const managerList = formatUsers(userList);
      return setCohortManager([...managerList]);
    }
    // if(isReadOnly) return console.log(router?.query)
    const { cohortId } = router?.query;
    if (!cohortId) return;
    const resCohort = await loadQueryDataAsync(
      GET_COHORT_DETAILS,
      { cohort_id: cohortId },
      {},
      userClient
    );

    const userList = await getUsersForAdmin(true);
    // console.log(managerList,'fs');
    if (userList?.error) return setToastMsg({ type: 'danger', message: userList?.error });
    const managerList = formatUsers(userList);

    setCohortManager([...managerList]);

    const cohortDetail = resCohort?.getCohortDetails;
    if (!cohortDetail) return;
    setCohortData(getCohortMasterObject(cohortDetail));

    const data = await getCohortManager(cohortId, true);
    const cohortManager =
      data?.map((item) => ({
        value: item?.name,
        label: item?.name,
        id: item?.id,
        name: item?.name,
        user_lsp_id: item?.user_lsp_id,
        email: item?.email
      })) || [];
    setCohortData((prevValue) => ({ ...prevValue, managers: [...cohortManager] }));
  }, [router?.query]);

  useEffect(() => {
    console.log(cohortData?.managers);
  }, [cohortData?.managers]);
  cohortData?.managers?.map((item) => {
    selectedManagers.push({
      value: item?.value,
      label: item?.value,
      id: item?.id,
      email: item?.email,
      name: item?.name,
      user_lsp_id: item?.user_lsp_id
    });
  });

  const chorotDropdownOptions = {
    inputName: 'managers',
    label: 'Cohort Manager',
    placeholder: 'Select Cohort Manager',
    options: cohortManager,
    value: selectedManagers,
    isSearchEnable: true,
    isMulti: true,
    menuPlacement: 'top',
    isDisabled: isReadOnly
  };

  function handleMulti(e, state, setState, inputName = null) {
    setState({
      ...state,
      [inputName]: e.map((el) => ({
        value: el.value,
        id: el.id,
        email: el.email,
        name: el.value,
        user_lsp_id: el?.user_lsp_id
      }))
    });
  }

  if (cohortId && cohortData?.id !== cohortId)
    return <Loader customStyles={{ backgroundColor: 'transparent', height: '100%' }} />;

  return (
    <>
      <LabeledInput
        inputOptions={{
          inputName: 'cohort_name',
          label: 'Cohort Name:',
          placeholder: 'Enter Cohort Name (Upto 20 characters)',
          value: cohortData?.cohort_name,
          maxLength: 20,
          isDisabled: isReadOnly
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
          maxLength: 10,
          isDisabled: isReadOnly
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
          isDisabled: isReadOnly,
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
          maxLength: 160,
          isDisabled: isReadOnly
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
        tooltipTitle={ADMIN_USERS.userCohort.cohortMaster}
        imageUrl={cohortData?.image_url}
        handleChange={setImage}
        isDisabled={isReadOnly}
      />
    </>
  );
};

export default CohortMaster;
