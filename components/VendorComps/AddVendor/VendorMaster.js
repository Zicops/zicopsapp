import styles from '../vendorComps.module.scss';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import { changeHandler } from '@/helper/common.helper';
import { useRecoilState } from 'recoil';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import PreviewImageVideo from '@/components/common/FormComponents/BrowseAndUpload/PreviewImageVideo';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import { useState } from 'react';
import VendorPopUp from '../common/VendorPopUp';
import AddUrl from './common/AddUrl';

export default function VendorMaster() {
  const [isFacebook, setIsFacebook] = useState(false);
  const [isInstagram, setIsInstagram] = useState(false);
  const [isTwitter, setIsTwitter] = useState(false);
  const [isLinkdin, setIsLinkdin] = useState(false);
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
          <BrowseAndUpload styleClassBtn={`${styles.button}`} title="Drag & Drop" />
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
            <img src="/images/Facebook1.png" onClick={() => setIsFacebook(true)} />
            <img src="/images/Instagram1.png" onClick={() => setIsInstagram(true)} />
            <img src="/images/Twitter1.png" onClick={() => setIsTwitter(true)} />
            <img src="/images/Linkedin1.png" onClick={() => setIsLinkdin(true)} />
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
      <VendorPopUp
        open={isFacebook}
        title="Facebook"
        popUpState={[isFacebook, setIsFacebook]}
        size="small"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done' }}
        isFooterVisible={true}>
        <AddUrl
          inputName="facebookURL"
          urlData={vendorData}
          setUrlData={setVendorData}
          Value={vendorData.facebookURL}
        />
      </VendorPopUp>
      <VendorPopUp
        open={isInstagram}
        title="Instagram"
        popUpState={[isInstagram, setIsInstagram]}
        size="small"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done' }}
        isFooterVisible={true}>
        <AddUrl
          inputName="instagramURL"
          urlData={vendorData}
          setUrlData={setVendorData}
          Value={vendorData.instagramURL}
        />
      </VendorPopUp>
      <VendorPopUp
        open={isTwitter}
        title="Twitter"
        popUpState={[isTwitter, setIsTwitter]}
        size="small"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done' }}
        isFooterVisible={true}>
        <AddUrl
          inputName="twitterURL"
          urlData={vendorData}
          setUrlData={setVendorData}
          Value={vendorData.twitterURL}
        />
      </VendorPopUp>
      <VendorPopUp
        open={isLinkdin}
        title="Linkdin"
        popUpState={[isLinkdin, setIsLinkdin]}
        size="small"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done' }}
        isFooterVisible={true}>
        <AddUrl
          inputName="linkedinURL"
          urlData={vendorData}
          setUrlData={setVendorData}
          Value={vendorData.linkedinURL}
        />
      </VendorPopUp>
    </div>
  );
}
