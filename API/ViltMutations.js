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
      lsp_id
      course_id
      no_of_learners
      trainers
      moderators
      course_start_date
      course_end_date
      curriculum
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
    createViltData(input: $input) {
      lsp_id
      course_id
      no_of_learners
      trainers
      moderators
      course_start_date
      course_end_date
      curriculum
      created_at
      created_by
      updated_at
      updated_by
      status
    }
  }
`;
