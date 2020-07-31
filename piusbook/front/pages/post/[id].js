import React from 'react';
import wrapper from '../../store/configureStore';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import {
	LOAD_A_POST_REQUEST,
	LOAD_MY_INFO_REQUEST,
	LOAD_USER_REQUEST,
} from '../../actions';
import PostCard from '../../components/PostCard';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../../components/AppLayout';
import { useRouter } from 'next/router';
const SinglePost = () => {
	const { singlePost } = useSelector(state => state.post);
	const router = useRouter();
	const id = router.query.id;
	return (
		<AppLayout>
			<Head>
				<title>
					{singlePost.User.nickname}
					님의 글
				</title>
				<meta name="description" content={singlePost.content} />
				<meta
					property="og:title"
					content={`${singlePost.User.nickname}님의 게시글`}
				/>
				<meta property="og:description" content={singlePost.content} />
				<meta
					property="og:image"
					content={
						singlePost.Images[0]
							? singlePost.Images[0].src
							: 'https://piusbook.com/favicon.ico'
					}
				/>
				<meta property="og:url" content={`https://piusbook.com/post/${id}`} />
			</Head>
			<PostCard post={singlePost}></PostCard>
		</AppLayout>
	);
};

export default SinglePost;

export const getServerSideProps = wrapper.getServerSideProps(async context => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});

	context.store.dispatch({
		type: LOAD_A_POST_REQUEST,
		data: {
			postId: context.params.id,
		},
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});
