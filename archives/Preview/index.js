import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_EXAM_INSTRUCTION, GET_EXAM_SCHEDULE, queryClient } from '../../API/Queries';
import ExamPreview from '../../components/common/ExamPreview';
import { SCHEDULE_TYPE } from '../../components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';

export default function Preview({ examData }) {
  const [loadInstructions, { error: loadInsError }] = useLazyQuery(GET_EXAM_INSTRUCTION, {
    client: queryClient
  });
  const [loadSchedule, { error: loadScheduleError }] = useLazyQuery(GET_EXAM_SCHEDULE, {
    client: queryClient
  });

  const [data, setData] = useState(null);

  // load data
  useEffect(async () => {
    const examId = examData?.id;
    if (!examId) return setData(null);
    const dataObj = {
      examName: examData?.name,
      scheduleType: examData?.scheduleType,
      duration: examData?.duration,
      scheduleDate: null,
      difficulty: '',
      totalQuestions: 0,
      noAttempts: 0
    };

    let isError = false;
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
    dataObj.noAttempts = insRes?.data?.getExamInstruction[0]?.NoAttempts;

    // load schedule
    if (dataObj.scheduleType === SCHEDULE_TYPE[0]) {
      const schRes = await loadSchedule({
        variables: { exam_id: examId },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Schedule load error' });
      });
      if (isError) return;
      dataObj.scheduleDate = +schRes?.data?.getExamSchedule[0]?.Start || null;
      console.log('datte', schRes?.data?.getExamSchedule[0]?.Start);
    }

    setData(dataObj);
  }, [examData]);

  // error notification
  useEffect(() => {
    if (loadInsError) return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    if (loadScheduleError) return setToastMsg({ type: 'danger', message: 'Schedule load error' });
  }, [loadInsError, loadScheduleError]);

  return (
    <>
      <ExamPreview data={data || {}} />
    </>
  );
}
