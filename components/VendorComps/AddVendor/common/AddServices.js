import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { useRecoilState } from 'recoil';
import { VendorServicesAtom } from '@/state/atoms/vendor.atoms';
import { changeHandler } from '@/helper/common.helper';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import styles from '../../vendorComps.module.scss';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import IconBtn from '@/components/common/IconBtn';
import IconButton from '@/components/common/IconButton';

export default function AddServices({ data, setData = () => {}, inputName }) {
  return (
    <div className={`${styles.addServiceContainer}`}>
      <div>
        <LabeledRadioCheckbox
          label="Applicable"
          type="checkbox"
          name={inputName}
          isChecked={data[`${inputName}`]}
          changeHandler={(e) => changeHandler(e, data, setData)}
        />
      </div>
      <div className={`${styles.serviceDescriptionExpertise}`}>
        <div className={`${styles.serviceDescription}`}>
          <label for="serviceDescription">Description: </label>
          <LabeledTextarea
            inputOptions={{
              inputName: 'serviceDescription',
              placeholder: 'Describe your service in 160 characters',
              value: data.serviceDescription
            }}
            changeHandler={(e) => changeHandler(e, data, setData)}
          />
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Add Expertise: </label>
          <IconButton
            text="Add Expetise"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
          />
        </div>
      </div>
      <div className={`${styles.addLanguageOPFormat}`}>
        <div className={`${styles.addLanguages}`}>
          <label for="serviceDescription">Language: </label>
          <IconButton
            text="Add language"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
          />
        </div>
        <div className={`${styles.addOPFormat}`}>
          <label for="serviceDescription">O/P deliverable formats: </label>
          <IconButton
            text="Add O/P deliverable formats"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
          />
        </div>
      </div>
      <div className={`${styles.addSampleFilesProfiles}`}>
        <div className={`${styles.addSampleFiles}`}>
          <label for="sampleFiles">Sample Files: </label>
          <IconButton
            text="Add sample files"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
          />
        </div>
        <div className={`${styles.addProfiles}`}>
          <label for="profiles">O/P deliverable formats: </label>
          <IconButton
            text="Add profiles"
            styleClass={`${styles.button}`}
            imgUrl="/images/svg/add_circle.svg"
          />
        </div>
      </div>
    </div>
  );
}
