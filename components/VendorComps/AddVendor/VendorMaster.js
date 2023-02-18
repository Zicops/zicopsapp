import styles from '../vendorComps.module.scss';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import { changeHandler } from '@/helper/common.helper';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import { useEffect, useState } from 'react';
import VendorPopUp from '../common/VendorPopUp';
import AddUrl from './common/AddUrl';
import useHandleVendor from '../Logic/useHandleVendor';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import MultiEmailInput from '@/components/common/FormComponents/MultiEmailInput';
import Loader from '@/components/common/Loader';
import { useRouter } from 'next/router';

export default function VendorMaster() {
  const [openSocialMedia, setOpenSocialMedia] = useState(null);
  const [emails, setEmails] = useState([]);
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const { handlePhotoInput } = useHandleVendor();

  const router = useRouter();
  const vendorId = router.query.vendorId || null;

  useEffect(() => {
    setVendorData((prev) => ({ ...prev, users: emails.map((item) => item?.props?.children[0]) }));
  }, [emails]);

  const socialMediaPopup = [
    {
      title: 'Facebook',
      inputName: 'facebookURL',
      value: vendorData?.facebookURL
    },
    {
      title: 'Instagram',
      inputName: 'instagramURL',
      value: vendorData?.instagramURL
    },
    {
      title: 'Twitter',
      inputName: 'twitterURL',
      value: vendorData?.twitterURL
    },
    {
      title: 'LinkedIn',
      inputName: 'linkedinURL',
      value: vendorData?.linkedinURL
    }
  ];

  if (vendorId && vendorData?.vendorId !== vendorId)
    return <Loader customStyles={{ height: '100%', background: 'transparent' }} />;

  return (
    <div className={`${styles.vendorMasterContainer}`}>
      <div className={`${styles.input1}`}>
        <LabeledInput
          inputOptions={{
            inputName: 'name',
            label: 'Vendor Name',
            placeholder: 'Enter Vendor Name',
            value: vendorData?.name,
            isDisabled: vendorData?.vendorId
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
              inputName: 'address',
              placeholder: 'Enter Vendor Address',
              value: vendorData?.address
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
              fileName: vendorData?.vendorProfileImage?.name,
              filePath: vendorData?.vendorProfileImage
            }}
            inputName="vendorProfileImage"
            isActive={vendorData?.vendorProfileImage}
          />
        </div>
      </div>
      <div className={`${styles.websiteSocialDiv}`}>
        <div className={`${styles.input3}`}>
          <label for="website">Add website URL: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'website',
              placeholder: 'https://website_abc.com',
              value: vendorData?.website
            }}
            changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input3}`}>
          <label for="vendorName">Add URL of social media pages: </label>
          <div className={`${styles.icons}`}>
            <img
              src={`${
                vendorData?.facebookURL ? '/images/svg/Facebook.svg' : '/images/Facebook1.png'
              }`}
              onClick={() => setOpenSocialMedia(0)}
            />
            <img
              src={`${
                vendorData?.instagramURL ? '/images/svg/Instagram.svg' : '/images/Instagram1.png'
              }`}
              onClick={() => setOpenSocialMedia(1)}
            />
            <img
              src={`${vendorData?.twitterURL ? '/images/svg/Twitter.svg' : '/images/Twitter1.png'}`}
              onClick={() => setOpenSocialMedia(2)}
            />
            <img
              src={`${
                vendorData?.linkedinURL ? '/images/svg/Linkedin.svg' : '/images/Linkedin1.png'
              }`}
              onClick={() => setOpenSocialMedia(3)}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.input4}`}>
        <label for="description">Description: </label>
        <LabeledTextarea
          inputOptions={{
            inputName: 'description',
            placeholder: 'Say Something...',
            value: vendorData?.description
          }}
          changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
      </div>
      <div className={`${styles.input1}`}>
        <label for="users">Add User: </label>
        <MultiEmailInput items={emails} setItems={setEmails} />
      </div>

      {!!socialMediaPopup?.[openSocialMedia]?.title && (
        <VendorPopUp
          title={socialMediaPopup[openSocialMedia].title}
          popUpState={[openSocialMedia + 1, setOpenSocialMedia]}
          size="small"
          closeBtn={{
            name: 'Cancel',
            handleClick: () => {
              setVendorData({ ...vendorData, [socialMediaPopup[openSocialMedia].inputName]: '' });
              setOpenSocialMedia(null);
            }
          }}
          submitBtn={{ name: 'Done', handleClick: () => setOpenSocialMedia(null) }}
          onCloseWithCross={() => {
            setVendorData({ ...vendorData, [socialMediaPopup[openSocialMedia].inputName]: '' });
            setOpenSocialMedia(null);
          }}
          isFooterVisible={true}>
          <AddUrl
            inputName={socialMediaPopup[openSocialMedia].inputName}
            urlData={vendorData}
            setUrlData={setVendorData}
            Value={socialMediaPopup[openSocialMedia].value}
          />
        </VendorPopUp>
      )}
    </div>
  );
}
