import useHandleUserUpdate from '@/components/LearnerUserProfile/Logic/useHandleUserUpdate';
import { getCurrentHost } from '@/helper/utils.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { Box, Button, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import useHandleAddUserDetails from '../Logic/useHandleAddUser';
import styles from './preview.module.scss';

const SubCategoriesPreview = ({
  setCurrentComponent,
  selected,
  setSelected,
  customStyle = [],
  isUpdate = false,
  popUpClose = () => {},
  basepref = ''
}) => {
  const [primary, setPrimary] = useState(basepref);
  const [vidIsOpen, setVidIsOpen] = useState(false);

  const { updateAboutUser, addUserLearningSpaceDetails, isSubmitDisable } =
    useHandleAddUserDetails();
  const { updatePreferences, _isSubmitDisable } = useHandleUserUpdate();

  const router = useRouter();

  const [userAccountData, setUserAccountData] = useRecoilState(UsersOrganizationAtom);
  const [userBasicData, setUserBasicData] = useRecoilState(UserStateAtom);
  const [fcmToken, setFcmToken] = useRecoilState(FcmTokenAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const vidRef = useRef(null);

  async function handleCompleteSetup() {
    // console.log(selected);
    const sub_categories = selected.map((item) => item.name);

    setUserAccountData((prevValue) => ({ ...prevValue, sub_category: primary }));

    let isError = false;
    isError = await addUserLearningSpaceDetails(sub_categories, primary);
    if (isError) return;
    isError = await updateAboutUser(null,true,true);

    if (isError) return;

    setToastMsg({ type: 'success', message: 'Account Setup is completed!' });
    // sendNotification(
    //   {sendNotification(
    //   {
    //     title: NOTIFICATION_TITLES?.lspWelcome,
    //     body: `Hey ${userBasicData?.first_name} ${userBasicData?.last_name}, Welcome to ${userAccountData?.learningSpace_name} learning space. We wish you the best on your journey towards growth and empowerment.`,
    //     user_id: [JSON.parse(sessionStorage.getItem('loggedUser'))?.id]
    //   },
    //   { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    // );
    //     title: NOTIFICATION_TITLES?.lspWelcome,
    //     body: `Hey ${userBasicData?.first_name} ${userBasicData?.last_name}, Welcome to ${userAccountData?.learningSpace_name} learning space. We wish you the best on your journey towards growth and empowerment.`,
    //     user_id: [JSON.parse(sessionStorage.getItem('loggedUser'))?.id]
    //   },
    //   { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    // );
    router.prefetch('/');
    setVidIsOpen(true);
    vidRef?.current?.play();
    // console.log('from add');
  }

  async function handleUpdate() {
    await updatePreferences(selected, primary);
    popUpClose(false);
    setCurrentComponent(2);
    router.reload();
  }

  useEffect(() => {
    sessionStorage.setItem('loggedUser', JSON.stringify(userBasicData));
    if (!!userAccountData?.user_role_id)
      return sessionStorage.setItem('userAccountSetupData', JSON.stringify(userAccountData));
  }, [userAccountData, userBasicData]);

  const deleteObject = (subCategory) => {
    const temp = selected;
    const index = selected.findIndex((obj) => obj.name === subCategory.name);
    temp.splice(index, 1);
    setSelected([...temp]);
  };

  const CustomChip = styled(Chip)(({ theme }) => ({
    padding: '20px 12px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '2px solid #484848',
    '&.MuiChip-root': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
    // "&:hover": {
    //     borderColor: '#D6D6D6'
    // },
  }));

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.title}`}>Selected Sub-Categories</div>
        <div className={`${styles.subtitle} ${customStyle[0]}`}>
          Kindly select your primary Sub-Category
        </div>
        {
          <Grid container spacing={2} className={`${customStyle[1]}`}>
            {selected.map((subCategory) => (
              <Grid item xs={4}>
                <CustomChip
                  className={`${
                    primary === subCategory.name ? styles.checkbox_container_selected : ''
                  }`}
                  label={subCategory.name}
                  onClick={() => {
                    setPrimary(subCategory.name);
                  }}
                  onDelete={() => {
                    if (primary !== subCategory.name && selected.length > 5)
                      deleteObject(subCategory);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        }
        <Box mt={3} />
      </div>
      <div className={`${styles.navigator} ${customStyle[2]}`}>
        <span />
        <div className={`${styles.navigatorBtns}`}>
          <Button
            variant={'outlined'}
            className={`${styles.backBtn} ${styles.transform_text}`}
            onClick={() => {
              setCurrentComponent(2);
            }}>
            {basepref ? 'Add' : 'Back'}
          </Button>
          <Button
            disabled={primary === '' || isSubmitDisable || _isSubmitDisable}
            variant={'contained'}
            className={`${styles.input_margin_transform}`}
            onClick={() => {
              isUpdate ? handleUpdate() : handleCompleteSetup();
            }}>
            Complete Setup
          </Button>
        </div>
        {!!vidIsOpen && (
          <div className={`${styles.introVideoContainer}`}>
            <video
              ref={vidRef}
              onEnded={() => {
                const currentHost = getCurrentHost();
                let website = sessionStorage?.getItem('org_domain');
                if (currentHost !== website) {
                  const token = sessionStorage.getItem('tokenF');
                  const userLspRole = sessionStorage.getItem('user_lsp_role');
                  const lspId = sessionStorage.getItem('lsp_id');
                  const userLspId = sessionStorage.getItem('user_lsp_id');

                  window.location.href = `https://${website}/auth-verify/?role=${userLspRole}&lspId=${lspId}&userLspId=${userLspId}&token=${token}`;
                  return;
                }
                router.push('/');
              }}
              disablePictureInPicture>
              <source src="/videos/loginIntro.mp4" type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </>
  );
};

export default SubCategoriesPreview;
