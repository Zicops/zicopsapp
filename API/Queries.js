import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Set query Client
export const qClient = new ApolloClient({
    uri: "https://demo.zicops.com/cq/api/v1/query",
    cache: new InMemoryCache()
})

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
query LatestCourses(
  $publish_time: Int,
  $pageCursor: String,
  $pageSize: Int,
){
    latestCourses(
      publish_time: $publish_time,
      pageCursor: $pageCursor,
      Direction: "",
      pageSize: $pageSize,
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