import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import styles from "./adminCourse.module.scss"
import { useRecoilState, useRecoilValue } from "recoil"
import { courseMaster } from '@/state/atoms/admincourse.atom';
import { useContext, useEffect, useState } from 'react';
import useHandleTabs from '../Tabs/Logic/useHandleTabs';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { courseContext } from '@/state/contexts/CourseContext';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { GET_VENDORS_BY_LSP_FOR_TABLE, userQueryClient } from '@/api/UserQueries';
export default function CourseMaster() {
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [ownerList, setOwnerList] = useState(null);
  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);
  useEffect(() => {
    if (isVendor && !userData?.id) return;

    if (isVendor) {
      loadQueryDataAsync(GET_USER_VENDORS, { user_id: userData?.id }, {}, userQueryClient)
        .then((res) => {
          const _owners = ['Zicops', res?.getUserVendor?.[0]?.name];
          setOwnerList(_owners?.map((owner) => ({ value: owner, label: owner })));
        })
        .catch((err) => {
          console.log('Error while loading user vendor', err);
          setOwnerList([{ value: 'Zicops', label: 'Zicops' }]);
        });
      return;
    }

    loadQueryDataAsync(
      GET_VENDORS_BY_LSP_FOR_TABLE,
      { lsp_id: userOrgData?.lsp_id },
      {},
      userQueryClient
    )
      .then((res) => {
        const _owners = ['Zicops', ...(res?.getVendors?.map((vendor) => vendor?.name) || [])];
        setOwnerList(_owners?.filter((o) => !!o)?.map((owner) => ({ value: owner, label: owner })));
      })
      .catch((err) => {
        console.log('Error while loading lsp vendors', err);
        setOwnerList([{ value: 'Zicops', label: 'Zicops' }]);
      });
  }, [isVendor ? userData?.id : '']);
  const courseMasterData = useRecoilValue(courseMaster)
  const [courseMasterInfo, setcourseMasterInfo] = useRecoilState(courseMaster)
  const [languageArray, setlanguageArray] = useState([])
  // courseMaster
  const [isBeginner, setisBeginner] = useState(courseMasterData.beginnerLevel)
  const [isCompetent, setisCompetent] = useState(courseMasterData.competentLeavel)
  const [isProficient, setisProficient] = useState(courseMasterData.proficientLevel)
  {/* fullCourse?.language?.map((val) => allSelectedLanguages.push({ value: val, label: val })); */ }
  const selectedLanguage = []
  const courseContextData = useContext(courseContext);
  const { fullCourse, updateCourseMaster, handleChange } = useHandleTabs(courseContextData);
  const { catSubCat, setActiveCatId } = useHandleCatSubCat(fullCourse?.category);
  // console.log(catSubCat)
  const categoryDropdownOptions = {
    inputName: 'category',
    // label: 'Course Category',
    placeholder: 'Select the category of the course',
    options: catSubCat?.cat,
    value: courseMasterInfo.category ?
      { value: courseMasterInfo.category, label: courseMasterInfo.category }
      : null,
    isSearchEnable: true,
    // isDisabled: isDisabled
  };

  const subcategoryDropdownOptions = {
    inputName: 'sub_category',
    // label: 'Base Sub-category',
    placeholder: 'Select the sub-category of the course',
    options: catSubCat.subCat,
    value: courseMasterInfo.subCategory ?
      { value: courseMasterInfo.subCategory, label: courseMasterInfo.subCategory }
      : null,
    isSearchEnable: true,
    // isDisabled: isDisabled
  };


  const ownerDropdownOptions = {
    inputName: 'owner',
    // label: 'Course Owner',
    placeholder: 'Enter owners name',
    options: ownerList || [],
    value: courseMasterInfo.ownerName ? { value: courseMasterInfo.ownerName, label: courseMasterInfo.ownerName } : null,
    isSearchEnable: true,
    // isDisabled: isDisabled
  };

  const Provisioner = [{ label: "Sandeep", value: "Sandeep" },
  { label: "ABC", value: "ABC" },
  { label: "Anil", value: "Anil" }]

  const Language = [{ label: "Hindi", value: "Hindi" },
  { label: "English", value: "English" },
  { label: "Arabic", value: "Arabic" }]
  // courseMasterInfo.language.map((val)=>
  // {
  //   selectedLanguage.push()
  // })
  return (
    <>
      {/* input lable */}
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Name :',
          placeholder: 'Enter name of the course',
          value: courseMasterData.courseName,
        }}
        styleClass={`${styles.inputName}`}
        changeHandler={(e) => {
          setcourseMasterInfo({
            ...courseMasterInfo,
            courseName: e.target.value
          })

        }}
      />

      {/* category and subcategory */}

      <div className={`${styles.lableDropdown}`}>
        <div className={`${styles.lableSubDropdown}`}>
          <label>Category :</label>
          <br />
          <LabeledDropdown
            // dropdownOptions={{
            //   inputName: 'Category ',
            //   // label: 'Course Category',
            //   placeholder: 'Select category',
            //   options: allCategory.cat,
            //   // isSearchEnable: true,
            //   value: courseMasterInfo.category ? { value: courseMasterInfo.category, label: courseMasterInfo.category } : null,
            //   // isDisabled: false
            // }}
            dropdownOptions={categoryDropdownOptions}
            styleClass={`${styles.lableInput}`}
            changeHandler={(e) => {
              setcourseMasterInfo({
                ...courseMasterInfo,
                category: e.value
              })
            }
            }
          />
        </div>
        <div className={`${styles.lableSubDropdown}`}>
          <label>Sub-categoty :</label>
          <LabeledDropdown
            // dropdownOptions={{
            //   inputName: 'percentage',
            //   options: allCategory.subcat,
            //   // label: 'Sub-categoty :',
            //   placeholder: 'Select sub-category',
            //   value: courseMasterInfo.subCategory ? { value: courseMasterInfo.subCategory, label: courseMasterInfo.subCategory } : null,
            // }}

            dropdownOptions={subcategoryDropdownOptions}
            styleClass={`${styles.lableInput}`}
            changeHandler={(e) => {

              setcourseMasterInfo({
                ...courseMasterInfo,
                subCategory: e.value
              })
            }}
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
          name="check"
          isChecked={isBeginner}

          styleClass={`${styles.radioBox}`}
          changeHandler={(e) => {
            setisBeginner(!isBeginner)
            setcourseMasterInfo({
              ...courseMasterInfo,
              beginnerLevel: !isBeginner,

            })
          }}

        />


        <LabeledRadioCheckbox
          type="checkbox"
          label="Competent"
          name="check"
          value={""}
          isChecked={isCompetent}
          styleClass={`${styles.radioBox}`}
          changeHandler={(e) => {
            setisCompetent(!isCompetent)
            setcourseMasterInfo({
              ...courseMasterInfo,
              competentLeavel: !isCompetent
            })
          }}
        />
        <LabeledRadioCheckbox
          type="checkbox"
          label="Proficient"
          name="check"
          value={""}
          isChecked={isProficient}
          styleClass={`${styles.radioBox}`}
          changeHandler={(e) => {
            setisProficient(!isProficient)
            setcourseMasterInfo({
              ...courseMasterInfo,
              proficientLevel: !isProficient
            })
          }}
        />
      </div>


      {/* Owner and Provisioner */}

      <div className={`${styles.lableDropdown}`}>
        <div className={`${styles.lableSubDropdown}`}>
          <label>Owner :</label>
          <LabeledDropdown
            // dropdownOptions={{
            //   placeholder: 'Enter owners name',
            //   options: owner,
            //   value: courseMasterInfo.ownerName ? { value: courseMasterInfo.ownerName, label: courseMasterInfo.ownerName } : null
            // }}
            dropdownOptions={ownerDropdownOptions}
            styleClass={`${styles.lableInput}`}
            changeHandler={(e) => {
              setcourseMasterInfo({
                ...courseMasterInfo,
                ownerName: e.value
              })
            }}
          />
        </div>
        <div className={`${styles.lableSubDropdown}`}>
          <label>Provisioner :</label>
          <LabeledDropdown
            dropdownOptions={{
              // inputName: 'percentage',
              // label: 'Provisioner :',
              placeholder: 'Enter provisioner name',
              options: Provisioner,
              value: courseMasterInfo.provisionerName ? { value: courseMasterInfo.provisionerName, label: courseMasterInfo.provisionerName } : null,
            }}
            styleClass={`${styles.lableInput}`}
            changeHandler={(e) => {
              setcourseMasterInfo({
                ...courseMasterInfo,
                provisionerName: e.value
              })
            }}
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
              options: Language,
              value: courseMasterInfo.language,
              isSearchEnable: true,
              // menuPlacement: 'top',
              isMulti: true,
            }}
            styleClass={`${styles.lableInput}`}
            changeHandler={(e) => {
              setlanguageArray([...languageArray, e.value])
              setcourseMasterInfo({
                ...courseMasterInfo,
                language: e.value,

              })
            }}
          />
        </div>
        <div className={`${styles.lableSubDropdown}`}>
          <label>No.of Learners : </label>
          <LabeledInput
            inputOptions={{
              inputName: 'name',
              placeholder: '00',
              value: '',
              isAutoComplete: true,

            }}
            styleClass={`${styles.lableInputNum}`}

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
        <button onClick={() => {

        }}>Next</button>
      </div>

    </>
  );
}
