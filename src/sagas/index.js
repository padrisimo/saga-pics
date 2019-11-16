import { takeEvery } from 'redux-saga/effects';
import { IMAGES } from '../constants';

// worker saga
function* handleImagesLoad() {
  console.log('fetch pics from api');
}

// watcher saga
function* rootSaga() {
  yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}

// watcher saga -> actions -> worker saga

export default rootSaga;
