import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import RangeSlider from '@/components/common/FormComponents/RangeSlider';
import StyledSlider from '@/components/common/FormComponents/RangeSlider/StyledSlider';
import styles from '../vctoolMain.module.scss';
import style from './vctoolSetting.module.scss';
import VcRangeSlider from './VcRangeSlider';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { vcToolNavbarState } from '@/state/atoms/vctool.atoms';
import { useRecoilState } from 'recoil';
const SettingPopup = ({ hide }) => {
  const [hideToolBar, setHideToolbar] = useRecoilState(vcToolNavbarState);
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
              // isError={!fullCourse?.language?.length && courseError?.master}
              dropdownOptions={{
                placeholder: 'Built-in Audio',
              }}
              // changeHandler={(e) =>
              //     changeHandler(e, fullCourse, updateCourseMaster, languageDropdownOptions.inputName)
              // }
            />
          </div>
          <div>
            <p>Speaker :</p>
            <LabeledDropdown
              styleClass={style.settingInputLable}
              // isError={!fullCourse?.language?.length && courseError?.master}
              dropdownOptions={{
                placeholder: 'Realtek Audio',
              }}
              // changeHandler={(e) =>
              //     changeHandler(e, fullCourse, updateCourseMaster, languageDropdownOptions.inputName)
              // }
            />
          </div>
          <div>
            <p>Camera :</p>
            <LabeledDropdown
              styleClass={style.settingInputLable}
              // isError={!fullCourse?.language?.length && courseError?.master}
              dropdownOptions={{
                placeholder: 'Integrated Camera',
              }}
              // changeHandler={(e) =>
              //     changeHandler(e, fullCourse, updateCourseMaster, languageDropdownOptions.inputName)
              // }
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
              //   name="lspId"
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
              //   name="lspId"
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
