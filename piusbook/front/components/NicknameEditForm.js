import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { EDIT_NICKNAME_REQUEST } from '../actions';
const EditFormContainer = styled.div``;
const EditInput = styled.input``;
const EditButton = styled.button``;

const NicknameEditForm = () => {
	const dispatch = useDispatch();
	const [nickname, onChangeNickname] = useInput('');
	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			dispatch({
				type: EDIT_NICKNAME_REQUEST,
				data: {
					nickname,
				},
			});
		},
		[nickname],
	);
	return (
		<EditFormContainer>
			<form onSubmit={handleSubmit}>
				<label>닉네임 수정</label>
				<EditInput value={nickname} onChange={onChangeNickname}></EditInput>
				<EditButton type="submit">수정</EditButton>
			</form>
		</EditFormContainer>
	);
};

export default NicknameEditForm;
