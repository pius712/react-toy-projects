import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from '../actions';
import propTypes from 'prop-types';
const FollowButton = ({ post }) => {
	const { me } = useSelector(state => state.user);
	const isFollowing =
		me && me.Followings.find(following => following.id === post.User.id);
	const dispatch = useDispatch();
	// console.log('followbutton', post.User);
	const onClickFollow = useCallback(() => {
		if (isFollowing) {
			dispatch({
				type: UNFOLLOW_REQUEST,
				data: {
					UserId: post.User.id,
				},
			});
		} else {
			dispatch({
				type: FOLLOW_REQUEST,
				data: {
					UserId: post.User.id,
				},
			});
		}
	}, [dispatch, isFollowing, post]);
	return (
		<button onClick={onClickFollow}>
			{isFollowing ? '팔로우 끊기' : '팔로우'}
		</button>
	);
};
FollowButton.propTypes = {
	post: propTypes.object,
};
export default FollowButton;
