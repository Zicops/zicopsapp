import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import customFetch from './customFetch';

const link = createUploadLink({
  uri: 'https://demo.zicops.com/cc/api/v1/query',
  fetch: customFetch
});
// Set Mutation Client
export const mutationClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export const ADD_COURSE = gql`
  mutation addCourse(
    $name: String
    $description: String
    $summary: String
    $instructor: String
    $image: String
    $previewVideo: String
    $tileImage: String
    $owner: String
    $duration: Int
    $expertise_level: String
    $language: [String]
    $benefits: [String]
    $outcomes: [String]
    $type: String
    $prequisites: [String]
    $goodFor: [String]
    $mustFor: [String]
    $related_skills: [String]
    $publish_date: String
    $expiry_date: String
    $expected_completion: String
    $qa_required: Boolean
    $approvers: [String]
    $created_by: String
    $updated_by: String
    $status: Status
    $is_active: Boolean
    $is_display: Boolean
    $category: String
    $sub_category: String
    $sub_categories: [sub_categories_input]
  ) {
    addCourse(
      course: {
        name: $name
        description: $description
        summary: $summary
        instructor: $instructor
        image: $image
        previewVideo: $previewVideo
        tileImage: $tileImage
        owner: $owner
        duration: $duration
        expertise_level: $expertise_level
        language: $language
        benefits: $benefits
        outcomes: $outcomes
        type: $type
        prequisites: $prequisites
        goodFor: $goodFor
        mustFor: $mustFor
        related_skills: $related_skills
        publish_date: $publish_date
        expiry_date: $expiry_date
        expected_completion: $expected_completion
        qa_required: $qa_required
        approvers: $approvers
        created_by: $created_by
        updated_by: $updated_by
        status: $status
        is_display: $is_display
        is_active: $is_active
        category: $category
        sub_category: $sub_category
        sub_categories: $sub_categories
      }
    ) {
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

export const UPLOAD_COURSE_PREVIEW = gql`
  mutation uploadCoursePreviewVideo($file: Upload, $courseId: String) {
    uploadCoursePreviewVideo(file: { file: $file, courseId: $courseId }) {
      success
      url
    }
  }
`;

export const UPLOAD_COURSE_IMAGE = gql`
  mutation uploadCourseImage($file: Upload, $courseId: String) {
    uploadCourseImage(file: { file: $file, courseId: $courseId }) {
      success
      url
    }
  }
