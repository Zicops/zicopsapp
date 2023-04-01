import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { TopicClassroomAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import SwitchBox from './common/SwitchBox';
import styles from './vcSetting.module.scss';
const VcSettings = ({ handleChange = {}, closeAccordion = () => {} }) => {
  const topicClassroom = useRecoilValue(TopicClassroomAtom);
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
              name: 'Share Screen',
              //   isDisabled: getIsFreezeDisabled(),
              isChecked: topicClassroom?.isScreenShareEnabled,
              handleChange: (e) => {
                handleChange({
                  isScreenShareEnabled: e.target.checked
                });
              }
            }}
          />
        </div>
        <div>
          <SwitchBox
            labeledInputProps={{
              label: 'Send Chat Messages',
              description:
                'If disabled, only Instructor and Moderator will be able to post messages to chat',
              name: 'qaRequired',
              //   isDisabled: getIsFreezeDisabled(),
              isChecked: topicClassroom?.isChatEnabled,
              handleChange: (e) => {
                handleChange({
                  isChatEnabled: e.target.checked
                });
              }
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
              name: 'qaRequired',
              //   isDisabled: getIsFreezeDisabled(),
              isChecked: topicClassroom?.isMicrophoneEnabled,
              handleChange: (e) => {
                handleChange({
                  isMicrophoneEnabled: e.target.checked
                });
              }
            }}
          />
        </div>
        <div>
          <SwitchBox
            labeledInputProps={{
              label: 'Post Q&A',
              description:
                'If disabled, only Instructor and Moderator will be able to post questions.',
              name: 'qaRequired',
              //   isDisabled: getIsFreezeDisabled(),
              isChecked: topicClassroom?.isQaEnabled,
              handleChange: (e) => {
                handleChange({
                  isQaEnabled: e.target.checked
                });
              }
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
            name: 'qaRequired',
            //   isDisabled: getIsFreezeDisabled(),
            isChecked: topicClassroom?.isCameraEnabled,
            handleChange: (e) => {
              handleChange({
                isCameraEnabled: e.target.checked
              });
            }
          }}
        />
      </div>
      {/* isOverrideConfig */}
      <div className={`${styles.moderatorControlls}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          //   isError={!courseMetaData?.expertiseLevel?.length && error?.includes('expertiseLevel')}
          //   label={COURSE_EXPERTISE_LEVEL.competent}
          //   value={COURSE_EXPERTISE_LEVEL.competent}
          isChecked={topicClassroom?.isOverrideConfig}
          changeHandler={(e) => {
            handleChange({ isOverrideConfig: e.target.checked });
          }}
          //   isDisabled={isDisabled}
        />
        <p>Allow moderator to take over these controls</p>
      </div>
    </div>
  );
};
export default VcSettings;
