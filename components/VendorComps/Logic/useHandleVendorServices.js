import {
  CREATE_CLASS_ROOM_TRANING,
  CREATE_CONTENT_DEVELOPMENT,
  CREATE_SUBJECT_MATTER_EXPERTISE,
  UPDATE_CLASS_ROOM_TRANING,
  UPDATE_CONTENT_DEVELOPMENT,
  UPDATE_SUBJECT_MATTER_EXPERTISE,
  userClient
} from '@/api/UserMutations';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import {
  CdServicesAtom,
  CtServicesAtom,
  getCDServicesObject,
  getCTServicesObject,
  getSMEServicesObject,
  SmeServicesAtom,
  VendorCurrentStateAtom
} from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleVendorServices() {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [createSme] = useMutation(CREATE_SUBJECT_MATTER_EXPERTISE, { client: userClient });
  const [updateSme] = useMutation(UPDATE_SUBJECT_MATTER_EXPERTISE, { client: userClient });
  const [createCrt] = useMutation(CREATE_CLASS_ROOM_TRANING, { client: userClient });
  const [updateCrt] = useMutation(UPDATE_CLASS_ROOM_TRANING, { client: userClient });
  const [createCd] = useMutation(CREATE_CONTENT_DEVELOPMENT, { client: userClient });
  const [updateCd] = useMutation(UPDATE_CONTENT_DEVELOPMENT, { client: userClient });

  const router = useRouter();
  const vendorId = router.query.vendorId || '0';

  const vendorCurrentState = useRecoilValue(VendorCurrentStateAtom);
  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);

  async function addUpdateSme(displayToaster = true) {
    if (!(smeData?.isApplicable || vendorCurrentState?.enabledServices?.includes('sme'))) return;
    if (
      !smeData?.serviceDescription.length ||
      !smeData?.expertises?.length ||
      !smeData?.languages?.length
    )
      return setToastMsg({
        type: 'danger',
        message: 'Please Add Description, Expertise and Languages in Subject Matter Expertise'
      });

    const sendData = {
      vendor_id: vendorId,
      description: smeData?.serviceDescription || '',
      is_applicable: smeData?.isApplicable || false,
      expertise: smeData?.expertises || [],
      languages: smeData?.languages || [],
      output_deliveries: smeData?.formats || [],
      sample_files: smeData?.sampleFiles?.map((file) => file?.name + '.' + file?.fileType) || [],
      status: VENDOR_MASTER_STATUS.active,
      isExpertiseOnline: smeData?.isExpertiseOnline,
      isExpertiseOffline: smeData?.isExpertiseOffline
    };

    let isError = false;
    if (smeData?.sme_id) {
      sendData.sme_id = smeData?.sme_id;

      const res = await updateSme({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update SME Error' });
      });

      if (isError) return;

      if (displayToaster) setToastMsg({ type: 'success', message: 'Service Details Updated' });

      const data = res?.data?.updateSubjectMatterExpertise;
      setSMEData(
        getSMEServicesObject({
          ...smeData,
          ...data,
          isApplicable: data?.is_applicable,
          serviceDescription: data?.description,
          languages: data?.languages,
          expertises: data?.expertise,
          formats: data?.output_deliveries
        })
      );
      return res?.data?.updateSubjectMatterExpertise;
    }

    const res = await createSme({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add SME Error' });
    });
    if (isError) return;
    setToastMsg({ type: 'success', message: 'Services Created' });

    const data = res?.data?.createSubjectMatterExpertise;
    setSMEData(
      getSMEServicesObject({
        ...smeData,
        ...data,
        isApplicable: data?.is_applicable,
        serviceDescription: data?.description,
        languages: data?.languages,
        expertises: data?.expertise,
        formats: data?.output_deliveries
      })
    );
    return res?.data?.createSubjectMatterExpertise;
  }

  async function addUpdateCrt(displayToaster = true) {
    if (!(ctData?.isApplicable || vendorCurrentState?.enabledServices?.includes('crt'))) return;
    if (
      !ctData?.serviceDescription.length ||
      !ctData?.expertises?.length ||
      !ctData?.languages?.length
    )
      return setToastMsg({
        type: 'danger',
        message: 'Please Add Description, Expertise and Languages in Classroom Training'
      });

    const sendData = {
      vendor_id: vendorId,
      description: ctData?.serviceDescription || '',
      is_applicable: ctData?.isApplicable || false,
      expertise: ctData?.expertises || [],
      languages: ctData?.languages || [],
      output_deliveries: ctData?.formats || [],
      sample_files: ctData?.sampleFiles?.map((file) => file?.name + '.' + file?.fileType) || [],
      status: VENDOR_MASTER_STATUS.active,
      isExpertiseOnline: ctData?.isExpertiseOnline,
      isExpertiseOffline: ctData?.isExpertiseOffline
    };

    let isError = false;

    if (ctData?.crt_id) {
      sendData.crt_id = ctData?.crt_id;

      const res = await updateCrt({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update CRT Error' });
      });

      if (isError) return;
      if (displayToaster) setToastMsg({ type: 'success', message: 'Service Details Updated' });

      const data = res?.data?.updateClassRoomTraining;
      setCTData(
        getCTServicesObject({
          ...ctData,
          ...data,
          isApplicable: data?.is_applicable,
          serviceDescription: data?.description,
          languages: data?.languages,
          expertises: data?.expertise,
          formats: data?.output_deliveries
        })
      );
      return res?.data?.updateClassRoomTraining;
    }
    const res = await createCrt({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add CRT Error' });
    });
    if (isError) return;
    setToastMsg({ type: 'success', message: 'Services Created' });

    const data = res?.data?.createClassRoomTraining;
    setCTData(
      getCTServicesObject({
        ...ctData,
        ...data,
        isApplicable: data?.is_applicable,
        serviceDescription: data?.description,
        languages: data?.languages,
        expertises: data?.expertise,
        formats: data?.output_deliveries
      })
    );
    return res?.data?.createClassRoomTraining;
  }

  async function addUpdateCd(displayToaster = true) {
    if (!(cdData?.isApplicable || vendorCurrentState?.enabledServices?.includes('cd'))) return;
    if (
      !cdData?.serviceDescription.length ||
      !cdData?.expertises?.length ||
      !cdData?.languages?.length
    )
      return setToastMsg({
        type: 'danger',
        message: 'Please Add Description, Expertise and Languages in Content Development'
      });
    const sendData = {
      vendor_id: vendorId,
      description: cdData?.serviceDescription || '',
      is_applicable: cdData?.isApplicable || false,
      expertise: cdData?.expertises || [],
      languages: cdData?.languages || [],
      output_deliveries: cdData?.formats || [],
      sample_files: cdData?.sampleFiles?.map((file) => file?.name + '.' + file?.fileType) || [],
      status: VENDOR_MASTER_STATUS.active,
      isExpertiseOnline: cdData?.isExpertiseOnline,
      isExpertiseOffline: cdData?.isExpertiseOffline
    };
    if (typeof sendData?.photo === 'string') sendData.photo = null;

    let isError = false;

    if (cdData?.cd_id) {
      sendData.cd_id = cdData?.cd_id;

      const res = await updateCd({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update CD Error' });
      });

      if (isError) return;
      if (displayToaster) setToastMsg({ type: 'success', message: 'Service Details Updated' });

      const data = res?.data?.updateContentDevelopment;
      setCDData(
        getCDServicesObject({
          ...cdData,
          ...data,
          isApplicable: data?.is_applicable,
          serviceDescription: data?.description,
          languages: data?.languages,
          expertises: data?.expertise,
          formats: data?.output_deliveries
        })
      );
      return res?.data?.updateContentDevelopment;
    }

    const res = await createCd({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'CD Created Error' });
    });
    if (isError) return;
    if (displayToaster) setToastMsg({ type: 'success', message: 'Services Created' });

    const data = res?.data?.createContentDevelopment;
    setCDData(
      getCDServicesObject({
        ...cdData,
        ...data,
        isApplicable: data?.is_applicable,
        serviceDescription: data?.description,
        languages: data?.languages,
        expertises: data?.expertise,
        formats: data?.output_deliveries
      })
    );
    return res?.data?.createContentDevelopment;
  }

  return {
    addUpdateSme,
    addUpdateCrt,
    addUpdateCd
  };
}
