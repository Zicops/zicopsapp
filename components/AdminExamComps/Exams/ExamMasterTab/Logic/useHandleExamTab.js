import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  ADD_EXAM,
  ADD_EXAM_CONFIGURATION,
  ADD_EXAM_INSTRUCTION,
  ADD_EXAM_SCHEDULE,
  mutationClient,
  UPDATE_EXAM,
  UPDATE_EXAM_CONFIGURATION,
  UPDATE_EXAM_INSTRUCTION,
  UPDATE_EXAM_SCHEDULE
} from '../../../../../API/Mutations';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';

export default function useHandleExamTab() {
  const [addExam, { error: addExamError }] = useMutation(ADD_EXAM, {
    client: mutationClient
  });
  const [updateExam, { error: updateExamError }] = useMutation(UPDATE_EXAM, {
    client: mutationClient
  });
  const [addExamInstruction, { error: addExamInstructionError }] = useMutation(
    ADD_EXAM_INSTRUCTION,
    { client: mutationClient }
  );
  const [updateExamInstruction, { error: updateExamInstructionError }] = useMutation(
    UPDATE_EXAM_INSTRUCTION,
    { client: mutationClient }
  );
  const [addExamSchedule, { error: addExamScheduleError }] = useMutation(ADD_EXAM_SCHEDULE, {
    client: mutationClient
  });
  const [updateExamSchedule, { error: udpateExamScheduleError }] = useMutation(
    UPDATE_EXAM_SCHEDULE,
    { client: mutationClient }
  );
  const [addExamConfig, { error: addExamConfigError }] = useMutation(ADD_EXAM_CONFIGURATION, {
    client: mutationClient
  });
  const [updateExamConfig, { error: updateExamConfigError }] = useMutation(
    UPDATE_EXAM_CONFIGURATION,
    { client: mutationClient }
  );

  const router = useRouter();
  // recoil state
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // disable submit if data not complete
  function validateInput() {
    const { name, description, qpId, duration, scheduleType, passingCriteria, accessType } =
      examTabData;
    const isExamValid = name && description && qpId && duration && scheduleType;

    const isInstructionsValid = passingCriteria && accessType;
    return isExamValid && isInstructionsValid;
  }

  useEffect(() => {
    console.log(examTabData);
  }, [examTabData]);

  // error notifications
  useEffect(() => {
    if (addExamError) return setToastMsg({ type: 'danger', message: `Add Exam Error` });
    if (addExamInstructionError)
      return setToastMsg({ type: 'danger', message: `Add Exam Instruction Error` });
    if (addExamScheduleError)
      return setToastMsg({ type: 'danger', message: `Add Exam Schedule Error` });
  }, [addExamError, addExamInstructionError, addExamScheduleError]);

  function getDateTime(dateObj, timeObj) {
    dateObj = new Date(dateObj);
    timeObj = new Date(timeObj);
    const newDateObj = new Date();

    newDateObj.setDate(dateObj.getDate());
    newDateObj.setMonth(dateObj.getMonth());
    newDateObj.setFullYear(dateObj.getFullYear());
    newDateObj.setFullYear(timeObj.getHours());
    newDateObj.setFullYear(timeObj.getMinutes());
    newDateObj.setFullYear(timeObj.getSeconds());

    return Math.floor(newDateObj.getTime() / 1000) || 0;
  }

  async function saveExam() {
    const sendData = {
      name: examTabData.name,
      description: examTabData.description,
      qpId: examTabData.qpId,

      duration: +examTabData.duration || 0,
      scheduleType: examTabData.scheduleType,

      category: examTabData.category || '',
      sub_category: examTabData.sub_category || '',
      code: examTabData.code || '',
      type: examTabData.type || '',

      status: examTabData.status || 'SAVED',
      createdBy: examTabData.createdBy || 'Zicops',
      updatedBy: examTabData.updatedBy || 'Zicops',
      is_active: examTabData.is_exam_active || true
    };
    let response = {};
    // update exam

    console.log(sendData);
    if (examTabData?.id) {
      sendData.id = examTabData.id;
      response = await updateExam({ variables: sendData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Update Exam Error' });
      });
      console.log(response?.data);
      return response?.data?.updateExam;
    }

    // add new exam
    response = await addExam({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: 'Add Exam Error' });
    });
    console.log(response?.data);
    return response?.data?.addExam;
  }

  async function saveInstructions(examId) {
    const sendData = {
      examId: examId,
      passingCriteria: `${examTabData.passingCriteria}-${examTabData.passingCriteriaType}`,
      noAttempts: examTabData.noAttempts || 1,
      accessType: examTabData.accessType || '',
      createdBy: examTabData.createdBy || 'Zicops',
      updatedBy: examTabData.updatedBy || 'Zicops',
      is_active: examTabData.is_ins_active || true
    };
    let response = {};
    // update
    console.log(sendData);
    if (examTabData?.instructionId) {
      sendData.id = examTabData.instructionId;
      response = await updateExamInstruction({ variables: sendData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Update Instructions Error' });
      });
      console.log(response?.data);
      return response?.data?.updateExamInstruction;
    }

    // add new
    response = await addExamInstruction({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: 'Add Instructions Error' });
    });
    console.log(response?.data);
    return response?.data?.addExamInstruction;
  }

  async function saveSchedule(examId) {
    const startDateTime = getDateTime(examTabData.examStartDate, examTabData.examStartTime);
    const sendData = {
      examId: examId,
      start: startDateTime,
      end: 0,
      bufferTime: examTabData.bufferTime || 1,
      createdBy: examTabData.createdBy || 'Zicops',
      updatedBy: examTabData.updatedBy || 'Zicops',
      is_active: examTabData.is_ins_active || true
    };

    console.log(sendData);
    if (examTabData?.examEndDate && examTabData?.examEndTime) {
      sendData.end = getDateTime(examTabData.examEndDate, examTabData.examEndTime);
    }

    let response = {};
    // update
    console.log(examTabData?.scheduleId);
    if (examTabData?.scheduleId) {
      sendData.id = examTabData.scheduleId;
      response = await updateExamSchedule({ variables: sendData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Update Schedule Error' });
      });
      console.log(response?.data);
      return response?.data?.updateExamSchedule;
    }

    // add new
    response = await addExamSchedule({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: 'Add Schedule Error' });
    });
    console.log(response?.data);
    return response?.data?.addExamSchedule;
  }

  async function saveConfig(examId) {
    const sendData = {
      examId: examId,
      shuffle: examTabData.shuffle || false,
      showResult: examTabData.showResult || false,
      displayHints: examTabData.displayHints || false,
      showAnswer: examTabData.showAnswer || false,
      createdBy: examTabData.createdBy || 'Zicops',
      updatedBy: examTabData.updatedBy || 'Zicops',
      is_active: examTabData.is_config_active || true
    };
    console.log(sendData);
    let response = {};
    // update
    if (examTabData?.configId) {
      sendData.id = examTabData.configId;
      response = await updateExamConfig({ variables: sendData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Update Config Error' });
      });
      console.log(response?.data);
      return response?.data?.updateExamConfiguration;
    }

    // add new
    response = await addExamConfig({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: 'Add Config Error' });
    });
    console.log(response?.data);
    return response?.data?.addExamConfiguration;
  }

  async function saveExamData() {
    await saveSchedule(examTabData.id);
    console.log(examTabData);
    if (!validateInput())
      return setToastMsg({ type: 'danger', message: 'Please fill all the details' });

    const examRes = await saveExam();
    const examId = examRes?.id;

    const insRes = await saveInstructions(examId || examTabData.id);

    let schRes = null;
    if (examTabData.scheduleType === 'scheduled')
      schRes = await saveSchedule(examId || examTabData.id);

    const confRes = await saveConfig(examId || examTabData.id);

    setExamTabData({
      ...examTabData,
      id: examId || examTabData.id,
      instructionId: insRes?.id,
      scheduleId: schRes?.id,
      configId: confRes?.id
    });

    setToastMsg({ type: 'success', message: 'Exam Saved' });
    if (!router.query?.examId) return router.push(`${router.asPath}/${examId}`);
  }

  return {
    saveExamData
  };
}
