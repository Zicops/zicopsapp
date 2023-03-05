import http from 'k6/http';
import { check } from 'k6';

const BEARER_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTmlzaGFudCBHdXB0YSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS96aWNvcHMtb25lIiwiYXVkIjoiemljb3BzLW9uZSIsImF1dGhfdGltZSI6MTY3ODA0MzEyMSwidXNlcl9pZCI6InlaVGVQYTNEWTFhZHZFcUZuZ0RrZHZEblBweDIiLCJzdWIiOiJ5WlRlUGEzRFkxYWR2RXFGbmdEa2R2RG5QcHgyIiwiaWF0IjoxNjc4MDQzMTIyLCJleHAiOjE2NzgwNDY3MjIsImVtYWlsIjoibmlzaGFudEB6aWNvcHMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IisxNzA1Nzk2NzY1NiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzE3MDU3OTY3NjU2Il0sImVtYWlsIjpbIm5pc2hhbnRAemljb3BzLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Q69kfYjYE3WWuSGUTFARYUc-tcc__VtfAJNJbXKMGMl7Q0zFGA0AKDq3_DSPtuevo4y1LtiDJ9M_69VynkXc0qp278layO_kzKaE6J4D0k2tFMAwphd24ibMypEg1-xdD5xxFtXIchemDZM3rlbrNTIIh5zX15Rm4dZlLyi9sJZ2bVeE43VVrrTbPfT3OfkoO4N2KHeAAMG8e9jEwJfSiMKb7-QcklPB2Aq1N9f4pQ5CkmXevHfUba1yE0VLtqDipk03kZmqnvxfAKF8oihrGklpgQEM7dEv-MSRrOoqLbkjzRUzzvjdhGyOo_HT8DmjJ4Yxq1MDnzSup1PvJXjdpw'

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
            const expectedString = 'success';
            if (!res2.body.includes(expectedString)) {
            fail(`Response body does not contain expected string: ${expectedString}`);
      }
      return true;
    },
    });
    
    //console.log('Response body:', res.body); // log the response body
}

