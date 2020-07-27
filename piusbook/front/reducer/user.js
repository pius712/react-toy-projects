import produce from 'immer';
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
	EDIT_NICKNAME_REQUEST,
	EDIT_NICKNAME_SUCCESS,
	EDIT_NICKNAME_FAILURE,
	ADD_POST_TO_ME,
	REMOVE_POST_OF_MINE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	FOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
	UNFOLLOW_FAILURE,
	LOAD_MY_INFO_REQUEST,
	LOAD_MY_INFO_SUCCESS,
	LOAD_MY_INFO_FAILURE,
	LOAD_FOLLOWINGS_REQUEST,
	LOAD_FOLLOWINGS_SUCCESS,
	LOAD_FOLLOWINGS_FAILURE,
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWERS_SUCCESS,
	LOAD_FOLLOWERS_FAILURE,
	REMOVE_FOLLOWER_REQUEST,
	REMOVE_FOLLOWER_SUCCESS,
	REMOVE_FOLLOWER_FAILURE,
} from '../actions/index.js';

export const initialState = {
	logInLoading: false,
	logInDone: false,
	logInError: null,
	logOutLoading: false,
	logOutDone: false,
	logOutError: null,
	signUpLoading: false,
	signUpDone: false,
	signUpError: null,
	editNicknameLoading: false,
	editNicknameDone: false,
	editNicknameError: null,
	me: null,
	signupData: null,
	loginData: null,
	followLoading: false,
	followDone: false,
	followError: null,
	unfollowLoading: false,
	unfollowDone: false,
	unfollowError: null,
	loadMyInfoLoading: false,
	loadMyInfoDone: false,
	loadMyInfoError: null,
	loadFollowingsLoading: false,
	loadFollowingsDone: false,
	loadFollowingsError: null,
	loadFollowersLoading: false,
	loadFollowersDone: false,
	loadFollowersError: null,
	removeFollowerLoading: false,
	removeFollowerDone: false,
	removeFollowerError: null,
};

const dummyUser = data => ({
	...data,
	nickname: 'pius',
	id: 1,
	Posts: [],
	Followings: [
		{
			nickname: 'loopy',
		},
		{
			nickname: 'dopa',
		},
		{
			nickname: 'apdo',
		},
	],
	Followers: [
		{
			nickname: 'loopy',
		},
		{
			nickname: 'dopa',
		},
		{
			nickname: 'apdo',
		},
	],
});
export const loginRequestAction = data => {
	return {
		type: LOG_IN_REQUEST,
		data,
	};
};
export const logoutRequestAction = () => {
	return {
		type: LOG_OUT_REQUEST,
	};
};

