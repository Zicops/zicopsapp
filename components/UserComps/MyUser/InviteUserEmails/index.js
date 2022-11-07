import UserButton from '@/components/common/UserButton';
import { UsersEmailIdAtom } from '@/state/atoms/users.atom';
import Button from 'common/components/Button';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styles from './inviteUserEmails.module.scss';

const InviteUserEmails = ({ userEmails = [], closePopUp = () => {} }) => {
  const [emailId, setEmailId] = useRecoilState(UsersEmailIdAtom);
  const a = [
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' },
    { label: 'ankitjha' }
  ];
  useEffect(() => {
    console.log(userEmails, 'igi');
  }, []);

  return (
    <>
      <div className={`${styles.inviteUserContainer}`}>
        <div className={`${styles.titleContainer}`}>
          The invite has been send to the following emails:
        </div>
        <div className={`${styles.emailContainer}`}>
          {a.map((email) => (
            <div className={`${styles.emailPills}`}>
              <p>
                {email.label}
                <span>Internal</span>
              </p>
            </div>
          ))}
        </div>
        <div className={`${styles.buttonContainer}`}>
          <Button
            theme="dark"
            clickHandler={() => {
              setEmailId(null);
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
