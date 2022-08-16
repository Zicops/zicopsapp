import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import { getIdToken } from 'firebase/auth';

const httpLink = createUploadLink({
  uri: 'https://demo.zicops.com/um/api/v1/query'
});

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
      Authorization: fireBaseToken ? `Bearer ${fireBaseToken}` : 'Token Not found'
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
  mutation InviteUsers($emails: [String!]!) {
    inviteUsers(emails: $emails)
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
    $userCourseId: ID!
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
      input: {
        user_course_id: $userCourseId
        user_id: $userId
        user_lsp_id: $userLspId
        course_id: $courseId
        course_type: $courseType
        added_by: $addedBy
        is_mandatory: $isMandatory
        course_status: $courseStatus
        end_date: $endDate
      }
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

export const ADD_USER_COURSE_PROGRESS = gql`
  mutation addUserCourseProgress(
    $userId: String!
    $userCourseId: String!
    $topicId: String!
    $topicType: String!
    $status: String!
    $videoProgress: String!
    $timestamp: String!
  ) {
    addUserCourseProgress(
      input: [
        {
          user_id: $userId
          user_course_id: $userCourseId
          topic_id: $topicId
          topic_type: $topicType
          status: $status
          video_progress: $videoProgress
          time_stamp: $timestamp
        }
      ]
    ) {
      user_cp_id
      user_id
      user_course_id
      topic_id
      topic_type
      status
      video_progress
      time_stamp
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const UPDATE_USER_COURSE_PROGRESS = gql`
  mutation updateUserCourseProgress(
    $userCpId: ID!
    $userId: String!
    $userCourseId: String!
    $topicId: String!
    $topicType: String!
    $status: String!
    $videoProgress: String!
    $timestamp: String!
  ) {
    updateUserCourseProgress(
      input: {
        user_cp_id: $userCpId
        user_id: $userId
        user_course_id: $userCourseId
        topic_id: $topicId
        topic_type: $topicType
        status: $status
        video_progress: $videoProgress
        time_stamp: $timestamp
      }
    ) {
      user_cp_id
      user_id
      user_course_id
      topic_id
      topic_type
      status
      video_progress
      time_stamp
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
  mutation addUserPreference($input: [UserPreferenceInput!]!) {
    addUserPreference(input: $input) {
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

export const UPDATE_USER_PREFERENCE = gql`
  mutation UpdateUserPreference(
    $user_preference_id: ID
    $user_id: String!
    $user_lsp_id: String!
    $is_active: Boolean!
    $sub_category: String!
    $is_base: Boolean!
  ) {
    updateUserPreference(
      input: {
        user_preference_id: $user_preference_id
        user_id: $user_id
        user_lsp_id: $user_lsp_id
        sub_category: $sub_category
        is_base: $is_base
        is_active: $is_active
      }
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

export const ADD_USER_BOOKMARK = gql`
  mutation addUserBookmark(
    $user_id: String!
    $user_lsp_id: String!
    $user_course_id: String!
    $course_id: String!
    $module_id: String!
    $topic_id: String!
    $name: String!
    $time_stamp: String!
    $is_active: Boolean!
  ) {
    addUserBookmark(
      input: [
        {
          user_id: $user_id
          user_lsp_id: $user_lsp_id
          user_course_id: $user_course_id
          course_id: $course_id
          module_id: $module_id
          topic_id: $topic_id
          name: $name
          time_stamp: $time_stamp
          is_active: $is_active
        }
      ]
    ) {
      user_bm_id
      user_id
      user_lsp_id
      user_course_id
      course_id
      module_id
      topic_id
      name
      time_stamp
      is_active
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const UPDATE_USER_BOOKMARK = gql`
  mutation UpdateUserBookmark(
    $user_bm_id: String!
    $user_id: String!
    $user_lsp_id: String!
    $user_course_id: String!
    $course_id: String!
    $module_id: String!
    $topic_id: String!
    $name: String!
    $time_stamp: String!
    $is_active: Boolean!
  ) {
    addUserBookmark(
      input: [
        {
          user_bm_id: $user_bm_id
          user_id: $user_id
          user_lsp_id: $user_lsp_id
          user_course_id: $user_course_id
          course_id: $course_id
          module_id: $module_id
          topic_id: $topic_id
          name: $name
          time_stamp: $time_stamp
          is_active: $is_active
        }
      ]
    ) {
      user_bm_id
      user_id
      user_lsp_id
      user_course_id
      course_id
      module_id
      topic_id
      name
      time_stamp
      is_active
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const ADD_USER_NOTES = gql`
  mutation AddUserNotes(
    $user_id: String!
    $user_lsp_id: String!
    $course_id: String!
    $module_id: String!
    $topic_id: String!
    $sequence: Int!
    $details: String!
    $status: String!
    $is_active: Boolean!
  ) {
    addUserNotes(
      input: [
        {
          user_id: $user_id
          user_lsp_id: $user_lsp_id
          course_id: $course_id
          module_id: $module_id
          topic_id: $topic_id
          sequence: $sequence
          status: $status
          details: $details
          is_active: $is_active
        }
      ]
    ) {
      user_notes_id
      user_id
      user_lsp_id
      course_id
      module_id
      topic_id
      sequence
      status
      details
      is_active
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const UPDATE_USER_NOTES = gql`
  mutation updateUserNotes(
    $user_notes_id: ID
    $user_id: String!
    $user_lsp_id: String!
    $course_id: String!
    $module_id: String!
    $topic_id: String!
    $sequence: Int!
    $status: String!
    $details: String!
    $is_active: Boolean!
  ) {
    updateUserNotes(
      input: {
        user_notes_id: $user_notes_id
        user_id: $user_id
        user_lsp_id: $user_lsp_id
        course_id: $course_id
        module_id: $module_id
        topic_id: $topic_id
        sequence: $sequence
        status: $status
        details: $details
        is_active: $is_active
      }
    ) {
      user_notes_id
      user_id
      user_lsp_id
      course_id
      module_id
      topic_id
      sequence
      status
      details
      is_active
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const ADD_USER_EXAM_ATTEMPTS = gql`
  mutation AddUserExamAttempts($userExamAttempts: [UserExamAttemptsInput]!) {
    addUserExamAttempts(input: $userExamAttempts) {
      user_ea_id
      user_id
      user_lsp_id
      user_cp_id
      user_course_id
      exam_id
      attempt_no
      attempt_status
      attempt_start_time
      attempt_duration
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const UPDATE_USER_EXAM_ATTEMPTS = gql`
  mutation AddUserExamAttempts(
    $user_ea_id: ID
    $user_id: String!
    $user_lsp_id: String!
    $user_cp_id: String!
    $user_course_id: String!
    $exam_id: String!
    $attempt_no: Int!
    $attempt_status: String!
    $attempt_start_time: String!
    $attempt_duration: String!
  ) {
    addUserExamAttempts(
      input: {
        user_ea_id: $user_ea_id
        user_id: $user_id
        user_lsp_id: $user_lsp_id
        user_cp_id: $user_cp_id
        user_course_id: $user_course_id
        exam_id: $exam_id
        attempt_no: $attempt_no
        attempt_status: $attempt_status
        attempt_start_time: $attempt_start_time
        attempt_duration: $attempt_duration
      }
    ) {
      user_ea_id
      user_id
      user_lsp_id
      user_cp_id
      user_course_id
      exam_id
      attempt_no
      attempt_status
      attempt_start_time
      attempt_duration
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const ADD_USER_EXAM_PROGRESS = gql`
  mutation addUserExamProgress($userExamProgress: [UserExamProgressInput]!) {
    addUserExamProgress(input: $userExamProgress) {
      user_ep_id
      user_id
      user_ea_id
      user_lsp_id
      user_cp_id
      sr_no
      question_id
      question_type
      answer
      q_attempt_status
      total_time_spent
      correct_answer
      section_id
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const GET_USER_COURSE_MAPS = gql`
  query getUserCourseMaps($publish_time: Int, $pageCursor: String, $pageSize: Int) {
    getUserCourseMaps(
      user_id: ""
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

export const GET_USER_COURSE_PROGRESS = gql`
  query getUserCourseProgressByMapId($userCourseId: ID!) {
    getUserCourseProgressByMapId(user_id: "", user_course_id: $userCourseId) {
      user_cp_id
      user_id
      user_ea_id
      user_score
      correct_answers
      wrong_answers
      result_status
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;
