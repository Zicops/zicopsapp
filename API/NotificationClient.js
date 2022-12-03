import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { API_LINKS, authLink } from './api.helper';

const httpLink = createHttpLink({
  uri: API_LINKS.notification
});

// Set query Client
export const notificationClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const GET_FCM_TOKEN = gql`
  mutation {
    getFCMToken
  }
`;

export const GET_ALL_NOTIFICATIONS = gql`
  query getAll($prevPageSnapShot: String!, $pageSize: Int!) {
    getAll(prevPageSnapShot: $prevPageSnapShot, pageSize: $pageSize) {
      messages {
        title
        body
        created_at
        user_id
      }
      nextPageSnapShot
    }
  }
`;

export const SEND_NOTIFICATIONS = gql`
  mutation sendNotification($title: String!, $body: String!, $emails: [String]!) {
    sendNotification(notification: { title: $title, body: $body, emails: $emails }) {
      statuscode
    }
  }
`;
