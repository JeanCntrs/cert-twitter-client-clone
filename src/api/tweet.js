import { getTokenAPI } from './auth';

const baseURL = process.env.REACT_APP_API_URL;

export const addTweetAPI = message => {
    const url = `${baseURL}/tweet/create`;
    const data = { message };

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenAPI()}`
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300)
            return { code: response.status, msg: 'Tweet publicado!' };

        return { code: 500 };
    }).catch(error => {
        return error
    });
}

export const getTweetsFollowersAPI = (page = 1) => {
    const url = `${baseURL}/tweets/followers?page=${page}`;

    const params = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
}