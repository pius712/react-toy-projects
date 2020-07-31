import {
	put,
	delay,
	takeLatest,
	all,
	fork,
	call,
	take,
} from 'redux-saga/effects';
import {
	registerUser,
	loginUser,
	logoutUser,
	fetchMyInfo,
	loadUserAPI,
	editNicknameAPI,
	followAPI,
	unfollowAPI,
	loadFollowersAPI,
	loadFollowingsAPI,
	removeFollowerAPI,
} from '../API/index';
import {
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_IN_FAILURE,
	LOG_OUT_REQUEST,
	LOG_OUT_SUCCESS,
	LOG_OUT_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	SIGN_UP_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	FOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
	UNFOLLOW_FAILURE,
	LOAD_MY_INFO_REQUEST,
	LOAD_MY_INFO_SUCCESS,
	LOAD_MY_INFO_FAILURE,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAILURE,
	EDIT_NICKNAME_REQUEST,
	EDIT_NICKNAME_FAILURE,
	EDIT_NICKNAME_SUCCESS,
	LOAD_FOLLOWINGS_REQUEST,
	LOAD_FOLLOWINGS_SUCCESS,
	LOAD_FOLLOWINGS_FAILURE,
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWERS_FAILURE,
	LOAD_FOLLOWERS_SUCCESS,
	REMOVE_FOLLOWER_REQUEST,
	REMOVE_FOLLOWER_FAILURE,
	REMOVE_FOLLOWER_SUCCESS,
} from '../actions';

function* login(action) {
	try {
		const result = yield call(loginUser, action.data);
		// yield delay(1000);
		console.log(result);
		yield put({
			type: LOG_IN_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		console.log(error.response);
		yield put({
			type: LOG_IN_FAILURE,
			data: error.response.data,
		});
	}
}
function* logout() {
	try {
		yield call(logoutUser);
		// yield delay(1000);
		yield put({
			type: LOG_OUT_SUCCESS,
		});
	} catch {
		yield put({
			type: LOG_OUT_FAILURE,
		});
	}
}

function* signup(action) {
	try {
		const result = yield call(registerUser, action.data); // call(함수, 인자);
		// {email, password, nickname}
		console.log(result);
		yield put({
			type: SIGN_UP_SUCCESS,
		});
	} catch (err) {
		console.log('sign_up_failure');
		yield put({
			type: SIGN_UP_FAILURE,
			data: err.response.data,
		});
	}
}
function* follow(action) {
	try {
		const result = yield call(followAPI, action.data);
		// yield delay(1000);
		yield put({
			type: FOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: FOLLOW_FAILURE,
			data: err,
		});
	}
}
function* unfollow(action) {
	try {
		const result = yield call(unfollowAPI, action.data);
		yield put({
			type: UNFOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: UNFOLLOW_FAILURE,
		});
	}
}
function* loadMyInfo() {
	try {
		const result = yield call(fetchMyInfo);
		yield put({
			type: LOAD_MY_INFO_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_MY_INFO_FAILURE,
			data: err.response.message,
		});
	}
}

function* loadUser(action) {
	try {
		const result = yield call(loadUserAPI, action.data);
		yield put({
			type: LOAD_USER_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_USER_FAILURE,
			error: err.response.data,
		});
	}
}
function* editNickname(action) {
	try {
		const result = yield call(editNicknameAPI, action.data);
		yield put({
			type: EDIT_NICKNAME_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: EDIT_NICKNAME_FAILURE,
			data: err.response.message,
		});
	}
}
function* loadFollowings() {
	try {
		const result = yield call(loadFollowingsAPI);
		yield put({
			type: LOAD_FOLLOWINGS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_FOLLOWERS_FAILURE,
			data: err.response.message,
		});
	}
}
function* loadFollowers() {
	try {
		const result = yield call(loadFollowersAPI);
		yield put({
			type: LOAD_FOLLOWERS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_FOLLOWINGS_FAILURE,
			data: err.response.message,
		});
	}
}
function* removeFollower(action) {
	try {
		const result = yield call(removeFollowerAPI, action.data);
		yield put({
			type: REMOVE_FOLLOWER_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: REMOVE_FOLLOWER_FAILURE,
			data: err.response.message,
		});
	}
}
// watch 사가
function* watchLogin() {
	console.log('watch login saga');
	yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
	yield takeLatest(LOG_OUT_REQUEST, logout);
}
function* watchSignup() {
	yield takeLatest(SIGN_UP_REQUEST, signup);
}
function* watchFollow() {
	yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
	yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLoadInfo() {
	yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadUser() {
	yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
function* watchEditNickname() {
	yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}
function* watchLoadFollowings() {
	yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* watchLoadFollowers() {
	yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchRemoveFollower() {
	yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
export default function* userSaga() {
	yield all([
		fork(watchLogin),
		fork(watchLogout),
		fork(watchSignup),
		fork(watchFollow),
		fork(watchUnfollow),
		fork(watchLoadInfo),
		fork(watchLoadUser),
		fork(watchEditNickname),
		fork(watchLoadFollowings),
		fork(watchLoadFollowers),
		fork(watchRemoveFollower),
	]);
}
