import produce from 'immer';
import faker from 'faker';
import shortid from 'shortid';
import {
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
	ADD_POST_TO_ME,
	REMOVE_POST_OF_MINE,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
	LOAD_POST_REQUEST,
	LOAD_POST_SUCCESS,
	LOAD_POST_FAILURE,
} from '../actions';

export const initialState = {
	mainPosts: [
		{
			id: shortid.generate(),
			User: {
				id: 1,
				nickname: 'pius',
			},
			content: '#Hello#react made by #pius ',
			Images: [
				{
					id: shortid.generate(),
					src:
						'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRL13vWu8GOWHAFISKo9v5oBEU75C9udknN2w&usqp=CAU',
				},
				{
					id: shortid.generate(),
					src:
						'https://i.pinimg.com/736x/0b/2f/8a/0b2f8a51314ab1ebe0505aee843a33b1.jpg',
				},
				{
					id: shortid.generate(),
					src:
						'https://pbs.twimg.com/profile_images/1256251357763235842/zY8KO59p_400x400.jpg',
				},
			],
			Comments: [
				{
					id: shortid.generate(),
					User: {
						id: shortid.generate(),
						nickname: 'aksfbs',
					},
					content: '안녕하세요',
				},
			],
		},
	],
	imagePaths: [],
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
	addCommentLoading: false,
	addCommentDone: false,
	addCommentError: null,
	removePostLoading: false,
	removePostDone: false,
	removePostError: null,
	loadPostLoading: false,
	loadPostDone: false,
	loadPostError: null,
	hasMorePosts: true,
};
export const generateDummyPost = num =>
	Array(num)
		.fill()
		.map((item, idx) => ({
			id: shortid.generate(),
			User: {
				id: shortid.generate(),
				nickname: faker.name.findName(),
			},
			content: faker.lorem.paragraph(),
			Images: [],
			Comments: [
				{
					id: shortid.generate(),
					User: {
						id: shortid.generate(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.paragraph(),
				},
			],
		}));
// initialState.mainPosts = initialState.mainPosts.concat(
// 	Array(20)
// 		.fill()
// 		.map((item, idx) => ({
// 			id: shortid.generate(),
// 			User: {
// 				id: shortid.generate(),
// 				nickname: faker.name.findName(),
// 			},
// 			content: faker.lorem.paragraph(),
// 			Images: [],
// 			Comments: [
// 				{
// 					id: shortid.generate(),
// 					User: {
// 						id: shortid.generate(),
// 						nickname: faker.name.findName(),
// 					},
// 					content: faker.lorem.paragraph(),
// 				},
// 			],
// 		})),
// );
// const dummyPost = data => ({
// 	id: data.id,
// 	User: {
// 		id: 1,
// 		nickname: 'pius',
// 	},
// 	content: data.content,
// 	Image: [],
// 	Comments: [],
// });

// const dummyComment = data => ({
// 	id: shortid.generate(),
// 	User: {
// 		nickname: 'aksfbs',
// 	},
// 	content: data,
// });

export const addPostRequest = data => {
	return {
		type: ADD_POST_REQUEST,
		data: data,
	};
};

export const removePostRequest = data => {
	return {
		type: REMOVE_POST_REQUEST,
		data: data,
	};
};
export const addCommentRequest = data => {
	return {
		type: ADD_COMMENT_REQUEST,
		data: data,
	};
};

const reducer = (state = initialState, action) => {
	return produce(state, draftState => {
		switch (action.type) {
			// POST
			case ADD_POST_REQUEST:
				draftState.addPostLoading = true;
				draftState.addPostDone = false;
				break;

			case ADD_POST_SUCCESS:
				// draftState.mainPosts.unshift(dummyPost(action.data));
				draftState.mainPosts.unshift(action.data);
				draftState.addPostLoading = false;
				draftState.addPostDone = true;
				break;
			case ADD_POST_FAILURE:
				draftState.addPostError = action.error;
				break;
			// Comment
			case ADD_COMMENT_REQUEST:
				draftState.addCommentLoading = true;
				draftState.addCommentDone = false;
				draftState.addCommentError = null;
				break;
			case ADD_COMMENT_SUCCESS: {
				//action.data.content, postId, userId
				// comment form에서 comment를 추가할때,
				// store에 있는 mainPosts를 찾아서 추가해준다.
				const idx = draftState.mainPosts.findIndex(
					item => item.id === action.data.PostId,
				);
				draftState.mainPosts[idx].Comments.unshift(
					action.data,
					// dummyComment(action.data.content),
				);
				draftState.addCommentLoading = false;
				draftState.addCommentDone = true;
				break;
			}
			case ADD_COMMENT_FAILURE:
				draftState.addCommentError = action.error;
				break;
			case REMOVE_POST_REQUEST:
				draftState.removePostLoading = true;
				draftState.removePostDone = false;
				break;
			case REMOVE_POST_SUCCESS:
				draftState.removePostLoading = false;
				draftState.removePostDone = true;
				draftState.mainPosts = draftState.mainPosts.filter(
					item => item.id !== action.data,
				);
				break;
			case REMOVE_POST_FAILURE:
				draftState.removePostLoading = false;
				draftState.removePostError = action.data;
				break;
			case LOAD_POST_REQUEST:
				draftState.loadPostLoading = true;
				draftState.loadPostDone = false;
				break;
			case LOAD_POST_SUCCESS:
				draftState.loadPostLoading = false;
				draftState.loadPostDone = true;
				draftState.mainPosts = action.data.concat(draftState.mainPosts);
				draftState.hasMorePosts = draftState.mainPosts.length < 30;
				break;
			case LOAD_POST_FAILURE:
				draftState.loadPostError = action.data;
				break;
			default:
				break;
		}
	});
};

export default reducer;
