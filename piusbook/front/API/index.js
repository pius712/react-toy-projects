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

const fetchMyInfo = () => {
	return axios.get('user');
};
export {
	registerUser,
	loginUser,
	logoutUser,
	uploadPost,
	uploadComment,
	fetchMyInfo,
};
