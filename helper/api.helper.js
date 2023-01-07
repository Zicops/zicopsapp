import { mutationClient } from '@/api/Mutations';
import {
  notificationClient,
  SEND_EMAIL,
  SEND_NOTIFICATIONS,
  SEND_NOTIFICATIONS_WITH_LINK
} from '@/api/NotificationClient';
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

export async function loadMultipleLspDataWithMultipleQueries(
  QUERY,
  variableObj = {},
  options = {},
  client = queryClient,
  lspIds = []
) {
  const response = [];

  const _lspIds = [null, ...lspIds];
  for (let i = 0; i < _lspIds.length; i++) {
    const lspId = _lspIds[i];
    const tenantObj = !!lspId ? { context: { headers: { tenant: lspId } } } : {};
    const data = await loadQueryDataAsync(QUERY, variableObj, { ...tenantObj, ...options }, client);

    response.push(data);
  }

  return response;
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

export async function sendNotificationWithLink(variableObj = {}, options = {}) {
  const response = await notificationClient
    .mutate({ mutation: SEND_NOTIFICATIONS_WITH_LINK, variables: variableObj, ...options })
    .catch((err) => {
      console.error(`Send Notification error:`, err);
    });

  if (response?.error) return response;

  return response?.data || {};
}

// ============ How to use =============
// sendNotification(
//   {
//     title: 'Stri ng1',
//     body: 'This is a notification body',
//     user_id: [JSON.parse(sessionStorage.getItem('loggedUser'))?.id]
//   },
//   { context: { headers: { 'fcm-token': fcmToken } } }
// );

export async function sendEmail(variableObj = {}, options = {}) {
  const response = await notificationClient
    .mutate({ mutation: SEND_EMAIL, variables: variableObj, ...options })
    .catch((err) => {
      console.error(`Send Email error:`, err);
    });

  if (response?.error) return response;

  return response?.data || {};
}

export async function sendNotificationAndEmail(
  notificationVariableObj = {},
  emailVariableObj = {},
  options = {}
) {
  const resNotification = await notificationClient
    .mutate({ mutation: SEND_NOTIFICATIONS, variables: notificationVariableObj, ...options })
    .catch((err) => {
      console.error(`Send Notification error:`, err);
    });

  if (resNotification?.error) return resNotification;

  const resEmail = await notificationClient
    .mutate({ mutation: SEND_EMAIL, variables: emailVariableObj, ...options })
    .catch((err) => {
      console.error(`Send Email error:`, err);
    });

  if (resEmail?.error) return resEmail;

  const response = { mail: resEmail?.data, notification: resNotification?.data };

  console.log(resEmail, 'emails res');

  if (!response?.mail || !resNotification?.notification) {
    return {};
  } else {
    return response;
  }
}

// ============ How to use =============
// sendNotificationAndEmail(
//   {
//     title: 'Stri ng1',
//     body: 'This is a notification body',
//     user_id: [JSON.parse(sessionStorage.getItem('loggedUser'))?.id]
//   },
//   {
//     to: ["userEmailListArray@mail.com"],
//     sender_name: "lsp_name",
//     user_name: ["userNameList"],
//     body: "{\"lsp_name\": \"XYZ-LSP\", \"course_name\": \"Blockchain\", \"end_date\":\"18/12/22\"}",
//     template_id: "d-bf691d7c93794afca36c326cd032ccbf"},
//   { context: { headers: { 'fcm-token': fcmToken } } }
// );
// body should be stringyfy JSON obj
