import LabeledInput from '@/components/common/FormComponents/LabeledInput';

export default function CourseMaster() {
  return (
    <>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Vendor Name',
          placeholder: 'Enter Vendor Name',
          value: 'vendorData?.name'
        }}
        // styleClass={`${styles.input5}`}
        // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
      />
    </>
  );
}