`;

export const UPLOAD_COURSE_TILE_IMAGE = gql`
  mutation uploadCourseTileImage($file: Upload, $courseId: String) {
    uploadCourseTileImage(file: { file: $file, courseId: $courseId }) {
      success
      url
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse(
    $id: ID
    $name: String
    $description: String
    $summary: String
    $instructor: String
    $image: String
    $previewVideo: String
    $tileImage: String
    $owner: String
    $duration: Int
    $expertise_level: String
    $language: [String]
    $benefits: [String]
    $outcomes: [String]
    $type: String
    $prequisites: [String]
    $goodFor: [String]
    $mustFor: [String]
    $related_skills: [String]
    $publish_date: String
    $expiry_date: String
    $expected_completion: String
    $qa_required: Boolean
    $approvers: [String]
    $created_by: String
    $updated_by: String
    $status: Status
    $is_active: Boolean
    $is_display: Boolean
    $category: String
    $sub_category: String
    $sub_categories: [sub_categories_input]
  ) {
    updateCourse(
      course: {
        id: $id
        name: $name
        description: $description
        summary: $summary
        instructor: $instructor
        image: $image
        previewVideo: $previewVideo
        tileImage: $tileImage
        owner: $owner
        duration: $duration
        expertise_level: $expertise_level
        language: $language
        benefits: $benefits
        outcomes: $outcomes
        type: $type
        prequisites: $prequisites
        goodFor: $goodFor
        mustFor: $mustFor
        related_skills: $related_skills
        publish_date: $publish_date
        expiry_date: $expiry_date
        expected_completion: $expected_completion
        qa_required: $qa_required
        approvers: $approvers
        created_by: $created_by
        updated_by: $updated_by
        status: $status
        is_active: $is_active
        is_display: $is_display
        category: $category
        sub_category: $sub_category
        sub_categories: $sub_categories
      }
    ) {
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

export const ADD_COURSE_MODULE = gql`
  mutation addCourseModule(
    $name: String
    $isChapter: Boolean
    $description: String
    $courseId: String
    $owner: String
    $duration: Int
    $level: String
    $sequence: Int
    $setGlobal: Boolean
  ) {
    addCourseModule(
      courseId: $courseId
      module: {
        name: $name
        isChapter: $isChapter
        description: $description
        courseId: $courseId
        owner: $owner
        duration: $duration
        level: $level
        sequence: $sequence
        setGlobal: $setGlobal
      }
    ) {
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

export const UPDATE_COURSE_MODULE = gql`
  mutation updateCourseModule(
    $id: ID
    $name: String
    $isChapter: Boolean
    $description: String
    $courseId: String
    $owner: String
    $duration: Int
    $level: String
    $sequence: Int
    $setGlobal: Boolean
  ) {
    updateCourseModule(
      module: {
        id: $id
        name: $name
        isChapter: $isChapter
        description: $description
        courseId: $courseId
        owner: $owner
        duration: $duration
        level: $level
        sequence: $sequence
        setGlobal: $setGlobal
      }
    ) {
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

export const ADD_COURSE_CHAPTER = gql`
  mutation addCourseChapter(
    $name: String
    $description: String
    $moduleId: String
    $courseId: String
    $sequence: Int
  ) {
    addCourseChapter(
      courseId: $courseId
      chapter: {
        name: $name
        description: $description
        moduleId: $moduleId
        courseId: $courseId
        sequence: $sequence
      }
    ) {
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

export const UPDATE_COURSE_CHAPTER = gql`
  mutation updateCourseChapter(
    $id: ID
    $name: String
    $description: String
    $moduleId: String
    $courseId: String
    $sequence: Int
  ) {
    updateCourseChapter(
      chapter: {
        id: $id
        name: $name
        description: $description
        moduleId: $moduleId
        courseId: $courseId
        sequence: $sequence
      }
    ) {
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

export const ADD_COURSE_TOPIC = gql`
  mutation addCourseTopic(
    $name: String
    $description: String
    $type: String
    $moduleId: String
    $chapterId: String
    $courseId: String
    $sequence: Int
  ) {
    addCourseTopic(
      courseId: $courseId
      topic: {
        name: $name
        description: $description
        type: $type
        moduleId: $moduleId
        chapterId: $chapterId
        courseId: $courseId
        sequence: $sequence
      }
    ) {
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
    }
  }
`;

export const UPDATE_COURSE_TOPIC = gql`
  mutation updateCourseTopic(
    $id: ID
    $name: String
    $description: String
    $type: String
    $moduleId: String
    $chapterId: String
    $courseId: String
    $sequence: Int
  ) {
    updateCourseTopic(
      topic: {
        id: $id
        name: $name
        description: $description
        type: $type
        moduleId: $moduleId
        chapterId: $chapterId
        courseId: $courseId
        sequence: $sequence
      }
    ) {
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
    }
  }
`;

export const UPLOAD_TOPIC_RESOURCE = gql`
  mutation uploadTopicResource(
    $courseId: String
    $file: Upload
    $type: String
    $topicId: String
    $url: String
    $name: String
  ) {
    uploadTopicResource(
      courseId: $courseId
      resource: { type: $type, topicId: $topicId, url: $url, file: $file, name: $name }
    ) {
      success
      url
    }
  }
`;

export const UPLOAD_TOPIC_CONTENT_VIDEO = gql`
  mutation uploadTopicContentVideo($file: Upload, $courseId: String, $contentId: String) {
    uploadTopicContentVideo(file: { file: $file, courseId: $courseId, contentId: $contentId }) {
      success
      url
    }
  }
`;

export const UPLOAD_TOPIC_CONTENT_SUBTITLE = gql`
  mutation uploadTopicContentSubtitle(
    $file: Upload
    $courseId: String
    $topicId: String
    $language: String
  ) {
    uploadTopicContentSubtitle(
      file: [{ file: $file, courseId: $courseId, topicId: $topicId, language: $language }]
    ) {
      success
      url
      language
    }
  }
`;

export const ADD_TOPIC_CONTENT = gql`
  mutation addTopicContent(
    $topicId: String
    $language: String
    $startTime: Int
    $duration: Int
    $skipIntroDuration: Int
    $nextShowTime: Int
    $fromEndTime: Int
    $type: String
    $courseId: String
    $is_default: Boolean
  ) {
    addTopicContent(
      topicId: $topicId
      courseId: $courseId
      topicContent: {
        language: $language
        startTime: $startTime
        duration: $duration
        skipIntroDuration: $skipIntroDuration
        nextShowTime: $nextShowTime
        fromEndTime: $fromEndTime
        type: $type
        is_default: $is_default
      }
    ) {
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
      is_default
    }
  }
`;

export const UPDATE_TOPIC_CONTENT = gql`
  mutation updateTopicContent(
    $contentId: String
    $language: String
    $startTime: Int
    $duration: Int
    $skipIntroDuration: Int
    $nextShowTime: Int
    $fromEndTime: Int
    $type: String
    $is_default: Boolean
  ) {
    updateTopicContent(
      topicContent: {
        contentId: $contentId
        language: $language
        startTime: $startTime
        duration: $duration
        skipIntroDuration: $skipIntroDuration
        nextShowTime: $nextShowTime
        fromEndTime: $fromEndTime
        type: $type
        is_default: $is_default
      }
    ) {
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
      is_default
    }
  }
`;

export const CREATE_QUESTION_BANK = gql`
  mutation createQuestionBank(
    $name: String
    $description: String
    $category: String
    $sub_category: String
    $created_by: String
    $updated_by: String
    $is_active: Boolean
    $is_default: Boolean
    $owner: String
  ) {
    createQuestionBank(
      input: {
        name: $name
        description: $description
        category: $category
        sub_category: $sub_category
        created_by: $created_by
        updated_by: $updated_by
        is_active: $is_active
        is_default: $is_default
        owner: $owner
      }
    ) {
      id
      name
      description
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
  }
`;

export const UPDATE_QUESTION_BANK = gql`
  mutation updateQuestionBank(
    $id: ID
    $name: String
    $description: String
    $category: String
    $sub_category: String
    $created_by: String
    $updated_by: String
    $is_active: Boolean
    $is_default: Boolean
    $owner: String
  ) {
    updateQuestionBank(
      input: {
        id: $id
        name: $name
        description: $description
        category: $category
        sub_category: $sub_category
        created_by: $created_by
        updated_by: $updated_by
        is_active: $is_active
        is_default: $is_default
        owner: $owner
      }
    ) {
      id
      name
      description
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
  }
`;

export const ADD_QUESTION_BANK_QUESTION = gql`
  mutation addQuestionBankQuestion(
    $name: String
    $description: String
    $type: String
    $difficulty: Int
    $file: Upload
    $attachmentType: String
    $hint: String
    $qbmId: String
    $status: String
    $createdBy: String
    $updatedBy: String
  ) {
    addQuestionBankQuestion(
      input: {
        Name: $name
        Description: $description
        Type: $type
        Difficulty: $difficulty
        File: $file
        AttachmentType: $attachmentType
        Hint: $hint
        QbmId: $qbmId
        Status: $status
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
      }
    ) {
      id
      Name
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

export const UPDATE_QUESTION_BANK_QUESTION = gql`
  mutation updateQuestionBankQuestion(
    $id: ID
    $name: String
    $description: String
    $type: String
    $difficulty: Int
    $file: Upload
    $attachmentType: String
    $hint: String
    $qbmId: String
    $status: String
    $createdBy: String
    $updatedBy: String
  ) {
    updateQuestionBankQuestion(
      input: {
        id: $id
        Name: $name
        Description: $description
        Type: $type
        Difficulty: $difficulty
        File: $file
        AttachmentType: $attachmentType
        Hint: $hint
        QbmId: $qbmId
        Status: $status
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
      }
    ) {
      id
      Name
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

export const ADD_QUESTION_OPTIONS = gql`
  mutation addQuestionOptions(
    $qmId: String
    $description: String
    $isCorrect: Boolean
    $createdBy: String
    $updatedBy: String
    $attachmentType: String
    $file: Upload
    $isActive: Boolean
  ) {
    addQuestionOptions(
      input: {
        QmId: $qmId
        Description: $description
        IsCorrect: $isCorrect
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        AttachmentType: $attachmentType
        File: $file
        IsActive: $isActive
      }
    ) {
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
`;

export const UPDATE_QUESTION_OPTIONS = gql`
  mutation updateQuestionOptions(
    $id: ID
    $qmId: String
    $description: String
    $isCorrect: Boolean
    $createdBy: String
    $updatedBy: String
    $attachmentType: String
    $file: Upload
    $isActive: Boolean
  ) {
    updateQuestionOptions(
      input: {
        id: $id
        QmId: $qmId
        Description: $description
        IsCorrect: $isCorrect
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        AttachmentType: $attachmentType
        File: $file
        IsActive: $isActive
      }
    ) {
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
`;

export const ADD_QUESTION_PAPER = gql`
  mutation addQuestionPaper(
    $name: String
    $category: String
    $sub_category: String
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
    $difficulty_level: String
    $section_wise: Boolean
    $description: String
    $suggested_duration: String
  ) {
    addQuestionPaper(
      input: {
        name: $name
        Category: $category
        SubCategory: $sub_category
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
        DifficultyLevel: $difficulty_level
        SectionWise: $section_wise
        Description: $description
        SuggestedDuration: $suggested_duration
      }
    ) {
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
  }
`;

export const UPDATE_QUESTION_PAPER = gql`
  mutation updateQuestionPaper(
    $id: ID
    $name: String
    $category: String
    $sub_category: String
    $createdBy: String
    $updatedBy: String
    $isActive: Boolean
    $difficulty_level: String
    $section_wise: Boolean
    $description: String
    $suggested_duration: String
  ) {
    updateQuestionPaper(
      input: {
        id: $id
        name: $name
        Category: $category
        SubCategory: $sub_category
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $isActive
        DifficultyLevel: $difficulty_level
        SectionWise: $section_wise
        Description: $description
        SuggestedDuration: $suggested_duration
      }
    ) {
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
  }
`;

export const ADD_QUESTION_PAPER_SECTION = gql`
  mutation addQuestionPaperSection(
    $qpId: String
    $name: String
    $description: String
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
    $type: String
    $difficulty_level: String
    $total_questions: Int
  ) {
    addQuestionPaperSection(
      input: {
        QpId: $qpId
        Name: $name
        Description: $description
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
        Type: $type
        DifficultyLevel: $difficulty_level
        TotalQuestions: $total_questions
      }
    ) {
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

export const UPDATE_QUESTION_PAPER_SECTION = gql`
  mutation updateQuestionPaperSection(
    $id: ID
    $qpId: String
    $name: String
    $description: String
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
    $type: String
    $difficulty_level: String
    $total_questions: Int
  ) {
    updateQuestionPaperSection(
      input: {
        id: $id
        QpId: $qpId
        Name: $name
        Description: $description
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
        Type: $type
        DifficultyLevel: $difficulty_level
        TotalQuestions: $total_questions
      }
    ) {
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

export const MAP_SECTION_TO_BANK = gql`
  mutation mapSectionToBank(
    $qbId: String
    $sectionId: String
    $difficulty_level: String
    $total_questions: Int
    $question_marks: String
    $question_type: String
    $retrieve_type: String
    $created_by: String
    $updated_by: String
    $is_active: Boolean
  ) {
    mapSectionToBank(
      input: {
        QbId: $qbId
        SectionId: $sectionId
        DifficultyLevel: $difficulty_level
        TotalQuestions: $total_questions
        QuestionMarks: $question_marks
        QuestionType: $question_type
        RetrieveType: $retrieve_type
        CreatedBy: $created_by
        UpdatedBy: $updated_by
        IsActive: $is_active
      }
    ) {
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

export const UPDATE_MAP_SECTION_TO_BANK = gql`
  mutation updateMapSectionToBank(
    $id: ID
    $qbId: String
    $sectionId: String
    $difficulty_level: String
    $total_questions: Int
    $question_marks: String
    $question_type: String
    $retrieve_type: String
    $created_by: String
    $updated_by: String
    $is_active: Boolean
  ) {
    updateSectionToBank(
      input: {
        id: $id
        QbId: $qbId
        SectionId: $sectionId
        DifficultyLevel: $difficulty_level
        TotalQuestions: $total_questions
        QuestionMarks: $question_marks
        QuestionType: $question_type
        RetrieveType: $retrieve_type
        CreatedBy: $created_by
        UpdatedBy: $updated_by
        IsActive: $is_active
      }
    ) {
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

export const ADD_SECTION_FIXED_QUESTIONS = gql`
  mutation addSectionFixedQuestions(
    $sectionId: String
    $questionId: String
    $created_at: String
    $updated_at: String
    $created_by: String
    $updated_by: String
    $is_active: Boolean
  ) {
    addSectionFixedQuestions(
      input: {
        SqbId: $sectionId
        QuestionId: $questionId
        CreatedAt: $created_at
        UpdatedAt: $updated_at
        CreatedBy: $created_by
        UpdatedBy: $updated_by
        IsActive: $is_active
      }
    ) {
      id
      SqbId
      QuestionId
      CreatedAt
      UpdatedAt
      CreatedBy
      UpdatedBy
      IsActive
    }
  }
`;

export const UPDATE_SECTION_FIXED_QUESTIONS = gql`
  mutation udpateSectionFixedQuestions(
    $id: ID
    $sectionId: String
    $questionId: String
    $created_at: String
    $updated_at: String
    $created_by: String
    $updated_by: String
    $is_active: Boolean
  ) {
    udpateSectionFixedQuestions(
      input: {
        id: $id
        SqbId: $sectionId
        QuestionId: $questionId
        CreatedAt: $created_at
        UpdatedAt: $updated_at
        CreatedBy: $created_by
        UpdatedBy: $updated_by
        IsActive: $is_active
      }
    ) {
      id
      SqbId
      QuestionId
      CreatedAt
      UpdatedAt
      CreatedBy
      UpdatedBy
      IsActive
    }
  }
`;

export const ADD_EXAM = gql`
  mutation addExam(
    $name: String
    $description: String
    $qpId: String
    $type: String
    $scheduleType: String
    $duration: Int
    $code: String
    $category: String
    $sub_category: String
    $status: String
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
  ) {
    addExam(
      input: {
        Name: $name
        Description: $description
        Code: $code
        QpId: $qpId
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
        Type: $type
        ScheduleType: $scheduleType
        Duration: $duration
        Status: $status
        Category: $category
        SubCategory: $sub_category
      }
    ) {
      id
      Name
      Description
      Code
      QpId
      CreatedAt
      UpdatedAt
      CreatedBy
      UpdatedBy
      IsActive
      Type
      ScheduleType
      Duration
      Status
      Category
      SubCategory
    }
  }
`;

export const UPDATE_EXAM = gql`
  mutation updateExam(
    $id: ID
    $name: String
    $description: String
    $qpId: String
    $type: String
    $scheduleType: String
    $duration: Int
    $code: String
    $category: String
    $sub_category: String
    $status: String
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
  ) {
    updateExam(
      input: {
        id: $id
        Name: $name
        Description: $description
        Code: $code
        QpId: $qpId
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
        Type: $type
        ScheduleType: $scheduleType
        Duration: $duration
        Status: $status
        Category: $category
        SubCategory: $sub_category
      }
    ) {
      id
      Name
      Description
      Code
      QpId
      CreatedAt
      UpdatedAt
      CreatedBy
      UpdatedBy
      IsActive
      Type
      ScheduleType
      Duration
      Status
      Category
      SubCategory
    }
  }
`;

export const ADD_EXAM_SCHEDULE = gql`
  mutation addExamSchedule(
    $examId: String
    $start: Int
    $end: Int
    $bufferTime: Int
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
  ) {
    addExamSchedule(
      input: {
        ExamId: $examId
        Start: $start
        End: $end
        BufferTime: $bufferTime
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
      }
    ) {
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

export const UPDATE_EXAM_SCHEDULE = gql`
  mutation updateExamSchedule(
    $id: ID
    $examId: String
    $start: Int
    $end: Int
    $bufferTime: Int
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
  ) {
    updateExamSchedule(
      input: {
        id: $id
        ExamId: $examId
        Start: $start
        End: $end
        BufferTime: $bufferTime
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
      }
    ) {
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

export const ADD_EXAM_INSTRUCTION = gql`
  mutation addExamInstruction(
    $examId: String
    $passingCriteria: String
    $noAttempts: Int
    $accessType: String
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
  ) {
    addExamInstruction(
      input: {
        ExamId: $examId
        PassingCriteria: $passingCriteria
        NoAttempts: $noAttempts
        AccessType: $accessType
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
      }
    ) {
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

export const UPDATE_EXAM_INSTRUCTION = gql`
  mutation updateExamInstruction(
    $id: ID
    $examId: String
    $passingCriteria: String
    $noAttempts: Int
    $accessType: String
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
  ) {
    updateExamInstruction(
      input: {
        id: $id
        ExamId: $examId
        PassingCriteria: $passingCriteria
        NoAttempts: $noAttempts
        AccessType: $accessType
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
      }
    ) {
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

export const ADD_EXAM_CONFIGURATION = gql`
  mutation addExamConfiguration(
    $examId: String
    $shuffle: Boolean
    $showResult: Boolean
    $showAnswer: Boolean
    $displayHints: Boolean
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
  ) {
    addExamConfiguration(
      input: {
        ExamId: $examId
        Shuffle: $shuffle
        DisplayHints: $displayHints
        ShowAnswer: $showAnswer
        ShowResult: $showResult
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
      }
    ) {
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

export const UPDATE_EXAM_CONFIGURATION = gql`
  mutation updateExamConfiguration(
    $id: ID
    $examId: String
    $shuffle: Boolean
    $showResult: Boolean
    $showAnswer: Boolean
    $displayHints: Boolean
    $createdBy: String
    $updatedBy: String
    $is_active: Boolean
  ) {
    updateExamConfiguration(
      input: {
        id: $id
        ExamId: $examId
        Shuffle: $shuffle
        DisplayHints: $displayHints
        ShowAnswer: $showAnswer
        ShowResult: $showResult
        CreatedBy: $createdBy
        UpdatedBy: $updatedBy
        IsActive: $is_active
      }
    ) {
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
