import React, { useCallback } from 'react';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../actions';
const List = styled.div`
	display: flex;
	flex-direction: column;
`;
const ListItem = styled.div`
	display: grid;
`;
const Item = styled.div``;
const Title = styled.div`
	text-align: center;
`;
const BlockButton = styled.button``;
const LoadMoreButton = styled.button``;

const FollowerList = ({ header, data, onClickMore, loading }) => {
	const dispatch = useDispatch();
	// swr 로 대체
	// const data = useSelector(state => {
	// 	if (header === '팔로잉') {
	// 		return state.user.me.Followings;
	// 	} else {
	// 		return state.user.me.Followers;
	// 	}
	// });
	const onBlock = useCallback(id => {
		if (header === '팔로잉') {
			dispatch({
				type: UNFOLLOW_REQUEST,
				data: {
					UserId: id,
				},
			});
		} else {
			dispatch({
				type: REMOVE_FOLLOWER_REQUEST,
				data: {
					UserId: id,
				},
			});
		}
	});
	return (
		<List>
			<Title>{header}</Title>
			<ListItem>
				{data
					? data.map(data => (
							<Item key={data.id}>
								{data.nickname}
								<BlockButton onClick={() => onBlock(data.id)}>차단</BlockButton>
							</Item>
					  ))
					: null}
			</ListItem>
			<LoadMoreButton onClick={onClickMore}>더보기</LoadMoreButton>
		</List>
	);
};

export default FollowerList;
