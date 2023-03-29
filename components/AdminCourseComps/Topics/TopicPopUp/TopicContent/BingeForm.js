import useHandleBinge from '@/components/AdminCourseComps/Logic/useHandleBinge';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import styles from '../../../adminCourseComps.module.scss';

export default function BingeForm() {
  const { videoSrc, bingeData, handleBingeInput } = useHandleBinge();

  return (
    <>
      <div className={`${styles.bingeContainer}`}>
        <div className={`${styles.bingeform}`}>
          <div className={`${styles.bingeSetting}`}>
            <div className={`${styles.bingeSettingTitle}`}>Skip Intro :</div>

            <div className={`${styles.bingeSettingBody}`}>
              <div className={`${styles.newline}`}>
                <span className={`${styles.label}`}>Start Time</span>
                <input
                  type="text"
                  name="startTimeMin"
                  className={`${styles.valuae}`}
                  value={bingeData?.startTimeMin || 0}
                  onChange={handleBingeInput}
                  autoComplete="off"
                />
                :
                <input
                  type="text"
                  name="startTimeSec"
                  className={`${styles.valuae}`}
                  value={bingeData?.startTimeSec || 0}
                  onChange={handleBingeInput}
                  autoComplete="off"
                />
                <span className={`${styles.after}`}>(Mins: Secs)</span>
              </div>

              <div className={`${styles.newline}`}>
                <span className={`${styles.label}`}>Duration</span>
                <input
                  type="text"
                  name="skipIntroDuration"
                  className={`${styles.durationvalue}`}
                  value={bingeData?.skipIntroDuration || 0}
                  onChange={handleBingeInput}
                  autoComplete="off"
                />

                <span className={`${styles.after}`}>(Seconds)</span>
              </div>
            </div>
          </div>

          <div className={`${styles.bingeSetting}`}>
            <div className={`${styles.bingeSettingTitle}`}>Next Topic :</div>

            <div className={`${styles.bingeSettingBody}`}>
              <div className={`${styles.newline}`}>
                <span className={`${styles.label}`}>Start Time</span>
                <input
                  type="text"
                  name="showTimeMin"
                  className={`${styles.value}`}
                  value={bingeData?.showTimeMin || 0}
                  onChange={handleBingeInput}
                  autoComplete="off"
                />
                <span>:</span>
                <input
                  type="text"
                  name="showTimeSec"
                  className={`${styles.value}`}
                  value={bingeData?.showTimeSec || 0}
                  onChange={handleBingeInput}
                  autoComplete="off"
                />

                <span className={`${styles.after}`}>(Mins: Secs)</span>
              </div>
            </div>
          </div>

          <div className={`${styles.fromEnd}`}>
            <div className={`${styles.checkbox_mark}`}>
              <LabeledRadioCheckbox
                type="checkbox"
                label={'From End'}
                name="isFromEnd"
                isChecked={bingeData?.isFromEnd}
                changeHandler={handleBingeInput}
              />
            </div>
          </div>
        </div>

        <div className={`${styles.video_preview}`}>
          <video controls>
            <source src={videoSrc} id="video" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
    </>
  );
}
