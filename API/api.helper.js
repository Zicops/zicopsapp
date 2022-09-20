import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import { getUnixFromDate } from '@/helper/utils.helper';
import { setContext } from '@apollo/client/link/context';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';

export async function getLatestToken(token) {
  const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // getting renewed token before time expire
  const expTime = data?.exp - 60;
  const currentTime = getUnixFromDate();
  if (expTime >= currentTime) return token;

  // const newToken = await getIdToken(auth?.currentUser, true);
  // sessionStorage.setItem('tokenF', newToken);
  // return newToken;

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
  // console.log(initialToken);
  const fireBaseToken = await getLatestToken(initialToken);
  return {
    headers: {
      ...headers,
      Authorization: fireBaseToken ? `Bearer ${fireBaseToken}` : 'Token Not found'
    }
  };
});
