import React, { useState, useEffect } from 'react';

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
const Profile = () => {
	const dispatch = useDispatch();
	const { me } = useSelector(state => state.user);
	useEffect(() => {
		// dispatch({
		// 	type: LOAD_MY_INFO_REQUEST,
		// });
		if (!me) {
			Router.push('/');
		}
	}, [me]);

	useEffect(() => {
		dispatch({
			type: LOAD_FOLLOWERS_REQUEST,
		});
		dispatch({
			type: LOAD_FOLLOWINGS_REQUEST,
		});
	}, []);
	// useEffect(() => {
	// 	if (editNicknameDone) {
	// 		Router.push('/');
	// 	}
	// }, [editNicknameDone]);
	return (
		<AppLayout>
			<NicknameEditForm></NicknameEditForm>
			<FollowList header="팔로잉"></FollowList>
			<FollowList header="팔로워"></FollowList>
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
