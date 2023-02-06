import { UPDATE_COHORT_MAIN, userClient } from '@/api/UserMutations';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import UserButton from '@/components/common/UserButton';
import ZicopsTable from '@/components/common/ZicopsTable';
import useHandleCohortTab from '@/components/LearnerUserProfile/Logic/useHandleCohortTab';
import { sendEmail, sendNotificationWithLink } from '@/helper/api.helper';
import { getNotificationMsg } from '@/helper/common.helper';
import { EMAIL_TEMPLATE_IDS, NOTIFICATION_TITLES } from '@/helper/constants.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CohortMasterData, UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../../../userComps.module.scss';
import useCohortUserData from '../../Logic/useCohortUserData';

const AddUsers = ({
  cohortUsers = [],
  usersData = [],
  popUpSetState = () => {},
  onUserAdd = () => {}
}) => {
  // const { addUserToCohort } = addUserData();
  const fcmToken = useRecoilValue(FcmTokenAtom);
  const [cohortData, setCohortData] = useRecoilState(CohortMasterData);
  const selectedUsers = `${userId?.length}/${usersData?.length}`;
  const [userId, setUserId] = useState([]);
  const [mails, setMails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [data, setData] = useState(null);
  const { addUserToCohort } = useHandleCohortTab();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [updateCohortMain, { error: updateCohortError }] = useMutation(UPDATE_COHORT_MAIN, {
    client: userClient
  });
  const router = useRouter();
  useEffect(() => {
    if (!usersData.length) return;
    return setData([...usersData]);
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
    //   const lspData = await loadQueryDataAsync(GET_USER_LEARNINGSPACES_DETAILS,{user_id:userId[i],lsp_id:<lsp_id>},{},userQueryClient);
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
      return setToastMsg({ type: 'danger', message: 'Error while adding user!' });
    }

    const sendCohortData = {
      cohort_id: cohortData?.id,
      name: cohortData?.cohort_name,
      description: cohortData?.description,
      lsp_id: userOrgData?.lsp_id,
      code: cohortData?.cohort_code,
      status: 'SAVED',
      type: cohortData?.cohort_type,
      is_active: true,
      size: cohortData?.managers?.length || 1
    };

    // console.log(cohortUsers,'users')

    let origin = window?.location?.origin || '';
    if (cohortUsers?.length) sendCohortData.size = cohortUsers?.length + userId?.length;
    let isError = false;
    const res = await updateCohortMain({ variables: sendCohortData }).catch((err) => {
      console.log(err);
      isError = !!err;
    });
    if (isError) {
      setIsBtnDisabled(false);
      return setToastMsg({ type: 'danger', message: 'Cohort Data Update Error' });
    }

    setToastMsg({ type: 'success', message: 'Added users successfully!' });
    popUpSetState(false);
    const notificationBody = getNotificationMsg('cohortAssign', {
      cohortName: cohortData?.cohort_name
    });
    if (!notificationBody)
      setToastMsg({ type: 'danger', message: 'Error while sending notificaiton.' });

    const bodyData = {
      user_name: '',
      lsp_name:sessionStorage?.getItem('lsp_name'),
      cohort_name: cohortData?.cohort_name,
      link: `${origin}/my-profile?tabName=Cohort`
    };
    const sendEmailBody = {
      to: mails,
      sender_name: sessionStorage?.getItem('lsp_name'),
      user_name: [],
      body: JSON.stringify(bodyData),
      template_id: EMAIL_TEMPLATE_IDS?.cohortAssign
    };

     sendNotificationWithLink(
      {
        title: NOTIFICATION_TITLES?.cohortAssign,
        body: notificationBody,
        user_id: data,
        link:''
      },
      { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    );

    //  await sendNotificationWithLink(
    //   {
    //     title: NOTIFICATION_TITLES?.cohortAssign,
    //     body: notificationBody,
    //     user_id: data,
    //     link: '/my-profile'
    //   },
    //   { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    // );

     sendEmail(sendEmailBody, {
      context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } }
    });
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
                const userEmail = [...mails];

                if (e.target.checked) {
                  userList.push(params.id);
                  userEmail.push(params?.row?.email);
                } else {
                  const index = userList.findIndex((id) => id === params.id);
                  userList.splice(index, 1);
                  const i = userEmail.findIndex((mail) => mail === params?.row?.email);
                  userEmail.splice(i, 1);
                }

                setUserId(userList);
                setMails(userEmail);
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
        <div className={`${styles.leftContainer}`}>
          <div className={`${styles.imageContainer}`}>
            <img src={cohortData?.image_url || '/images/UserCohort.png'} alt="" />
          </div>
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
          Users selected: <span>{`${userId?.length || '0'}/${data?.length || '0'}`}</span>
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
