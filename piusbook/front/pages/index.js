import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST, LOAD_MY_INFO_REQUEST } from '../actions';
const Home = () => {
	const { me } = useSelector(state => state.user);
	const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
		state => state.post,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: LOAD_POST_REQUEST,
		});
	}, []);
	useEffect(() => {
		dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
	}, []);
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
				dispatch({
					type: LOAD_POST_REQUEST,
				});
			}
		}
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [hasMorePosts, loadPostLoading]);
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
