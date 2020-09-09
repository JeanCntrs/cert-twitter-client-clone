import { getTokenAPI } from './auth';

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

export const uploadBannerAPI = file => {
    const url = `${baseURL}/file/banner/upload`;

    const formData = new FormData();
    formData.append('banner', file);

    const params = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        },
        body: formData
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
}

export const uploadAvatarAPI = file => {
    const url = `${baseURL}/file/avatar/upload`;

    const formData = new FormData();
    formData.append('avatar', file);

    const params = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getTokenAPI()}`
        },
        body: formData
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
}

export const updateUserInfoAPI = userInfo => {
    const url = `${baseURL}/user`;
    
    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenAPI()}`
        },
        body: JSON.stringify(userInfo)
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    })
}