import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { queryClient } from '../API/Queries';
import { ToastMsgAtom } from '../state/atoms/toast.atom';

export function getQueryData(QUERY, variablesObj = {}) {
  const data = useQuery(QUERY, {
    variables: variablesObj,
    client: queryClient
  });

  useEffect(() => {
    if (data.error) {
      return data;
    }
  }, [data]);

  return data;
}

export function loadQueryData(QUERY, variablesObj = {}, options = {}) {
  const [loadData, { error }] = useLazyQuery(QUERY, { client: queryClient });
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [response, setResponse] = useState({});

  useEffect(() => {
    loadData({ variables: variablesObj, ...options })
      .then((res) => setResponse(res))
      .catch((err) => {
        if (!err) return;
        setToastMsg({ type: 'danger', message: 'load data error' });
        console.log('Load Error in api.helper', err);
      });
  }, []);

  if (error) return setToastMsg({ type: 'danger', message: 'load data error' });
  if (!response?.data) return {};

  return response?.data || {};
}
