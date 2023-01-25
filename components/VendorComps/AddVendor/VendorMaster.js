import styles from '../vendorComps.module.scss';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import { changeHandler } from '@/helper/common.helper';
import { useRecoilState } from 'recoil';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import PreviewImageVideo from '@/components/common/FormComponents/BrowseAndUpload/PreviewImageVideo';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';

export default function VendorMaster() {
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);

  return (
    <div className={`${styles.vendorMasterContainer}`}>
      <div className={`${styles.input1}`}>
        <LabeledInput
          inputOptions={{
            inputName: 'vendorName',
            label: 'Vendor Name',
            placeholder: 'Enter Vendor Name',
            value: vendorData.vendorName
          }}
          styleClass={`${styles.input5}`}
          changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
      </div>
      <div className={`${styles.addressImageDiv}`}>
        <div className={`${styles.input2}`}>
          <label for="vendorName">Vendor Address: </label>
          {/*<input type="text" id="vendorName" name="vendorname" placeholder="Enter vendor address" />*/}
          <LabeledTextarea
            inputOptions={{
              inputName: 'vendorAddress',
              placeholder: 'Enter Vendor Address',
              value: vendorData.vendorAddress
            }}
            changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input2}`}>
          <label for="vendorName">Update vendor profile image: </label>
          <BrowseAndUpload styleClass={`${styles.uploadImage}`} />
        </div>
      </div>
      <div className={`${styles.websiteSocialDiv}`}>
        <div className={`${styles.input3}`}>
          <label for="vendorWebsite">Add website URL: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'vendorWebsiteURL',
              placeholder: 'https://website_abc.com',
              value: vendorData.vendorWebsiteURL
            }}
            changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input3}`}>
          <label for="vendorName">Add URL of social media pages: </label>
          <div className={`${styles.icons}`}>
            <img src="/images/FB.png" />
            <img src="/images/insta.png" />
            <img src="/images/twitter.png" />
            <img src="/images/linkedin.png" />
          </div>
        </div>
      </div>

      <div className={`${styles.input4}`}>
        <label for="saysomething">Say something: </label>
        <LabeledTextarea
          inputOptions={{
            inputName: 'saySomething',
            placeholder: 'Say Something...',
            value: vendorData.saySomething
          }}
          changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
      </div>
      <div className={`${styles.input1}`}>
        <label for="addUser">Add User: </label>
        <LabeledInput
          inputOptions={{
            inputName: 'addUser',
            placeholder: 'Add Users',
            value: vendorData.addUser
          }}
          styleClass={`${styles.input5}`}
          changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
      </div>
    </div>
  );
}
