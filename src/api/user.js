import {getTokenAPI} from './auth';

const baseURL = process.env.REACT_APP_API_URL;

export const getUserAPI = userId => {
    const url = `${baseURL}/user/profile?id=${userId}`;

    const params = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        // eslint-disable-next-line no-throw-literal
        if (response.status >= 400) throw null;
        return response.json();
    }).catch(err => {
        return err;
    });
}