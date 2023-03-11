import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import UploadForm from '@/components/common/FormComponents/UploadForm';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import InputWithCheckbox from '@/common/InputWithCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import RTE from '@/components/common/FormComponents/RTE';
import styles from "../adminCourse.module.scss"
import Dropdown from '@/components/common/Dropdown';
import DropdownSelect from '@/components/Tabs/common/DropdownSelect';
// import TwoRowCarousel from '../common/TwoRowCarousel';
import SwitchButton from '@/common/FormComponents/SwitchButton';
import InputTimePicker from '@/common/FormComponents/InputTimePicker';
import InputDatePicker from '@/common/InputDatePicker';
import IconButton from '../../common/IconButton';
import ModulePopUp from './ModulePopup';
import PopUp from '@/components/common/PopUp';
import BlackRow from '@/components/common/BlackRow';
import BlackBox from '@/components/common/BlackBox';
import ModuleBox from './ModuleBox';
// import BlackRow from '/common/BlackRow';
const Topics = () => {
  const boxPopup = [{
    name: "module1",
    level: "Begginer",
    descriptioon: "this is module1"
  },
  {
    name: "module2",
    level: "Competent",
    descriptioon: "this is module2"
  }
  ]
  return (
    <>
      {
        boxPopup.map((mod) => {
          return (
            <ModuleBox />
          )
        })
      }
      <div className={`${styles.addModuleBtn}`}>
        <IconButton
          text="Add Module"
          //   isDisabled={isDisabled}
          styleClass="btnBlack"
        //   handleClick={handleModuleClick}
        />
      </div>
      <ModulePopUp  />

    </>
  )
};
export default Topics