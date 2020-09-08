import { getTokenAPI } from './auth';

const baseURL = process.env.REACT_APP_API_URL;

export const checkFollowAPI = userId => {
    const url = `${baseURL}/relation?id=${userId}`;

    const params = {
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
}

export const followUserAPI = userId => {
    const url = `${baseURL}/relation/create/${userId}`;

    const params = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    })
}

export const unFollowUserAPI = userId => {
    const url = `${baseURL}/relation/${userId}`;

    const params = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    })
}

export const getFollowsAPI = paramsURL => {
    const url = `${baseURL}/user/list?${paramsURL}`;

    const params = {
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    })
}