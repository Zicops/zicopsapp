import proctorImage from '../../../public/images/courses/2.png';
import Image from 'next/image';
import styles from './proctor.module.scss';
import { useRecoilValue } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import ToolTip from '@/components/common/ToolTip';

const ProctoredSection = () => {
  const userData = useRecoilValue(UserStateAtom);

  return (
    <div className={`${styles.proctor_section}`}>
      <div>
        <ToolTip title="Report any issue" placement="bottom">
          <button className={`${styles.proctor_section_btn}`}>Issue?</button>
        </ToolTip>
        <button className={`${styles.proctor_section_btn}`}>Chat</button>
      </div>
      <div className={`${styles.proctor_section_img}`}>
        {/*<img src={'/images/courses/2.png'} width='100%' height='150px' alt={'camera'}/>*/}
      </div>
      <div className={`${styles.proctor_full_width}`}>
        <div className={`${styles.proctor_section_info}`}>
          <p>Name</p>
          <p>ID</p>
        </div>
        <div className={`${styles.proctor_section_info}`}>
          <p>{`${userData?.first_name || ''} ${userData?.last_name || ''}`}</p>
          <p>{`${userData?.id?.substr(0, 4)}`}</p>
        </div>
      </div>
    </div>
  );
};

export default ProctoredSection;
