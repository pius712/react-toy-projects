import React, { useState, useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
// import { ADD_COMMENT_REQUEST } from '../actions';
import { addCommentRequest } from '../reducer/post';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

const Form = styled.form`
	display: flex;
	margin: 5px 0;
`;
const TextArea = styled.textarea`
	/* width: 90%; */
	/* display: inline-block; */
	flex-basis: 85%;
	margin-right: 3px;
	border-radius: 5px;
`;
const Button = styled.button`
	/* display: inline-block; */
	flex-basis: 15%;
	text-align: center;
	/* padding: 10px 0px; */
	text-align: center;
	background-color: #5f0080;
	color: white;
	border-radius: 5px;
`;
const CommentForm = ({ post }) => {
	const [comment, onChangeComment, setComment] = useInput('');
	const me = useSelector(state => state.user.me);
	const id = me && me.id;
	const { addCommentDone } = useSelector(state => state.post);

	const dispatch = useDispatch();
	useEffect(() => {
		if (addCommentDone) {
			setComment('');
		}
	}, [addCommentDone]);
	const onSubmitComment = useCallback(
		e => {
			e.preventDefault();
			dispatch(
				addCommentRequest({
					content: comment,
					postId: post.id,
					userId: id,
				}),
			);
		},
		[comment, id, dispatch, post],
	);
	return (
		<Form onSubmit={onSubmitComment}>
			<TextArea rows="2" value={comment} onChange={onChangeComment}></TextArea>
			<Button>생성</Button>
		</Form>
	);
};

CommentForm.propTypes = {
	post: propTypes.object,
};
export default CommentForm;
