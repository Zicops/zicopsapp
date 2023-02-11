import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import styles from '../zicopsLogin.module.scss';

const LoginHeadOne = ({ heading, sub_heading, info, showImage = true }) => {
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  //'/images/brand/zicops-icon.png'
  return (
    <>
      {showImage && (
        <div className={`${styles.zicops_logo}`}>
          {userOrgData?.logo_url == null ? <div></div> : <img src={`${userOrgData?.logo_url || '/images/brand/zicops-icon.png'}`} />}
        </div>
      )}
      <div className={`${styles.heading}`}>{heading}</div>
      <div className={`${styles.sub_heading}`}>
        <p>{sub_heading}</p>
        {info}
      </div>
    </>
  );
};

export default LoginHeadOne;
