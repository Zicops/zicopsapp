import Accordian from '../../../components/UserProfile/Accordian';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import styles from './../trainingComps.module.scss';
import { useState } from 'react';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import AddUrl from '@/components/VendorComps/AddVendor/common/AddUrl';
import { useRecoilState } from 'recoil';
import { TrainerProfileAtom } from '@/state/atoms/trainingManagement.atoms';
import { changeHandler } from '@/helper/common.helper';

export default function TrainingProfileAccordian() {
  const [trainerProfileData, setTrainerProfileData] = useRecoilState(TrainerProfileAtom);

  const [openSocialMedia, setOpenSocialMedia] = useState(null);
  const [socialMediaInput, setSocialMediaInput] = useState('');

  const socialMediaPopup = [
    {
      title: 'LinkedIn',
      inputName: 'linkedinURL',
      value: trainerProfileData?.linkedinURL,
      imageUrl: trainerProfileData?.linkedinURL
        ? '/images/svg/Linkedin.svg'
        : '/images/Linkedin1.png',
    },
    {
      title: 'Twitter',
      inputName: 'twitterURL',
      value: trainerProfileData?.facebookURL,
      imageUrl: trainerProfileData?.twitterURL ? '/images/svg/Twitter.svg' : '/images/Twitter1.png',
    },
    {
      title: 'Website',
      inputName: 'websiteURL',
      value: trainerProfileData?.websiteURL,
      imageUrl: trainerProfileData?.websiteURL ? '/images/svg/Website.svg' : '/images/Website1.png',
    },
  ];

  return (
    <div>
      <Accordian height={'auto'} acc_title={'Add About Trainer '}>
        <div className={`${styles.websiteSocialDiv}`}>
          <div className={`${styles.input3}`}>
            <label for="website">Years of Experience: </label>
            <LabeledInput
              inputOptions={{
                inputName: 'yearsOfExperience',
                placeholder: 'Enter years of experience as a trainer',
                maxLength: 60,
                value: trainerProfileData?.yearsOfExperience,
              }}
              changeHandler={(e) => changeHandler(e, trainerProfileData, setTrainerProfileData)}
            />
          </div>
          <div className={`${styles.input3}`}>
            <label for="vendorName">Add URL of social media pages: </label>
            <div className={`${styles.icons}`}>
              {socialMediaPopup?.map((media, index) => (
                <img
                  src={`${media?.imageUrl}`}
                  onClick={() => {
                    setSocialMediaInput(media?.value);
                    setOpenSocialMedia(index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <LabeledTextarea
            inputOptions={{
              label: 'About the Trainer',
              inputName: 'aboutTrainer',
              placeholder: 'Add Text',
              value: trainerProfileData?.aboutTrainer,
            }}
            styleClass={`${styles.aboutTrainer}`}
            changeHandler={(e) => changeHandler(e, trainerProfileData, setTrainerProfileData)}
          />
        </div>
      </Accordian>
      {!!socialMediaPopup?.[openSocialMedia]?.title && (
        <VendorPopUp
          title={socialMediaPopup[openSocialMedia]?.title}
          popUpState={[openSocialMedia + 1, setOpenSocialMedia]}
          size="small"
          closeBtn={{
            name: 'Cancel',
            handleClick: () => setOpenSocialMedia(null),
          }}
          submitBtn={{
            name: 'Done',
            handleClick: () => {
              setTrainerProfileData((prev) => ({
                ...prev,
                [socialMediaPopup[openSocialMedia].inputName]: socialMediaInput,
              }));
              setOpenSocialMedia(null);
            },
          }}
          onCloseWithCross={() => setOpenSocialMedia(null)}
          isFooterVisible={true}>
          <AddUrl
            inputName={socialMediaPopup[openSocialMedia]?.inputName}
            urlData={socialMediaInput}
            setUrlData={setSocialMediaInput}
          />
        </VendorPopUp>
      )}
    </div>
  );
}
