import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { useRecoilState } from 'recoil';
import { VendorServicesAtom } from '@/state/atoms/vendor.atoms';
import { changeHandler } from '@/helper/common.helper';

export default function AddServices() {
  const [vendorData, setVendorData] = useRecoilState(VendorServicesAtom);
  return (
    <div>
      <div>
        <LabeledRadioCheckbox
          label="Applicable"
          type="checkbox"
          name="isApplicable"
          isChecked={`${vendorData.isApplicable}`}
          changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
