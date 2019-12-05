import { take, fork, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { IMAGES } from '../constants';
import { fetchImageStats } from '../api';
import { loadImageStats, setImageStats, setImageStatsError } from '../actions';

function* handleStatsRequest(id) {
  for (let i = 0; i < 3; i++) {
    try {
      yield put(loadImageStats(id));
      const res = yield call(fetchImageStats, id);
      yield put(setImageStats(id, res.downloads.total));
      return true;
    } catch (err) {
      if (i < 2) {
        yield delay(500);
      }
      console.log(err);
    }
  }
  yield put(setImageStatsError(id));
}

export default function* watchStatsRequest() {
  while (true) {
    const { images } = yield take(IMAGES.LOAD_SUCCESS);

    for (let i = 0; i < images.length; i++) {
      yield fork(handleStatsRequest, images[i].id);
    }
  }
}
