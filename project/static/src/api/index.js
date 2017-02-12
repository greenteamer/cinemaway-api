import { getCookie } from '../utils.js';
// import $ from 'jquery';
require('es6-promise').polyfill();
require('isomorphic-fetch');


export async function request(endpoint, data = undefined) {
  // const csrf_token = getCookie('csrftoken');
  const token = getCookie('token');
  const response = await fetch(`/${endpoint.url}`, {
    method: endpoint.method,
    credentials: 'same-origin',
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    // body: data ? JSON.stringify(data) : undefined,
    body: data ? toFormData(data) : undefined,
  });
  const responseData = response.status === 204 // NO ceontent status
    ? null
    : await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
}
import * as ENDPOINTS from './endpoints';
export {ENDPOINTS};

function toFormData(obj) {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      // если значение ключа массив, добавляем более аккуратно
      for (let i = 0; i < obj[key].length; i++) {
        formData.append(`${key}`, obj[key][i]);
      }
    }
    else {
      formData.append(key, obj[key]);
    }
  });
  return formData;
}


