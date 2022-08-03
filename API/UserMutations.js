import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';

const httpLink = createUploadLink({
  uri: 'https://demo.zicops.com/um/api/v1/query'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication tokenF and tokenZ from local storage if it exists

  const firebaseToken = sessionStorage.getItem('tokenF')
    ? sessionStorage.getItem('tokenF')
    : auth?.currentUser?.accessToken;

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

export const UPDATE_USER = gql`
  mutation UpdateUser(
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
    $Photo: Upload
  ) {
    updateUser(
      input: {
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
        Photo: $Photo
      }
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
