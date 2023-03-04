import { graphql } from 'k6/graphql';

export default function() {
  const mutation = `
    mutation {
      login {
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
        __typename
      }
    }
  `;
  const response = graphql(__ENV.K6_GRAPHQL_ENDPOINT, mutation);

  // Check that the response contains the expected data
  if (response.errors) {
    console.error(response.errors);
    throw new Error('GraphQL mutation failed');
  }
  if (!response.data.login) {
    throw new Error('GraphQL mutation returned no data');
  }
}
