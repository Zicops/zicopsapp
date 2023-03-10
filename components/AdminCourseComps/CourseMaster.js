import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import styles from "./adminCourse.module.scss"

export default function CourseMaster() {
  return (
    <>
      {/* input lable */}
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Name :',
          placeholder: 'Enter name of the course',
          value: '',

        }}
        styleClass={`${styles.inputName}`}
      // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
      />

      {/* category and subcategory */}

      <div className={`${styles.lableDropdown}`}>
        <div className={`${styles.lableSubDropdown}`}>
          <label>Category :</label>
          <br />
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'percentage',
              // label: "Category",
              placeholder: 'Select category',
            }}
            styleClass={`${styles.lableInput}`}
          />
        </div>
        <div className={`${styles.lableSubDropdown}`}>
          <label>Sub-categoty :</label>
          <LabeledDropdown
            data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
            dropdownOptions={{
              inputName: 'percentage',
              // label: 'Sub-categoty :',
              placeholder: 'Select sub-category',
            }}
            styleClass={`${styles.lableInput}`}
          />
        </div>
      </div>

      {/* expertise part */}

      <div className={`${styles.expertiseHead}`}>Level of Expertise</div>
      <div className={`${styles.expertise}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          label="Beginner"
          value={""}
          isChecked={""}
          styleClass={`${styles.radioBox}`}
        // changeHandler={}
        />


        <LabeledRadioCheckbox
          type="checkbox"
          label="Competent"
          value={""}
          isChecked={""}
          styleClass={`${styles.radioBox}`}
        // changeHandler={}
        />
        <LabeledRadioCheckbox
          type="checkbox"
          label="Proficient"
          value={""}
          isChecked={""}
          styleClass={`${styles.radioBox}`}
        // changeHandler={}
        />
      </div>


      {/* Owner and Provisioner */}

      <div className={`${styles.lableDropdown}`}>
        <div className={`${styles.lableSubDropdown}`}>
          <label>Owner :</label>
          <LabeledDropdown
            dropdownOptions={{
              placeholder: 'Enter owners name',
            }}
            styleClass={`${styles.lableInput}`}
          />
        </div>
        <div className={`${styles.lableSubDropdown}`}>
          <label>Provisioner :</label>
          <LabeledDropdown
            dropdownOptions={{
              // inputName: 'percentage',
              // label: 'Provisioner :',
              placeholder: 'Enter provisioner name',
              value: ''
            }}
            styleClass={`${styles.lableInput}`}
          />
        </div>
      </div>


      {/* language and no of leaner */}
      <div className={`${styles.lableDropdown}`}>
        <div className={`${styles.lableSubDropdown}`}>
          <label>Language :</label>
          <LabeledDropdown
            dropdownOptions={{
              // inputName: 'percentage',
              // label: 'Language :',
              placeholder: 'Select Language',
              value: '',
            }}
            styleClass={`${styles.lableInput}`}
          />
        </div>
        <div className={`${styles.lableSubDropdown}`}>
          <label>No.of Learners : </label>
          <LabeledInput
            inputOptions={{
              inputName: 'name',
              placeholder: '00',
              value: '',
              isAutoComplete: true

            }}
            styleClass={`${styles.lableInputNum}`}
          // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
      </div>


      {/* setting and controls */}

      <div className={`${styles.settingControls}`}>
        <div>
          <div className={`${styles.settingControlHead}`}>Privacy settings :</div>
          <div className={`${styles.settingControlsInput}`}>
            <LabeledRadioCheckbox
              type="radio"
              label="Organization Level"
              value={""}
              isChecked={""}
              styleClass={`${styles.radioBox}`}
            // changeHandler={}
            />
          </div>
          <div className={`${styles.settingControlsInput}`}>
            <LabeledRadioCheckbox
              type="radio"
              label="Learning space Level"
              value={""}
              isChecked={""}
              styleClass={`${styles.radioBox}`}
            // changeHandler={}
            />
          </div>

        </div>

        <div>
          <div className={`${styles.settingControlHead}`}>Access Control :</div>
          <div className={`${styles.settingControlsInput}`}>
            <LabeledRadioCheckbox
              type="radio"
              label="Open"
              value={""}
              isChecked={""}
              styleClass={`${styles.radioBox}`}
            // changeHandler={}
            />
          </div>
          <div className={`${styles.settingControlsInput}`}>
            <LabeledRadioCheckbox
              type="radio"
              label="Closed"
              value={""}
              isChecked={""}
              styleClass={`${styles.radioBox}`}
            // changeHandler={}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.courseMasterBtn}`}>
        <button>Next</button>
      </div>

    </>
  );
}
