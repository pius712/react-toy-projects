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
	LIKE_POST_REQUEST,
	UNLIKE_POST_REQUEST,
	LIKE_POST_FAILURE,
	UNLIKE_POST_FAILURE,
	LIKE_POST_SUCCESS,
	UNLIKE_POST_SUCCESS,
	UPLOAD_IMAGES_REQUEST,
	UPLOAD_IMAGES_FAILURE,
	UPLOAD_IMAGES_SUCCESS,
	RETWEET_REQUEST,
	RETWEET_SUCCESS,
	RETWEET_FAILURE,
	LOAD_A_POST_REQUEST,
	LOAD_A_POST_SUCCESS,
	LOAD_A_POST_FAILURE,
	LOAD_USER_POSTS_REQUEST,
	LOAD_USER_POSTS_SUCCESS,
	LOAD_USER_POSTS_FAILURE,
	LOAD_HASHTAG_POSTS_REQUEST,
	LOAD_HASHTAG_POSTS_SUCCESS,
	LOAD_HASHTAG_POSTS_FAILURE,
} from '../actions/index';
// import shortid from 'shortid';
// import { generateDummyPost } from '../reducer/post';
import {
	uploadPost,
	uploadComment,
	fetchPost,
	likePostAPI,
	unlikePostAPI,
	removePostAPI,
	uploadImagesAPI,
	retweetAPI,
	loadAPostAPI,
	loadUserPostsAPI,
	loadHashtagPostsAPI,
} from '../API/index';
function* addPost(action) {
	// console.log('saga add post');
	try {
		// const result = yield call();
		// yield delay(1000);
		// const id = shortid.generate();
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
	} catch (err) {
		yield put({
			type: ADD_POST_FAILURE,
			data: err.response.data,
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
	} catch (err) {
		console.error(err);
		yield put({
			type: ADD_COMMENT_FAILURE,
			data: err.response.data,
		});
	}
}

function* removePost(action) {
	try {
		// yield delay(1000);
		const result = yield call(removePostAPI, action.data);
		yield put({
			type: REMOVE_POST_SUCCESS,
			data: result.data,
		});
		yield put({
			type: REMOVE_POST_OF_MINE,
			data: action.data,
		});
	} catch (err) {
		yield put({
			type: REMOVE_POST_FAILURE,
			data: err.response.data,
		});
	}
}
function* loadAPost(action) {
	try {
		const result = yield call(loadAPostAPI, action.data);
		yield put({
			type: LOAD_A_POST_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_A_POST_FAILURE,
			data: err.response.data,
		});
	}
}
function* loadPost(action) {
	try {
		console.log(action);
		const result = yield call(fetchPost, action.data);
		// yield delay(1000);
		yield put({
			type: LOAD_POST_SUCCESS,
			data: result.data,
			// data: generateDummyPost(10),
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_POST_FAILURE,
			data: err,
		});
	}
}
function* likePost(action) {
	try {
		const result = yield call(likePostAPI, action.data);
		yield put({
			type: LIKE_POST_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LIKE_POST_FAILURE,
			data: err.response.data,
		});
	}
}
function* unlikePost(action) {
	try {
		const result = yield call(unlikePostAPI, action.data);
		yield put({
			type: UNLIKE_POST_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: UNLIKE_POST_FAILURE,
			data: err.response.data,
		});
	}
}
function* uploadImages(action) {
	try {
		const result = yield call(uploadImagesAPI, action.data);
		yield put({
			type: UPLOAD_IMAGES_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: UPLOAD_IMAGES_FAILURE,
			data: err.response.data,
		});
	}
}
function* retweet(action) {
	try {
		const result = yield call(retweetAPI, action.data);
		yield put({
			type: RETWEET_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: RETWEET_FAILURE,
			data: err.response.data,
		});
	}
}

function* loadUserPosts(action) {
	try {
		const result = yield call(loadUserPostsAPI, action.data, action.lastId);
		yield put({
			type: LOAD_USER_POSTS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_USER_POSTS_FAILURE,
			data: err.response.data,
		});
	}
}
function* loadHashtagPosts(action) {
	try {
		const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
		yield put({
			type: LOAD_HASHTAG_POSTS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_HASHTAG_POSTS_FAILURE,
			data: err.response.data,
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
function* watchLikePost() {
	yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
	yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchUploadImages() {
	yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchRetweet() {
	yield takeLatest(RETWEET_REQUEST, retweet);
}
function* watchLoadAPost() {
	yield takeLatest(LOAD_A_POST_REQUEST, loadAPost);
}

function* watchLoadUserPosts() {
	yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchLoadHashtagPosts() {
	yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
export default function* postSaga() {
	yield all([
		fork(watchAddPost),
		fork(watchAddComment),
		fork(watchRemovePost),
		fork(watchLoadPost),
		fork(watchLikePost),
		fork(watchUnlikePost),
		fork(watchUploadImages),
		fork(watchRetweet),
		fork(watchLoadAPost),
		fork(watchLoadUserPosts),
		fork(watchLoadHashtagPosts),
	]);
}
