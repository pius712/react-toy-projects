import React, { useState, useCallback, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST, LOAD_MY_INFO_REQUEST } from '../actions';
import Router from 'next/router';
import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
const SignupForm = styled.form`
	border: 1px solid gray;
`;

const ErrorLog = styled.div`
	color: red;
`;
const Signup = () => {
	const [email, onChangeEmail] = useInput('');
	const [nickname, onChangeNickname] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [termChecked, setTermChecked] = useState(false);

	const dispatch = useDispatch();
	const { signUpDone, signUpError, me } = useSelector(state => state.user);
	useEffect(() => {
		if (signUpDone) {
			Router.replace('/');
		}
	}, [signUpDone]);
	useEffect(() => {
		if (signUpError) {
			console.log(signUpError);
			alert(signUpError);
		}
	}, [signUpError]);
	useEffect(() => {
		if (me && me.id) {
			Router.replace('/');
			// 라우트 기록 자체가 대체되기 때문에, 뒤로가기로 못 돌아간다.
			// Push를 하면, 현재 페이지가 history에 남아서 뒤로가기 하면 돌아간다.
		}
	});
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
		console.log(e.target.checked);
		setTermChecked(e.target.checked);
	}, []);

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			if (password !== passwordCheck) {
				return setPasswordError(true);
			}
			if (!termChecked) {
				console.log('termChecked', termChecked);
				return setTermChecked(false);
			}
			dispatch({
				type: SIGN_UP_REQUEST,
				data: {
					email,
					password,
					nickname,
				},
			});
		},
		[password, passwordCheck, termChecked, dispatch, nickname, email],
	);
	return (
		<AppLayout>
			<SignupForm onSubmit={onSubmit}>
				<div>
					<label htmlFor="user-email">아이디</label>
					<input
						type="email"
						name="user-email"
						value={email}
						onChange={onChangeEmail}
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
				<button type="submit">회원가입</button>
			</SignupForm>
		</AppLayout>
	);
};

export default Signup;

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store, req }) => {
		const cookie = req ? req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}

		store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		store.dispatch(END);
		await store.sagaTask.toPromise();
	},
);
