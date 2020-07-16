import React, { useState, useEffect } from 'react';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import Router from 'next/router';
const Profile = () => {
	const { me } = useSelector(state => state.user);

	useEffect(() => {
		if (!me) {
			Router.push('/');
		}
	}, [me]);
	if (!me) {
		return null;
	}
	return (
		<AppLayout>
			<NicknameEditForm></NicknameEditForm>
			<FollowList header="팔로잉" data={me.Followings}></FollowList>
			<FollowList header="팔로워" data={me.Followers}></FollowList>
		</AppLayout>
	);
};

export default Profile;
