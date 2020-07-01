import React from 'react';
import styled from 'styled-components';

const EditFormContainer = styled.div``;
const EditInput = styled.input``;
const EditButton = styled.button``;

const NicknameEditForm = () => {
	return (
		<EditFormContainer>
			<form>
				<labe>닉네임 수정</labe>
				<EditInput></EditInput>
				<EditButton>수정</EditButton>
			</form>
		</EditFormContainer>
	);
};

export default NicknameEditForm;
