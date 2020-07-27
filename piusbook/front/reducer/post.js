import produce from 'immer';
// import faker from 'faker';
// import shortid from 'shortid';
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
	LIKE_POST_REQUEST,
	LIKE_POST_SUCCESS,
	LIKE_POST_FAILURE,
	UNLIKE_POST_REQUEST,
	UNLIKE_POST_SUCCESS,
	UNLIKE_POST_FAILURE,
	UPLOAD_IMAGES_REQUEST,
	UPLOAD_IMAGES_SUCCESS,
	UPLOAD_IMAGES_FAILURE,
	REMOVE_IMAGE,
	RETWEET_SUCCESS,
	RETWEET_REQUEST,
	RETWEET_FAILURE,
	LOAD_A_POST_REQUEST,
	LOAD_A_POST_SUCCESS,
	LOAD_A_POST_FAILURE,
} from '../actions';

export const initialState = {
	mainPosts: [
		// {
		// 	id: shortid.generate(),
		// 	User: {
		// 		id: 1,
		// 		nickname: 'pius',
		// 	},
		// 	content: '#Hello#react made by #pius ',
		// 	Images: [
		// 		{
		// 			id: shortid.generate(),
		// 			src:
		// 				'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRL13vWu8GOWHAFISKo9v5oBEU75C9udknN2w&usqp=CAU',
		// 		},
		// 		{
		// 			id: shortid.generate(),
		// 			src:
		// 				'https://i.pinimg.com/736x/0b/2f/8a/0b2f8a51314ab1ebe0505aee843a33b1.jpg',
		// 		},
		// 		{
		// 			id: shortid.generate(),
		// 			src:
		// 				'https://pbs.twimg.com/profile_images/1256251357763235842/zY8KO59p_400x400.jpg',
		// 		},
		// 	],
		// 	Comments: [
		// 		{
		// 			id: shortid.generate(),
		// 			User: {
		// 				id: shortid.generate(),
		// 				nickname: 'aksfbs',
		// 			},
		// 			content: '안녕하세요',
		// 		},
		// 	],
		// Likers: []
		// },
	],
	imagePaths: [],
	singlePost: {},
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
	likePostLoading: false,
	likePostDone: false,
	likePostError: null,
	unlikePostLoading: false,
	unlikePostDone: false,
	unlikePostError: null,
	uploadImagestLoading: false,
	uploadImagestDone: false,
	uploadImagestError: null,
	retweetLoading: false,
	retweetDone: false,
	retweetError: null,
	loadAPostLoading: false,
	loadAPostDone: false,
	loadAPostError: null,
};
// export const generateDummyPost = num =>
// 	Array(num)
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
// 		}));
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
				draftState.imagePaths = [];
				break;
			case ADD_POST_FAILURE:
				draftState.addPostError = action.data;
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
				console.log('idx', idx);
				console.log(action.data);
				draftState.mainPosts[idx].Comments.unshift(
					action.data,
					// dummyComment(action.data.content),
				);
				draftState.addCommentLoading = false;
				draftState.addCommentDone = true;
				break;
			}
			case ADD_COMMENT_FAILURE:
				draftState.addCommentError = action.data;
				break;
			case REMOVE_POST_REQUEST:
				draftState.removePostLoading = true;
				draftState.removePostDone = false;
				break;
			case REMOVE_POST_SUCCESS:
				draftState.removePostLoading = false;
				draftState.removePostDone = true;
				draftState.mainPosts = draftState.mainPosts.filter(
					item => item.id !== action.data.PostId,
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
				console.log(action.data);
				draftState.mainPosts = draftState.mainPosts.concat(action.data);
				draftState.hasMorePosts = action.data.length === 10;
				break;
			case LOAD_POST_FAILURE:
				draftState.loadPostError = action.data;
				break;
			// 좋아요 버튼
			case LIKE_POST_REQUEST:
				draftState.likePostLoading = true;
				draftState.likePostDone = false;
				break;
			case LIKE_POST_SUCCESS: {
				const idx = draftState.mainPosts.findIndex(
					item => item.id === action.data.PostId,
				);
				draftState.mainPosts[idx].Likers.push({ id: action.data.UserId });
				draftState.likePostLoading = false;
				draftState.likePostDone = true;
				break;
			}
			case LIKE_POST_FAILURE:
				draftState.likePostError = action.data;
				break;
			// 좋아요 버튼 취소
			case UNLIKE_POST_REQUEST:
				draftState.unlikePostLoading = true;
				draftState.unlikePostDone = false;
				break;

			case UNLIKE_POST_SUCCESS: {
				// draftState.mainPosts.unshift(dummyPost(action.data));
				const idx = draftState.mainPosts.findIndex(
					item => item.id === action.data.PostId,
				);
				const userIdx = draftState.mainPosts[idx].Likers.findIndex(
					user => user.id === action.data.UserId,
				);

				draftState.mainPosts[idx].Likers.splice(userIdx, 1);

				draftState.unlikePostLoading = false;
				draftState.unlikePostDone = true;
				break;
			}
			case UNLIKE_POST_FAILURE:
				draftState.unlikePostError = action.data;
				break;
			// 이미지 업로드
			case UPLOAD_IMAGES_REQUEST:
				draftState.uploadImagesLoading = true;
				draftState.uploadImagesDone = false;
				break;

			case UPLOAD_IMAGES_SUCCESS:
				draftState.imagePaths = action.data;
				draftState.uploadImagesLoading = false;
				draftState.uploadImagesDone = true;
				break;
			case UPLOAD_IMAGES_FAILURE:
				draftState.uploadImagesLoading = false;
				draftState.uploadImagesError = action.data;
				break;
			case REMOVE_IMAGE:
				console.log(action.data);
				draftState.imagePaths.splice(action.data, 1);
				break;
			case RETWEET_REQUEST:
				draftState.retweetLoading = true;
				draftState.retweetDone = false;
				break;

			case RETWEET_SUCCESS:
				// draftState.mainPosts.unshift(dummyPost(action.data));
				draftState.mainPosts.unshift(action.data);
				draftState.retweetLoading = false;
				draftState.retweetDone = true;
				break;
			case RETWEET_FAILURE:
				console.log(action.data);
				draftState.retweetError = action.data;
				break;
			case LOAD_A_POST_REQUEST:
				draftState.loadAPostLoading = true;
				draftState.loadAPostDone = false;
				break;

			case LOAD_A_POST_SUCCESS:
				console.log('success', action.data);
				draftState.loadAPostLoading = false;
				draftState.loadAPostDone = true;
				draftState.singlePost = action.data;
				break;
			case LOAD_A_POST_FAILURE:
				console.log('failure', action.data);
				draftState.loadAPostError = action.data;
				break;
			default:
				break;
		}
	});
};

export default reducer;
