export const GET_ALL_DATA = () => ({url: 'api/v1/all-data/', method: 'GET'});
export const LOGIN = () => ({url: 'api/v1/login/', method: 'POST'});
export const REGISTER = () => ({url: 'api/v1/registration/', method: 'POST'});
export const LOGOUT = () => ({url: 'api/v1/logout/', method: 'POST'});
export const SET_GROUP = () => ({url: 'api/v1/set-group/', method: 'GET'});
export const GET_USER = () => ({url: 'api/v1/current-user/', method: 'GET'});
// export const POST_PROFILE = () => ({url: 'api/v1/profiles/', method: 'POST'});
// export const PUT_PROFILE = (id) => ({url: `api/v1/profiles/${id}/`, method: 'PUT'});
export const POST_USER = () => ({url: 'api/v1/users/', method: 'POST'});
export const PUT_USER = (id) => ({url: `api/v1/users/${id}/`, method: 'PUT'});

export const POST_VACANCY = () => ({url: 'api/v1/vacancies/', method: 'POST'});
export const PUT_VACANCY = (id) => ({url: `api/v1/vacancies/${id}/`, method: 'PUT'});
export const DELETE_VACANCY = (id) => ({url: `api/v1/vacancies/${id}/`, method: 'DELETE'});

export const POST_USERREQUEST = () => ({url: 'api/v1/requests/', method: 'POST'});
export const PUT_USERREQUEST = (id) => ({url: `api/v1/requests/${id}/`, method: 'PUT'});
export const DELETE_USERREQUEST = (id) => ({url: `api/v1/requests/${id}/`, method: 'DELETE'});

export const POST_USERRESPONSE = () => ({url: 'api/v1/responses/', method: 'POST'});
export const PUT_USERRESPONSE = (id) => ({url: `api/v1/responses/${id}/`, method: 'PUT'});
export const DELETE_USERRESPONSE = (id) => ({url: `api/v1/responses/${id}/`, method: 'DELETE'});

export const SEND_MAIL = () => ({url: 'send-mail/', method: 'POST'});
