import { UPDATE_COHORT_MAIN, UPDATE_USER_COHORT, userClient } from '@/api/UserMutations';
import { GET_USER_LEARNINGSPACES_DETAILS, userQueryClient } from '@/api/UserQueries';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import UserButton from '@/components/common/UserButton';
import ZicopsTable from '@/components/common/ZicopsTable';
import useHandleCohortTab from '@/components/LearnerUserProfile/Logic/useHandleCohortTab';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { LEARNING_SPACE_ID } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CohortMasterData } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../../../userComps.module.scss';
import addUserData from '../../Logic/addUserData';
import useCohortUserData from '../../Logic/useCohortUserData';

const AddUsers = ({ usersData = [], popUpSetState = () => {}, onUserAdd = () => {} }) => {
  // const { addUserToCohort } = addUserData();
  const [cohortData, setCohortData] = useRecoilState(CohortMasterData);
  const selectedUsers = `${userId?.length}/${usersData?.length}`;
  const [userId, setUserId] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [data, setData] = useState(null);
  const { addUserToCohort } = useHandleCohortTab();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [updateCohortMain, { error: updateCohortError }] = useMutation(UPDATE_COHORT_MAIN, {
    client: userClient
  });
  const router = useRouter();
  useEffect(() => {
    if (!usersData.length) return;
    return setData([...usersData?.filter((u) => u?.is_active && u?.is_verified)]);
  }, [usersData]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    setFilteredData(
      data?.filter((d) => {
        const q = searchQuery?.toLowerCase()?.trim();
        return (
          d?.first_name?.toLowerCase()?.trim()?.includes(q) ||
          d?.last_name?.toLowerCase()?.trim()?.includes(q) ||
          d?.email?.toLowerCase()?.trim()?.includes(q)
        );
      })
    );
  }, [searchQuery]);

  useEffect(() => {
    if (router?.query?.cohortId) return;
    if (!cohortData?.id) {
      setData([]);
      return setToastMsg({ type: 'danger', message: 'Add cohort master first!' });
    }
  }, [router?.query]);

  const { getCohortUser } = useCohortUserData();

  async function handleAddUser() {
    setIsBtnDisabled(true);
    if (!userId?.length) {
      setIsBtnDisabled(false);
      return setToastMsg({ type: 'warning', message: 'Please be sure to add atleast one user' });
    }
    // for (let i = 0; i < userId?.length; i++) {
    //   const lspData = await loadQueryDataAsync(GET_USER_LEARNINGSPACES_DETAILS,{user_id:userId[i],lsp_id:LEARNING_SPACE_ID},{},userQueryClient);
    //   if(lspData?.error) return  setToastMsg({ type: 'danger', message: 'Error while loading lsp data' });
    //   // console.log(lspData?.getUserLspByLspId,'lspData');
    //   const sendData = {
    //     id: userId[i],
    //     user_lsp_id: lspData?.getUserLspByLspId?.user_lsp_id,
    //     cohort_id: router?.query?.cohortId
    //     // membership_status: 'Learner'
    //   };
    //   await addUserToCohort(sendData);
    // }
    if (!cohortData?.id) return setIsBtnDisabled(false);
    const cohortId = router?.query?.cohortId ? router?.query?.cohortId : cohortData?.id;
    const data = await addUserToCohort(userId, cohortId);
    // console.log(data);
    if (!data?.length) {
      setIsBtnDisabled(false);
      return setToastMsg({ type: 'danger', message: 'error while adding user!' });
    }

    const sendCohortData = {
      cohort_id: cohortData?.id,
      name: cohortData?.cohort_name,
      description: cohortData?.description,
      lsp_id: LEARNING_SPACE_ID || lspData?.lsp_id,
      code: cohortData?.cohort_code,
      status: 'SAVED',
      type: cohortData?.cohort_type,
      is_active: true,
      size: cohortData?.managers?.length || 1
    };

    const allUsers = await getCohortUser(sendCohortData?.id, true);
    if (allUsers?.length) sendCohortData.size = allUsers?.length;

    let isError = false;
    const res = await updateCohortMain({ variables: sendCohortData }).catch((err) => {
      console.log(err);
      isError = !!err;
    });
    if (isError) {
      setIsBtnDisabled(false);
      return setToastMsg({ type: 'danger', message: 'Cohort Data Update Error' });
    }

    popUpSetState(false);
    onUserAdd();
    setIsBtnDisabled(false);
  }

  const columns = [
    {
      field: 'first_name',
      headerClassName: 'course-list-header',
      flex: 1,
      renderHeader: (params) => (
        <div className="center-elements-with-flex" onClick={(e) => e?.stopPropagation()}>
          <LabeledRadioCheckbox
            type="checkbox"
            isChecked={filteredData?.length && userId.length === filteredData?.length}
            changeHandler={(e) => {
              setUserId(e.target.checked ? [...filteredData.map((row) => row.id)] : []);
            }}
          />
          First Name
        </div>
      ),
      renderCell: (params) => {
        return (
          <div className="center-elements-with-flex">
            <LabeledRadioCheckbox
              type="checkbox"
              isChecked={userId?.includes(params.id)}
              changeHandler={(e) => {
                const userList = [...userId];

                if (e.target.checked) {
                  userList.push(params.id);
                } else {
                  const index = userList.findIndex((id) => id === params.id);
                  userList.splice(index, 1);
                }

                setUserId(userList);
              }}
            />
            {params.row?.first_name}
          </div>
        );
      }
    },
    {
      field: 'last_name',
      headerClassName: 'course-list-header',
      headerName: 'Last Name',
      flex: 1
    },
    {
      field: 'email',
      headerClassName: 'course-list-header',
      headerName: 'Email ID',
      flex: 1
    }
  ];
  return (
    <div className={`${styles.addUsersContainer}`}>
      <div className={`${styles.addUserTopContainer}`}>
        <div className={`${styles.imageContainer}`}>
          <img src={cohortData?.image_url || '/images/UserCohort.png'} height={60} alt="" />
          <div className={`${styles.titleContainer}`}>
            <span className={`${styles.cohortTitle}`}>{cohortData?.cohort_name || ' '}</span>
            <span>Add Users</span>
          </div>
        </div>
        <div className={`${styles.searchBarContainer}`}>
          <img src="/images/svg/search-icon.svg" height={20} alt="" />

          <LabeledInput
            styleClass={styles.inputField}
            inputOptions={{
              inputName: 'search',
              placeholder: 'Search Users',
              value: searchQuery
            }}
            changeHandler={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
      </div>
      <ZicopsTable
        columns={columns}
        data={filteredData}
        tableHeight="60vh"
        customStyles={{ padding: '10px 0' }}
        hideFooterPagination={true}
        loading={filteredData === null}
      />
      <div className={`${styles.addUserBottomContainer}`}>
        <div className={`${styles.leftSide}`}>
          Users selected:{' '}
          <span>{`${userId?.length ? userId?.length : '0'}/${usersData?.length}`}</span>
        </div>
        <div className={`${styles.buttonContainer}`}>
          <UserButton
            text={'Cancel'}
            isPrimary={false}
            clickHandler={() => {
              popUpSetState(false);
              setUserId([]);
            }}
          />
          <UserButton text={'Add'} isDisabled={isBtnDisabled} clickHandler={handleAddUser} />
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
<></>;
