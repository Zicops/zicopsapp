import { useState } from 'react';
import style from './binge.module.scss';

export default function Binge({ video, handleInput, topicContent, bingeData }) {
  const [check, setCheck] = useState(0);
  let videoSrc;
  if (video.file) {
    videoSrc = URL.createObjectURL(video.file);
  }

  return (
    <>
      <div className={`${style.bingerow}`}>
        <div className={`${style.bingeform}`}>
          <div className={`${style.binge_setting}`}>
            <div className={`${style.binge_setting_title}`}>Skip Intro :</div>
            <div className={`${style.binge_setting_body}`}>
              <div className={`${style.newline}`}>
                <span className={`${style.label}`}>Start Time</span>
                <input
                  type="text"
                  name="startTimeMin"
                  className={`${style.valuae}`}
                  value={bingeData.startTimeMin || ''}
                  onChange={handleInput}
                />:
                <input
                  type="text"
                  name="startTimeSec"
                  className={`${style.valuae}`}
                  value={bingeData.startTimeSec || ''}
                  onChange={handleInput}
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
                  value={topicContent.skipIntroDuration || ''}
                  onChange={handleInput}
                />
                {/* <span className={`${value">00</span> */}
                <span className={`${style.after}`}>(Seconds)</span>
              </div>
            </div>
          </div>
          <div className={`${style.binge_setting}`}>
            <div className={`${style.binge_setting_title}`}>Text Topic :</div>
            <div className={`${style.binge_setting_body}`}>
              <div className={`${style.newline}`}>
                <span className={`${style.label}`}>Start Time</span>
                <input
                  type="text"
                  name="nextShowTimeMin"
                  className={`${style.value}`}
                  value={bingeData.nextShowTimeMin || ''}
                  onChange={handleInput}
                />
                <span>:</span>
                <input
                  type="text"
                  name="nextShowTimeSec"
                  className={`${style.value}`}
                  value={bingeData.nextShowTimeSec || ''}
                  onChange={handleInput}
                />
                {/* <span className={`${value">00:15</span> */}
                <span className={`${style.after}`}>(Mins: Secs)</span>
              </div>
            </div>
          </div>
          <div className={`${style.from_end}`}>
            <div className={`${style.checkbox_mark}`}>
              <label className={`${style.checkbox_container}`}>
                <input
                  type="checkbox"
                  name="isFromEnd"
                  onChange={handleInput}
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
      <div className={`${style.center}`}>
        <div className={`${style.checkbox_mark}`}>
          <label className={`${style.checkbox_label}`}>
            <input type="checkbox" />
            <span className={`${style.checkmark_box}`}></span>Set as global binge setting for the Module
          </label>
        </div>
      </div>
    </>
  );
}
