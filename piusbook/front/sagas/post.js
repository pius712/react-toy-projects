import {
	put,
	delay,
	takeEvery,
	takeLatest,
	all,
	fork,
	call,
} from 'redux-saga/effects';
import {
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
	ADD_POST_TO_ME,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
	REMOVE_POST_OF_MINE,
	LOAD_POST_REQUEST,
	LOAD_POST_FAILURE,
	LOAD_POST_SUCCESS,
} from '../actions/index';
import shortid from 'shortid';
import { generateDummyPost } from '../reducer/post';
import { uploadPost, uploadComment } from '../API/index';
function* addPost(action) {
	// console.log('saga add post');
	try {
		// const result = yield call();
		// yield delay(1000);
		// const id = shortid.generate();
		console.log(action.data);
		const result = yield call(uploadPost, action.data);
		// result {content, PostId, UserId}
		yield put({
			type: ADD_POST_SUCCESS,
			data: result.data,
			// data: {
			// 	id,
			// 	content: action.data,
			// },
		});
		yield put({
			type: ADD_POST_TO_ME,
			data: result.data.id,
			// data: id,
		});
	} catch (error) {
		yield put({
			type: ADD_POST_FAILURE,
			error: error.response.message,
		});
	}
}
function* addComment(action) {
	try {
		const result = yield call(uploadComment, action.data);
		// yield delay(1000);
		// result = {content, PostId, UserId}
		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: result.data,
			// data: action.data,
		});
	} catch (error) {
		yield put({
			type: ADD_COMMENT_FAILURE,
			error: error.response.message,
		});
	}
}

function* removePost(action) {
	try {
		// yield delay(1000);
		yield put({
			type: REMOVE_POST_SUCCESS,
			data: action.data,
		});
		yield put({
			type: REMOVE_POST_OF_MINE,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: REMOVE_POST_FAILURE,
			data: error,
		});
	}
}
function* loadPost(action) {
	try {
		yield delay(1000);
		yield put({
			type: LOAD_POST_SUCCESS,
			data: generateDummyPost(10),
		});
	} catch (err) {
		yield put({
			type: LOAD_POST_FAILURE,
			data: err,
		});
	}
}
function* watchAddPost() {
	// console.log('saga post');
	yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
	// console.log('watching...');
	yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLoadPost() {
	yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
export default function* postSaga() {
	yield all([
		fork(watchAddPost),
		fork(watchAddComment),
		fork(watchRemovePost),
		fork(watchLoadPost),
	]);
}
