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
query getViltData($courseId:String){
  getViltData(
    courseId: $courseId
  ) {
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
