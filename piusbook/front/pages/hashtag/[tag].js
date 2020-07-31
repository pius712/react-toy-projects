import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../../components/AppLayout';
import PostForm from '../../components/PostForm';
import PostCard from '../../components/PostCard';
import {
	LOAD_POST_REQUEST,
	LOAD_MY_INFO_REQUEST,
	LOAD_HASHTAG_POSTS_REQUEST,
} from '../../actions';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { useRouter } from 'next/router';
const Hashtag = () => {
	const { me } = useSelector(state => state.user);
	const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
		state => state.post,
	);
	const router = useRouter();
	const { tag } = router.query;
	const dispatch = useDispatch();
	useEffect(() => {
		function onScroll() {
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
					type: LOAD_HASHTAG_POSTS_REQUEST,
					data: tag,
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
export default Hashtag;

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req, params }) => {
		const cookie = req ? req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		store.dispatch({
			type: LOAD_HASHTAG_POSTS_REQUEST,
			data: params.tag,
		});
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
