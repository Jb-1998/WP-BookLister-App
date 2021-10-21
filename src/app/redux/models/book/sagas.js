import {takeEvery, put, call} from 'redux-saga/effects';
import {
  GET_ALL_BOOK_INFO_REQUEST,
  GET_ALL_BOOK_INFO_REQUEST_SUCCESS,
} from './actions';
import {getAllBook} from '../../../api/API';

function* handler() {
  yield takeEvery(GET_ALL_BOOK_INFO_REQUEST, getAllBookInfo);
}

function* getAllBookInfo(action) {
  try {
    const getBooks = yield call(getAllBook, {
      endpoint: 'subjects/love.json?details=true',
      method: 'GET',
    });
    console.log(getBooks.works);
    // API call
    yield put({
      type: GET_ALL_BOOK_INFO_REQUEST_SUCCESS,
      payload: {
        books: getBooks.works,
      },
    });
  } catch (err) {
    console.log('Error: ', err);
    // handle error
  }
}

export {handler};
