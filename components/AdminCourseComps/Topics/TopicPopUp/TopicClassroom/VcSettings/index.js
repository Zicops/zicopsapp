import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import SwitchBox from './common/SwitchBox';
import styles from './vcSetting.module.scss';
const VcSettings = () => {
  return (
    <div className={`${styles.vcSettingContainer}`}>
      <p className={`${styles.permissionHead}`}>Permission</p>
      <p className={`${styles.subHead}`}>Let Everyone </p>
      <div className={`${styles.switchBoxContainer}`}>
        <div>
          <SwitchBox
            labeledInputProps={{
              label: 'Share their Screen',
              description:
                'If disabled, only Instructor and Moderator will be able to share their screen',
              name: 'Share Screen'
              //   isDisabled: getIsFreezeDisabled(),
              //   isChecked: courseMetaData?.qaRequired || false,
              //   handleChange: (e) => {
              //     const isFreeze = e.target.checked;
              //     if (isFreeze) return setFreezeConfirmBox(true);

              //     setUnFreeze(true);
              //   }
            }}
          />
        </div>
        <div>
          <SwitchBox
            labeledInputProps={{
              label: 'Send Chat Messages',
              description:
                'If disabled, only Instructor and Moderator will be able to post messages to chat',
              name: 'qaRequired'
              //   isDisabled: getIsFreezeDisabled(),
              //   isChecked: courseMetaData?.qaRequired || false,
              //   handleChange: (e) => {
              //     const isFreeze = e.target.checked;
              //     if (isFreeze) return setFreezeConfirmBox(true);

              //     setUnFreeze(true);
              //   }
            }}
          />
        </div>
      </div>
      <div className={`${styles.switchBoxContainer}`}>
        <div>
          <SwitchBox
            labeledInputProps={{
              label: 'Turn on their Microphone',
              description:
                'If disabled, only Instructor and Moderator will be able to access the microphone',
              name: 'qaRequired'
              //   isDisabled: getIsFreezeDisabled(),
              //   isChecked: courseMetaData?.qaRequired || false,
              //   handleChange: (e) => {
              //     const isFreeze = e.target.checked;
              //     if (isFreeze) return setFreezeConfirmBox(true);

              //     setUnFreeze(true);
              //   }
            }}
          />
        </div>
        <div>
          <SwitchBox
            labeledInputProps={{
              label: 'Post Q&A',
              description:
                'If disabled, only Instructor and Moderator will be able to post questions.',
              name: 'qaRequired'
              //   isDisabled: getIsFreezeDisabled(),
              //   isChecked: courseMetaData?.qaRequired || false,
              //   handleChange: (e) => {
              //     const isFreeze = e.target.checked;
              //     if (isFreeze) return setFreezeConfirmBox(true);

              //     setUnFreeze(true);
              //   }
            }}
          />
        </div>
      </div>
      <div className={`${styles.videoSwitch}`}>
        <SwitchBox
          labeledInputProps={{
            label: 'Turn on their Video',
            description:
              'If disabled, only Instructor and Moderator will be able to access the microphone',
            name: 'qaRequired'
            //   isDisabled: getIsFreezeDisabled(),
            //   isChecked: courseMetaData?.qaRequired || false,
            //   handleChange: (e) => {
            //     const isFreeze = e.target.checked;
            //     if (isFreeze) return setFreezeConfirmBox(true);

            //     setUnFreeze(true);
            //   }
          }}
        />
      </div>

      <div className={`${styles.moderatorControlls}`}>
        <LabeledRadioCheckbox
          type="checkbox"
        //   isError={!courseMetaData?.expertiseLevel?.length && error?.includes('expertiseLevel')}
        //   label={COURSE_EXPERTISE_LEVEL.competent}
        //   value={COURSE_EXPERTISE_LEVEL.competent}
        //   isChecked={courseMetaData?.expertiseLevel?.includes(COURSE_EXPERTISE_LEVEL.competent)}
        //   changeHandler={handleExpertise}
        //   isDisabled={isDisabled}
        />
        <p>Allow moderator to take over these controls</p>
      </div>
    </div>
  );
};
export default VcSettings;
