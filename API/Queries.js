import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Set query Client
export const queryClient = new ApolloClient({
  uri: 'https://demo.zicops.com/cq/api/v1/query',
  cache: new InMemoryCache()
});

export const GET_CATS_N_SUB_CATS = gql`
  query CatsQuery {
    allCategories
    allSubCategories
  }
`;
export const GET_CATS = gql`
  query CatsQuery {
    allCategories
  }
`;
export const GET_SUB_CATS = gql`
  query CatsQuery {
    allSubCategories
  }
`;

export const GET_LATEST_COURSES = gql`
  query LatestCourses($publish_time: Int, $pageCursor: String, $pageSize: Int) {
    latestCourses(
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
      status: SAVED
    ) {
      courses {
        id
        name
        description
        summary
        instructor
        image
        previewVideo
        tileImage
        owner
        duration
        expertise_level
        language
        benefits
        outcomes
        created_at
        updated_at
        type
        prequisites
        goodFor
        mustFor
        related_skills
        publish_date
        expiry_date
        expected_completion
        qa_required
        approvers
        created_by
        updated_by
        status
        is_display
        category
        sub_category
        sub_categories {
          name
          rank
        }
      }
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($course_id: String) {
    getCourse(course_id: $course_id) {
      id
      name
      description
      summary
      instructor
      image
      previewVideo
      tileImage
      owner
      duration
      expertise_level
      language
      benefits
      outcomes
      created_at
      updated_at
      type
      prequisites
      goodFor
      mustFor
      related_skills
      publish_date
      expiry_date
      expected_completion
      qa_required
      approvers
      created_by
      updated_by
      status
      is_display
      category
      sub_category
      sub_categories {
        name
        rank
      }
    }
  }
`;

export const GET_COURSE_MODULES = gql`
  query getCourseModules($course_id: String) {
    getCourseModules(course_id: $course_id) {
      id
      name
      isChapter
      description
      courseId
      owner
      duration
      created_at
      updated_at
      level
      sequence
      setGlobal
    }
  }
`;

export const GET_COURSE_CHAPTERS = gql`
  query getCourseChapter($course_id: String) {
    getCourseChapters(course_id: $course_id) {
      id
      name
      description
      moduleId
      courseId
      created_at
      updated_at
      sequence
    }
  }
`;

export const GET_COURSE_TOPICS = gql`
  query getTopics($course_id: String) {
    getTopics(course_id: $course_id) {
      id
      name
      description
      type
      moduleId
      chapterId
      courseId
      created_at
      updated_at
      sequence
      created_by
      updated_by
      image
    }
  }
`;

export const GET_COURSE_TOPICS_CONTENT = gql`
  query getTopicContent($topic_id: String) {
    getTopicContent(topic_id: $topic_id) {
      id
      language
      topicId
      startTime
      duration
      skipIntroDuration
      nextShowTime
      fromEndTime
      created_at
      updated_at
      type
      contentUrl
      subtitleUrl
    }
  }
`;

export const GET_TOPIC_RESOURCES = gql`
  query getTopicResources($topic_id: String) {
    getTopicResources(topic_id: $topic_id) {
      name
      type
      topicId
      created_at
      updated_at
      created_by
      updated_by
      url
    }
  }
`;
