/* eslint-disable no-unused-vars */
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
    const token = JSON.parse( window.localStorage.getItem( 'token' ) );

    config.headers.Authorization = `Bearer ${ ( token ? token : '' ) }`;
    config.headers.ContentType = 'application/json;charset=UTF-8';
    // config.headers.AccessControlAllowOrigin = '*';
    
    return config;
} );

export const getAll = async() => (
    await instance.post( 'stories/' )
);

export const userStories = async() => (
    await instance.get( 'stories/user_story' )
);

export const register = async( name, email, password ) => (
    await instance.post( 'auth/signup', { name, email, password } )
);

export const login = async( email, password ) => (
    await instance.post( 'auth/login', {
        email, password,
    } )
);

export const edit = async( userID, name, email ) => (
    await instance.post( '/users/edit', { userID, name, email } )
);
