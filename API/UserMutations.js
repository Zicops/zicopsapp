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

export const ADD_USER_COURSE = gql`
  mutation addUserCourse(
    $userId: String!
    $userLspId: String!
    $courseId: String!
    $addedBy: String!
    $courseType: String!
    $isMandatory: Boolean!
    $courseStatus: String!
    $endDate: String
  ) {
    addUserCourse(
      input: [
        {
          user_id: $userId
          user_lsp_id: $userLspId
          course_id: $courseId
          course_type: $courseType
          added_by: $addedBy
          is_mandatory: $isMandatory
          course_status: $courseStatus
          end_date: $endDate
        }
      ]
    ) {
      user_course_id
      user_id
      user_lsp_id
      course_id
      course_type
      added_by
      is_mandatory
      end_date
      course_status
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const UPDATE_USER_COURSE = gql`
  mutation updateUserCourse(
    $userId: String!
    $userLspId: String!
    $courseId: String!
    $addedBy: String!
    $courseType: String!
    $isMandatory: Boolean!
    $courseStatus: String!
    $endDate: String
  ) {
    updateUserCourse(
      input: [
        {
          user_id: $userId
          user_lsp_id: $userLspId
          course_id: $courseId
          course_type: $courseType
          added_by: $addedBy
          is_mandatory: $isMandatory
          course_status: $courseStatus
          end_date: $endDate
        }
      ]
    ) {
      user_course_id
      user_id
      user_lsp_id
      course_id
      course_type
      added_by
      is_mandatory
      end_date
      course_status
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;
