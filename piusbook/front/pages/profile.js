import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import Router from 'next/router';
import axios from 'axios';
import wrapper from '../store/configureStore';
import {
	LOAD_MY_INFO_REQUEST,
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWINGS_REQUEST,
} from '../actions';
const fetcher = url => {
	return axios.get(url, { withCredentials: true }).then(result => result.data);
};
const Profile = () => {
	const dispatch = useDispatch();
	const { me } = useSelector(state => state.user);
	const [followersLimit, setFollowersLimit] = useState(3);
	const [followingsLimit, setFollowingsLimit] = useState(3);
	const { data: followers, error: followersError } = useSWR(
		`http://localhost:8080/user/followers?limit=${followersLimit}`,
		fetcher,
	);
	const { data: followings, error: followingsError } = useSWR(
		`http://localhost:8080/user/followings?limit=${followingsLimit}`,
		fetcher,
	);
	useEffect(() => {
		// dispatch({
		// 	type: LOAD_MY_INFO_REQUEST,
		// });
		if (!me) {
			Router.push('/');
		}
	}, [me]);
	const loadMoreFollowings = useCallback(() => {
		setFollowingsLimit(prev => prev + 3);
	}, []);
	const loadMoreFollowers = useCallback(() => {
		setFollowersLimit(prev => prev + 3);
	}, []);
	if (!me) {
		return <div>내 정보 로딩중...</div>;
	}
	if (followersError || followingsError) {
		console.error(followersError || followingsError);
		return <div>팔로우 팔로잉 로딩 에러가 발생했습니다</div>;
	}
	// swr로 대체
	// useEffect(() => {
	// 	dispatch({
	// 		type: LOAD_FOLLOWERS_REQUEST,
	// 	});
	// 	dispatch({
	// 		type: LOAD_FOLLOWINGS_REQUEST,
	// 	});
	// }, []);
	// useEffect(() => {
	// 	if (editNicknameDone) {
	// 		Router.push('/');
	// 	}
	// }, [editNicknameDone]);
	return (
		<AppLayout>
			<NicknameEditForm></NicknameEditForm>
			<FollowList
				header="팔로잉"
				data={followings}
				onClickMore={loadMoreFollowings}
				loading={!followingsError && !followings}
			></FollowList>
			<FollowList
				header="팔로워"
				data={followers}
				onClickMore={loadMoreFollowers}
				loading={!followersError && !followers}
			></FollowList>
		</AppLayout>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req }) => {
		const cookie = req ? req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
export default Profile;
