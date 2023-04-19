import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { API_LINKS, authLink } from './api.helper';

const httpLink = createHttpLink({
  uri: API_LINKS.notification,
});

// Set query Client
export const notificationClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const GET_FCM_TOKEN = gql`
  mutation {
    getFCMToken
  }
`;
export const ADD_NOTIFICATION_TO_FIRESTORE = gql`
  mutation ($title: String!, $body: String!, $is_read: Boolean!, $message_id: String!) {
    addToFirestore(
      message: [{ title: $title, body: $body, is_read: $is_read, message_id: $message_id }]
    )
  }
`;

export const GET_ALL_NOTIFICATIONS = gql`
  query getAll($prevPageSnapShot: String!, $pageSize: Int!, $isRead: Boolean) {
    getAll(prevPageSnapShot: $prevPageSnapShot, pageSize: $pageSize, is_read: $isRead) {
      messages {
        title
        body
        created_at
        user_id
        message_id
        is_read
        link
      }
      nextPageSnapShot
    }
  }
`;

export const GET_PAGINATED_NOTIFICATIONS = gql`
  query getAllPaginatedNotifications($pageIndex: Int!, $pageSize: Int!, $isRead: Boolean) {
    getAllPaginatedNotifications(pageIndex: $pageIndex, pageSize: $pageSize, is_read: $isRead) {
      title
      body
      created_at
      user_id
      message_id
      is_read
      link
      lsp_id
    }
  }
`;

export const SEND_NOTIFICATIONS = gql`
  mutation sendNotification($title: String!, $body: String!, $user_id: [String]!) {
    sendNotification(notification: { title: $title, body: $body, user_id: $user_id }) {
      statuscode
    }
  }
`;

export const SEND_NOTIFICATIONS_WITH_LINK = gql`
  mutation sendNotificationWithLink(
    $title: String!
    $body: String!
    $user_id: [String]!
    $link: String!
  ) {
    sendNotificationWithLink(
      notification: { title: $title, body: $body, user_id: $user_id }
      link: $link
    ) {
      statuscode
    }
  }
`;

export const SEND_EMAIL = gql`
  mutation sendEmail(
    $to: [String]!
    $sender_name: String!
    $user_name: [String]!
    $body: String!
    $template_id: String!
  ) {
    sendEmail(
      to_: $to
      sender_name: $sender_name
      user_name: $user_name
      body: $body
      template_id: $template_id
    )
  }
`;

export const ADD_USER_TAGS = gql`
  mutation addUserTags($ids: [UserDetails], $tags: [String]) {
    addUserTags(ids: $ids, tags: $tags)
  }
`;

export const GET_USER_LSP_TAGS = gql`
  query getUserLspIdTags($user_lsp_ids: [String]) {
    getUserLspIdTags(user_lsp_id: $user_lsp_ids) {
      user_lsp_id
      user_id
      tags
      lsp_id
    }
  }
`;

// input ClassRoomFlagsInput {
//   id: String
//   is_classroom_started: Boolean
//   is_participants_present: Boolean
//   is__ad_displayed: Boolean
//   is_break: Boolean
//   is_moderator_joined: Boolean
//   is_trainer_joined: Boolean
//   ad_video_url: String
// }
export const ADD_UPDATE_CLASSROOM_FLAGS = gql`
  mutation addUpdateClassroomFlags(
    $id: String
    $is_classroom_started: Boolean
    $is_participants_present: Boolean
    $is__ad_displayed: Boolean
    $is_break: Boolean
    $is_moderator_joined: Boolean
    $is_trainer_joined: Boolean
    $ad_video_url: String
  ) {
    addUpdateClassroomFlags(
      input: {
        id: $id
        is_classroom_started: $is_classroom_started
        is_participants_present: $is_participants_present
        is__ad_displayed: $is__ad_displayed
        is_break: $is_break
        is_moderator_joined: $is_moderator_joined
        is_trainer_joined: $is_trainer_joined
        ad_video_url: $ad_video_url
      }
    ) {
      id
      is_classroom_started
      is_participants_present
      is__ad_displayed
      is_break
      is_moderator_joined
      is_trainer_joined
      ad_video_url
    }
  }
`;
// addMessagesMeet(message: Messages): Boolean
export const ADD_TO_FIRESTORE_CHAT = gql`
  mutation addMessagesMeet(
    $meetingId: String
    $userId: String
    $body: String
    $time: Int
    $chatType: String
  ) {
    addMessagesMeet(
      message: {
        meeting_id: $meetingId
        user_id: $userId
        body: $body
        time: $time
        chat_type: $chatType
      }
    )
  }
`;
export const ADD_VCTOOL_POLL = gql`
  mutation addPoll(
    $pollName: String
    $meetingId: String
    $courseId: String
    $topicId: String
    $question: String
    $options: [String]
    $status: String
  ) {
    addPoll(
      input: {
        poll_name: $pollName
        meeting_id: $meetingId
        course_id: $courseId
        topic_id: $topicId
        question: $question
        options: $options
        status: $status
      }
    ) {
      id
      poll_name
      meeting_id
      course_id
      question
      options
      status
    }
  }
`;
export const UPDATE_VCTOOL_POLL = gql`
  mutation updatePoll(
    $pollId: String
    $pollName: String
    $meetingId: String
    $courseId: String
    $topicId: String
    $question: String
    $options: [String]
    $status: String
  ) {
    updatePoll(
      input: {
        id: $pollId
        poll_name: $pollName
        meeting_id: $meetingId
        course_id: $courseId
        topic_id: $topicId
        question: $question
        options: $options
        status: $status
      }
    ) {
      id
      poll_name
      meeting_id
      course_id
      question
      options
      status
    }
  }
`;

export const UPDATE_VCTOOL_POLL_RESPONSE = gql`
  mutation updatePollOptions($pollId: String, $option: String, $userId: String) {
    updatePollOptions(input: { poll_id: $pollId, option: $option, user_id: $userId }) {
      id
      poll_id
    }
  }
`;
