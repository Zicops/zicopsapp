import { auth } from "@/helper/firebaseUtil/firebaseConfig";
import { setContext } from "@apollo/client/link/context";
import { getIdToken } from "firebase/auth";

export async function getLatestToken(token) {
  const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // getting renewed token before time expire
  const expTime = data?.exp - 60;
  const currentTime = new Date().getTime() / 1000;
  if (expTime >= currentTime) return token;

  const newToken = await getIdToken(auth?.currentUser, true);
//   console.log(newToken);
  sessionStorage.setItem('tokenF', newToken);
  return newToken;
}

export const authLink = setContext(async (_, { headers }) => {
  const initialToken = sessionStorage.getItem('tokenF')
    ? sessionStorage.getItem('tokenF')
    : auth?.currentUser?.accessToken;
  const fireBaseToken = await getLatestToken(initialToken);
  return {
    headers: {
      ...headers,
      Authorization: fireBaseToken ? `Bearer ${fireBaseToken}` : 'Token Not found'
    }
  };
});
