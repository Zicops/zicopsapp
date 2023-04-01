import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { API_LINKS, authLink } from './api.helper';

const httpLink = createHttpLink({
  uri: API_LINKS.viltClient
});

// Set query Client
export const viltQueryClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
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
