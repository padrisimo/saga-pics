import { runSaga } from 'redux-saga';

import * as api from '../../api';
import { getPage, handleImagesLoad } from '../imagesSaga';
import { setImages, setError } from '../../actions';

test('selector gives back the page', () => {
  const nextPage = 1;
  const state = { nextPage };
  const res = getPage(state);
  expect(res).toBe(nextPage);
});

test('should load images and handle them', async () => {
  const dispatchedActions = [];

  const mockedImages = ['gaticos', 'monetes'];
  api.fetchImages = jest.fn(() => Promise.resolve(mockedImages));

  const fakeStore = {
    getState: () => ({ nextPage: 1 }),
    dispatch: action => dispatchedActions.push(action)
  };

  await runSaga(fakeStore, handleImagesLoad).done;

  expect(api.fetchImages.mock.calls.length).toBe(1);
  expect(dispatchedActions).toContainEqual(setImages(mockedImages));
});

test('should handle errors in case of fail', async () => {
  const dispatchedActions = [];

  const error = 'some error is thrown';
  api.fetchImages = jest.fn(() => Promise.reject(error));

  const fakeStore = {
    getState: () => ({ nextPage: 1 }),
    dispatch: action => dispatchedActions.push(action)
  };

  await runSaga(fakeStore, handleImagesLoad).done;

  expect(api.fetchImages.mock.calls.length).toBe(1);
  expect(dispatchedActions).toContainEqual(setError(error));
});
