import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import {
  CREATE_SUBJECT_MATTER_EXPERTISE,
  UPDATE_SUBJECT_MATTER_EXPERTISE,
  CREATE_CLASS_ROOM_TRANING,
  UPDATE_CLASS_ROOM_TRANING,
  CREATE_CONTENT_DEVELOPMENT,
  UPDATE_CONTENT_DEVELOPMENT,
  userClient
} from '@/api/UserMutations';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { SmeServicesAtom, CtServicesAtom, CdServicesAtom } from '@/state/atoms/vendor.atoms';

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

  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);

  async function addUpdateSme(displayToaster = true) {
    if (!smeData?.isApplicable) return;

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
      status: VENDOR_MASTER_STATUS.active
    };

    let isError = false;
    if (smeData?.sme_id) {
      sendData.sme_id = smeData?.sme_id;

      await updateSme({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update SME Error' });
      });

      if (isError) return;

      if (displayToaster) setToastMsg({ type: 'success', message: 'Services Updated' });
      return;
    }

    const res = await createSme({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add SME Error' });
    });
    if (isError) return;
    setToastMsg({ type: 'success', message: 'Services Created' });
    return res;
  }

  async function addUpdateCrt(displayToaster = true) {
    if (!ctData?.isApplicable) return;

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
      status: VENDOR_MASTER_STATUS.active
    };

    let isError = false;

    if (ctData?.crt_id) {
      sendData.crt_id = ctData?.crt_id;

      await updateCrt({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update CRT Error' });
      });

      if (isError) return;
      if (displayToaster) setToastMsg({ type: 'success', message: 'Services Updated' });
      return;
    }
    const res = await createCrt({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add CRT Error' });
    });
    if (isError) return;
    setToastMsg({ type: 'success', message: 'Services Created' });
    return res;
  }

  async function addUpdateCd(displayToaster = true) {
    if (!cdData?.isApplicable) return;

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
      status: VENDOR_MASTER_STATUS.active
    };
    if (typeof sendData?.photo === 'string') sendData.photo = null;

    let isError = false;

    if (cdData?.cd_id) {
      sendData.cd_id = cdData?.cd_id;

      await updateCd({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update CD Error' });
      });

      if (isError) return;
      if (displayToaster) setToastMsg({ type: 'success', message: 'Services Updated' });
      return;
    }

    const res = await createCd({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'CD Created Error' });
    });
    if (isError) return;
    if (displayToaster) setToastMsg({ type: 'success', message: 'Services Created' });
    return res;
  }

  return {
    addUpdateSme,
    addUpdateCrt,
    addUpdateCd
  };
}
