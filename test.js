import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const query = `mutation {
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
  }`;

  const url = __ENV.K6_GRAPHQL_ENDPOINT;
  const token = __ENV.K6_TOKEN; // Replace with your actual token
  const headers = { Authorization: token };

  const res = http.post(url, JSON.stringify({ query }), { headers });
  check(res, { 'status is 200': (r) => r.status === 200 });
}

