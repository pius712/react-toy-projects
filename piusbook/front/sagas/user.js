import { put, delay, takeLatest, all, fork, call } from 'redux-saga/effects';
import { registerUser, loginUser, logoutUser, fetchMyInfo } from '../API/index';
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
		yield delay(1000);
		yield put({
			type: FOLLOW_SUCCESS,
			data: action.data,
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
		yield put({
			type: UNFOLLOW_SUCCESS,
			data: action.data,
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
export default function* userSaga() {
	yield all([
		fork(watchLogin),
		fork(watchLogout),
		fork(watchSignup),
		fork(watchFollow),
		fork(watchUnfollow),
		fork(watchLoadInfo),
	]);
}
