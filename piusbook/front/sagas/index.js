import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import postSaga from './post';
// function* login() {
// 	try {
// 		// const result = yield call();
// 		yield delay(1000);
// 		yield put({
// 			type: 'LOG_IN_SUCCESS',
// 			data: result.data,
// 		});
// 	} catch (error) {
// 		yield put({
// 			type: 'LOG_IN_FAILURE',
// 			data: error.response.message,
// 		});
// 	}
// }
// function* logout() {
// 	try {
// 		// yield call();
// 		yield delay(1000);
// 		yield put({
// 			type: 'LOG_OUT_SUCCESS',
// 		});
// 	} catch {
// 		yield put({
// 			type: 'LOG_OUT_FAILURE',
// 		});
// 	}
// }

// function* addPost() {
// 	try {
// 		// const result = yield call();
// 		yield delay(1000);
// 		yield put({
// 			type: 'ADD_POST_SUCCESS',
// 			data: response.data,
// 		});
// 	} catch (error) {
// 		yield put({
// 			type: 'ADD_POST_FAILURE',
// 			data: error.response.data,
// 		});
// 	}
// }
// user.js 로 이동
// function* watchLogin() {
// 	yield takeLatest('LOG_IN_REQUEST', login);
// }
// function* watchLogout() {
// 	yield takeLatest('LOG_OUT_REQUEST', logout);
// }
// function* watchAddPost() {
// 	yield takeLatest('ADD_POST_REQUEST', addPost);
// }
export default function* rootSaga() {
	yield all([fork(userSaga), fork(postSaga)]);
}
