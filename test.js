import http from 'k6/http';
import { check } from 'k6';

//const BEARER_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTmlzaGFudCBHdXB0YSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS96aWNvcHMtb25lIiwiYXVkIjoiemljb3BzLW9uZSIsImF1dGhfdGltZSI6MTY3Nzk3NjU3NCwidXNlcl9pZCI6InlaVGVQYTNEWTFhZHZFcUZuZ0RrZHZEblBweDIiLCJzdWIiOiJ5WlRlUGEzRFkxYWR2RXFGbmdEa2R2RG5QcHgyIiwiaWF0IjoxNjc3OTgxMjg1LCJleHAiOjE2Nzc5ODQ4ODUsImVtYWlsIjoibmlzaGFudEB6aWNvcHMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IisxNzA1Nzk2NzY1NiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzE3MDU3OTY3NjU2Il0sImVtYWlsIjpbIm5pc2hhbnRAemljb3BzLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.sExfvJnSbFEacEUxsO-OKAcqqBqTstn3e7T5ptzNlRn_xdf66iPnUK1yDSI-gmqSLslvk0MgZnuR5D_gYbqZqNncF1ho3fEp5nPEgMfC2i8iT56EE6NvgQlP7aibezUCTyI82yQ-Lfllup-Ehk44Md9mhvDYtBwo4sltAabcH5iZ6hMfu6qkN-V_H16lNPEoOB0f8AzK7lu8jgqrm_5PT4TKZcz5DuWO0-YhiNalkzrrRebK4M3FkR2XXHPkJH5rJntENGot11QIrKv07vYtMGNNW_rNchA21oKr1foFKRmO47IpOI8V0bXDa811YY2Ju89qZhAlgapWg6xVtlbvjw';

export default function () {
    let url = 'https://myspace.zicops.com/um/api/v1/query';
    let payload = JSON.stringify({
        query: 'mutation { login { id first_name last_name status role is_verified is_active gender created_by updated_by created_at updated_at email phone photo_url __typename } }',
        
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${__ENV.TOKEN}` 
        }
    };

    let res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response body is not empty': (r) => r.body.length > 0,
        'response body contains expected string': (r) => {
            const expectedString = 'Active';
            if (!res.body.includes(expectedString)) {
            fail(`Response body does not contain expected string: ${expectedString}`);
      }
      return true;
    },
    });
    
    //console.log('Response body:', res.body); // log the response body
}

