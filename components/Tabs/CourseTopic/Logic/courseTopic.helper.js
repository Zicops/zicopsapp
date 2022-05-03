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
