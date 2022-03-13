import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({ uri: "https://demo.zicops.com/cc/api/v1/query" })
// Set Mutation Client
export const mClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export const ADD_COURSE = gql`
mutation 
addCourse(
    $name: String, 
    $description: String, 
    $summary: String, 
    $instructor: String, 
    $image: String, 
    $previewVideo: String, 
    $tileImage: String, 
    $owner: String, 
    $duration: Int, 
    $expertise_level: String, 
    $language: [String], 
    $benefits: [String], 
    $outcomes: [String], 
    $type: String, 
    $prequisites: [String], 
    $goodFor: [String], 
    $mustFor: [String], 
    $related_skills: [String], 
    $publish_date: String, 
    $expiry_date: String, 
    $expected_completion: String, 
    $qa_required: Boolean, 
    $approvers: [String], 
    $created_by: String, 
    $updated_by: String, 
    $status: Status
    $is_display: Boolean, 
    $category: String, 
    $sub_category: String, 
    $sub_categories: [sub_categories_input]
  ){
    addCourse(
      course: { 
        name: $name, 
        description: $description, 
        summary: $summary, 
        instructor: $instructor, 
        image: $image, 
        previewVideo: $previewVideo, 
        tileImage: $tileImage, 
        owner: $owner,
        duration: $duration, 
        expertise_level: $expertise_level, 
        language: $language,
        benefits: $benefits,
        outcomes: $outcomes,
        type: $type, 
        prequisites: $prequisites, 
        goodFor: $goodFor, 
        mustFor: $mustFor, 
        related_skills: $related_skills, 
        publish_date: $publish_date, 
        expiry_date: $expiry_date, 
        expected_completion: $expected_completion, 
        qa_required: $qa_required, 
        approvers: $approvers, 
        created_by: $created_by, 
        updated_by: $updated_by, 
        status: $status,
        is_display: $is_display, 
        category: $category, 
        sub_category: $sub_category, 
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
  mutation uploadCoursePreviewVideo(
    $file: Upload,
    $courseId: String
  ){
    uploadCoursePreviewVideo(file: {
      file: $file,
      courseId: $courseId
    }) {
      success
      url
    }
  }
`;
export const UPLOAD_COURSE_IMAGE = gql`
  mutation uploadCourseImage(
    $file: Upload,
    $courseId: String
  ){
    uploadCourseImage(file: {
      file: $file,
      courseId: $courseId
    }) {
      success
      url
    }
  }
`;
export const UPLOAD_COURSE_TILE_IMAGE = gql`
  mutation uploadCourseTileImage(
    $file: Upload,
    $courseId: String
  ){
    uploadCourseTileImage(file: {
      file: $file,
      courseId: $courseId
    }) {
      success
      url
    }
  }
`;

export const UPDATE_COURSE = gql`
mutation 
  updateCourse(
    $id: ID,
    $name: String, 
    $description: String, 
    $summary: String, 
    $instructor: String, 
    $image: String, 
    $previewVideo: String, 
    $tileImage: String, 
    $owner: String,
    $duration: Int, 
    $expertise_level: String, 
    $language: [String],
    $benefits: [String],
    $outcomes: [String],
    $type: String, 
    $prequisites: [String], 
    $goodFor: [String], 
    $mustFor: [String], 
    $related_skills: [String], 
    $publish_date: String, 
    $expiry_date: String, 
    $expected_completion: String, 
    $qa_required: Boolean, 
    $approvers: [String], 
    $created_by: String, 
    $updated_by: String, 
    $status: Status
    $is_display: Boolean, 
    $category: String, 
    $sub_category: String, 
    $sub_categories: [sub_categories_input]
  ){
    updateCourse(
      course: { 
        id: $id,
        name: $name, 
        description: $description, 
        summary: $summary, 
        instructor: $instructor, 
        image: $image, 
        previewVideo: $previewVideo, 
        tileImage: $tileImage, 
        owner: $owner,
        duration: $duration, 
        expertise_level: $expertise_level, 
        language: $language,
        benefits: $benefits,
        outcomes: $outcomes,
        type: $type, 
        prequisites: $prequisites, 
        goodFor: $goodFor, 
        mustFor: $mustFor, 
        related_skills: $related_skills, 
        publish_date: $publish_date, 
        expiry_date: $expiry_date, 
        expected_completion: $expected_completion, 
        qa_required: $qa_required, 
        approvers: $approvers, 
        created_by: $created_by, 
        updated_by: $updated_by, 
        status: $status,
        is_display: $is_display, 
        category: $category, 
        sub_category: $sub_category, 
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
mutation 
addCourseModule(
    $name : String,
    $isChapter : Boolean,
    $description : String,
    $courseId : String,
    $owner : String,
    $duration : Int,
    $level : String,
    $sequence : Int,
    $setGlobal : Boolean,
  ) {
  addCourseModule(
    courseId: $courseId, 
    module: {
      name : $name,
      isChapter : $isChapter,
      description : $description,
      courseId : $courseId,
      owner : $owner,
      duration : $duration,
      level : $level,
      sequence : $sequence,
      setGlobal : $setGlobal,
    }){
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
mutation 
addCourseChapter(
    $name : String,
    $description : String,
    $moduleId : String,
    $courseId : String,
    $sequence : Int,
  ) {
  addCourseChapter(
    courseId: $courseId, 
    chapter: {
      name : $name,
      description : $description,
      moduleId : $moduleId,
      courseId : $courseId,
      sequence : $sequence,
    }){
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
mutation 
addCourseTopic(
    $name : String,
    $description : String,
    $type : String
    $moduleId : String,
    $chapterId : String,
    $courseId : String,
    $sequence : Int,
  ) {
  addCourseTopic(
    courseId: $courseId, 
    topic: {
      name : $name,
      description : $description,
      type : $type,
      moduleId : $moduleId,
      chapterId : $chapterId,
      courseId : $courseId,
      sequence : $sequence,
    }){
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
  $courseId: String,
  $file: Upload,
  $type: String,
  $topicId: String,
  $url: String
){
  uploadTopicResource(
    courseId: $courseId, 
    resource: {
      type : $type,
      topicId : $topicId,
      url : $url,
      file : $file
    }
  ) {
    success
    url
  }
}
`;


export const UPLOAD_TOPIC_CONTENT_SUBTITLE = gql`
mutation uploadTopicContentSubtitle(
  $file: Upload,
  $courseId: String,
  $topicId: String
){
  uploadTopicContentSubtitle(file: {
    file: $file,
    courseId: $courseId,
    topicId: $topicId
  }) {
    success
    url
  }
}
`;