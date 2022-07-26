import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';

const httpLink = createHttpLink({
  uri: 'https://demo.zicops.com/um/api/v1/query'
});

function getLatestToken(token) {
  const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  console.log(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()));
  let expDate = new Date(0);
  expDate.setUTCSeconds(data.exp);
  //JSON.parse(atob(token.split('.')[1]));
  //check if the token is expired or not-> return false if it is not expired
  let checkToken = !auth?.currentUser?.stsTokenManager?.isExpired;
  if (checkToken) return token;
  let newToken;
  auth?.currentUser?.getIdToken(true).then((data) => {
    newToken = data;
    console.log(data);
  });

  return newToken;
}

const authLink = setContext((_, { headers }) => {
  // get the authentication tokenF and tokenZ from local storage if it exists
  const firebaseToken = sessionStorage.getItem('tokenF');
  if (!firebaseToken) return (window.location.pathname = '/login');
  // const token = getLatestToken(tokenF);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: firebaseToken ? `Bearer ${firebaseToken}` : ''
    }
  };
});

export const userClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const USER_LOGIN = gql`
  mutation {
    login {
      id
      first_name
      last_name
      status
      role
      is_verified
      is_active
      gender
      created_by
      updated_by
      created_at
      updated_at
      email
      phone
      photo_url
    }
  }
`;

export const MAKE_ADMIN_USER = gql`
  mutation registerUsers(
    $firstName: String!
    $lastName: String!
    $Status: String!
    $Role: String!
    $IsVerified: Boolean!
    $IsActive: Boolean!
    $Gender: String!
    $CreatedBy: String!
    $UpdatedBy: String!
    $Email: String!
    $Phone: String!
  ) {
    registerUsers(
      input: [
        {
          first_name: $firstName
          last_name: $lastName
          status: $Status
          role: $Role
          is_verified: $IsVerified
          is_active: $IsActive
          gender: $Gender
          created_by: $CreatedBy
          updated_by: $UpdatedBy
          email: $Email
          phone: $Phone
        }
      ]
    ) {
      id
      first_name
      last_name
      status
      role
      is_verified
      is_active
      gender
      created_by
      updated_by
      created_at
      updated_at
      email
      phone
      photo_url
    }
  }
`;

export const INVITE_USERS = gql`
  mutation InviteUsers($emails: String!) {
    inviteUsers(emails: [$emails])
  }
`;

// https://zicops-one.firebaseapp.com/__/auth/action?
//mode = resetPassword &
//oobCode = ZCOjb6 - ANGga8SgCe2SXKelCXG2gw1TioDrgjwcy6ykAAAGCJmd7zw &
//apiKey = AIzaSyD05Uj8S - YumeJUiM4xuO8YFP7rjLJbrP8 &
//continueUrl = https % 3A % 2F % 2Fdemo.zicops.com &
//lang = en
//

//1). reset password link to https://demo.zicops.com/reset-password?

//  //check which of them exists... if both doesnt exist redirect to login page acquire tokenF by letting user login with their credentials
//now use tokenF and send rquest to login mutation as tokenF as header
//the moment we get access_token from mutation store it in tokenZ and now change the header with tokenZ
//we have to getUpdatedtoken if tokenZ is expired
