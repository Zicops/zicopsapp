import styles from '../vendorComps.module.scss';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import { changeHandler } from '@/helper/common.helper';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import { useState } from 'react';
import VendorPopUp from '../common/VendorPopUp';
import AddUrl from './common/AddUrl';
import useHandleVendor from '../Logic/useHandleVendor';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import MultiEmailInput from '@/components/common/FormComponents/MultiEmailInput';

export default function VendorMaster({ data }) {
  const [isFacebook, setIsFacebook] = useState(false);
  const [isInstagram, setIsInstagram] = useState(false);
  const [isTwitter, setIsTwitter] = useState(false);
  const [isLinkedin, setIsLinkedin] = useState(false);
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const { handlePhotoInput } = useHandleVendor();

  const socialMediaPopup = [
    {
      title: 'Facebook',
      normalState: isFacebook,
      updatedState: setIsFacebook,
      inputName: 'facebookURL',
      value: data?.facebook_url || vendorData.facebookURL
    },
    {
      title: 'Instagram',
      normalState: isInstagram,
      updatedState: setIsInstagram,
      inputName: 'instagramURL',
      value: data?.instagram_url || vendorData.instagramURL
    },
    {
      title: 'Twitter',
      normalState: isTwitter,
      updatedState: setIsTwitter,
      inputName: 'twitterURL',
      value: data?.twitter_url || vendorData.twitterURL
    },
    {
      title: 'LinkedIn',
      normalState: isLinkedin,
      updatedState: setIsLinkedin,
      inputName: 'linkedinURL',
      value: data?.linkedin_url || vendorData.linkedinURL
    }
  ];

  return (
    <div className={`${styles.vendorMasterContainer}`}>
      <div className={`${styles.input1}`}>
        <LabeledInput
          inputOptions={{
            inputName: 'vendorName',
            label: 'Vendor Name',
            placeholder: 'Enter Vendor Name',
            value: data?.name || vendorData.vendorName
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
              value: data?.address || vendorData.vendorAddress
            }}
            changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input2}`}>
          <label for="vendorName">Update vendor profile image: </label>
          <BrowseAndUpload
            styleClassBtn={`${styles.button}`}
            title="Drag & Drop"
            handleFileUpload={handlePhotoInput}
            handleRemove={() => setVendorData({ ...vendorData, vendorProfileImage: null })}
            previewData={{
              fileName: data?.photo_url?.name || vendorData?.vendorProfileImage?.name,
              filePath: data?.photo_url || vendorData?.vendorProfileImage
            }}
            inputName="image"
            // hideRemoveBtn={true}
            isActive={vendorData?.vendorProfileImage}
          />
        </div>
      </div>
      <div className={`${styles.websiteSocialDiv}`}>
        <div className={`${styles.input3}`}>
          <label for="vendorWebsite">Add website URL: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'vendorWebsiteURL',
              placeholder: 'https://website_abc.com',
              value: data?.website || vendorData.vendorWebsiteURL
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
            <img src="/images/Linkedin1.png" onClick={() => setIsLinkedin(true)} />
          </div>
        </div>
      </div>

      <div className={`${styles.input4}`}>
        <label for="description">Description: </label>
        <LabeledTextarea
          inputOptions={{
            inputName: 'description',
            placeholder: 'Say Something...',
            value: data?.description || vendorData.description
          }}
          changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
      </div>
      <div className={`${styles.input1}`}>
        <label for="users">Add User: </label>
        <MultiEmailInput
          items={vendorData.users}
          setItems={(users) => setVendorData({ ...vendorData, users })}
        />
        {/* <LabeledInput
          inputOptions={{
            inputName: 'users',
            placeholder: 'Add Users',
            value: vendorData.users
          }}
          styleClass={`${styles.input5}`}
          changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        /> */}
      </div>

      {socialMediaPopup.map((popupData, index) => {
        return (
          <VendorPopUp
            open={popupData.normalState}
            title={popupData.title}
            popUpState={[popupData.normalState, popupData.updatedState]}
            size="small"
            closeBtn={{ name: 'Cancel' }}
            submitBtn={{ name: 'Done' }}
            isFooterVisible={true}>
            <AddUrl
              inputName={popupData.inputName}
              urlData={vendorData}
              setUrlData={setVendorData}
              Value={popupData.value}
            />
          </VendorPopUp>
        );
      })}
    </div>
  );
}