const reducer = (state = initialState, action) => {
	return produce(state, draftState => {
		switch (action.type) {
			case LOG_IN_REQUEST:
				draftState.logInLoading = true;
				draftState.logInDone = false;
				draftState.logInError = null;
				break;
			case LOG_IN_SUCCESS:
				draftState.logInLoading = false;
				draftState.logInDone = true;
				draftState.me = action.data;
				break;
			case LOG_IN_FAILURE:
				draftState.logInLoading = false;
				draftState.logInDone = false;
				draftState.logInError = action.data;
				draftState.me = null;
				break;
			// GET /user 를 통해서 쿠기를 보내서 내 정보를 받는 것
			case LOAD_MY_INFO_REQUEST:
				draftState.loadMyInfoLoading = true;
				draftState.loadMyInfoDone = false;
				draftState.loadMyInfoError = null;
				break;
			case LOAD_MY_INFO_SUCCESS:
				draftState.loadMyInfoLoading = false;
				draftState.loadMyInfoDone = true;
				draftState.me = action.data;
				break;
			case LOAD_MY_INFO_FAILURE:
				draftState.loadMyInfoLoading = false;
				draftState.loadMyInfoDone = false;
				draftState.loadMyInfoError = action.data;
				draftState.me = null;
				break;
			case LOG_OUT_REQUEST:
				draftState.logOutLoading = true;
				draftState.logInDone = false;
				draftState.me = null;
				break;
			case LOG_OUT_SUCCESS:
				draftState.logOutLoading = false;
				draftState.logInDone = false;
				draftState.me = null;
				break;
			case LOG_OUT_FAILURE:
				draftState.logOutLoading = false;
				draftState.logOutError = action.data;
				break;
			case SIGN_UP_REQUEST:
				draftState.signUpLoading = true;
				draftState.signUpDone = false;
				break;
			case SIGN_UP_SUCCESS:
				draftState.signUpLoading = false;
				draftState.signUpDone = true;
				break;
			case SIGN_UP_FAILURE:
				draftState.signUpError = action.data;
				break;
			case EDIT_NICKNAME_REQUEST:
				draftState.editNicknameLoading = true;
				draftState.editNicknameDone = false;
				draftState.editNicknameError = null;
				break;
			case EDIT_NICKNAME_SUCCESS:
				draftState.editNicknameLoading = false;
				draftState.editNicknameDone = true;
				draftState.me.nickname = action.data.nickname;
				break;
			case EDIT_NICKNAME_FAILURE:
				draftState.editNicknameLoading = false;
				draftState.editNicknameError = action.error;
				break;
			case ADD_POST_TO_ME: {
				const newPost = {
					id: action.data,
				};
				draftState.me.Posts.unshift(newPost);
				break;
			}
			case REMOVE_POST_OF_MINE: {
				draftState.me.Posts = draftState.me.Posts.filter(
					item => item.id !== action.data,
				);
				break;
			}
			case FOLLOW_REQUEST:
				draftState.followLoading = true;
				draftState.followDone = false;
				draftState.followError = null;
				break;
			case FOLLOW_SUCCESS:
				draftState.followLoading = false;
				draftState.me.Followings.push({ id: action.data.FollowingId });
				draftState.followDone = true;
				break;
			case FOLLOW_FAILURE:
				draftState.followLoading = false;
				draftState.followDone = false;
				break;
			case UNFOLLOW_REQUEST:
				draftState.unfollowLoading = true;
				draftState.unfollowDone = false;
				draftState.unfollowError = null;
				break;
			case UNFOLLOW_SUCCESS: {
				const idx = draftState.me.Followings.findIndex(
					following => following.id === action.data.FollowingId,
				);
				draftState.unfollowLoading = false;
				draftState.me.Followings.splice(idx, 1);
				draftState.unfollowDone = true;
				break;
			}
			case UNFOLLOW_FAILURE:
				draftState.unfollowLoading = false;
				draftState.unfollowDone = false;
				break;
			case LOAD_FOLLOWINGS_REQUEST:
				draftState.loadFollowingsLoading = true;
				draftState.loadFollowingsDone = false;
				draftState.loadFollowingsError = null;
				break;
			// 팔로잉 불러오기
			case LOAD_FOLLOWINGS_SUCCESS:
				draftState.loadFollowingsLoading = false;
				draftState.loadFollowingsDone = true;
				draftState.me.Followings = action.data;
				break;
			case LOAD_FOLLOWINGS_FAILURE:
				draftState.loadFollowingsLoading = false;
				draftState.loadFollowingsDone = false;
				draftState.loadFollowingsError = action.data;
				break;
			// 팔로워 불러오기
			case LOAD_FOLLOWERS_REQUEST:
				draftState.loadFollowersLoading = true;
				draftState.loadFollowersDone = false;
				draftState.loadFollowersError = null;
				break;
			case LOAD_FOLLOWERS_SUCCESS:
				console.log('followers', action.data);
				draftState.loadFollowersLoading = false;
				draftState.loadFollowersDone = true;
				draftState.me.Followers = action.data;
				break;
			case LOAD_FOLLOWERS_FAILURE:
				draftState.loadFollowersLoading = false;
				draftState.loadFollowersDone = false;
				draftState.loadFollowersError = action.data;
				break;
			case REMOVE_FOLLOWER_REQUEST:
				draftState.removeFollowerLoading = true;
				draftState.removeFollowerDone = false;
				draftState.removeFollowerError = null;
				break;
			case REMOVE_FOLLOWER_SUCCESS:
				draftState.removeFollowerDone = true;
				draftState.removeFollowerLoading = false;
				draftState.me.Followers = draftState.me.Followers.filter(
					follower => follower.id === action.data.UserId,
				);
				break;
			case REMOVE_FOLLOWER_FAILURE:
				draftState.removeFollowerLoading = false;
				draftState.removeFollowerDone = false;
				draftState.removeFollowerError = action.data;
				break;
			default:
				break;
		}
	});
};

export default reducer;
