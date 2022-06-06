import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import TabContainer from '../../../common/TabContainer';
import { ExamMasterTabAtom, ExamMasterTabDataSelector } from './Logic/examMasterTab.helper';
import useHandleExamTab from './Logic/useHandleExamTab';
import { ExamTabDataAtom, getExamTabDataObject } from '../../../../state/atoms/exams.atoms';
import {
  GET_EXAM_CONFIG,
  GET_EXAM_INSTRUCTION,
  GET_EXAM_SCHEDULE,
  queryClient
} from '../../../../API/Queries';
import { useLazyQuery } from '@apollo/client';

export default function ExamMasterTab() {
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
    if (!examId) return setExamTabData(getExamTabDataObject());

    // load instructions
    let isError = false;
    const insRes = await loadInstructions({ variables: { exam_id: examId } }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    });
    if (isError) return;
    const insData = insRes?.data?.getExamInstruction;
    const insObj = {
      instructionId: insData?.id || null,
      passingCriteria: insData?.PassingCriteria?.split('-')[0],
      passingCriteriaType: insData?.PassingCriteria?.split('-')[1] || 'Marks',
      isAttemptsVisible: insData?.NoAttempts > 1,
      noAttempts: insData?.NoAttempts,
      accessType: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || ''
    };

    // load schedule
    const schRes = await loadSchedule({ variables: { exam_id: examId } }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Schedule load error' });
    });
    if (isError) return;
    const schData = schRes?.data?.getExamSchedule;
    const schObj = {
      scheduleId: schData?.id || null,
      examStartDate: new Date(+schData?.Start),
      examStartTime: new Date(+schData?.Start),
      examEndDate: new Date(+schData?.End),
      examEndTime: new Date(+schData?.End),
      bufferTime: schData?.BufferTime || 0,
      isStretch: !!schData?.End,
      is_schedule_active: schData?.IsActive || false
    };

    // load config
    const confRes = await loadConfig({ variables: { exam_id: examId } }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    });
    if (isError) return;
    const confData = confRes?.data?.getExamConfiguration;
    const confObj = {
      configId: confData?.id || null,
      shuffle: confData?.Shuffle || false,
      displayHints: confData?.DisplayHints || false,
      showResult: confData?.ShowResult || false,
      showAnswer: confData?.ShowAnswer || false,
      is_config_active: confData?.IsActive || false
    };

    setExamTabData({
      ...examTabData,
      ...insObj,
      ...schObj,
      ...confObj,
      id: examId
    });
  }, [router.query]);

  return (
    <TabContainer
      tabData={examMasterTabData}
      tab={tab}
      setTab={setTab}
      footerObj={{ submitDisplay: 'Save', handleSubmit: saveExamData }}
    />
  );
}
