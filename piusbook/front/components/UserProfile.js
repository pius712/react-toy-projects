import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducer/user.js';
const Card = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #5f0081;
	border-radius: 5px;
	padding: 5px;
	margin: 5px;
	background-color: #fff;
`;
const ProfileWrapper = styled.div`
	flex-grow: 2;
	flex-basis: 100px;
	display: flex;
	/* border-bottom: 1px solid gray; */
`;
const Avator = styled.div`
	flex-grow: 1;

	/* border-bottom: 1px solid gray; */
`;
const Profile = styled.div`
	flex-grow: 1;
`;
const NickName = styled.div``;

const ActionsItem = styled.button`
	color: #5f0081;
	background-color: #fff;
	flex-grow: 1;
	border-right: 1px solid #5f0081;
`;

const Actions = styled.div`
	display: flex;
	flex-grow: 1;
	flex-basis: 50px;
	border: 1px solid gray;
	& ${ActionsItem}:nth-child(3) {
		border: none;
	}
`;

const UserProfile = () => {
	const dispatch = useDispatch();

	const { me, logOutLoading } = useSelector(state => state.user);
	const logOut = useCallback(() => {
		dispatch(logoutRequestAction());
	}, []);
	return (
		<Card>
			<ProfileWrapper>
				<Avator>{me.nickname[0]}</Avator>
				<Profile>
					<NickName>{me.nickname}</NickName>
					<button onClick={logOut}>로그아웃</button>
				</Profile>
			</ProfileWrapper>
			<Actions>
				<ActionsItem>
					게시
					<br />
					{me.Posts.length}
				</ActionsItem>
				<ActionsItem>
					팔로워
					<br />
					{me.Followers.length}
				</ActionsItem>
				<ActionsItem>
					팔로잉
					<br />
					{me.Followings.length}
				</ActionsItem>
			</Actions>
		</Card>
	);
};

export default UserProfile;
