import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube } from './api';
import * as types from './actionType';

// 플리커
function* returnFlickr(action) {
  try {
    const response = yield call(getFlickr, action.Option);
    yield put({type: types.FLICKR.success, payload: response.data.photos});
  } catch (error) {
    yield put({type: types.FLICKR.fail, payload: error});
  }
}

function* callFlickr() {
  yield takeLatest(types.FLICKR.start, returnFlickr);
}

// 유튜브
function* returnYoutube(action) {
  try {
    const response = yield call(getYoutube, action.Option);
    console.log(response);
    yield put({type: types.YOUTUBE.success, payload: response.data});
  } catch (error) {
    yield put({type: types.YOUTUBE.fail, payload: error});
  }
}

function* callYoutube() {
  yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

export default function* rootSaga(){
  yield all([fork(callFlickr), fork(callYoutube)]);
}