import jwtDecode from 'jwt-decode';

const baseURL = process.env.REACT_APP_API_URL;

export const signUpAPI = user => {
    const url = `${baseURL}/auth/sign-up`;
    const tempUser = {
        ...user,
        email: user.email.toLowerCase(),
        birthdate: new Date()
    };

    delete tempUser.repeatPassword;

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tempUser)
    }

    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300) return response.json();
        if (response.status === 400) return { errorCode: 400, msg: 'Email no Disponible' };
        if (response.status) return { errorCode: 500, msg: 'Error del servidor, inténtelo más tarde.' }
    }).catch(error => {
        return error;
    });
}

export const signInAPI = user => {
    const url = `${baseURL}/auth/log-in`;

    const userData = {
        ...user,
        email: user.email.toLowerCase()
    }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
}

export const setTokenAPI = token => {
    localStorage.setItem('token', token);
}

export const getTokenAPI = () => {
    return localStorage.getItem('token');
}

export const logOutAPI = () => {
    localStorage.removeItem('token');
}

export const isValidToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const { exp } = jwtDecode(token);
        const expire = exp * 1000; // Milliseconds
        const timeOut = expire - Date.now();
        const valid = timeOut < 0 ? false : true;

        return valid;
    } else {
        return false;
    }
}

export const userLoggedAPI = () => {
    const token = getTokenAPI();

    if (!token) {
        logOutAPI(); return
    }

    if (!isValidToken(token)) {
        logOutAPI(); return
    }

    return jwtDecode(token);
}