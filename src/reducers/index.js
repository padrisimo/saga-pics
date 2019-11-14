import { combineReducers } from 'redux';

import imagesReducer from './imagesReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  isLoading: loadingReducer,
  images: imagesReducer,
  error: errorReducer
});
