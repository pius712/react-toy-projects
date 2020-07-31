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
import {
	LIKE_POST_REQUEST,
	UNLIKE_POST_REQUEST,
	REMOVE_POST_REQUEST,
	RETWEET_REQUEST,
} from '../actions';
import Link from 'next/link';
const PostCardWrapper = styled.div`
	margin: 10px 5px;
`;
const Content = styled.div``;
const Image = styled.img``;
const PostCard = ({ post }) => {
	const dispatch = useDispatch();
	const me = useSelector(state => state.user.me);
	const id = me && me.id;
	const liked = post.Likers.find(liker => liker.id === id);
	// const [liked, setLiked] = useState(false);
	const [commentFormOpend, setCommentFormOpend] = useState(false);
	const onLike = useCallback(() => {
		// setLiked(true);
		dispatch({
			type: LIKE_POST_REQUEST,
			data: {
				postId: post.id,
			},
		});
	}, []);
	const onRetweet = useCallback(() => {
		if (!id) {
			return alert('로그인이 필요합니다.');
		} else {
			dispatch({
				type: RETWEET_REQUEST,
				data: {
					PostId: post.id,
				},
			});
		}
	}, [id]);
	const onUnlike = useCallback(() => {
		// setLiked(false);
		dispatch({
			type: UNLIKE_POST_REQUEST,
			data: {
				postId: post.id,
			},
		});
	}, []);
	const onToggleComment = useCallback(() => {
		setCommentFormOpend(prev => !prev);
	}, [setCommentFormOpend]);
	const onDeletePost = useCallback(() => {
		dispatch({
			type: REMOVE_POST_REQUEST,
			data: {
				PostId: post.id,
			},
		});
	}, [dispatch, post]);
	return (
		<div>
			<Card
				cover={post.Images && <PostImages images={post.Images}></PostImages>}
				actions={[
					<RetweetOutlined key="retweet" onClick={onRetweet} />,
					liked ? (
						<HeartFilled key="heart-filled" onClick={onUnlike} />
					) : (
						<HeartOutlined key="heart" onClick={onLike} />
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
				extra={
					me &&
					me.id !== post.User.id && (
						<FollowButton post={post}>팔로우</FollowButton>
					)
				}
			>
				{post.RetweetId && post.Retweet ? (
					<>
						<Card.Meta
							avatar={
								<Link href={`/user/${post.User.id}`}>
									<a>
										<Avatar>{post.User.nickname[0]}</Avatar>
									</a>
								</Link>
							}
							title={post.User.nickname}
							description={`${post.User.nickname}님이 리트윗하였습니다.`}
						></Card.Meta>
						<Card
							cover={
								post.Retweet.Images && (
									<PostImages images={post.Retweet.Images}></PostImages>
								)
							}
						>
							<Card.Meta
								avatar={post.Retweet.User.nickname[0]}
								title={post.Retweet.User.nickname}
								description={
									<PostCardContent
										postData={post.Retweet.content}
									></PostCardContent>
								}
							></Card.Meta>
						</Card>
					</>
				) : (
					<Card.Meta
						avatar={
							<Link href={`/user/${post.User.id}`}>
								<a>
									<Avatar>{post.User.nickname[0]}</Avatar>
								</a>
							</Link>
						}
						title={post.User.nickname}
						description={
							<PostCardContent postData={post.content}></PostCardContent>
						}
					></Card.Meta>
				)}
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
									avatar={<Avatar>{item.User.nickname}</Avatar>}
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
