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
