import React, { useEffect } from 'react';
import wrapper from '../../store/configureStore';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar } from 'antd';
import {
	LOAD_A_POST_REQUEST,
	LOAD_MY_INFO_REQUEST,
	LOAD_USER_POSTS_REQUEST,
	LOAD_USER_REQUEST,
} from '../../actions';
import PostCard from '../../components/PostCard';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../../components/AppLayout';
import { useRouter } from 'next/dist/client/router';
const User = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);
	const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
		state => state.post,
	);
	const router = useRouter();
	const id = router.query.id;

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
					type: LOAD_USER_POSTS_REQUEST,
					lastId:
						mainPosts[mainPosts.length - 1] &&
						mainPosts[mainPosts.length - 1].id,
					data: id,
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
			<Head>
				<title>
					{userInfo.nickname}
					님의 글
				</title>
				<meta name="description" content={`${userInfo.nickname}님의 게시글`} />
				<meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
				<meta
					property="og:description"
					content={`${userInfo.nickname}님의 게시글`}
				/>
				<meta property="og:image" content="https://nodebird.com/favicon.ico" />
				<meta property="og:url" content={`https://nodebird.com/user/${id}`} />
			</Head>
			{userInfo ? (
				<Card
					actions={[
						<div key="twit">
							짹짹
							<br />
							{userInfo.Posts}
						</div>,
						<div key="following">
							팔로잉
							<br />
							{userInfo.Followings}
						</div>,
						<div key="follower">
							팔로워
							<br />
							{userInfo.Followers}
						</div>,
					]}
				>
					<Card.Meta
						avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
						title={userInfo.nickname}
					/>
				</Card>
			) : null}
			{mainPosts.map(c => (
				<PostCard key={c.id} post={c} />
			))}
		</AppLayout>
	);
};

export default User;

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req, params }) => {
		const cookie = req ? req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		store.dispatch({
			type: LOAD_USER_POSTS_REQUEST,
			data: params.id,
		});
		store.dispatch({
			type: LOAD_USER_REQUEST,
			data: params.id,
		});
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
