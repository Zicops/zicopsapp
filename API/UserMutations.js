import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { API_LINKS, authLink } from './api.helper';

const httpLink = createUploadLink({
  uri: API_LINKS.userClient
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
  mutation InviteUsers($emails: [String!]!, $lsp_id: String) {
    inviteUsers(emails: $emails, lsp_id: $lsp_id)
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
    $lspId: String
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
          lsp_id: $lspId
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
  }
`;

export const UPDATE_USER_COURSE = gql`
  mutation updateUserCourse(
    $userCourseId: ID!
    $userId: String!
    $userLspId: String!
    $lspId: String
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
        lsp_id: $lspId
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
  mutation updateUserExamAttempts(
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
    updateUserExamAttempts(
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

export const ADD_USER_COHORT = gql`
  mutation addUserCohort($userCohort: [UserCohortInput!]!) {
    addUserCohort(input: $userCohort) {
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
  }
`;

export const UPDATE_USER_COHORT = gql`
  mutation UpdateUserCohort(
    $user_cohort_id: ID
    $user_id: String!
    $user_lsp_id: String!
    $cohort_id: String!
    $added_by: String!
    $membership_status: String!
    $role: String!
  ) {
    updateUserCohort(
      input: {
        user_cohort_id: $user_cohort_id
        user_id: $user_id
        user_lsp_id: $user_lsp_id
        cohort_id: $cohort_id
        added_by: $added_by
        membership_status: $membership_status
        role: $role
      }
    ) {
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
  }
`;

export const ADD_COHORT_MAIN = gql`
  mutation AddCohortMain(
    $name: String!
    $description: String!
    $lsp_id: String!
    $code: String!
    $status: String!
    $type: String!
    $is_active: Boolean!
    $size: Int!
    $image: Upload
  ) {
    addCohortMain(
      input: {
        name: $name
        description: $description
        lsp_id: $lsp_id
        code: $code
        status: $status
        type: $type
        is_active: $is_active
        size: $size
        image: $image
      }
    ) {
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

export const UPDATE_COHORT_MAIN = gql`
  mutation updateCohortMain(
    $cohort_id: ID
    $name: String!
    $description: String!
    $lsp_id: String!
    $code: String!
    $status: String!
    $type: String!
    $is_active: Boolean!
    $size: Int!
    $image: Upload
  ) {
    updateCohortMain(
      input: {
        cohort_id: $cohort_id
        name: $name
        description: $description
        lsp_id: $lsp_id
        code: $code
        status: $status
        type: $type
        is_active: $is_active
        size: $size
        image: $image
      }
    ) {
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

export const UPDATE_USER_EXAM_PROGRESS = gql`
  mutation updateUserExamProgress(
    $user_ep_id: ID
    $user_id: String!
    $user_ea_id: String!
    $user_lsp_id: String!
    $user_cp_id: String!
    $sr_no: Int!
    $question_id: String!
    $question_type: String!
    $answer: String!
    $q_attempt_status: String!
    $total_time_spent: String!
    $correct_answer: String!
    $section_id: String!
  ) {
    updateUserExamProgress(
      input: {
        user_ep_id: $user_ep_id
        user_id: $user_id
        user_ea_id: $user_ea_id
        user_lsp_id: $user_lsp_id
        user_cp_id: $user_cp_id
        sr_no: $sr_no
        question_id: $question_id
        question_type: $question_type
        answer: $answer
        q_attempt_status: $q_attempt_status
        total_time_spent: $total_time_spent
        correct_answer: $correct_answer
        section_id: $section_id
      }
    ) {
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

export const ADD_USER_EXAM_RESULTS = gql`
  mutation addUserExamResult(
    $user_id: String!
    $user_ea_id: String!
    $user_score: Int!
    $correct_answers: Int!
    $wrong_answers: Int!
    $result_status: String!
  ) {
    addUserExamResult(
      input: [
        {
          user_id: $user_id
          user_ea_id: $user_ea_id
          user_score: $user_score
          correct_answers: $correct_answers
          wrong_answers: $wrong_answers
          result_status: $result_status
        }
      ]
    ) {
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

export const ADD_COURSE_COHORT_MAP = gql`
  mutation AddCourseCohort(
    $CourseId: String
    $CohortId: String
    $CourseType: String
    $LspId: String
    $CohortCode: String
    $isMandatory: Boolean
    $CourseStatus: String
    $AddedBy: String
    $IsActive: Boolean
    $CreatedBy: String
    $UpdatedBy: String
    $ExpectedCompletion: Int
  ) {
    addCourseCohort(
      input: {
        CourseId: $CourseId
        CohortId: $CohortId
        CourseType: $CourseType
        LspId: $LspId
        CohortCode: $CohortCode
        isMandatory: $isMandatory
        CourseStatus: $CourseStatus
        AddedBy: $AddedBy
        CreatedBy: $CreatedBy
        UpdatedBy: $UpdatedBy
        IsActive: $IsActive
        ExpectedCompletion: $ExpectedCompletion
      }
    ) {
      id
      CourseId
      CohortId
      CourseType
      LspId
      CohortCode
      isMandatory
      CourseStatus
      AddedBy
      CreatedAt
      UpdatedAt
      CreatedBy
      UpdatedBy
      IsActive
      ExpectedCompletion
    }
  }
`;

export const ADD_USER_QUIZ_ATTEMPT = gql`
  mutation addUserQuizAttempt(
    $user_id: String!
    $user_cp_id: String!
    $user_course_id: String!
    $quiz_id: String!
    $quiz_attempt: Int!
    $topic_id: String!
    $result: String!
    $is_active: Boolean!
  ) {
    addUserQuizAttempt(
      input: [
        {
          user_id: $user_id
          user_cp_id: $user_cp_id
          user_course_id: $user_course_id
          quiz_id: $quiz_id
          quiz_attempt: $quiz_attempt
          topic_id: $topic_id
          result: $result
          is_active: $is_active
        }
      ]
    ) {
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

export const UPDATE_USER_QUIZ_ATTEMPT = gql`
  mutation updateUserQuizAttempt(
    $user_qa_id: ID
    $user_id: String!
    $user_cp_id: String!
    $user_course_id: String!
    $quiz_id: String!
    $quiz_attempt: Int!
    $topic_id: String!
    $result: String!
    $is_active: Boolean!
  ) {
    updateUserQuizAttempt(
      input: {
        user_id: $user_id
        user_qa_id: $user_qa_id
        user_cp_id: $user_cp_id
        user_course_id: $user_course_id
        quiz_id: $quiz_id
        quiz_attempt: $quiz_attempt
        topic_id: $topic_id
        result: $result
        is_active: $is_active
      }
    ) {
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
export const UPDATE_ORGANIZATION_DETAILS = gql`
  mutation updateOrganization(
    $org_id: ID
    $name: String!
    $industry: String!
    $type: String!
    $subdomain: String!
    $employee_count: Int!
    $website: String!
    $linkedin_url: String
    $facebook_url: String
    $twitter_url: String
    $status: String!
  ) {
    updateOrganization(
      input: {
        org_id: $org_id
        name: $name
        industry: $industry
        type: $type
        subdomain: $subdomain
        employee_count: $employee_count
        website: $website
        linkedin_url: $linkedin_url
        facebook_url: $facebook_url
        twitter_url: $twitter_url
        status: $status
      }
    ) {
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

export const UPDATE_LEARNING_SPACE_DETAILS = gql`
  mutation updateLearningSpace(
    $org_id: String!
    $ou_id: String!
    $lsp_id: ID
    $name: String!
    $no_users: Int!
    $is_default: Boolean!
    $status: String!
    $logo_url: String
    $profile_url: String
    $owners: [String]
  ) {
    updateLearningSpace(
      input: {
        org_id: $org_id
        ou_id: $ou_id
        lsp_id: $lsp_id
        name: $name
        no_users: $no_users
        is_default: $is_default
        status: $status
        logo_url: $logo_url
        profile_url: $profile_url
        owners: $owners
      }
    ) {
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

export const UPDATE_ORGAINIZATION_UNIT_DETAILS = gql`
  mutation updateOrganizationUnit(
    $org_id: String!
    $ou_id: ID
    $address: String!
    $city: String!
    $state: String!
    $country: String!
    $status: String!
    $postal_code: String!
    $emp_count: Int!
    $created_by: String
    $updated_by: String
  ) {
    updateOrganizationUnit(
      input: {
        org_id: $org_id
        ou_id: $ou_id
        emp_count: $emp_count
        address: $address
        city: $city
        state: $state
        country: $country
        postal_code: $postal_code
        status: $status
        created_by: $created_by
        updated_by: $updated_by
      }
    ) {
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
export const ADD_VENDOR = gql`
  mutation addVendor(
    $lsp_id: String
    $name: String
    $level: String
    $vendorId: String
    $type: String
    $photo: Upload
    $address: String
    $website: String
    $facebook_url: String
    $instagram_url: String
    $twitter_url: String
    $linkedin_url: String
    $users: [String]
    $description: String
    $status: String
  ) {
    addVendor(
      input: {
        lsp_id: $lsp_id
        vendor_id: $vendorId
        name: $name
        level: $level
        type: $type
        photo: $photo
        address: $address
        website: $website
        facebook_url: $facebook_url
        instagram_url: $instagram_url
        twitter_url: $twitter_url
        linkedin_url: $linkedin_url
        users: $users
        description: $description
        status: $status
      }
    ) {
      vendorId
      type
      level
      name
      description
      photo_url
      address
      website
      users
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
export const UPDATE_VENDOR = gql`
  mutation updateVendor(
    $vendorId: String
    $level: String
    $type: String
    $name: String
    $photo: Upload
    $address: String
    $website: String
    $facebook_url: String
    $instagram_url: String
    $twitter_url: String
    $linkedin_url: String
    $users: [String]
    $description: String
    $status: String
  ) {
    updateVendor(
      input: {
        vendor_id: $vendorId
        level: $level
        type: $type
        name: $name
        photo: $photo
        address: $address
        website: $website
        facebook_url: $facebook_url
        instagram_url: $instagram_url
        twitter_url: $twitter_url
        linkedin_url: $linkedin_url
        users: $users
        description: $description
        status: $status
      }
    ) {
      vendorId
      level
      type
      name
      photo_url
      address
      users
      website
      description
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
