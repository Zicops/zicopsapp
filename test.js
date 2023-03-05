import http from 'k6/http';
import { check } from 'k6';

const BEARER_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTmlzaGFudCBHdXB0YSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS96aWNvcHMtb25lIiwiYXVkIjoiemljb3BzLW9uZSIsImF1dGhfdGltZSI6MTY3ODA0NTQ3MSwidXNlcl9pZCI6InlaVGVQYTNEWTFhZHZFcUZuZ0RrZHZEblBweDIiLCJzdWIiOiJ5WlRlUGEzRFkxYWR2RXFGbmdEa2R2RG5QcHgyIiwiaWF0IjoxNjc4MDQ1NDcxLCJleHAiOjE2NzgwNDkwNzEsImVtYWlsIjoibmlzaGFudEB6aWNvcHMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IisxNzA1Nzk2NzY1NiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzE3MDU3OTY3NjU2Il0sImVtYWlsIjpbIm5pc2hhbnRAemljb3BzLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.pk-t7N_0lYBlGXBA1M5KLOdL6mjr72fH4JMuEnnSOGvY6Vxm3Zc78mycVa-LtpdlRfzY54_VqrAU1WrXQHKc7gpxiwCI7OohiC1M0Cv8fGPR8g6dknpDOI3anM7T5OYyExKcnz2SfWMiNeoYNuKY2QJytSnMsm9WgWfV18Ce1mUE7EsTKfJ4joTw-szATyBSWuSWnPGH8U_s1ftKxyNoIdO9-hPx6C8m4425kM1yBq2wGCBEa7At-ZRLSqAce1jqfcjXjk6RlEgbv5MSvlcwyh7YMwa-vKdGY9hTO3rGuTzJAgrOKIBOBePNU7iEb7WaVyyAVij1Bu6RaV7JZK63yg'
export default function () {
     // First query
    let url1 = 'https://myspace.zicops.com/um/api/v1/query';
    let payload1 = JSON.stringify({
        query: 'mutation { login { id first_name last_name status role is_verified is_active gender created_by updated_by created_at updated_at email phone photo_url __typename } }',
        
    });

    let params1 = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${BEARER_TOKEN}` 
        }
    };

    let res1 = http.post(url1, payload1, params1);

    check(res1, {
        'status is 200': (r) => r.status === 200,
        'response body is not empty': (r) => r.body.length > 0,
        'response body contains expected string': (r) => {
            const expectedString = 'Active';
            if (!res1.body.includes(expectedString)) {
            fail(`Response body does not contain expected string: ${expectedString}`);
      }
      return true;
    },
    });
    
    // Second query
    let url2 = 'https://myspace.zicops.com/cq/api/v1/query';
    let payload2 = JSON.stringify({
        query: 'query allCatMain($lsp_ids: [String]) { allCatMain(lsp_ids: $lsp_ids) { id Name Description ImageUrl Code CreatedAt UpdatedAt CreatedBy UpdatedBy IsActive __typename } allSubCatMain(lsp_ids: $lsp_ids) { id Name Description ImageUrl Code CatId CreatedAt UpdatedAt CreatedBy UpdatedBy IsActive __typename } }',
        variables: {
            lsp_ids: ["98640aaa-a1e8-5584-bc14-2b1bfed7d65a"]
        }
    });

    let params2 = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${BEARER_TOKEN}` 
        }
    };

    let res2 = http.post(url2, payload2, params2);

    check(res2, {
        'status is 200': (r) => r.status === 200,
        'response body is not empty': (r) => r.body.length > 0,
        'response body contains expected string': (r) => {
            const expectedString = 'Leadership';
            if (!res2.body.includes(expectedString)) {
            fail(`Response body does not contain expected string: ${expectedString}`);
      }
      return true;
    },
    });
    
    //console.log('Response body:', res1.body); // log the response body
    //console.log('Response body:', res2.body); 
}

