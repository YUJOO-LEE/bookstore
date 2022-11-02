import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getBooks, getFlickr, getYoutube, getStores, getAbout } from './api';
import * as types from './actionType';

// 책정보
function* returnBooks(action) {
  try {
    const response = yield call(getBooks, action.Option);
    yield put({type: types.BOOKS.success, payload: response.data});
  } catch (error) {
    yield put({type: types.BOOKS.fail, payload: error});
  }
}

function* callBooks() {
  yield takeLatest(types.BOOKS.start, returnBooks);
}

// 책정보 검색리스트
function* returnBookSearch(action) {
  try {
    const response = yield call(getBooks, action.Option);
    yield put({type: types.BOOKSEARCH.success, payload: response.data.documents});
  } catch (error) {
    yield put({type: types.BOOKSEARCH.fail, payload: error});
  }
}

function* callBookSearch() {
  yield takeLatest(types.BOOKSEARCH.start, returnBookSearch);
}

// 책 상세 정보
function* returnContent(action) {
  try {
    const response = yield call(getBooks, action.Option);
    yield put({type: types.CONTENT.success, payload: response.data.documents});
  } catch (error) {
    yield put({type: types.CONTENT.fail, payload: error});
  }
}

function* callContent() {
  yield takeLatest(types.CONTENT.start, returnContent);
}

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
    yield put({type: types.YOUTUBE.success, payload: response.data});
  } catch (error) {
    yield put({type: types.YOUTUBE.fail, payload: error});
  }
}

function* callYoutube() {
  yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

// store 정보
function* returnStores() {
  try {
    const response = yield call(getStores);
    yield put({type: types.STORES.success, payload: response.data.stores});
  } catch (error) {
    yield put({type: types.STORES.fail, payload: error});
  }
}

function* callStores() {
  yield takeLatest(types.STORES.start, returnStores);
}

// about 정보
function* returnAbout() {
  try {
    const response = yield call(getAbout);
    yield put({type: types.ABOUT.success, payload: response.data.about});
  } catch (error) {
    yield put({type: types.ABOUT.fail, payload: error});
  }
}

function* callAbout() {
  yield takeLatest(types.ABOUT.start, returnAbout);
}

export default function* rootSaga(){
  yield all([fork(callBooks), fork(callBookSearch), fork(callContent), fork(callFlickr), fork(callYoutube), fork(callStores), fork(callAbout)]);
}