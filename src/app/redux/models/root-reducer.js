import {combineReducers} from 'redux';
import {reducer as bookReducer} from './book/reducers';

const reducer = combineReducers({
  book: bookReducer,
});

export {reducer};
