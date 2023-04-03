import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import MultiEmailInput from '@/components/common/FormComponents/MultiEmailInput';
import Loader from '@/components/common/Loader';
import { changeHandler, truncateToN } from '@/helper/common.helper';
import { USER_LSP_ROLE, VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
import { getEncodedFileNameFromUrl } from '@/helper/utils.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import {
  IsVendorAdminLoadingAtom,
  VendorStateAtom,
  vendorUserInviteAtom
} from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import VendorPopUp from '../common/VendorPopUp';
import useHandleVendor from '../Logic/useHandleVendor';
import styles from '../vendorComps.module.scss';
import AddUrl from './common/AddUrl';

export default function VendorMaster() {
  const [emails, setEmails] = useRecoilState(vendorUserInviteAtom);
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);
  const isVendorAdminLoading = useRecoilValue(IsVendorAdminLoadingAtom);

  const [openSocialMedia, setOpenSocialMedia] = useState(null);
  const [socialMediaInput, setSocialMediaInput] = useState('');

  const { handlePhotoInput, handleRemoveUser, getVendorAdmins } = useHandleVendor();

  const router = useRouter();
  const vendorId = router.query.vendorId || null;
  const isViewPage = router.asPath?.includes('view-vendor');

  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  // useEffect(() => {
  //   setVendorData((prev) => ({
  //     ...prev,
  //     users: [...emails?.map((item) => item?.props?.children[0])]?.filter((e) => !!e)
  //   }));
  // }, [emails]);

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

  function getFileName() {
    return truncateToN(
      vendorData?.vendorProfileImage?.name || getEncodedFileNameFromUrl(vendorData?.photoUrl),
      45
    );
  }

  const isIndividualVendor =
    vendorData?.type.toLowerCase() === VENDOR_MASTER_TYPE.individual.toLowerCase();

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
              value: vendorData?.address,
              isDisabled: isViewPage
            }}
            changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input2}`}>
          <label for="vendorName">Update vendor profile image:</label>
          <BrowseAndUpload
            styleClassBtn={`${styles.button}`}
            title={getFileName() || 'Drag & Drop'}
            handleFileUpload={handlePhotoInput}
            handleRemove={() => setVendorData({ ...vendorData, vendorProfileImage: null })}
            previewData={{
              fileName: getFileName(),
              filePath: vendorData?.vendorProfileImage || vendorData?.photoUrl
            }}
            filePreview={vendorData?.vendorProfileImage || vendorData?.photoUrl}
            inputName="vendorProfileImage"
            isActive={vendorData?.vendorProfileImage || vendorData?.photoUrl}
            isDisabled={isViewPage}
            progressPercent={+vendorData?.fileUploadPercent || null}
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
              value: vendorData?.website,
              isDisabled: isViewPage
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
            maxLength: 500,
            value: vendorData?.description,
            isDisabled: isViewPage
          }}
          changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
      </div>
      <div className={`${styles.email}`}>
        <label for="users">{isIndividualVendor ? 'Email' : 'Add User'}: </label>
        <MultiEmailInput
          type="External"
          items={emails}
          setItems={setEmails}
          beforeRemoveEmail={async (email) => {
            await handleRemoveUser(email);
            getVendorAdmins();
          }}
          isEmailRemovable={!(isVendor && isIndividualVendor)}
          isDisabled={
            isViewPage || isVendor || (isDev ? false : isIndividualVendor && emails?.length)
          }
          isEmailRemovable={!(isVendor && isIndividualVendor)}
          isLoading={isVendorAdminLoading}
        />
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
            isDisabled={isViewPage}
          />
        </VendorPopUp>
      )}
    </div>
  );
}
