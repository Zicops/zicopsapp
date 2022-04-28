import { useRecoilValue } from 'recoil';
import { BingeAtom } from '../../../../../state/atoms/module.atoms';
import style from './bingeForm.module.scss';

export default function BingeForm({ topicVideo, handleInput }) {
  let videoSrc;
  if (topicVideo.file) {
    videoSrc = URL.createObjectURL(topicVideo.file);
  } else {
    videoSrc = topicVideo.contentUrl;
  }

  const bingeData = useRecoilValue(BingeAtom);

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
                  value={bingeData.startTimeMin}
                  onChange={handleInput}
                />
                :
                <input
                  type="text"
                  name="startTimeSec"
                  className={`${style.valuae}`}
                  value={bingeData.startTimeSec}
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
                  value={bingeData.skipIntroDuration}
                  onChange={handleInput}
                />
                {/* <span className={`${value">00</span> */}
                <span className={`${style.after}`}>(Seconds)</span>
              </div>
            </div>
          </div>
          <div className={`${style.binge_setting}`}>
            <div className={`${style.binge_setting_title}`}>Next Topic :</div>
            <div className={`${style.binge_setting_body}`}>
              <div className={`${style.newline}`}>
                <span className={`${style.label}`}>Start Time</span>
                <input
                  type="text"
                  name="showTimeMin"
                  className={`${style.value}`}
                  value={bingeData.showTimeMin}
                  onChange={handleInput}
                />
                <span>:</span>
                <input
                  type="text"
                  name="showTimeSec"
                  className={`${style.value}`}
                  value={bingeData.showTimeSec}
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
            <span className={`${style.checkmark_box}`}></span>Set as global binge setting for the
            Module
          </label>
        </div>
      </div>
    </>
  );
}
