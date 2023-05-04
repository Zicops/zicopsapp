import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { API_LINKS, authLink } from './api.helper';

const httpLink = createHttpLink({
  uri: API_LINKS.viltClient,
});

// Set query Client
export const viltMutationClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// input ViltInput {
//   id: String
//   lsp_id: String
//   course_id: String
//   no_of_learners: Int
//   trainers: [String]
//   moderators: [String]
//   course_start_date: String
//   course_end_date: String
//   curriculum: String
//   is_trainer_decided: Boolean
//   is_moderator_decided: Boolean
//   is_start_date_decided: Boolean
//   is_end_date_decided: Boolean
//   pricing_type: String
//   price_per_seat: Int
//   currency: String
//   tax_percentage: Float
//   is_registration_open:Boolean
//   is_booking_open: Boolean
//   max_registrations: Int
//   registration_end_date: Int
//   booking_start_date: Int
//   booking_end_date: Int
//   registration_publish_by: String
//   registration_publish_on: Int
//   booking_publish_on: Int
//   booking_publish_by: String
//   registration_start_date: Int
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

// input ViltInput {
//   id: String
//   lsp_id: String
//   course_id: String
//   no_of_learners: Int
//   trainers: [String]
//   moderators: [String]
//   course_start_date: String
//   course_end_date: String
//   curriculum: String
//   is_trainer_decided: Boolean
//   is_moderator_decided: Boolean
//   is_start_date_decided: Boolean
//   is_end_date_decided: Boolean
//   pricing_type: String
//   price_per_seat: Int
//   currency: String
//   tax_percentage: Float
//   is_registration_open:Boolean
//   is_booking_open: Boolean
//   max_registrations: Int
//   registration_end_date: Int
//   booking_start_date: Int
//   booking_end_date: Int
//   registration_publish_by: String
//   registration_publish_on: Int
//   booking_publish_on: Int
//   booking_publish_by: String
//   registration_start_date: Int
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
      status
    }
  }
`;

//START TRAINING MANAGEMENT MUTATION

export const CREATE_TRAINER = gql`
  mutation createTrainerData(
    $lspId: String
    $userId: String
    $vendorId: String
    $expertise: [String]
    $status: String
  ) {
    createTrainerData(
      input: {
        lsp_id: $lspId
        user_id: $userId
        vendor_id: $vendorId
        expertise: $expertise
        status: $status
      }
    ) {
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
