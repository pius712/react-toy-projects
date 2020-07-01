import React, { useState, useCallback } from 'react';
import AppLayout from '../components/AppLayout';
import styled from 'styled-components';
import userInput from '../hooks/userInput';
const SignupForm = styled.form`
	border: 1px solid gray;
`;

const ErrorLog = styled.div`
	color: red;
`;
const Signup = () => {
	const [id, onChangeId] = userInput('');
	const [nickname, onChangeNickname] = userInput('');
	const [password, onChangePassword] = userInput('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [termChecked, setTermChecked] = useState(false);

	const onChangePasswordCheck = useCallback(
		e => {
			e.preventDefault();
			setPasswordCheck(e.target.value);
			console.log(e.target.value);
			console.log(password);
			setPasswordError(e.target.value !== password);
		},
		[password],
	);
	const onChangeTermChecked = useCallback(e => {
		setTermChecked(e.target.checked);
	}, []);
	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			if (password !== passwordCheck) {
				return setPasswordError(true);
			}
			if (!termChecked) {
				return setTermChecked(false);
			}
		},
		[password, passwordCheck],
	);
	return (
		<AppLayout>
			<SignupForm onSubmit={onSubmit}>
				<div>
					<label htmlFor="user-id">아이디</label>
					<input
						type="text"
						name="user-id"
						value={id}
						onChange={onChangeId}
					></input>
				</div>
				<div>
					<label htmlFor="user-nickname">닉네임</label>
					<input
						type="text"
						name="user-nickname"
						value={nickname}
						onChange={onChangeNickname}
					></input>
				</div>
				<div>
					<label htmlFor="user-password">비밀번호</label>
					<input
						type="password"
						name="user-password"
						value={password}
						onChange={onChangePassword}
					></input>
				</div>
				<div>
					<label htmlFor="user-passwordCheck">비밀번호</label>
					<input
						type="password"
						name="user-passwordCheck"
						value={passwordCheck}
						onChange={onChangePasswordCheck}
					></input>
				</div>
				{passwordError && <ErrorLog>비밀번호가 일치하지 않습니다.</ErrorLog>}
				<div>
					<input
						name="checkbox"
						type="checkbox"
						checked={termChecked}
						onChange={onChangeTermChecked}
					></input>
					<label htmlFor="checkbox">약관에 동의합니다.</label>
				</div>
				<button type="submit"></button>
			</SignupForm>
		</AppLayout>
	);
};

export default Signup;
