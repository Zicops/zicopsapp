import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import { getIdToken } from 'firebase/auth';

async function getLatestToken(token) {
  const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // getting renewed token before time expire
  const expTime = data?.exp - 60;
  const currentTime = new Date().getTime() / 1000;
  if (expTime >= currentTime) return token;

  const newToken = await getIdToken(auth?.currentUser, true);
  console.log(newToken);
  sessionStorage.setItem('tokenF', newToken);
  return newToken;
}

const authLink = setContext(async (_, { headers }) => {
  const initialToken = sessionStorage.getItem('tokenF')
    ? sessionStorage.getItem('tokenF')
    : auth?.currentUser?.accessToken;
  const fireBaseToken = await getLatestToken(initialToken);
  return {
    headers: {
      ...headers,
      Authorization: fireBaseToken ? `Bearer ${fireBaseToken}` : 'Token not found'
    }
  };
});

const httpLink = createHttpLink({
  uri: 'https://demo.zicops.com/um/api/v1/query'
});

// Set query Client
export const userQueryClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const GET_USERS_FOR_ADMIN = gql`
  query GetUsersForAdmin($publish_time: Int, $pageCursor: String, $pageSize: Int) {
    getUsersForAdmin(
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
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

export const GET_USER_COURSE_MAPS = gql`
  query getUserCourseMaps($publish_time: Int, $pageCursor: String, $pageSize: Int) {
    getUserCourseMaps(
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
    ) {
      user_courses {
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
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_USER_COURSE_MAPS_BY_COURSE_ID = gql`
  query getUserCourseMapByCourseID($courseId: String!) {
    getUserCourseMapByCourseID(course_id: $courseId) {
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
  query getUserCourseProgressByMapId($userCourseId: ID!) {
    getUserCourseProgressByMapId(user_course_id: $userCourseId) {
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
