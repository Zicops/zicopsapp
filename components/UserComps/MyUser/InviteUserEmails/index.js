import { UsersEmailIdAtom } from '@/state/atoms/users.atom';
import Button from 'common/components/Button';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styles from './inviteUserEmails.module.scss';
import UserEmailPills from './UserEmailPills';

const InviteUserEmails = ({
  userEmails = [],
  closePopUp = () => {},
  userType = '',
  existingEmails = []
}) => {
  const [emailId, setEmailId] = useRecoilState(UsersEmailIdAtom);
  const router = useRouter();

  useEffect(() => {
    // console.log(userEmails, 'igi');
    if (userType === '') return;
  }, []);

  return (
    <>
      <div className={`${styles.inviteUserContainer}`}>
        {!!userEmails?.length && (
          <UserEmailPills
            userEmails={userEmails}
            userType={userType}
            title={'The invite has been sent to the following emails:'}
          />
        )}
        {!!existingEmails?.length && (
          <UserEmailPills
            userEmails={existingEmails}
            userType={userType}
            title={'Following emails already exist:'}
          />
        )}
        <div className={`${styles.buttonContainer}`}>
          <Button
            theme="dark"
            clickHandler={() => {
              setEmailId(null);
              router.push('/admin/user/my-users');
            }}>
            Go Back to My Users
          </Button>
          <Button
            clickHandler={() => {
              setEmailId(null);
              closePopUp(false);
            }}>
            Add More Users
          </Button>
          {/* <UserButton text={'Back to My Users'}/> */}
        </div>
      </div>
    </>
  );
};

export default InviteUserEmails;
