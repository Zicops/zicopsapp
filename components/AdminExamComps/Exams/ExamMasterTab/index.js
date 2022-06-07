import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  GET_EXAM_CONFIG,
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  queryClient
} from '../../../../API/Queries';
import { ExamTabDataAtom, getExamTabDataObject } from '../../../../state/atoms/exams.atoms';
import TabContainer from '../../../common/TabContainer';
import { ExamMasterTabAtom, ExamMasterTabDataSelector } from './Logic/examMasterTab.helper';
import useHandleExamTab from './Logic/useHandleExamTab';

export default function ExamMasterTab() {
  const [loadMaster, { error: loadMasterError }] = useLazyQuery(GET_EXAM_META, {
    client: queryClient
  });
  const [loadInstructions, { error: loadInsError }] = useLazyQuery(GET_EXAM_INSTRUCTION, {
    client: queryClient
  });
  const [loadSchedule, { error: loadScheduleError }] = useLazyQuery(GET_EXAM_SCHEDULE, {
    client: queryClient
  });
  const [loadConfig, { error: loadConfigError }] = useLazyQuery(GET_EXAM_CONFIG, {
    client: queryClient
  });

  // recoil
  const [tab, setTab] = useRecoilState(ExamMasterTabAtom);
  const examMasterTabData = useRecoilValue(ExamMasterTabDataSelector);
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);

  const { saveExamData } = useHandleExamTab();

  // update id
  const router = useRouter();
  useEffect(async () => {
    const examId = router.query?.examId || null;
    const qpId = router.query?.qpId || null;
    if (!examId) return setExamTabData(getExamTabDataObject({ qpId }));

    // load master data
    let isError = false;
    const masterRes = await loadMaster({
      variables: { exam_ids: [examId] },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Exam Master load error' });
    });
    if (isError) return;
    const masterData = masterRes?.data?.getExamsMeta[0];
    const masterObj = {
      id: masterData.id,
      qpId: masterData.QpId,
      name: masterData.Name,
      description: masterData.Description,
      duration: masterData.Duration,
      schedule_type: masterData.ScheduleType,

      code: masterData.Code,
      type: masterData.Type,
      sub_category: masterData.SubCategory,
      category: masterData.Category,

      status: masterData.Status,
      is_exam_active: masterData.IsActive
    };

    // load instructions
    const insRes = await loadInstructions({
      variables: { exam_id: examId },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    });
    if (isError) return;
    const insData = insRes?.data?.getExamInstruction[0];
    const insObj = {
      instructionId: insData?.id || null,
      passing_criteria: insData?.PassingCriteria?.split('-')[0],
      passing_criteria_type: insData?.PassingCriteria?.split('-')[1] || 'Marks',
      is_attempts_visible: insData?.NoAttempts > 1,
      no_attempts: insData?.NoAttempts,
      instructions: insData?.Instructions || '',
      access_type: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || ''
    };

    // load schedule
    const schRes = await loadSchedule({
      variables: { exam_id: examId },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Schedule load error' });
    });
    if (isError) return;
    const schData = schRes?.data?.getExamSchedule[0];
    const schObj = {
      scheduleId: schData?.id || null,
      exam_start_date: new Date(+schData?.Start),
      exam_start_time: new Date(+schData?.Start),
      exam_end_date: new Date(+schData?.End),
      exam_end_time: new Date(+schData?.End),
      buffer_time: schData?.BufferTime || 0,
      is_stretch: !!schData?.End,
      is_schedule_active: schData?.IsActive || false
    };

    // load config
    const confRes = await loadConfig({
      variables: { exam_id: examId },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    });
    if (isError) return;
    const confData = confRes?.data?.getExamConfiguration[0];
    const confObj = {
      configId: confData?.id || null,
      shuffle: confData?.Shuffle || false,
      display_hints: confData?.DisplayHints || false,
      show_result: confData?.ShowResult || false,
      show_answer: confData?.ShowAnswer || false,
      is_config_active: confData?.IsActive || false
    };

    setExamTabData({
      ...examTabData,
      ...masterObj,
      ...insObj,
      ...schObj,
      ...confObj
    });
  }, [router.query]);

  return (
    <TabContainer
      tabData={examMasterTabData}
      tab={tab}
      setTab={setTab}
      footerObj={{
        submitDisplay: 'Save',
        handleSubmit: saveExamData,
        handleCancel: () => router.push('/admin/exams/my-exams/')
      }}
    />
  );
}
