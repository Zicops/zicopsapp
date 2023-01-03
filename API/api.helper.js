import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import { getUnixFromDate } from '@/helper/utils.helper';
import { setContext } from '@apollo/client/link/context';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';

const origin = process.browser && window?.location?.origin ? window.location.origin : null;
const API_BASE = !!origin && origin?.includes('localhost') ? 'https://demo.zicops.com' : origin;

export const API_LINKS = {
  notification: `${API_BASE}/ns/query`,
  courseCreator: `${API_BASE}/cc/api/v1/query`,
  courseQuery: `${API_BASE}/cq/api/v1/query`,
  userClient: `${API_BASE}/um/api/v1/query`,
  resetPassword: `${API_BASE}/um/reset-password`,
  getOrg: `${API_BASE}/um/org`
};

export async function getLatestToken(token) {
  if (token) {
    const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    // getting renewed token before time expire
    const expTime = data?.exp - 60;
    const currentTime = getUnixFromDate();
    if (expTime >= currentTime) return token;

    // const newToken = await getIdToken(auth?.currentUser, true);
    // sessionStorage.setItem('tokenF', newToken);
    // return newToken;
  }
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, () => {
      if (!auth?.currentUser) return;

      getIdToken(auth?.currentUser, true).then((newToken) => {
        sessionStorage.setItem('tokenF', newToken);
        return resolve(newToken);
      });
    });
  }).catch((err) => console.log(err));
}

export const authLink = setContext(async (_, { headers }) => {
  const initialToken = sessionStorage.getItem('tokenF')
    ? sessionStorage.getItem('tokenF')
    : auth?.currentUser?.accessToken;
  const fireBaseToken = await getLatestToken(initialToken);
  const lspId = sessionStorage.getItem('lsp_id');
  return {
    headers: {
      Authorization: fireBaseToken ? `Bearer ${fireBaseToken}` : '',
      tenant: lspId,
      ...headers
    }
  };
});
