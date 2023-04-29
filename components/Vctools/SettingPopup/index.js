import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import RangeSlider from '@/components/common/FormComponents/RangeSlider';
import StyledSlider from '@/components/common/FormComponents/RangeSlider/StyledSlider';
import styles from '../vctoolMain.module.scss';
import style from './vctoolSetting.module.scss';
import VcRangeSlider from './VcRangeSlider';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { vcToolNavbarState } from '@/state/atoms/vctool.atoms';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
const SettingPopup = ({ hide, api }) => {
  const [hideToolBar, setHideToolbar] = useRecoilState(vcToolNavbarState);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [currentDevices, setCurrentDevices] = useState([]);
  const [videoQuality, setVideoQuality] = useState(0);

  useEffect(async () => {
    const availableDevices = await api.getAvailableDevices();
    let _availableAudioInputDevices = availableDevices?.audioInput
      ? availableDevices?.audioInput?.map((device) => {
          return { ...device, value: device.label };
        })
      : [];
    let _availableAudioOutputDevices = availableDevices?.audioOutput
      ? availableDevices?.audioOutput?.map((device) => {
          return { ...device, value: device.label };
        })
      : [];
    let _availableCameraDevices = availableDevices?.videoInput
      ? availableDevices?.videoInput?.map((device) => {
          return { ...device, value: device.label };
        })
      : [];

    const currentDevices = await api.getCurrentDevices();
    let _currentAudioInputDevices = currentDevices?.audioInput
      ? { ...currentDevices?.audioInput, value: currentDevices?.audioInput.label }
      : {};
    let _currentAudioOutputDevices = currentDevices?.audioOutput
      ? { ...currentDevices?.audioOutput, value: currentDevices?.audioOutput.label }
      : {};
    let _currentCameraDevices = currentDevices?.videoInput
      ? { ...currentDevices?.videoInput, value: currentDevices?.videoInput.label }
      : {};

    setAvailableDevices({
      audioInput: _availableAudioInputDevices,
      audioOutput: _availableAudioOutputDevices,
      videoInput: _availableCameraDevices,
    });
    setCurrentDevices({
      audioInput: _currentAudioInputDevices,
      audioOutput: _currentAudioOutputDevices,
      videoInput: _currentCameraDevices,
    });

    const _videoQuality = api.getVideoQuality();
    setVideoQuality(_videoQuality);
  }, []);

  useEffect(() => {
    console.info(availableDevices, currentDevices, videoQuality);
  }, [availableDevices, currentDevices, videoQuality]);

  function setAudioInput(device) {
    api.setAudioInputDevice(device.label, device.deviceId);
    setCurrentDevices((currentDevices) => ({
      ...currentDevices,
      audioInput: device,
    }));
  }
  function setAudioOutput(device) {
    api.setAudioOutputDevice(device.label, device.deviceId);
    setCurrentDevices((currentDevices) => ({
      ...currentDevices,
      audioOutput: device,
    }));
  }
  function setVideoInput(device) {
    api.setVideoInputDevice(device.label, device.deviceId);
    setCurrentDevices({
      ...currentDevices,
      videoInput: device,
    });
  }
  return (
    <div
      className={`${styles.vcToolSettingContainer}`}
      onMouseEnter={() => setHideToolbar(false)}
      onMouseLeave={() => setHideToolbar(null)}>
      <div className={`${styles.vctToolSettingHead}`}>
        <div>Settings</div>
        <button
          onClick={() => {
            hide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.vcToolSettingScreen}`}>
        <div className={`${style.audioAndVideoSettingContainer}`}>
          <p>Audio & Video</p>
          <div>
            <p>Microphone :</p>
            <LabeledDropdown
              styleClass={style.settingInputLable}
              dropdownOptions={{
                placeholder: 'Select Audio In',
                inputName: 'microphone',
                options: availableDevices?.audioInput,
                value: currentDevices?.audioInput,
              }}
              changeHandler={(device) => setAudioInput(device)}
            />
          </div>
          <div>
            <p>Speaker :</p>
            <LabeledDropdown
              styleClass={style.settingInputLable}
              dropdownOptions={{
                placeholder: 'Select Audio Out',
                inputName: 'speaker',
                options: availableDevices?.audioOutput,
                value: currentDevices?.audioOutput,
              }}
              changeHandler={(device) => setAudioOutput(device)}
            />
          </div>
          <div>
            <p>Camera :</p>
            <LabeledDropdown
              styleClass={style.settingInputLable}
              dropdownOptions={{
                placeholder: 'Select Camera',
                inputName: 'camera',
                options: availableDevices?.videoInput,
                value: currentDevices?.videoInput,
              }}
              changeHandler={(device) => setVideoInput(device)}
            />
          </div>
        </div>

        <div className={`${style.vctoolPerformanceContainer}`}>
          <p>Performance</p>
          <div className={`${style.rsliderContainer}`}>
            <VcRangeSlider />
            <div>
              <small>Best performance</small>
              <small>Highest quality</small>
            </div>
          </div>
        </div>

        <div className={`${style.vctoolLayout}`}>
          <p>Layout</p>
          <div className={`${style.layout}`}>
            <LabeledRadioCheckbox
              type="radio"
              label="ClassRoom"
              name="vcToolLayout"
              //   isChecked={fullCourse?.lspId === userOrgData?.lsp_id}
              //   isDisabled={true}
              //   changeHandler={(e) => {
              //     updateCourseMaster({ ...fullCourse, lspId: userOrgData?.lsp_id });
              //   }}
            />
            <img src="/images/svg/vctool/classRoomView.svg" />
          </div>

          <div className={`${style.layout}`}>
            <LabeledRadioCheckbox
              type="radio"
              label="Front of the class"
              name="vcToolLayout"
              //   isChecked={fullCourse?.lspId === userOrgData?.lsp_id}
              //   isDisabled={true}
              //   changeHandler={(e) => {
              //     updateCourseMaster({ ...fullCourse, lspId: userOrgData?.lsp_id });
              //   }}
            />
            <img src="/images/svg/vctool/branding-watermark.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingPopup;
