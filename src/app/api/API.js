import {call, select} from 'redux-saga/effects';
import {BOOK_URL} from '../utils/config/urls';

function* getAllBook({endpoint, method, body = null}) {
  const state = yield select();
  const res = yield call(makeRequest, {
    endpoint,
    method,
    headers: {
      Authorization: state.book.accessToken
        ? `Bearer ${state.book.accessToken}`
        : null,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...body,
    }),
  });

  if (res.status === 401) {
    // put some condition and details why can't allow the request
  }

  const parsedResponse = yield call(parseResponse, res);
  if (!res.ok) {
    // handle bad response here
  }
  return parsedResponse;
}

const makeRequest = async ({endpoint, method, headers, body = null}) => {
  return fetch(BOOK_URL + endpoint, {
    method,
    headers,
    body: body === '{}' ? undefined : body,
  });
};

const parseResponse = async response => {
  let parsedResponse;
  try {
    parsedResponse = await response.clone().json();
  } catch {
    parsedResponse = await response.text();
  }
  return parsedResponse;
};

export {getAllBook};
