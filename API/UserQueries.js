import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { API_LINKS, authLink } from './api.helper';

const httpLink = createHttpLink({
  uri: API_LINKS.userClient
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
  query GetUsersForAdmin(
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
    $filters: UserFilters
  ) {
    getUsersForAdmin(
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
      filters: $filters
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

export const GET_USER_LSP_MAP_BY_LSPID = gql`
  query GetUserLspMapsByLspId(
    $lsp_id: String!
    $pageCursor: String
    $Direction: String
    $pageSize: Int
  ) {
    getUserLspMapsByLspId(
      lsp_id: $lsp_id
      pageCursor: $pageCursor
      Direction: $Direction
      pageSize: $pageSize
    ) {
      user_lsp_maps {
        user_lsp_id
        user_id
        lsp_id
        status
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

// input CourseMapFilters {
//   lsp_id: [String]
//   is_mandatory: Boolean
//   status: String
//   type: String
// }
export const GET_USER_COURSE_MAPS = gql`
  query GetUserCourseMaps(
    $user_id: String!
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
    $filters: CourseMapFilters
  ) {
    getUserCourseMaps(
      user_id: $user_id
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
      filters: $filters
    ) {
      user_courses {
        user_course_id
        user_id
        user_lsp_id
        lsp_id
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
  query getUserCourseProgressByMapId($userId: String!, $userCourseId: [ID!]) {
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

export const GET_USER_COURSE_PROGRESS_ID = gql`
  query getUserCourseProgressByMapId($userId: String!, $userCourseId: [ID!]) {
    getUserCourseProgressByMapId(user_id: $userId, user_course_id: $userCourseId) {
      user_cp_id
      status
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
  query GetUserLspByLspId($user_id: String!, $lsp_id: String!) {
    getUserLspByLspId(user_id: $user_id, lsp_id: $lsp_id) {
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

export const GET_USER_NOTES_BOOKMARKS = gql`
  query getUserNotesAndBookmarks(
    $user_id: String!
    $user_lsp_id: String
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
    $course_id: String
  ) {
    getUserNotes(
      user_id: $user_id
      user_lsp_id: $user_lsp_id
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
      course_id: $course_id
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

    getUserBookmarks(
      user_id: $user_id
      user_lsp_id: $user_lsp_id
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
      course_id: $course_id
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

export const GET_USER_NOTES = gql`
  query getUserNotes(
    $user_id: String!
    $user_lsp_id: String
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
    $course_id: String
  ) {
    getUserNotes(
      user_id: $user_id
      user_lsp_id: $user_lsp_id
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
      course_id: $course_id
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
    $user_lsp_id: String
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
    $course_id: String
  ) {
    getUserBookmarks(
      user_id: $user_id
      user_lsp_id: $user_lsp_id
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
      course_id: $course_id
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
  query getUserExamAttempts($user_id: String, $exam_id: String!) {
    getUserExamAttempts(user_id: $user_id, exam_id: $exam_id) {
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
  query getUserExamResults($user_ea_details: [UserExamResultDetails!]!) {
    getUserExamResults(user_ea_details: $user_ea_details) {
      user_id
      user_ea_id
      results {
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

export const GET_COHORT_MAINS = gql`
  query GetCohortMains(
    $lsp_id: String!
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
    $searchText: String
  ) {
    getCohortMains(
      lsp_id: $lsp_id
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
      searchText: $searchText
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

export const GET_USER_LATEST_COHORTS = gql`
  query GetLatestCohorts(
    $user_id: String
    $user_lsp_id: String
    $publish_time: Int
    $pageCursor: String
    $pageSize: Int
  ) {
    getLatestCohorts(
      user_id: $user_id
      user_lsp_id: $user_lsp_id
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

export const GET_ORGANIZATIONS_DETAILS = gql`
  query GetOrganizations($org_ids: [String]) {
    getOrganizations(org_ids: $org_ids) {
      org_id
      name
      logo_url
      industry
      type
      subdomain
      employee_count
      website
      linkedin_url
      facebook_url
      twitter_url
      status
      created_at
      updated_at
      created_by
      updated_by
    }
  }
`;
export const GET_LSP_DETAILS_BY_ORG = gql`
  query GetLearningSpacesByOrgId($org_id: String!) {
    getLearningSpacesByOrgId(org_id: $org_id) {
      lsp_id
      org_id
      ou_id
      name
      logo_url
      profile_url
      no_users
      owners
      is_default
      status
      created_at
      updated_at
      created_by
      updated_by
    }
  }
`;

export const GET_LSP_DETAILS = gql`
  query GetLearningSpaceDetails($lsp_ids: [String]) {
    getLearningSpaceDetails(lsp_ids: $lsp_ids) {
      lsp_id
      org_id
      ou_id
      name
      logo_url
      profile_url
      no_users
      owners
      is_default
      status
      created_at
      updated_at
      created_by
      updated_by
    }
  }
`;
export const GET_ORG_UNITS_DETAILS = gql`
  query GetOrganizationUnits($ou_ids: [String]) {
    getOrganizationUnits(ou_ids: $ou_ids) {
      ou_id
      org_id
      emp_count
      address
      city
      state
      country
      postal_code
      status
      created_at
      updated_at
      created_by
      updated_by
    }
  }
`;

export const GET_USER_LSP_ROLES = gql`
  query GetUserLspRoles($user_id: String!, $user_lsp_ids: [String!]!) {
    getUserLspRoles(user_id: $user_id, user_lsp_ids: $user_lsp_ids) {
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
export const GET_LEARNINGSPACES_BY_ORGID = gql`
  query GetLearningSpacesByOrgId($org_id: String!) {
    getLearningSpacesByOrgId(org_id: $org_id) {
      lsp_id
      org_id
      ou_id
      name
      logo_url
      profile_url
      no_users
      owners
      is_default
      status
      created_at
      updated_at
      created_by
      updated_by
    }
  }
`;
export const GET_LEARNINGSPACES_ID_BY_ORGID = gql`
  query GetLearningSpacesByOrgId($org_id: String!) {
    getLearningSpacesByOrgId(org_id: $org_id) {
      lsp_id
      is_default
    }
  }
`;

export const GET_VENDORS_BY_LSP = gql`
  query getVendors($lsp_id: String) {
    getVendors(lsp_id: $lsp_id) {
      vendorId
      type
      level
      name
      photo_url
      address
      website
      facebook_url
      instagram_url
      twitter_url
      linkedin_url
      created_at
      created_by
      updated_at
      updated_by
      status
    }
  }
`;

export const GET_VENDORS_BY_LSP_FOR_TABLE = gql`
  query getVendors($lsp_id: String) {
    getVendors(lsp_id: $lsp_id) {
      vendorId
      type
      name
    }
  }
`;

// DASHBOARD QUERIES START
export const GET_COURSE_CONSUMPTION_STATS = gql`
  query getCourseConsumptionStats(
    $lsp_id: String!
    $pageCursor: String
    $direction: String
    $pageSize: Int
  ) {
    getCourseConsumptionStats(
      lsp_id: $lsp_id
      pageCursor: $pageCursor
      Direction: $direction
      pageSize: $pageSize
    ) {
      stats {
        ID
        LspId
        CourseId
        Category
        SubCategory
        Owner
        Duration
        TotalLearners
        ActiveLearners
        CompletedLearners
        ExpectedCompletionTime
        AverageCompletionTime
        AverageComplianceScore
        CreatedAt
        UpdatedAt
        CreatedBy
        UpdatedBy
      }
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_COURSE_VIEWS = gql`
  query getCourseViews($lsp_id: [String!]!, $startTime: String, $endTime: String) {
    getCourseViews(lsp_id: $lsp_id, start_time: $startTime, end_time: $endTime) {
      seconds
      created_at
      lsp_id
      user_ids
      date_string
    }
  }
`;

// DASHBOARD QUERIES END
