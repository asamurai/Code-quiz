import config from './../../config';
import axios from 'axios';
import cookie from 'react-cookies';

const {
    global: {
        api: {
            url: apiUrl
        }
    }
} = config;

const TOKEN_NAME = 'token';

export const saveToken = token => cookie.save(TOKEN_NAME, token, {
    path: '/'
});

export const removeToken = () => cookie.remove(TOKEN_NAME, { path: '/' });

export const withAuth = (method, url, data) => axios({ 
    method,
    url: `${apiUrl}${url}`,
    data,
    headers: { Authorization: `Bearer ${cookie.load(TOKEN_NAME) || ''}` }
});

export const withAuthToken = (method, url, data) => axios({ 
    method,
    url: `${apiUrl}${url}`,
    data,
    headers: { Authorization: `Token ${cookie.load(TOKEN_NAME) || ''}` }
});
