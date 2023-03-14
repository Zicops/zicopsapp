import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import MultiEmailInput from '@/components/common/FormComponents/MultiEmailInput';
import Loader from '@/components/common/Loader';
import { changeHandler } from '@/helper/common.helper';
import { VendorStateAtom, vendorUserInviteAtom } from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import VendorPopUp from '../common/VendorPopUp';
import useHandleVendor from '../Logic/useHandleVendor';
import styles from '../vendorComps.module.scss';
import AddUrl from './common/AddUrl';

export default function VendorMaster() {
  const [emails, setEmails] = useRecoilState(vendorUserInviteAtom);
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);

  const [openSocialMedia, setOpenSocialMedia] = useState(null);
  const [socialMediaInput, setSocialMediaInput] = useState('');

  const { handlePhotoInput } = useHandleVendor();

  const router = useRouter();
  const vendorId = router.query.vendorId || null;

  useEffect(() => {
    setVendorData((prev) => ({
      ...prev,
      users: [...vendorData?.users, ...emails?.map((item) => item?.props?.children[0])]
    }));
  }, [emails]);

  const socialMediaPopup = [
    {
      title: 'Facebook',
      inputName: 'facebookURL',
      value: vendorData?.facebookURL,
      imageUrl: vendorData?.facebookURL ? '/images/svg/Facebook.svg' : '/images/Facebook1.png'
    },
    {
      title: 'Instagram',
      inputName: 'instagramURL',
      value: vendorData?.instagramURL,
      imageUrl: vendorData?.instagramURL ? '/images/svg/Instagram.svg' : '/images/Instagram1.png'
    },
    {
      title: 'Twitter',
      inputName: 'twitterURL',
      value: vendorData?.twitterURL,
      imageUrl: vendorData?.twitterURL ? '/images/svg/Twitter.svg' : '/images/Twitter1.png'
    },
    {
      title: 'LinkedIn',
      inputName: 'linkedinURL',
      value: vendorData?.linkedinURL,
      imageUrl: vendorData?.linkedinURL ? '/images/svg/Linkedin.svg' : '/images/Linkedin1.png'
    }
  ];

  // console.info(
  //   vendorId && vendorData?.vendorId !== vendorId,
  //   vendorId,
  //   vendorData?.vendorId,
  //   vendorId
  // );

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
            maxLength: 60,
            value: vendorData?.name,
            isDisabled: vendorData?.vendorId,
            maxLength: 60
          }}
          styleClass={`${styles.input5}`}
          changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
      </div>
      <div className={`${styles.addressImageDiv}`}>
        <div className={`${styles.input2}`}>
          <label for="vendorName">Vendor Address: </label>
          <LabeledTextarea
            inputOptions={{
              inputName: 'address',
              placeholder: 'Enter Vendor Address',
              maxLength: 160,
              value: vendorData?.address
            }}
            changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input2}`}>
          <label for="vendorName">Update vendor profile image: </label>
          <BrowseAndUpload
            styleClassBtn={`${styles.button}`}
            title={vendorData?.vendorProfileImage?.name || 'Drag & Drop'}
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
              maxLength: 60,
              value: vendorData?.website
            }}
            changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input3}`}>
          <label for="vendorName">Add URL of social media pages: </label>
          <div className={`${styles.icons}`}>
            {socialMediaPopup?.map((media, i) => (
              <img
                src={`${media?.imageUrl}`}
                onClick={() => {
                  setSocialMediaInput(media?.value);
                  setOpenSocialMedia(i);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.input4}`}>
        <label for="description">Description: </label>
        <LabeledTextarea
          inputOptions={{
            inputName: 'description',
            placeholder: 'Say Something...',
            maxLength: 160,
            value: vendorData?.description
          }}
          changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
      </div>
      <div className={`${styles.input1}`}>
        <label for="users">Add User: </label>
        <MultiEmailInput type="External" items={emails} setItems={setEmails} />
      </div>

      {!!socialMediaPopup?.[openSocialMedia]?.title && (
        <VendorPopUp
          title={socialMediaPopup[openSocialMedia].title}
          popUpState={[openSocialMedia + 1, setOpenSocialMedia]}
          size="small"
          closeBtn={{
            name: 'Cancel',
            handleClick: () => setOpenSocialMedia(null)
          }}
          submitBtn={{
            name: 'Done',
            handleClick: () => {
              setVendorData({
                ...vendorData,
                [socialMediaPopup[openSocialMedia].inputName]: socialMediaInput
              });
              setOpenSocialMedia(null);
            }
          }}
          onCloseWithCross={() => setOpenSocialMedia(null)}
          isFooterVisible={true}>
          <AddUrl
            inputName={socialMediaPopup[openSocialMedia].inputName}
            urlData={socialMediaInput}
            setUrlData={setSocialMediaInput}
          />
        </VendorPopUp>
      )}
    </div>
  );
}
