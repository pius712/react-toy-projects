import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {
	UPLOAD_IMAGES_REQUEST,
	REMOVE_IMAGE,
	ADD_POST_REQUEST,
} from '../actions/index';
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
const PreviewImage = styled.img`
	width: 200px;
`;
const PostForm = () => {
	const dispatch = useDispatch();
	const [text, onChangeText, setText] = useInput('');
	const { imagePaths, addPostDone } = useSelector(state => state.post);
	const imageInput = useRef(null);
	useEffect(() => {
		if (addPostDone) {
			setText('');
		}
	}, [setText, addPostDone]);

	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			if (text === '' || !text.trim()) {
				return;
			}
			dispatch({
				type: ADD_POST_REQUEST,
				data: {
					content: text,
					image: imagePaths,
				},
			});
		},
		[text, dispatch, imagePaths],
	);

	const onChangeImages = useCallback(e => {
		console.log('images', e.target.files);
		const imageFormData = new FormData();
		[].forEach.call(e.target.files, file => {
			imageFormData.append('image', file);
		});
		dispatch({
			type: UPLOAD_IMAGES_REQUEST,
			data: imageFormData,
		});
	});

	const openDialog = useCallback(e => {
		e.preventDefault();
		imageInput.current.click();
	});
	const onRemoveImage = useCallback(idx => {
		dispatch({
			type: REMOVE_IMAGE,
			data: idx,
		});
	});
	return (
		<Form onSubmit={handleSubmit}>
			<TextArea type="textarea" row="4" value={text} onChange={onChangeText} />
			<Wrapper>
				<ButtonWrapper>
					<input
						id="inputButton"
						name="image"
						ref={imageInput}
						type="file"
						onChange={onChangeImages}
						multiple
						hidden
					/>
					<ImageUploadButton onClick={openDialog}>
						이미지 업로드
					</ImageUploadButton>
					<SubmitButton type="submit">생성</SubmitButton>
				</ButtonWrapper>
			</Wrapper>
			<div>
				{imagePaths.map((image, idx) => (
					<div key={image}>
						<PreviewImage src={`http://localhost:8080/${image}`} />
						<button onClick={() => onRemoveImage(idx)}>X</button>
					</div>
				))}
			</div>
		</Form>
	);
};

export default PostForm;
