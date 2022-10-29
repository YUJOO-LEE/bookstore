import { combineReducers } from 'redux';
import * as types from './actionType'; 

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

const reducers = combineReducers({ flickrReducer, youtubeReducer });

export default reducers;
