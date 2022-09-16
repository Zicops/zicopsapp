import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { authLink } from './api.helper';

const httpLink = createHttpLink({
  uri: 'https://demo.zicops.com/um/api/v1/query'
});

// Set query Client
export const userQueryClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const GET_USER_DETAIL = gql`
  query GetUserDetails($user_id: [String!]) {
    getUserDetails(user_ids: $user_id) {
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
  query GetUserCourseMaps(
    $user_id: String!
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
  ) {
    getUserCourseMaps(
      user_id: $user_id
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

export const GET_USER_COURSE_MAPS_BY_COURSE_ID = gql`
  query GetUserCourseMaps($userId: String!, $courseId: String!) {
    getUserCourseMapByCourseID(user_id: $userId, course_id: $courseId) {
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

export const GET_USER_COURSE_PROGRESS = gql`
  query getUserCourseProgressByMapId($userId: String!, $userCourseId: ID!) {
    getUserCourseProgressByMapId(user_id: $userId, user_course_id: $userCourseId) {
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

export const GET_USER_ORGANIZATIONS = gql`
  query GetUserOrganization($user_id: String!) {
    getUserOrganizations(user_id: $user_id) {
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
  query GetUserLsps($user_id: String!) {
    getUserLsps(user_id: $user_id) {
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
  query GetUserPreferences($user_id: String!) {
    getUserPreferences(user_id: $user_id) {
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

export const GET_USER_NOTES = gql`
  query getUserNotes(
    $user_id: String!
    $user_lsp_id: String!
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
  ) {
    getUserNotes(
      user_id: $user_id
      user_lsp_id: $user_lsp_id
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
    ) {
      notes {
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
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_USER_BOOKMARKS = gql`
  query getUserBookmarks(
    $user_id: String!
    $user_lsp_id: String!
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
  ) {
    getUserBookmarks(
      user_id: $user_id
      user_lsp_id: $user_lsp_id
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
    ) {
      bookmarks {
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
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_USER_EXAM_ATTEMPTS = gql`
  query getUserExamAttempts($user_id: String!, $user_lsp_id: String!) {
    getUserExamAttempts(user_id: $user_id, user_lsp_id: $user_lsp_id) {
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

export const GET_USER_EXAM_RESULTS = gql`
  query getUserExamResults($user_id: String!, $user_ea_id: String!) {
    getUserExamResults(user_id: $user_id, user_ea_id: $user_ea_id) {
      user_er_id
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

export const GET_USER_EXAM_PROGRESS = gql`
  query getUserExamProgress($user_id: String!, $user_ea_id: String!) {
    getUserExamProgress(user_id: $user_id, user_ea_id: $user_ea_id) {
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

export const GET_USER_QUIZ_ATTEMPTS = gql`
  query getUserQuizAttempts($user_id: String!, $topic_id: String!) {
    getUserQuizAttempts(user_id: $user_id, topic_id: $topic_id) {
      user_qa_id
      user_id
      user_cp_id
      user_course_id
      quiz_id
      quiz_attempt
      topic_id
      result
      is_active
      created_by
      updated_by
      created_at
      updated_at
    }
  }
`;

export const GET_COHORT_MAINS = gql`
  query GetCohortMains($lsp_id: String!, $publish_time: Int, $pageCursor: String, $pageSize: Int) {
    getCohortMains(
      lsp_id: $lsp_id
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
    ) {
      cohorts {
        cohort_id
        name
        description
        lsp_id
        code
        status
        type
        is_active
        created_by
        updated_by
        created_at
        updated_at
        size
        imageUrl
      }
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_COHORT_DETAILS = gql`
  query GetCohortDetails($cohort_id: String!) {
    getCohortDetails(cohort_id: $cohort_id) {
      cohort_id
      name
      description
      lsp_id
      code
      status
      type
      is_active
      created_by
      updated_by
      created_at
      updated_at
      size
      imageUrl
    }
  }
`;

export const GET_COHORT_USERS = gql`
  query GetCohortUsers(
    $cohort_id: String!
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
  ) {
    getCohortUsers(
      cohort_id: $cohort_id
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
    ) {
      cohorts {
        user_cohort_id
        user_id
        user_lsp_id
        cohort_id
        added_by
        membership_status
        role
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

