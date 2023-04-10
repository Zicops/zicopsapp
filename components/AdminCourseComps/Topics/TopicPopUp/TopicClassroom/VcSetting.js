import SwitchBox from '@/components/AdminCourseComps/common/SwitchBox';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { TopicClassroomAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';

export default function VcSetting({ handleChange = () => {} }) {
  const topicClassroom = useRecoilValue(TopicClassroomAtom);

  return (
    <>
      <div className={`${styles.vcSettingContainer}`}>
        <p>Permission</p>
        <p className={`${styles.darkThreeText}`}>Let Everyone </p>

        <div className={`${styles.toggleBtnContainer}`}>
          <SwitchBox
            labeledInputProps={{
              label: 'Share their Screen',
              description:
                'If disabled, only Instructor and Moderator will be able to share their screen',
              isChecked: topicClassroom?.isScreenShareEnabled,
              handleChange: (e) => handleChange({ isScreenShareEnabled: e.target.checked })
            }}
          />

          <SwitchBox
            labeledInputProps={{
              label: 'Send Chat Messages',
              description:
                'If disabled, only Instructor and Moderator will be able to post messages to chat',
              isChecked: topicClassroom?.isChatEnabled,
              handleChange: (e) => handleChange({ isChatEnabled: e.target.checked })
            }}
          />

          <SwitchBox
            labeledInputProps={{
              label: 'Turn on their Microphone',
              description:
                'If disabled, only Instructor and Moderator will be able to access the microphone',
              isChecked: topicClassroom?.isMicrophoneEnabled,
              handleChange: (e) => handleChange({ isMicrophoneEnabled: e.target.checked })
            }}
          />

          <SwitchBox
            labeledInputProps={{
              label: 'Post Q&A',
              description:
                'If disabled, only Instructor and Moderator will be able to post questions.',
              isChecked: topicClassroom?.isQaEnabled,
              handleChange: (e) => handleChange({ isQaEnabled: e.target.checked })
            }}
          />

          <SwitchBox
            labeledInputProps={{
              label: 'Turn on their Video',
              description:
                'If disabled, only Instructor and Moderator will be able to access the microphone',
              isChecked: topicClassroom?.isCameraEnabled,
              handleChange: (e) => handleChange({ isCameraEnabled: e.target.checked })
            }}
          />
        </div>

        <LabeledRadioCheckbox
          type="checkbox"
          label={
            <span className={`${styles.darkThreeText}`}>
              Allow moderator to take over these controls
            </span>
          }
          isChecked={topicClassroom?.isOverrideConfig}
          changeHandler={(e) => handleChange({ isOverrideConfig: e.target.checked })}
        />
      </div>
    </>
  );
}
