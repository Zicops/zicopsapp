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