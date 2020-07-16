import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducer/user.js';
const Form = styled.form`
	background-color: #fff;
	border-radius: 5px;
	border: 1px solid gray;
	padding: 3px;
`;
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
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { logInLoading, logInError } = useSelector(state => state.user);

	const handleChangeEmail = e => {
		setEmail(e.target.value);
	};
	const handleChangePassword = e => {
		setPassword(e.target.value);
	};
	const onSubmitForm = useCallback(
		e => {
			e.preventDefault();
			console.log(email, password);
			dispatch(loginRequestAction({ email, password }));
		},
		[email, password],
	);

	useEffect(() => {
		if (logInError) {
			alert(logInError);
		}
	}, [logInError]);

	return (
		<Form onSubmit={onSubmitForm}>
			<InputWrapper>
				<label htmlFor="user-id">email :</label>
				<input
					name="user-id"
					type="email"
					value={email}
					onChange={handleChangeEmail}
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
		</Form>
	);
};

export default LoginForm;
