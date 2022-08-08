import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { Box, Button, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import useHandleAddUserDetails from '../Logic/useHandleAddUser';
import styles from './preview.module.scss';

const SubCategoriesPreview = ({ setCurrentComponent, selected, setSelected }) => {
  const [primary, setPrimary] = useState('');
  const [vidIsOpen, setVidIsOpen] = useState(false);

  const { updateAboutUser, addUserLearningSpaceDetails } = useHandleAddUserDetails();

  const router = useRouter();

  const [userAccountData, setUserAccountData] = useRecoilState(UsersOrganizationAtom);
  const [userBasicData, setUserBasicData] = useRecoilState(UserStateAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const vidRef = useRef(null);

  function handleCompleteSetup() {
    setUserAccountData((prevValue) => ({ ...prevValue, sub_category: primary }));
    console.log(userBasicData, userAccountData);
    setToastMsg({ type: 'success', message: 'Thank you for your precious time!' });
    addUserLearningSpaceDetails(primary);
    updateAboutUser();
    setTimeout(() => {
      console.log(vidRef.current);
      router.prefetch('/');
      setVidIsOpen(true);
      vidRef.current.play();
    }, 1500);
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
        <div className={`${styles.subtitle}`}>Kindly select your primary Sub-Category</div>
        {
          <Grid container spacing={2}>
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
      <div className={`${styles.navigator}`}>
        <span />
        <div className={`${styles.navigatorBtns}`}>
          <Button
            variant={'outlined'}
            className={`${styles.transform_text}`}
            onClick={() => {
              setCurrentComponent(2);
            }}>
            Back
          </Button>
          <Button
            disabled={primary === ''}
            variant={'contained'}
            className={`${styles.input_margin_transform}`}
            onClick={handleCompleteSetup}>
            Complete Setup
          </Button>
        </div>
        {!!vidIsOpen && (
          <div className={`${styles.introVideoContainer}`}>
            <video ref={vidRef} onEnded={() => router.push('/')} disablePictureInPicture>
              <source src="/videos/loginIntro.mp4" type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </>
  );
};

export default SubCategoriesPreview;
