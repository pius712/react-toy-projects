import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducer/user.js';
const InputWrapper = styled.div`
	margin-top: 10px;
`;
const ButtonWrapper = styled.div`
	border: none;
	display: flex;
`;

const LoginButton = styled.button`
	color: #fff;
	background-color: #5f0081;
	flex-grow: 1;
	text-align: center;
`;
const SignupButtonLink = styled.div`
	flex-grow: 1;
	text-align: center;
`;
const SignupButton = styled.button`
	color: #5f0081;
	background-color: #fff;
	text-align: center;
`;
const LoginForm = () => {
	const dispatch = useDispatch();
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');

	const handleChangeId = e => {
		setId(e.target.value);
	};
	const handleChangePassword = e => {
		setPassword(e.target.value);
	};

	const onSubmitForm = useCallback(
		e => {
			e.preventDefault();
			console.log(id, password);
			dispatch(loginAction({ id, password }));
		},
		[id, password],
	);

	return (
		<form onSubmit={onSubmitForm}>
			<InputWrapper>
				<label htmlFor="user-id">id :</label>
				<input
					name="user-id"
					type="text"
					value={id}
					onChange={handleChangeId}
				></input>
			</InputWrapper>
			<InputWrapper>
				<label htmlFor="user-password">password: </label>
				<input
					name="user-password"
					type="password"
					value={password}
					onChange={handleChangePassword}
				></input>
			</InputWrapper>
			<ButtonWrapper>
				<LoginButton type="submit">로그인</LoginButton>
				<SignupButtonLink href="/signup">
					<Link href="/signup">
						<a>
							<SignupButton>회원가입</SignupButton>
						</a>
					</Link>
				</SignupButtonLink>
			</ButtonWrapper>
		</form>
	);
};

export default LoginForm;
