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
export const userQueryClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const GET_USER_DETAIL = gql`
  query GetUserDetails($user_id: String!) {
    getUserDetails(user_id: $user_id) {
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
export const GET_USERS_FOR_ADMIN = gql`
  query GetUsersForAdmin($publish_time: Int, $pageCursor: String, $pageSize: Int) {
    getUsersForAdmin(
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
    ) {
      users {
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
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_USER_COURSE_MAPS = gql`
  query GetUserCourseMaps($publish_time: Int, $pageCursor: String, $pageSize: Int) {
    getUserCourseMaps(
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
    ) {
      user_courses {
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
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_USER_ORGANIZATIONS = gql`
  query GetUserOrganization {
    getUserOrganizations {
      user_organization_id
      user_id
      user_lsp_id
      organization_id
      organization_role
      is_active
      employee_id
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const GET_USER_ORGANIZATION_DETAIL = gql`
  query GetUserOrgDetails($user_id: String!, $user_lsp_id: String!) {
    getUserOrgDetails(user_id: $user_id, user_lsp_id: $user_lsp_id) {
      user_organization_id
      user_id
      user_lsp_id
      organization_id
      organization_role
      is_active
      employee_id
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const GET_USER_LEARNINGSPACES = gql`
  query GetUserLsps {
    getUserLsps {
      user_lsp_id
      user_id
      lsp_id
      status
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const GET_USER_LEARNINGSPACES_DETAILS = gql`
  query GetUserLspByLspId($user_id: String!, $user_lsp_id: String!) {
    getUserLspByLspId(user_id: $user_id, lsp_id: $user_lsp_id) {
      user_lsp_id
      user_id
      lsp_id
      status
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const GET_USER_PREFERENCES = gql`
  {
    getUserPreferences {
      user_preference_id
      user_id
      user_lsp_id
      sub_category
      is_base
      is_active
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const GET_USER_PREFERENCES_DETAILS = gql`
  query GetUserPreferenceForLsp($user_id: String!, $user_lsp_id: String!) {
    getUserPreferenceForLsp(user_id: $user_id, user_lsp_id: $user_lsp_id) {
      user_preference_id
      user_id
      user_lsp_id
      sub_category
      is_base
      is_active
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;
