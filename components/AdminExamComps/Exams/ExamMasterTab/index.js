import { COMMON_LSPS } from '@/helper/constants.helper';
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
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { STATUS, StatusAtom } from '../../../../state/atoms/utils.atoms';
import TabContainer from '../../../common/TabContainer';
import {
  ExamMasterTabAtom,
  ExamMasterTabDataSelector,
  getTabData
} from './Logic/examMasterTab.helper';
import useHandleExamTab from './Logic/useHandleExamTab';

export default function ExamMasterTab() {
  // update id
  const router = useRouter();
  const isPreview = router.asPath?.includes('view') || false;
  const isZicops = router.asPath?.includes('zicops') || false;

  const [loadMaster, { error: loadMasterError }] = useLazyQuery(GET_EXAM_META, {
    client: queryClient,
    context: isZicops ? { headers: { tenant: COMMON_LSPS?.zicops } } : {}
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
  const [status, setStatus] = useRecoilState(StatusAtom);
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const examMasterTabData = useRecoilValue(ExamMasterTabDataSelector);

  const { saveExamData, getTotalMarks } = useHandleExamTab();

  useEffect(async () => {
    const examId = router.query?.examId || null;
    const qpId = router.query?.qpId || null;
    const tabIndex = +router.query?.tabIndex || null;
    if (tabIndex) {
      alert(tabIndex);
      setTab(getTabData()[tabIndex].name);
    }

    if (!examId) {
      return setExamTabData(
        getExamTabDataObject(qpId ? { qpId: qpId, total_marks: await getTotalMarks(qpId) } : {})
      );
    }

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
    if (!masterData) return;
    const masterObj = {
      id: masterData.id,
      qpId: masterData.QpId,
      name: masterData.Name,
      description: masterData.Description,
      duration: +masterData.Duration / 60,
      schedule_type: masterData.ScheduleType,

      code: masterData.Code,
      type: masterData.Type,
      sub_category: masterData.SubCategory,
      category: masterData.Category,

      status: masterData.Status,
      is_exam_active: masterData.IsActive || true
    };

    setStatus(masterObj.status);

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
      is_attempts_visible: +insData?.NoAttempts >= 1,
      no_attempts: +insData?.NoAttempts,
      instructions: insData?.Instructions || '',
      access_type: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || true
    };

    // load schedule
    let schObj = {};
    if (masterObj.schedule_type === 'scheduled') {
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

      schObj = {
        scheduleId: schData?.id || null,
        exam_start: new Date(+schData?.Start * 1000),
        exam_end: +schData?.End ? new Date(+schData?.End * 1000) : null,
        buffer_time: schData?.BufferTime || 0,
        is_stretch: !!+schData?.End,
        is_schedule_active: schData?.IsActive || true
      };
    }

    // load config
    const confRes = await loadConfig({
      variables: { exam_id: examId },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Config load error' });
    });
    if (isError) return;
    const confData = confRes?.data?.getExamConfiguration[0];
    const confObj = {
      configId: confData?.id || null,
      shuffle: confData?.Shuffle || false,
      display_hints: confData?.DisplayHints || false,
      show_result: confData?.ShowResult || false,
      show_answer: confData?.ShowAnswer || false,
      is_config_active: confData?.IsActive || true
    };

    setExamTabData({
      ...masterObj,
      ...insObj,
      ...schObj,
      ...confObj,
      total_marks: await getTotalMarks(masterObj?.qpId)
    });
  }, [router.query]);

  // error notification
  useEffect(() => {
    if (loadMasterError) return setToastMsg({ type: 'danger', message: 'Exam Master load error' });
    if (loadInsError) return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    if (loadScheduleError) return setToastMsg({ type: 'danger', message: 'Schedule load error' });
    if (loadConfigError) return setToastMsg({ type: 'danger', message: 'Config load error' });
  }, [loadMasterError, loadInsError, loadScheduleError, loadConfigError]);

  // make exam master active tab if schedule is not selected
  useEffect(() => {
    if (tab === 'Schedule' && examTabData.schedule_type !== 'scheduled')
      setTab(examMasterTabData[0].name);
  }, [examTabData?.schedule_type]);

  return (
    <TabContainer
      tabData={examMasterTabData}
      tab={tab}
      setTab={setTab}
      footerObj={{
        showFooter: !isPreview,
        status: status || STATUS.display[0],
        submitDisplay: examTabData?.id ? 'Update' : 'Save',
        handleSubmit: () => saveExamData(),
        handleCancel: () => {
          setExamTabData(getExamTabDataObject());
          router.push('/admin/exams/my-exams/');
        }
      }}
    />
  );
}
