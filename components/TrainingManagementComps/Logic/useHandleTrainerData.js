import { useRecoilState } from 'recoil';
import {
  TrainerDataAtom,
  TrainerExpertiseListAtom,
  getTrainerDataObj
} from '@/state/atoms/trainingManagement.atoms';
import { CREATE_TRAINER, viltMutationClient } from '@/api/ViltMutations';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

export default function useHandleTrainerData() {
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [addNewTrainer] = useMutation(CREATE_TRAINER, { client: viltMutationClient });

  async function addUpdateTrainer() {
    const sendData = {
      name: trainerData?.name || '',
      userId: trainerData?.userId || null,
      expertise: trainerData?.expertise || [],
      ...trainerData
    };

    if (!sendData?.userId)
      return setToastMsg({ type: 'danger', message: 'Please Select your Trainer' });
    if (!sendData?.expertise.length) {
      return setToastMsg({ type: 'danger', message: 'Please Select atleast One Expertise' });
    }

    // console.info(sendData, '1736');
    let isError = false;

    const res = await addNewTrainer({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: err.message || 'Add Trainer Error' });
    });
    // setLoading(false);
    if (isError) return null;

    setToastMsg({ type: 'success', message: 'Added Trainer Successfully' });
  }

  return { addUpdateTrainer };
}
