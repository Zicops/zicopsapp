import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { API_LINKS, authLink } from './api.helper';

const httpLink = createHttpLink({
  uri: API_LINKS.viltClient,
});

// Set query Client
export const viltQueryClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const GET_VILT_DATA = gql`
  query getViltData($courseId: String) {
    getViltData(courseId: $courseId) {
      id
      lsp_id
      course_id
      no_of_learners
      trainers
      moderators
      course_start_date
      course_end_date
      is_trainer_decided
      is_moderator_decided
      is_start_date_decided
      is_end_date_decided
      curriculum
      pricing_type
      price_per_seat
      currency
      tax_percentage
      is_registration_open
      is_booking_open
      max_registrations
      registration_end_date
      booking_start_date
      booking_end_date
      registration_publish_by
      registration_publish_on
      booking_publish_on
      booking_publish_by
      registration_start_date
      created_at
      created_by
      updated_at
      updated_by
      status
    }
  }
`;
export const GET_COMMERCIAL_DATA = gql`
  query getViltData($courseId: String) {
    getViltData(courseId: $courseId) {
      id
      lsp_id
      course_id
      pricing_type
      price_per_seat
      currency
      tax_percentage
      is_registration_open
      is_booking_open
      max_registrations
      registration_end_date
      booking_start_date
      booking_end_date
      created_at
      created_by
      updated_at
      updated_by
      status
    }
  }
`;

export const GET_TOPIC_CLASSROOM = gql`
  query getTopicClassroom($topicId: String) {
    getTopicClassroom(topic_id: $topicId) {
      id
      topic_id
      trainers
      moderators
      training_start_time
      training_end_time
      duration
      breaktime
      language
      is_screen_share_enabled
      is_chat_enabled
      is_microphone_enabled
      is_qa_enabled
      is_camera_enabled
      is_override_config
      created_at
      created_by
      updated_at
      updated_by
      status
    }
  }
`;

export const GET_PAGINATED_TRAINERS = gql`
  query getTrainerData(
    $lsp_id: String
    $vendor_id: String
    $pageCursor: String
    $Direction: String
    $pageSize: Int
  ) {
    getTrainerData(
      lsp_id: $lsp_id
      vendor_id: $vendor_id
      pageCursor: $pageCursor
      Direction: $Direction
      pageSize: $pageSize
    ) {
      trainers {
        id
        lsp_id
        user_id
        vendor_id
        expertise
        status
        created_at
        created_by
        updated_at
        updated_by
      }
      pageCursor
      Direction
      pageSize
    }
  }
`;

export const GET_TRAINER_BY_ID = gql`
  query getTrainerById($trainerId: String) {
    getTrainerById(id: $trainerId) {
      id
      lsp_id
      user_id
      vendor_id
      expertise
      status
      created_at
      created_by
      updated_at
      updated_by
    }
  }
`;

export const GET_PAGINATED_REGISTER_USER = gql`
  query getAllRegistrations(
    $courseId: String
    $pageCursor: String
    $Direction: String
    $pageSize: Int
  ) {
    getAllRegistrations(
      course_id: $courseId
      pageCursor: $pageCursor
      Direction: $Direction
      pageSize: $pageSize
    ) {
      data {
        id
        course_id
        user_id
        registration_date
        invoice
        status
        created_at
        created_by
        updated_at
        updated_by
      }
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_REGISTRATION_DETAILS = gql`
  query getRegistrationDetails($id: String) {
    getRegistrationDetails(id: $id) {
      id
      course_id
      user_id
      registration_date
      invoice
      status
      created_at
      created_by
      updated_at
      updated_by
    }
  }
`;
