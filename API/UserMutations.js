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
    $id: ID
    $first_name: String!
    $last_name: String!
    $status: String!
    $role: String!
    $is_verified: Boolean!
    $is_active: Boolean!
    $gender: String!
    $created_by: String!
    $updated_by: String!
    $email: String!
    $phone: String!
    $Photo: Upload
  ) {
    updateUser(
      input: {
        id: $id
        first_name: $first_name
        last_name: $last_name
        status: $status
        role: $role
        is_verified: $is_verified
        is_active: $is_active
        gender: $gender
        created_by: $created_by
        updated_by: $updated_by
        email: $email
        phone: $phone
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

export const ADD_USER_LEARNINGSPACE_MAP = gql`
  mutation AddUserLspMap($user_id: String!, $lsp_id: String!, $status: String!) {
    addUserLspMap(input: [{ user_id: $user_id, lsp_id: $lsp_id, status: $status }]) {
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

export const UPDATE_USER_LEARNINGSPACE_MAP = gql`
  mutation updateUserLspMap(
    $user_lsp_id: ID
    $user_id: String!
    $lsp_id: String!
    $status: String!
  ) {
    updateUserLspMap(
      input: { user_lsp_id: $user_lsp_id, user_id: $user_id, lsp_id: $lsp_id, status: $status }
    ) {
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

export const ADD_USER_ORGANIZATION_MAP = gql`
  mutation addUserOrganizationMap(
    $user_id: String!
    $user_lsp_id: String!
    $organization_id: String!
    $organization_role: String!
    $is_active: Boolean!
    $employee_id: String!
  ) {
    addUserOrganizationMap(
      input: [
        {
          user_id: $user_id
          user_lsp_id: $user_lsp_id
          organization_id: $organization_id
          organization_role: $organization_role
          is_active: $is_active
          employee_id: $employee_id
        }
      ]
    ) {
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

export const UPDATE_USER_ORGANIZATION_MAP = gql`
  mutation updateUserOrganizationMap(
    $user_organization_id: ID
    $user_id: String!
    $user_lsp_id: String!
    $organization_id: String!
    $organization_role: String!
    $is_active: Boolean!
    $employee_id: String!
  ) {
    updateUserOrganizationMap(
      input: {
        user_organization_id: $user_organization_id
        user_id: $user_id
        user_lsp_id: $user_lsp_id
        organization_id: $organization_id
        organization_role: $organization_role
        is_active: $is_active
        employee_id: $employee_id
      }
    ) {
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

export const ADD_USER_LANGUAGE_MAP = gql`
  mutation addUserLanguageMap(
    $user_id: String!
    $user_lsp_id: String!
    $language: String!
    $is_base_language: Boolean!
    $is_active: Boolean!
  ) {
    addUserLanguageMap(
      input: [
        {
          user_id: $user_id
          user_lsp_id: $user_lsp_id
          language: $language
          is_base_language: $is_base_language
          is_active: $is_active
        }
      ]
    ) {
      user_language_id
      user_id
      user_lsp_id
      language
      is_base_language
      is_active
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const ADD_USER_PREFERENCE = gql`
  mutation addUserPreference(
    $user_id: String!
    $user_lsp_id: String!
    $sub_category: String!
    $is_base: Boolean!
    $is_active: Boolean!
  ) {
    addUserPreference(
      input: [
        {
          user_id: $user_id
          user_lsp_id: $user_lsp_id
          sub_category: $sub_category
          is_base: $is_base
          is_active: $is_active
        }
      ]
    ) {
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

export const ADD_USER_ROLE = gql`
  mutation addUserRoles(
    $user_id: String!
    $user_lsp_id: String!
    $role: String!
    $is_active: Boolean!
  ) {
    addUserRoles(
      input: [{ user_id: $user_id, user_lsp_id: $user_lsp_id, role: $role, is_active: $is_active }]
    ) {
      user_role_id
      user_id
      user_lsp_id
      role
      is_active
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const UPDATE_USER_ROLE = gql`
  mutation updateUserRole(
    $user_role_id: ID
    $user_id: String!
    $user_lsp_id: String!
    $role: String!
    $is_active: Boolean!
  ) {
    updateUserRole(
      input: {
        user_role_id: $user_role_id
        user_id: $user_id
        user_lsp_id: $user_lsp_id
        role: $role
        is_active: $is_active
      }
    ) {
      user_role_id
      user_id
      user_lsp_id
      role
      is_active
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;
