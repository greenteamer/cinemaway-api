import { getCookie } from '../utils.js';
import $ from 'jquery';
require('es6-promise').polyfill();
require('isomorphic-fetch');



export async function request(endpoint, data = undefined) {
  const csrf_token = getCookie("csrftoken");
  const token = getCookie("token");
  const response = await fetch(`/${endpoint.url}`, {
    method: endpoint.method,
    credentials: 'same-origin',
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: data ? JSON.stringify(data) : undefined,
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
export {ENDPOINTS, myAjax};


function myAjax(data = undefined) {
  const csrf_token = getCookie("csrftoken");
  const token = getCookie("token");
  $.ajax({
    type: "POST",
    url: '/send-mail/',
    data: {
      'csrfmiddlewaretoken': csrf_token,
      ...data
    },
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },

    success: function (data) {
      // Вывод текста результата отправки
      // $("#response").html(data);
      console.log(data)
    },
    error: function (jqXHR, text, error) {
      // Вывод текста ошибки отправки
      // $("#response").html(error);
      console.log(error)
    }
  });
}
