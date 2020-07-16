import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Popover, Button, List, Comment, Avatar } from 'antd';
import {
	RetweetOutlined,
	HeartOutlined,
	HeartFilled,
	MessageOutlined,
	EllipsisOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import PostImages from './PostImages';
import FollowButton from './FollowButton';
import { removePostRequest } from '../reducer/post';

const PostCardWrapper = styled.div`
	margin: 10px 5px;
`;
const Content = styled.div``;
const Image = styled.img``;
const PostCard = ({ post }) => {
	const dispatch = useDispatch();
	const me = useSelector(state => state.user.me);
	const id = me && me.id;
	const [liked, setLiked] = useState(false);
	const [commentFormOpend, setCommentFormOpend] = useState(false);
	const onToggleLike = useCallback(() => {
		setLiked(prev => !prev);
	}, [liked, setLiked]);

	const onToggleComment = useCallback(() => {
		setCommentFormOpend(prev => !prev);
	}, [setCommentFormOpend]);
	const onDeletePost = useCallback(() => {
		dispatch(removePostRequest(post.id));
	}, [dispatch, post]);
	return (
		<div>
			<Card
				cover={post.Images && <PostImages images={post.Images}></PostImages>}
				actions={[
					<RetweetOutlined key="retweet" />,
					liked ? (
						<HeartFilled key="heart-filled" onClick={onToggleLike} />
					) : (
						<HeartOutlined key="heart" onClick={onToggleLike} />
					),

					<MessageOutlined key="message" onClick={onToggleComment} />,
					<Popover
						key="ellipsis"
						content={
							<Button.Group>
								{id && post.User.id === id ? (
									<>
										<Button>수정</Button>
										<Button onClick={onDeletePost}>삭제</Button>
									</>
								) : (
									<Button>신고</Button>
								)}
							</Button.Group>
						}
					>
						<EllipsisOutlined key="ellipsis" />
					</Popover>,
				]}
				extra={me && <FollowButton post={post}>팔로우</FollowButton>}
			>
				<Card.Meta
					avatar={post.User.nickname[0]}
					title={post.User.nickname}
					description={
						<PostCardContent postData={post.content}></PostCardContent>
					}
				></Card.Meta>
			</Card>
			{commentFormOpend && (
				<div>
					<CommentForm post={post} />
					<List
						header={`${post.Comments.length}개의 댓글이 있습니다.`}
						dataSource={post.Comments}
						renderItem={item => (
							<li>
								<Comment
									avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
									author={item.User.nickname}
									content={item.content}
								/>
							</li>
						)}
					/>
				</div>
			)}
		</div>
	);
};
PostCard.propTypes = {
	post: propTypes.object,
};
export default PostCard;
