import { useEffect } from 'react';
import { getQueryData } from '../../../../helper/api.helper';

export function useLoadAndSetDataInContext(QUERY, variables, callbackAfterSuccess = () => {}) {
  const { data, loading, error } = getQueryData(QUERY, variables);

  useEffect(() => {
    if (!data) return;

    callbackAfterSuccess(data, error);
  }, [data]);
}

export function getSequenceNumber(arrayOfObj, moduleId) {
  const filteredObjByModule = arrayOfObj.filter((obj) => obj.moduleId === moduleId);

  return filteredObjByModule.length + 1;
}

export function getAssessmentObj(data = {}) {
  return {
    id: data.id || null,
    topicId: data.topicId || '',
    courseId: data.courseId || '',
    examId: data.examId || '',
    language: data.language || '',

    category: data.category || null,
    sub_category: data.sub_category || null,

    created_at: data.created_at || '',
    updated_at: data.updated_at || ''
  };
}
