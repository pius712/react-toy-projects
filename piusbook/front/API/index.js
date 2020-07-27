import axios from 'axios';

// Cors 문제로 인해서 백엔드로 cookie를 보내지 않는 문제를
// withCredentials: true 옵션을 주어서 해결
// const instance = axios.create({
// 	baseURL: 'http://localhost:8080/',
// });
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const loginUser = data => {
	return axios.post('user/login', data);
};
const registerUser = data => {
	return axios.post('user', data);
	// data = {email, password, nickname}
};

const logoutUser = () => {
	return axios.post('user/logout');
};

// 게시글 업로드
// data = {conetent: text}
// postform.js

const uploadPost = data => {
	return axios.post('post', data);
};

// 댓글 업로드
// data = {
// 	content: comment,
// 	postId: post.id,
// 	userId: id,
// }
// commentForm.js
const uploadComment = data => {
	return axios.post(`post/${data.postId}/comment`, data);
};

const fetchPost = lastId => {
	return axios.get(`post?lastId=${lastId || 0}`);
};
const loadAPostAPI = data => {
	return axios.get(`post/${data.postId}`);
};
const fetchMyInfo = () => {
	return axios.get('user');
};

const likePostAPI = data => {
	return axios.patch(`post/${data.postId}/like`);
};
const unlikePostAPI = data => {
	return axios.patch(`post/${data.postId}/unlike`);
};

const editNicknameAPI = data => {
	return axios.patch('user/edit/nickname', data);
};
const removePostAPI = data => {
	return axios.delete(`post/${data.PostId}/delete`);
};
const followAPI = data => {
	return axios.patch(`user/${data.UserId}/follow`);
};
const unfollowAPI = data => {
	return axios.patch(`user/${data.UserId}/unfollow`);
};
const loadFollowingsAPI = () => {
	return axios.get('user/followings');
};
const loadFollowersAPI = () => {
	return axios.get('user/followers');
};
const removeFollowerAPI = data => {
	return axios.delete(`user/follower/${data.UserId}`);
};
// form data는 {name : data} 이런식으로 보내면 json이 되서 안된다. 그냥 그대로 보내야함
const uploadImagesAPI = data => {
	return axios.post('post/images', data);
};

const retweetAPI = data => {
	return axios.post(`post/${data.PostId}/retweet`);
};
export {
	registerUser,
	loginUser,
	logoutUser,
	uploadPost,
	uploadComment,
	fetchMyInfo,
	fetchPost,
	likePostAPI,
	unlikePostAPI,
	editNicknameAPI,
	removePostAPI,
	followAPI,
	unfollowAPI,
	loadFollowingsAPI,
	loadFollowersAPI,
	removeFollowerAPI,
	uploadImagesAPI,
	retweetAPI,
	loadAPostAPI,
};
