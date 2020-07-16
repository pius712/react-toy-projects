import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addPostRequest } from '../reducer/post';
import useInput from '../hooks/useInput';
const Form = styled.form`
	margin: 20px 0;
	background-color: #fff;
`;
const TextArea = styled.textarea`
	display: block;
	width: 100%;
`;
const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 20px;
	margin: 10px 0;
`;

const ImageUploadButton = styled.button`
	padding: 10px 20px;
	display: inline-block;
	text-align: center;
`;
const SubmitButton = styled.button`
	display: inline-block;
	text-align: center;
	margin-left: auto;
	background-color: #5f0080;
	color: white;
	padding: 10px 20px;
`;
const Wrapper = styled.div`
	display: inline-block;
	width: 100%;
`;
const PostForm = () => {
	const dispatch = useDispatch();
	const [text, onChangeText, setText] = useInput('');
	const { addPostDone } = useSelector(state => state.post);
	useEffect(() => {
		if (addPostDone) {
			setText('');
		}
	}, [setText, addPostDone]);
	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			dispatch(addPostRequest({ content: text }));
		},
		[text, dispatch],
	);
	const openDialog = useCallback(() => {});
	return (
		<Form onSubmit={handleSubmit}>
			<TextArea type="textarea" row="4" value={text} onChange={onChangeText} />
			<Wrapper>
				<ButtonWrapper>
					<input id="inputButton" type="file" hidden />
					<ImageUploadButton onClick={openDialog}>
						이미지 업로드
					</ImageUploadButton>
					<SubmitButton type="submit">생성</SubmitButton>
				</ButtonWrapper>
			</Wrapper>
		</Form>
	);
};

export default PostForm;
