import { take, fork } from 'redux-saga/effects';

import { IMAGES } from '../constants';

function* handleStatsRequest(id) {
  console.log('stats of ', id);
}

export default function* watchStatsRequest() {
  while (true) {
    const { images } = yield take(IMAGES.LOAD_SUCCESS);

    for (let i = 0; i < images.length; i++) {
      yield fork(handleStatsRequest, images[i].id);
    }
  }
}
