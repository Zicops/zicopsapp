import { CurrentParticipantDataAtom } from '@/state/atoms/vctool.atoms';
import styles from '../vctoolMain.module.scss';
import { useRecoilValue } from 'recoil';
const CreateResource = ({ addResource }) => {
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);

  return (
    <div className={`${styles.resourceModeratorContainer}`}>
      <div className={`${styles.resourceModeratorScreen}`}>
        <div className={`${styles.moderatorAddResource}`}>
          <div className={styles.recourceIcon}>
            <img src="/images/svg/vctool/library-books.svg" />
          </div>
          <div className={`${styles.resourceAvailableHead}`}>No resources available!</div>
          <p className={`${styles.resourceAvailablesubHead}`}>
            {!!currentParticipantData?.isModerator
              ? 'Click below to add resources'
              : 'Moderator has not added resources'}
          </p>
        </div>
      </div>

      {!!currentParticipantData?.isModerator && (
        <button
          className={`${styles.addResourceBtn}`}
          onClick={() => {
            addResource();
          }}>
          <div>+</div>Add Resource
        </button>
      )}
    </div>
  );
};
export default CreateResource;
