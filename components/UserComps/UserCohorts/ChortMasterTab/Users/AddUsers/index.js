import { GET_USER_LEARNINGSPACES_DETAILS, userQueryClient } from '@/api/UserQueries';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import UserButton from '@/components/common/UserButton';
import ZicopsTable from '@/components/common/ZicopsTable';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { LEARNING_SPACE_ID } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CohortMasterData } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../../../userComps.module.scss';
import addUserData from '../../Logic/addUserData';

const AddUsers = ({ usersData = [] , popUpSetState = ()=>{} }) => {
  const { addUserToCohort } = addUserData();
  const [cohortData , setCohortData] = useRecoilState(CohortMasterData);
  const selectedUsers = `5/${usersData?.length}`;
  const [userId, setUserId] = useState([]);
  const [data, setData] = useState([]);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();
  useEffect(() => {
    if (!usersData.length) return;
    return setData([...usersData]);
  }, [usersData]);

  useEffect(() => {
    if(router?.query?.cohortId) return;
    if(!cohortData?.id) 
   { setData([]);
    return setToastMsg({ type: 'danger', message: 'Add cohort master first!' });}
  }, [router?.query]);

  async function handleAddUser() {
    if (!userId?.length)
      return setToastMsg({ type: 'warning', message: 'Please be sure to add atleast one user' });

    for (let i = 0; i < userId?.length; i++) {
      const lspData = await loadQueryDataAsync(GET_USER_LEARNINGSPACES_DETAILS,{user_id:userId[i],lsp_id:LEARNING_SPACE_ID},{},userQueryClient);
      if(lspData?.error) return  setToastMsg({ type: 'danger', message: 'Error while loading lsp data' });
      // console.log(lspData?.getUserLspByLspId,'lspData');
      const sendData = {
        id: userId[i],
        user_lsp_id: lspData?.getUserLspByLspId?.user_lsp_id,
        cohort_id: router?.query?.cohortId
        // membership_status: 'Learner'
      };
      await addUserToCohort(sendData);
      popUpSetState(false);
    }
  }

  const columns = [
    {
      field: 'first_name',
      headerClassName: 'course-list-header',
      flex: 1,
      renderHeader: (params) => (
        <div className="center-elements-with-flex">
          <LabeledRadioCheckbox
            type="checkbox"
            isChecked={userId.length === data?.length}
            changeHandler={(e) => {
              setUserId(e.target.checked ? [...data.map((row) => row.id)] : []);
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
          <img src={cohortData?.image_url||"/images/UserCohort.png"} height={60} alt="" />
          <div className={`${styles.titleContainer}`}>
            <span className={`${styles.cohortTitle}`}>{cohortData?.cohort_name||" "}</span>
            <span>Add Users</span>
          </div>
        </div>
        <div className={`${styles.searchBarContainer}`}>
          <img src="/images/svg/search-icon.svg" height={20} alt="" />

          <LabeledInput
            styleClass={styles.inputField}
            inputOptions={{
              inputName: 'search',
              placeholder: 'Search Users'
            }}
          />
        </div>
      </div>
      <ZicopsTable
        columns={columns}
        data={data}
        tableHeight="60vh"
        customStyles={{ padding: '10px 0' }}
        hideFooterPagination={true}
      />
      <div className={`${styles.addUserBottomContainer}`}>
        <div className={`${styles.leftSide}`}>
          Users selected: <span>{selectedUsers}</span>
        </div>
        <div className={`${styles.buttonContainer}`}>
          <UserButton text={'Cancel'} isPrimary={false}/>
          <UserButton text={'Add'} clickHandler={handleAddUser}/>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
<></>;
