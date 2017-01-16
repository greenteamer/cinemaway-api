export const HOST = '';


export const GET_ALL_DATA = () => ({url: 'api/v1/all-data/', method: 'GET'});
// export const GET_WORKERS = () => ({url: `api/v1/workers/`, method: 'GET'});
// export const REGISTER = () => ({url: `rest-auth/registration/`, method: 'POST'});
// export const REGISTER = () => ({url: `${HOST}/oauth/registration/`, method: 'POST'});
// export const LOGIN = () => ({url: `rest-auth/login/`, method: 'POST'});
export const LOGIN = () => ({url: 'api/v1/login/', method: 'POST'});
export const REGISTER = () => ({url: 'api/v1/registration/', method: 'POST'});
export const LOGOUT = () => ({url: 'api/v1/logout/', method: 'POST'});
export const GET_USER = () => ({url: 'api/v1/current-user/', method: 'GET'});
export const POST_PROFILE = () => ({url: 'api/v1/profiles/', method: 'POST'});
export const PUT_PROFILE = (id) => ({url: `api/v1/profiles/${id}/`, method: 'PUT'});


export const GET_PRODUCT = (id) => ({url: `api/v1/products/${id}`, method: 'GET'});
export const GET_IMAGES = () => ({url: 'api/v1/images', method: 'GET'});
export const GET_IMAGE = (id) => ({url: `api/v1/images/${id}`, method: 'GET'});
export const GET_PROPERTIES = () => ({url: 'api/v1/properties', method: 'GET'});
export const GET_PROPERTY = (id) => ({url: `api/v1/property/${id}`, method: 'GET'});
export const GET_TYPES = () => ({url: 'api/v1/property-types', method: 'GET'});
export const GET_TYPE = (id) => ({url: `api/v1/property-types/${id}`, method: 'GET'});
export const GET_CATEGORIES = () => ({url: 'api/v1/categories', method: 'GET'});
export const GET_CATEGORY = (id) => ({url: `api/v1/categories/${id}`, method: 'GET'});
export const GET_CARTITEMS = () => ({url: 'api/v1/cartitems', method: 'GET'});
export const GET_CARTITEM = (id) => ({url: `api/v1/cartitems/${id}`, method: 'GET'});
export const DELETE_CARTITEM = (id) => ({url: `api/v1/cartitems/${id}`, method: 'DELETE'});
export const POST_CARTITEM = () => ({url: 'api/v1/cartitems/', method: 'POST'});
export const GET_ORDERS = () => ({url: 'api/v1/orders', method: 'GET'});
export const GET_ORDER = (id) => ({url: `api/v1/orders/${id}`, method: 'GET'});
