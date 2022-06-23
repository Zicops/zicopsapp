import { useLazyQuery, useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ADD_TOPIC_EXAM, UPDATE_TOPIC_EXAM } from '../../../../API/Mutations';
import { GET_LATEST_EXAMS, GET_TOPIC_EXAMS, queryClient } from '../../../../API/Queries';
import { getTopicObject } from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { courseContext } from '../../../../state/contexts/CourseContext';
import { getAssessmentObj } from './courseTopic.helper';

export default function useAddAssessment(topicId, setEditTopic) {
  const { fullCourse } = useContext(courseContext);
  const [loadExams, { error: errorLoadExam }] = useLazyQuery(GET_LATEST_EXAMS, {
    client: queryClient
  });
  const [loadTopicExamsData, { error: errorTopicExamData }] = useLazyQuery(GET_TOPIC_EXAMS, {
    client: queryClient
  });
  const [addTopicExam] = useMutation(ADD_TOPIC_EXAM);
  const [updateTopicExam] = useMutation(UPDATE_TOPIC_EXAM);

  // recoil state
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [assessmentData, setAssessmentData] = useState(getAssessmentObj());
  const [examOptions, setExamOptions] = useState([]);

  useEffect(() => {
    setAssessmentData(getAssessmentObj({ topicId, courseId: fullCourse.id }));
  }, [fullCourse?.id, topicId]);

  // load table data
  useEffect(() => {
    const LARGE_PAGE_SIZE = 999999999999;
    const queryVariables = { publish_time: Date.now(), pageSize: LARGE_PAGE_SIZE, pageCursor: '' };

    loadExams({ variables: queryVariables }).then(({ data }) => {
      if (errorLoadExam) return setToastMsg({ type: 'danger', message: 'exam load error' });

      const examData = data?.getLatestExams?.exams;

      const options = [];
      if (examData)
        examData.forEach((exam) => options.push({ value: exam.id, label: exam.Name, ...exam }));

      setExamOptions(options);
    });

    // topic exam
    loadTopicExamsData({ variables: { topic_id: topicId }, fetchPolicy: 'no-cache' }).then(
      ({ data }) => {
        if (data?.getTopicExams[0]) setAssessmentData(data.getTopicExams[0]);
        if (errorTopicExamData) setToastMsg({ type: 'danger', message: 'Topic Exams Load Error' });
      }
    );
  }, []);

  async function saveAssessment() {
    const sendData = {
      topicId: assessmentData?.topicId,
      courseId: assessmentData?.courseId,
      examId: assessmentData?.examId,
      language: assessmentData?.language || 'English'
    };

    // update topic exams
    if (assessmentData?.id) {
      sendData.id = assessmentData.id;

      console.log(sendData);
      const res = await updateTopicExam({ variables: sendData });
      console.log('response:', res);

      if (res?.data?.updateTopicExam) {
        setToastMsg({ type: 'success', message: 'Topic Exam updated' });
        setEditTopic(getTopicObject({ courseId: fullCourse.id }));
      }
      return;
    }

    console.log(sendData);
    const res = await addTopicExam({ variables: sendData });
    console.log('response:', res);

    if (res?.data?.addTopicExam) {
      setToastMsg({ type: 'success', message: 'Topic Exam added' });
      setEditTopic(getTopicObject({ courseId: fullCourse.id }));
    }
  }

  return { examOptions, assessmentData, setAssessmentData, saveAssessment };
}
