import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { TopicClassroomAtom } from '@/state/atoms/courses.atom';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import SwitchBox from './common/SwitchBox';
import styles from './vcSetting.module.scss';
const VcSettings = () => {
  const [topicClassroom,setTopicClassroom] = useRecoilState(TopicClassroomAtom);
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
                isChecked: topicClassroom.isScreenShareEnabled,
                handleChange: (e) => {
                  const share = e.target.checked;
                  setTopicClassroom({
                    ...topicClassroom,
                    isScreenShareEnabled:share
                  })
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
                isChecked:topicClassroom.isChatEnabled,
                handleChange: (e) => {
                  const isMessage = e.target.checked;
                  setTopicClassroom({
                    ...topicClassroom,
                     isChatEnabled:isMessage
                  })
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
                isChecked: topicClassroom.isMicrophoneEnabled,
                handleChange: (e) => {
                  const isMicrophone = e.target.checked;
                  setTopicClassroom({
                    ...topicClassroom,
                     isMicrophoneEnabled:isMicrophone
                  })
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
                isChecked: topicClassroom.isQaEnabled,
                handleChange: (e) => {
                  const isQa = e.target.checked;
                  setTopicClassroom({
                    ...topicClassroom,
                     isQaEnabled:isQa
                  })
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
              isChecked: topicClassroom.isCameraEnabled,
              handleChange: (e) => {
                const isCamera = e.target.checked;
                setTopicClassroom({
                  ...topicClassroom,
                   isCameraEnabled:isCamera
                })
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
          isChecked={topicClassroom.isOverrideConfig}
        //   changeHandler={handleExpertise}
        //   isDisabled={isDisabled}
        />
        <p>Allow moderator to take over these controls</p>
      </div>
    </div>
  );
};
export default VcSettings;
