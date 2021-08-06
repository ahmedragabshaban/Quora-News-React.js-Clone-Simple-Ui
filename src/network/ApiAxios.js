import axios from 'axios';
import config from "../config";

// const https = require('https');
//
// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });

const instance = axios.create( {
    baseURL: config.WS_BASE_URL,
} );

// eslint-disable-next-line no-shadow
instance.interceptors.request.use( async( config ) => {
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem( 'token' );
    config.headers.Authorization = ( token ? token : '' );
    config.headers.ContentType = 'application/json';
    return config;
} );

export const getAll = async() => (
    await instance.post( 'stories/' )
);

export const register = async( name, email, password ) => (
    await instance.post( 'auth/register', { name, email, password } )
);

export const login = async( email, password ) => (
    await instance.post( 'auth/login', { email, password } )
);

export const edit = async( userID, name, email ) => (
    await instance.post( '/users/edit', { userID, name, email } )
);
