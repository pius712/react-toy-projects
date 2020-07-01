import React, { useState } from 'react';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
const Profile = () => {
	const [followingList, setFollowingList] = useState([
		{
			nickname: '김',
		},
		{ nickname: '이' },
		{ nickname: '박' },
	]);
	const [followerList, setFollowerList] = useState([
		{
			nickname: '김',
		},
		{ nickname: '이' },
		{ nickname: '박' },
	]);
	return (
		<AppLayout>
			<NicknameEditForm></NicknameEditForm>
			<FollowList header="팔로잉" data={followingList}></FollowList>
			<FollowList header="팔로잉" data={followerList}></FollowList>
		</AppLayout>
	);
};

export default Profile;
