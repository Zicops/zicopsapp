import { getUnixFromDate } from '@/helper/utils.helper';
import { useLazyQuery, useMutation } from '@apollo/client';
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
import {
  GET_LATEST_EXAMS_NAMES,
  GET_QUESTION_MARKS_FROM_MAPPING_BY_SECTION,
  GET_QUESTION_PAPER_SECTION_ID,
  queryClient
} from '../../../../../API/Queries';
import { isNameDuplicate } from '../../../../../helper/data.helper';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import { STATUS, StatusAtom } from '../../../../../state/atoms/utils.atoms';
import { SCHEDULE_TYPE } from './examMasterTab.helper';

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
  const [loadSectionId, { error: loadSectionError }] = useLazyQuery(GET_QUESTION_PAPER_SECTION_ID, {
    client: queryClient
  });
  const [loadMappingData, { error: loadMappingError }] = useLazyQuery(
    GET_QUESTION_MARKS_FROM_MAPPING_BY_SECTION,
    { client: queryClient }
  );

  const router = useRouter();

  // recoil state
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [status, setStatus] = useRecoilState(StatusAtom);

  // disable submit if data not complete
  function validateInput() {
    const { name, description, qpId, duration, schedule_type, passing_criteria, instructions } =
      examTabData;
    const isExamValid = name && description && qpId && duration && schedule_type;

    const isInstructionsValid = passing_criteria && instructions;
    return isExamValid && isInstructionsValid;
  }

  useEffect(() => {
    if (toastMsg[0]?.type === 'danger') setStatus(examTabData?.status || STATUS[0]);
  }, [toastMsg]);

  // error notifications
  useEffect(() => {
    if (addExamError) return setToastMsg({ type: 'danger', message: `Add Exam Error` });
    if (updateExamError) return setToastMsg({ type: 'danger', message: `Update Exam Error` });

    if (addExamInstructionError)
      return setToastMsg({ type: 'danger', message: `Add Exam Instruction Error` });
    if (updateExamInstructionError)
      return setToastMsg({ type: 'danger', message: `Update Exam Instruction Error` });

    if (addExamScheduleError)
      return setToastMsg({ type: 'danger', message: `Add Exam Schedule Error` });
    if (udpateExamScheduleError)
      return setToastMsg({ type: 'danger', message: `Update Exam Schedule Error` });

    if (addExamConfigError)
      return setToastMsg({ type: 'danger', message: `Add Exam Configuration Error` });
    if (updateExamConfigError)
      return setToastMsg({ type: 'danger', message: `Update Exam Configuration Error` });

    if (loadSectionError) return setToastMsg({ type: 'danger', message: `Load Section Error` });
    if (loadMappingError) return setToastMsg({ type: 'danger', message: `Load Mapping Error` });
  }, [
    addExamError,
    updateExamError,
    addExamInstructionError,
    updateExamInstructionError,
    addExamScheduleError,
    udpateExamScheduleError,
    addExamConfigError,
    updateExamConfigError,
    loadSectionError,
    loadMappingError
  ]);

  async function getTotalMarks(id = null) {
    const qpId = id || examTabData?.qpId;
    if (!qpId) return;

    // load section data
    let isError = false;
    const sectionRes = await loadSectionId({ variables: { question_paper_id: qpId } }).catch(
      (err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Section Id load error' });
      }
    );
    if (isError) return;
    const sections = sectionRes?.data?.getQuestionPaperSections;
    let totalMarks = 0;
    if (!sections.length) return;

    for (let i = 0; i < sections.length; i++) {
      const sectionId = sections[i]?.id;
      // load map
      const mapRes = await loadMappingData({ variables: { section_id: sectionId } }).catch(
        (err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'Mapping load error' });
        }
      );
      if (isError) return;
      const mapData = mapRes?.data?.getQPBankMappingBySectionId || [];
      totalMarks = mapData?.reduce(
        (total, item) => (total += item?.QuestionMarks * item?.TotalQuestions),
        totalMarks
      );
    }
    return totalMarks;
  }

  async function saveExam() {
    const sendData = {
      name: examTabData.name,
      description: examTabData.description,
      qpId: examTabData.qpId,
      duration: +examTabData.duration || 0,
      schedule_type: examTabData.schedule_type,

      category: examTabData.category || '',
      sub_category: examTabData.sub_category || '',
      code: examTabData.code || '',
      type: examTabData.type || '',

      status: examTabData.status || STATUS[1],
      createdBy: examTabData.createdBy || 'Zicops',
      updatedBy: examTabData.updatedBy || 'Zicops',
      is_active: examTabData.is_exam_active || true
    };
    let response = {};
    // update exam

    console.log(sendData);

    // duplicate name check
    if (await isNameDuplicate(GET_LATEST_EXAMS_NAMES, examTabData.name, 'getLatestExams.exams')) {
      setToastMsg({ type: 'danger', message: 'Exam with same name already exist' });
      return false;
    }
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
      passing_criteria: `${examTabData.passing_criteria}-${examTabData.passing_criteria_type}`,
      no_attempts: examTabData.no_attempts || 1,
      instructions: examTabData.instructions || '',
      access_type: examTabData.access_type || '',
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
    const sendData = {
      examId: examId,
      start: getUnixFromDate(examTabData.exam_start),
      end: 0,
      buffer_time: examTabData.buffer_time || 0,
      createdBy: examTabData.createdBy || 'Zicops',
      updatedBy: examTabData.updatedBy || 'Zicops',
      is_active: examTabData.is_ins_active || true
    };

    if (examTabData.is_stretch && examTabData?.exam_end) {
      sendData.end = getUnixFromDate(examTabData.exam_end);
      sendData.buffer_time = 0;
    }
    console.log(sendData);

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
      show_result: examTabData.show_result || false,
      display_hints: examTabData.display_hints || false,
      show_answer: examTabData.show_answer || false,
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
    console.log(examTabData);
    setStatus('UPDATING');
    if (!validateInput())
      return setToastMsg({ type: 'danger', message: 'Please fill all the details' });

    const examRes = await saveExam();
    if (!examRes) return;

    const examId = examRes?.id;
    const insRes = await saveInstructions(examId || examTabData.id);

    let schRes = null;
    if (examTabData.schedule_type === SCHEDULE_TYPE[0])
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
    setStatus(STATUS[1]);
    if (!router.query?.examId) return router.push(`${router.asPath}/${examId}`);
  }

  return { saveExamData, getTotalMarks };
}
