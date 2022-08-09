import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import { getIdToken } from 'firebase/auth';

async function getLatestToken(token) {
  const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // getting renewed token before time expire
  const expTime = data?.exp - 60;
  const currentTime = new Date().getTime() / 1000;
  if (expTime >= currentTime) return token;

  const newToken = await getIdToken(auth?.currentUser, true);
  console.log(newToken);
  sessionStorage.setItem('tokenF', newToken);
  return newToken;
}

const authLink = setContext(async (_, { headers }) => {
  const initialToken = sessionStorage.getItem('tokenF')
    ? sessionStorage.getItem('tokenF')
    : auth?.currentUser?.accessToken;
  const fireBaseToken = await getLatestToken(initialToken);
  return {
    headers: {
      ...headers,
      Authorization: fireBaseToken ? `Bearer ${fireBaseToken}` : 'Token not found'
    }
  };
});

const httpLink = createHttpLink({
  uri: 'https://demo.zicops.com/um/api/v1/query'
});

// Set query Client
export const queryClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
