import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST, LOAD_MY_INFO_REQUEST } from '../actions';
import wrapper from '../store/configureStore';
import axios from 'axios';
const Home = () => {
	const { me } = useSelector(state => state.user);
	const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
		state => state.post,
	);
	const dispatch = useDispatch();

	/*
	아래의 부분은 서버 사이드 렌더링을 통해서 구현하는 것이 좋다. 
	useEffect(() => {
			dispatch({
				type: LOAD_POST_REQUEST,
				// data: {},
			});
	}, [hasMorePosts]);
	useEffect(() => {
		dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
	}, []);
	*/
	useEffect(() => {
		function onScroll() {
			// console.log(
			// 	window.scrollY,
			// 	document.documentElement.clientHeight,
			// 	document.documentElement.scrollHeight,
			// );
			// console.log(
			// 	window.scrollY + document.documentElement.clientHeight + 300 >
			// 		document.documentElement.scrollHeight,
			// );
			// console.log(hasMorePost);
			// console.log(
			// 	window.scrollY + document.documentElement.clientHeight + 300 >
			// 		document.documentElement.scrollHeight && hasMorePost,
			// );
			if (
				window.scrollY + document.documentElement.clientHeight + 300 >
					document.documentElement.scrollHeight &&
				hasMorePosts &&
				!loadPostLoading
			) {
				// 마지막 mainPosts의 id
				const lastId =
					mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id;
				console.log('lastId', lastId);
				dispatch({
					type: LOAD_POST_REQUEST,
					data: lastId,
				});
			}
		}
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [hasMorePosts, loadPostLoading, mainPosts]);
	return (
		<AppLayout>
			{me && <PostForm></PostForm>}
			{mainPosts.map((post, index) => (
				<PostCard key={post.id} post={post}></PostCard>
			))}
		</AppLayout>
	);
};
// AppLayout 안에 있는 것이 children이 되는 것.
export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req }) => {
		const cookie = req ? req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		store.dispatch({
			type: LOAD_POST_REQUEST,
		});
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
