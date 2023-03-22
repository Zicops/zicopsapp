import { ADD_TOPIC_EXAM, UPDATE_TOPIC_EXAM } from '@/api/Mutations';
import { GET_LATEST_EXAMS, GET_TOPIC_EXAMS, queryClient } from '@/api/Queries';
import {
  loadMultipleLspDataWithMultipleQueries,
  loadQueryDataAsync,
  mutateData
} from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { getTopicAssessmentObj } from './adminCourseComps.helper';

export default function useHandleAssessment(topData = null, closePopUp = () => {}) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);

  const [examsList, setExamsList] = useState(null);
  const [topicAssessment, setTopicAssessment] = useState(
    getTopicAssessmentObj({ courseId: courseMetaData?.id, topicId: topData?.id })
  );

  // load exam list for dropdown
  useEffect(() => {
    if (examsList?.length) return;

    const LARGE_PAGE_SIZE = 1000;
    const queryVariables = {
      publish_time: getUnixFromDate(),
      pageSize: LARGE_PAGE_SIZE,
      pageCursor: ''
    };

    loadMultipleLspDataWithMultipleQueries(GET_LATEST_EXAMS, queryVariables, {}, queryClient, [
      COMMON_LSPS.zicops
    ])
      .then((examDataRes) => {
        const allExams = [];
        examDataRes?.forEach((res) => allExams.push(...(res?.getLatestExams?.exams || [])));

        const options = allExams.map((e) => ({ value: e.id, label: e.Name, ...e }));
        setExamsList(options);
      })
      .catch(() => setToastMessage('Exam List Load Error'));
  }, []);

  useEffect(async () => {
    if (!topData?.id) return;
    if (!examsList?.length) return;

    // load exam assessment data
    loadQueryDataAsync(GET_TOPIC_EXAMS, { topic_id: topData?.id })
      .then((res) => {
        if (!res || res?.error) return setToastMessage('Topic Assessment Load Error');

        const topicExam = res?.getTopicExams[0];
        if (!topicExam) return;

        const selectedExam = examsList?.filter((ex) => ex?.id === topicExam?.examId)?.[0];

        setTopicAssessment(
          getTopicAssessmentObj({
            ...topicExam,
            category: selectedExam?.Category,
            subCategory: selectedExam?.SubCategory
          })
        );
      })
      .catch(() => setToastMessage('Topic Assessment Load Error'));
  }, [topData, examsList?.length]);

  async function addUpdateAssessment(e) {
    e.target.disabled = true;

    const sendData = sanitizeFormData(topicAssessment);
    // add new module
    if (!topicAssessment?.id) {
      mutateData(ADD_TOPIC_EXAM, sendData)
        .catch(() => setToastMessage('Topic Assessment Create Error'))
        .finally(() => closePopUp());
      return;
    }

    // update module
    mutateData(UPDATE_TOPIC_EXAM, sendData)
      .catch(() => setToastMessage('Topic Assessment Update Error'))
      .finally(() => closePopUp());
  }

  return { examsList, topicAssessment, setTopicAssessment, addUpdateAssessment };
}
