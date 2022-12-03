import { mutationClient } from '@/api/Mutations';
import { notificationClient, SEND_NOTIFICATIONS } from '@/api/NotificationClient';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { queryClient } from '../API/Queries';
import { ToastMsgAtom } from '../state/atoms/toast.atom';

export function getQueryData(QUERY, variablesObj = {}, options = {}) {
  const data = useQuery(QUERY, {
    variables: variablesObj,
    client: queryClient,
    ...options
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

export async function loadQueryDataAsync(
  QUERY,
  variableObj = {},
  options = {},
  client = queryClient
) {
  const response = await client
    .query({ query: QUERY, variables: variableObj, fetchPolicy: 'no-cache', ...options })
    .catch((err) => {
      console.log(`Load Data error:`, err);
    });

  if (response?.error) return response;

  return response?.data || {};
}

export async function loadAndCacheDataAsync(
  QUERY,
  variableObj = {},
  options = {},
  client = queryClient
) {
  const response = await client
    .query({ query: QUERY, variables: variableObj, ...options })
    .catch((err) => {
      console.log(`Load Data error:`, err);
    });

  if (response?.error) return response;

  return response?.data || {};
}

export async function deleteData(
  MUTATION,
  variableObj = {},
  options = {},
  client = mutationClient
) {
  const response = await client
    .mutate({ mutation: structuredClone(MUTATION), variables: variableObj, ...options })
    .catch((err) => {
      console.log(`Delete Data error:`, err);
    });

  if (response?.error) return response;

  return response?.data || {};
}

export async function sendNotification(variableObj = {}, options = {}) {
  const response = await notificationClient
    .mutate({ mutation: SEND_NOTIFICATIONS, variables: variableObj, ...options })
    .catch((err) => {
      console.error(`Send Notification error:`, err);
    });

  if (response?.error) return response;

  return response?.data || {};
}
