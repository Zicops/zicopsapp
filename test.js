import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let url = 'https://myspace.zicops.com/um/api/v1/query';
    let payload = JSON.stringify({
        query: 'mutation { login { id first_name last_name status role is_verified is_active gender created_by updated_by created_at updated_at email phone photo_url __typename } }',
        
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': __ENV.K6_TOKEN
        }
    };

    let res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response body is not empty': (r) => r.body.length > 0,
    });
    
    console.log('Response body:', res.body); // log the response body
}

