import { pollArray } from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
const ParticipantPollBox = ({ pollNumber, publish, pollQuestion, options }) => {
  const [expand, setexpand] = useState(true);
  return (
    <div className={`${styles.quizQuestion}`}>
      <div className={`${styles.pollQuestionhead}`}>
        <div className={`${styles.pollLable}`}>
          <img src="/images/svg/vctool/Poll Icon-on.svg" />
          <div>{pollNumber}</div>
        </div>
        <div className={`${styles.quizeExpand}`}>
          {/* <div className={`${styles.publishPollHead}`}>{publish}publish</div> */}
          <button
            onClick={() => {
              setexpand(!expand);
            }}>
            {
              <img
                src={
                  expand
                    ? '/images/svg/vctool/expand-more.svg'
                    : '/images/svg/vctool/expand-less.svg'
                }
              />
            }
          </button>
        </div>
      </div>

      <div>
        {!expand ? (
          <div className={`${styles.pollQuestionScreen}`}>
            <div className={`${styles.participantpollQuestions}`}>{pollQuestion}</div>
            <div className={`${styles.participantPollBoxOptions}`}>
              {options.map((data, index) => {
                return (
                  <div>
                    <LabeledRadioCheckbox
                      type="radio"
                    //   isError={
                    //     !courseMetaData?.expertiseLevel?.length && error?.includes('expertiseLevel')
                    //   }
                    //   label={COURSE_EXPERTISE_LEVEL.beginner}
                    //   value={COURSE_EXPERTISE_LEVEL.beginner}
                    //   isChecked={courseMetaData?.expertiseLevel?.includes(
                    //     COURSE_EXPERTISE_LEVEL.beginner
                    //   )}
                    //   changeHandler={handleExpertise}
                    //   isDisabled={isDisabled}
                    />
                    {data.value}
                  </div>
                );
              })}
            </div>
            <div className={`${styles.participantPollBoxBtns}`}>
              <button>submit</button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default ParticipantPollBox;
