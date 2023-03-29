import { useState } from 'react';
import style from '../../../../adminCourse.module.scss';

const Binge = ({ topicVideo }) => {
  function handleBingeInput(e) {
    if (e.target.type === 'checkbox') {
      return setBingeData({
        ...bingeData,
        [e.target.name]: e.target.checked
      });
    }

    const value = e.target.value.length ? +e.target.value : '';

    setBingeData({
      ...bingeData,
      [e.target.name]: isNaN(value) ? '0' : value
    });
  }

  let videoSrc;
  if (topicVideo?.file) {
    videoSrc = URL?.createObjectURL(topicVideo?.file);
  } else {
    videoSrc = topicVideo?.contentUrl;
  }
  const [bingeData, setBingeData] = useState({
    startTimeMin: 0,
    startTimeSec: 0,
    skipIntroDuration: 0,
    showTimeMin: 0,
    showTimeSec: 5,
    isFromEnd: true
  });

  return (
    <>
      <div className={`${style.bingeContainer}`}>
        <div className={`${style.bingeform}`}>
          <div className={`${style.bingeSetting}`}>
            <div className={`${style.bingeSettingTitle}`}>Skip Intro :</div>
            <div className={`${style.bingeSettingBody}`}>
              <div className={`${style.newline}`}>
                <span className={`${style.label}`}>Start Time</span>
                <input
                  type="text"
                  name="startTimeMin"
                  className={`${style.valuae}`}
                  value={bingeData.startTimeMin || 0}
                  onChange={handleBingeInput}
                />
                :
                <input
                  type="text"
                  name="startTimeSec"
                  className={`${style.valuae}`}
                  value={bingeData.startTimeSec || 0}
                  onChange={handleBingeInput}
                />
                {/* <span className={`${value">20:00</span> */}
                <span className={`${style.after}`}>(Mins: Secs)</span>
              </div>
              <div className={`${style.newline}`}>
                <span className={`${style.label}`}>Duration</span>
                <input
                  type="text"
                  name="skipIntroDuration"
                  className={`${style.durationvalue}`}
                  value={bingeData.skipIntroDuration || 0}
                  onChange={handleBingeInput}
                />
                {/* <span className={`${value">00</span> */}
                <span className={`${style.after}`}>(Seconds)</span>
              </div>
            </div>
          </div>
          <div className={`${style.bingeSetting}`}>
            <div className={`${style.bingeSettingTitle}`}>Next Topic :</div>
            <div className={`${style.bingeSettingBody}`}>
              <div className={`${style.newline}`}>
                <span className={`${style.label}`}>Start Time</span>
                <input
                  type="text"
                  name="showTimeMin"
                  className={`${style.value}`}
                  value={bingeData.showTimeMin || 0}
                  onChange={handleBingeInput}
                />
                <span>:</span>
                <input
                  type="text"
                  name="showTimeSec"
                  className={`${style.value}`}
                  value={bingeData.showTimeSec || 0}
                  onChange={handleBingeInput}
                />
                {/* <span className={`${value">00:15</span> */}
                <span className={`${style.after}`}>(Mins: Secs)</span>
              </div>
            </div>
          </div>

          <div className={`${style.fromEnd}`}>
            <div className={`${style.checkbox_mark}`}>
              <label className={`${style.checkbox_container}`}>
                <input
                  type="checkbox"
                  name="isFromEnd"
                  onChange={handleBingeInput}
                  checked={bingeData.isFromEnd}
                />
                <span className={`${style.checkmark_box}`}></span>From End
              </label>
            </div>
          </div>
        </div>

        <div className={`${style.video_preview}`}>
          <video controls>
            <source src={videoSrc} id="video" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
    </>
  );
};
export default Binge;
