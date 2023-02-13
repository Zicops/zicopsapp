import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import styles from '../zicopsLogin.module.scss';
const LoginHead = ({ heading, sub_heading, text }) => {
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  // '/images/Zicops-logo-icon.png'
  return (
    <>
      <div className={`${styles.zicops_logo}`}>
        {userOrgData?.logo_url == null ? <div></div> : <img src={`${
                userOrgData?.logo_url?.length
                  ? userOrgData?.logo_url
                  : '/images/Zicops-logo-icon.png'
              }`} width={'90px'} />}
      </div>
      <div className={`${styles.heading}`}>{heading}</div>
      <div className={`${styles.sub_heading}`}>{sub_heading}</div>
      <div className={`${styles.text}`}>{text}</div>
    </>
  );
};

export default LoginHead;
