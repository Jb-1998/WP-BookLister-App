import {
  GET_ALL_BOOK_INFO_REQUEST,
  GET_ALL_BOOK_INFO_REQUEST_SUCCESS,
} from './actions';

const initialState = {
  books: [],
  accessToken: 'token',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BOOK_INFO_REQUEST_SUCCESS: {
      const {books} = action.payload;
      return {
        books,
      };
    }
    default:
      return state;
  }
};

export {reducer};
