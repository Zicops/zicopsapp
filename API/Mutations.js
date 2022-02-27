import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Set Mutation Client
export const mClient = new ApolloClient({
  uri: "https://demo.zicops.com/cc/api/v1/query",
  cache: new InMemoryCache()
})

export const ADD_COURSE = gql`
mutation 
  addCourse(
    $name: String, 
    $description: String, 
    $summary: String, 
    $category: String, 
    $subcategory: String, 
    $owner: String,
    $status: Status
  ){
    addCourse(
      course: { 
        name: $name, 
        description: $description, 
        summary: $summary, 
        category: $category, 
        sub_category: $subcategory, 
        owner: $owner
        status: $status 
      }
    ) {
        id
        name
        description
        summary
        category
        sub_category
        owner
        status
      }
  }
`;

export const UPLOAD_COURSE_IMAGE = gql`
  mutation uploadCourseImage(
    $file: Upload,
    $courseId: String
  ){
    uploadCourseImage(file: {
      courseId: $courseId
    })
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
    $created_at: String, 
    $updated_at: String, 
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
    $subcategory: String, 
    $sub_categories: [sub_categories]
  ){
    addCourse(
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
        created_at: $created_at, 
        updated_at: $updated_at, 
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
        sub_category: $subcategory, 
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

