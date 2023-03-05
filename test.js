import http from 'k6/http';
import { check } from 'k6';

const BEARER_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTmlzaGFudCBHdXB0YSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS96aWNvcHMtb25lIiwiYXVkIjoiemljb3BzLW9uZSIsImF1dGhfdGltZSI6MTY3Nzk3NjU3NCwidXNlcl9pZCI6InlaVGVQYTNEWTFhZHZFcUZuZ0RrZHZEblBweDIiLCJzdWIiOiJ5WlRlUGEzRFkxYWR2RXFGbmdEa2R2RG5QcHgyIiwiaWF0IjoxNjc3OTc2NTc0LCJleHAiOjE2Nzc5ODAxNzQsImVtYWlsIjoibmlzaGFudEB6aWNvcHMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IisxNzA1Nzk2NzY1NiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzE3MDU3OTY3NjU2Il0sImVtYWlsIjpbIm5pc2hhbnRAemljb3BzLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.WMWvotzCgDA_InJAk7ZaBYUbQyySuQuGlgYHTi9HmixRBKVipl4gy7DMNCygys7EkTU_oKu7nxJPmeMfi52vlhPEF3F-0-FMt2mlnuisiHC5fJmqEc-Foov19sTs24QcnEObA2N4veweH8KcvDK5hvcLWVl0t__l5g-r1zn39Ef4uQp5FQfYnKCWoQW1FwtJUPkITNOpR1NqbBD1e_6Y8B85DvimeXJbC85kqE3hzCCi0sn_zDVGpCBv7A6ixLD2U7HEuB8P_Kb2P71LaVL6UCILutsleLButtriXug015yphLXg2-N6raB3tDJEWBHnH_UEyBR02J6aQ6ry09TNPg';

export default function () {
    let url = 'https://myspace.zicops.com/um/api/v1/query';
    let payload = JSON.stringify({
        query: 'mutation { login { id first_name last_name status role is_verified is_active gender created_by updated_by created_at updated_at email phone photo_url __typename } }',
        
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${BEARER_TOKEN}` 
        }
    };

    let res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response body is not empty': (r) => r.body.length > 0,
    });
    
    console.log('Response body:', res.body); // log the response body
}

