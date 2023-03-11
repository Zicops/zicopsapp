import LabeledDropdown from '../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '../../../common/FormComponents/LabeledTextarea';
import PopUp from '../../../common/PopUp';

const ModulePopUp = () => {
    return (
        <div>
            <PopUp>

                <div>
                    <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            label: 'Module Name:',
                            placeholder: 'Enter name of the module (Upto 60 characters)',
                            maxLength: 60,
                            // value: moduleData.name
                        }}
                    //   changeHandler={(e) =>
                    //     setModuleData({ ...moduleData, name: e.target.value, isUpdated: true })
                    //   }
                    />
                </div>


            </PopUp>
        </div>
    )
};
export default ModulePopUp;
