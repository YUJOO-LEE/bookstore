import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getBooks, getFlickr, getReviews, getYoutube } from './api';
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

// 리뷰
function* returnReviews(action) {
  try {
    const response = yield call(getReviews, action.Option);
    yield put({type: types.REVIEWS.success, payload: response.data});
  } catch (error) {
    yield put({type: types.REVIEWS.fail, payload: error});
  }
}

function* callReviews() {
  yield takeLatest(types.REVIEWS.start, returnReviews);
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

export default function* rootSaga(){
  yield all([fork(callBooks), fork(callBookSearch), fork(callContent), fork(callReviews), fork(callFlickr), fork(callYoutube)]);
}