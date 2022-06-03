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
      is_active
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
      subtitleUrl {
        url
        language
      }
      is_default
    }
  }
`;

export const GET_COURSE_TOPICS_CONTENT_BY_COURSE_ID = gql`
  query getTopicContent($course_id: String) {
    getTopicContentByCourseId(course_id: $course_id) {
      id
      language
      topicId
      courseId
      startTime
      duration
      skipIntroDuration
      nextShowTime
      fromEndTime
      created_at
      updated_at
      type
      contentUrl
      subtitleUrl {
        url
        language
      }
      is_default
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

export const GET_TOPIC_RESOURCES_BY_COURSE_ID = gql`
  query getTopicResources($course_id: String) {
    getResourcesByCourseId(course_id: $course_id) {
      id
      name
      type
      topicId
      courseId
      created_at
      updated_at
      created_by
      updated_by
      url
    }
  }
`;

export const GET_LATEST_QUESTION_BANK = gql`
  query latestQuestionBank($publish_time: Int, $pageCursor: String, $pageSize: Int) {
    getLatestQuestionBank(
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
    ) {
      questionBanks {
        id
        name
        category
        sub_category
        created_at
        updated_at
        created_by
        updated_by
        is_active
        is_default
        owner
      }
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_QUESTION_BANK_QUESTIONS = gql`
  query questionBankQuestions($question_bank_id: String) {
    getQuestionBankQuestions(question_bank_id: $question_bank_id) {
      id
      Description
      Type
      Difficulty
      Attachment
      AttachmentType
      Hint
      QbmId
      Status
      CreatedAt
      UpdatedAt
      CreatedBy
      UpdatedBy
    }
  }
`;

export const GET_QUESTION_OPTIONS = gql`
  query questionBankOptions($question_id: String) {
    getOptionsForQuestions(question_ids: [$question_id]) {
      question_id
      options {
        id
        QmId
        Description
        IsCorrect
        CreatedAt
        UpdatedAt
        CreatedBy
        UpdatedBy
        AttachmentType
        Attachment
        IsActive
      }
    }
  }
`;

export const GET_LATEST_QUESTION_PAPERS = gql`
  query latestQuestionPapers($publish_time: Int, $pageCursor: String, $pageSize: Int) {
    getLatestQuestionPapers(
      publish_time: $publish_time
      pageCursor: $pageCursor
      Direction: ""
      pageSize: $pageSize
    ) {
      questionPapers {
        id
        name
        Category
        SubCategory
        CreatedAt
        UpdatedAt
        CreatedBy
        UpdatedBy
        IsActive
        DifficultyLevel
        SectionWise
        Description
        SuggestedDuration
      }
      pageCursor
      direction
      pageSize
    }
  }
`;

export const GET_QUESTION_PAPER_SECTION = gql`
  query questionPaperSections($question_paper_id: String) {
    getQuestionPaperSections(question_paper_id: $question_paper_id) {
      id
      QpId
      Name
      Description
      CreatedAt
      UpdatedAt
      CreatedBy
      UpdatedBy
      IsActive
      Type
      DifficultyLevel
      TotalQuestions
    }
  }
`;

export const GET_QB_SECTION_MAPPING_BY_SECTION = gql`
  query getQPBankMappingBySectionId($section_id: String) {
    getQPBankMappingBySectionId(section_id: $section_id) {
      id
      QbId
      SectionId
      DifficultyLevel
      TotalQuestions
      QuestionMarks
      QuestionType
      RetrieveType
      CreatedAt
      UpdatedAt
      CreatedBy
      UpdatedBy
      IsActive
    }
  }
`;

export const GET_EXAM_INSTRUCTION = gql`
  query getExamInstruction($exam_id: String) {
    getExamInstruction(exam_id: $exam_id) {
      id
      ExamId
      PassingCriteria
      NoAttempts
      AccessType
      CreatedAt
      UpdatedAt
      CreatedBy
      UpdatedBy
      IsActive
    }
  }
`;

export const GET_EXAM_SCHEDULE = gql`
  query getExamSchedule($exam_id: String) {
    getExamSchedule(exam_id: $exam_id) {
      id
      ExamId
      Start
      End
      BufferTime
      CreatedAt
      UpdatedAt
      CreatedBy
      UpdatedBy
      IsActive
    }
  }
`;

export const GET_EXAM_CONFIG = gql`
  query getExamConfiguration($exam_id: String) {
    getExamConfiguration(exam_id: $exam_id) {
      id
      ExamId
      Shuffle
      DisplayHints
      ShowAnswer
      ShowResult
      CreatedBy
      UpdatedBy
      IsActive
      CreatedAt
      UpdatedAt
    }
  }
`;
