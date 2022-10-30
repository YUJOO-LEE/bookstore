import { combineReducers } from 'redux';
import * as types from './actionType'; 

// 도서리스트
const booksReducer = (state = { books: [] }, action) => {
	switch (action.type) {
		case types.BOOKS.start:
			return state;

		case types.BOOKS.success:
			return { ...state, books: action.payload }

		case types.BOOKS.fail:
			return { ...state, books: action.payload }

		default:
			return state;
	}
}

// 검색리스트
const bookSearchReducer = (state = { bookSearch: [] }, action) => {
	switch (action.type) {
		case types.BOOKSEARCH.start:
			return state;

		case types.BOOKSEARCH.success:
			return { ...state, bookSearch: action.payload }

		case types.BOOKSEARCH.fail:
			return { ...state, bookSearch: action.payload }

		default:
			return state;
	}
}

// 도서상세정보
const contentReducer = (state = { content: [] }, action) => {
	switch (action.type) {
		case types.CONTENT.start:
			return state;

		case types.CONTENT.success:
			return { ...state, content: action.payload }

		case types.CONTENT.fail:
			return { ...state, content: action.payload }

		default:
			return state;
	}
}

// 리뷰
const reviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case types.REVIEWS.start:
			return state;

		case types.REVIEWS.success:
			return { ...state, reviews: action.payload }

		case types.REVIEWS.fail:
			return { ...state, reviews: action.payload }

		default:
			return state;
	}
}

// 플리커
const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case types.FLICKR.start:
			return state;

		case types.FLICKR.success:
			return { ...state, flickr: action.payload }

		case types.FLICKR.fail:
			return { ...state, flickr: action.payload }

		default:
			return state;
	}
}

// 유튜브
const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case types.YOUTUBE.start:
			return state;

		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload }

		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload }

		default:
			return state;
	}
}

const reducers = combineReducers({ booksReducer, contentReducer, bookSearchReducer, reviewsReducer, flickrReducer, youtubeReducer });

export default reducers;
