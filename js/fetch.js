import { showMessageError, unblockSubmitButton, showMessageSucces } from './photo-upload.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = () => fetch(
  `${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error();
  });

const sendData = (body, cb) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    cb();
    showMessageSucces();
  })
  .catch(() => {
    showMessageError();
  })
  .finally(unblockSubmitButton);

export {getData, sendData};
