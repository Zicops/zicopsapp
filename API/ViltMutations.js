import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { API_LINKS, authLink } from './api.helper';

const httpLink = createHttpLink({
  uri: API_LINKS.viltClient
});

// Set query Client
export const viltMutationClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// ViltInput = {
//   lsp_id: String
//   course_id: String
//   no_of_learners: Int
//   trainers: [String]
//   moderators: [String]
//   course_start_date: String
//   course_end_date: String
//   curriculum: String
//   status: String
// }
export const CREATE_VILT_DATA = gql`
  mutation createViltData($input: ViltInput) {
    createViltData(input: $input) {
      id
      lsp_id
      course_id
      no_of_learners
      trainers
      moderators
      course_start_date
      course_end_date
      curriculum
      is_end_date_decided
      is_start_date_decided
      is_trainer_decided
      is_moderator_decided
      created_at
      created_by
      updated_at
      updated_by
      status
    }
  }
`;

// ViltInput = {
//   lsp_id: String
//   course_id: String
//   no_of_learners: Int
//   trainers: [String]
//   moderators: [String]
//   course_start_date: String
//   course_end_date: String
//   curriculum: String
//   status: String
// }
export const UPDATE_VILT_DATA = gql`
  mutation updateViltData($input: ViltInput) {
    updateViltData(input: $input) {
      id
      lsp_id
      course_id
      no_of_learners
      trainers
      moderators
      course_start_date
      course_end_date
      curriculum
      is_end_date_decided
      is_start_date_decided
      is_trainer_decided
      is_moderator_decided
      created_at
      created_by
      updated_at
      updated_by
      status
    }
  }
`;

export const CREATE_TOPIC_CLASSROOM = gql`
  mutation createTopicClassroom($input: TopicClassroomInput) {
    createTopicClassroom(input: $input) {
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

export const UPDATE_TOPIC_CLASSROOM = gql`
  mutation updateTopicClassroom($input: TopicClassroomInput) {
    updateTopicClassroom(input: $input) {
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

export const CREATE_COMMERCIALS_DATA = gql`
  mutation createViltData($input: ViltInput) {
    createViltData(input: $input) {
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
      registration_start_date
      created_at
      created_by
      updated_at
      updated_by
      status
    }
  }
`;
export const UPDATE_COMMERCIALS_DATA = gql`
  mutation updateViltData($input: ViltInput) {
    updateViltData(input: $input) {
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
      registration_start_date
      created_at
      created_by
      updated_at
      updated_by
      status
    }
  }
`;
