import { pollArray } from '@/state/atoms/vctool.atoms';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CurrentParticipantDataAtom } from '@/state/atoms/vctool.atoms';
import styles from '../vctoolMain.module.scss';
import PollQA from './PollQA';
const CreatePOll = ({ addPoll, setPollTitle }) => {
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  return (
    <div className={`${styles.moderatorPoll}`}>
      <div className={`${styles.pollModeratorScreen}`}>
        <div className={`${styles.moderatorAddPoll}`}>
          <div className={styles.pollIcon}>
            <img src="/images/svg/vctool/insert-chart.svg" />
          </div>
          <div className={`${styles.pollAvailableHead}`}>No Polls added !</div>
          <p className={`${styles.pollAvailablesubHead}`}>Click below to create new poll</p>
        </div>
      </div>
      {!!currentParticipantData?.isModerator && (
        <button
          className={`${styles.addPollBtn}`}
          onClick={() => {
            setPollTitle();
          }}>
          <div>+</div>Create New Poll
        </button>
      )}
    </div>
  );
};
export default CreatePOll;
