import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			console.log('HYDRATE', HYDRATE);
			return action.payload;

		default: {
			// 리듀서는 결국 state, action을 받는 함수이다. 그리고 state를 반환한다.
			// combineReducer를 호출하면 이 함수가 나온다.
			const combinedReducer = combineReducers({ user, post });
			return combinedReducer(state, action);
		}
	}
};

// 이전 코드
// const rootReducer = combineReducers({
// 	index: (state = {}, action) => {
// 		switch (action.type) {
// 			case HYDRATE:
// 				return { ...state, ...action.payload };
// 			default:
// 				return state;
// 		}
// 	},
// 	user,
// 	post,
// });
export default rootReducer;
