import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col, Input } from 'antd';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile.js';
import LoginForm from './LoginForm.js';
import useInput from '../hooks/useInput';
import Router from 'next/router';
const SearchInput = styled(Input.Search)`
	/* margin-right: auto; */
	width: 200px;
	margin-left: 20px;
`;
const Header = styled.div`
	/* display: flex;
	justify-content: space-between;
	align-items: center; */
	margin-bottom: 15px;
	height: 45px;
	border-bottom: 1px solid gray;
	background-color: #fff;
	padding: 5px;
`;
const Banner = styled.div`
	background-color: #5f0080;
	height: 42px;
	color: white;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
const UseMenu = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Logo = styled.div``;
const Navigation = styled.div`
	margin-left: auto;
`;
const GlobalNavigationBar = styled.div`
	display: flex;
`;
const Divider = styled.span`
	margin-left: 5px;
`;
const AppLayout = ({ children }) => {
	const { me } = useSelector(state => state.user);
	const [searchInput, onChangeSearchInput] = useInput('');

	const onSearch = useCallback(value => {
		Router.push(`/hashtag/${encodeURIComponent(value)}`);
	});
	return (
		<div>
			<Banner>Piusbook</Banner>
			<Header>
				<UseMenu>
					<div>
						<Link href="/">
							<a>Piusbook</a>
						</Link>
					</div>
					<SearchInput
						placeholder="해쉬태그 검색"
						onSearch={onSearch}
						value={searchInput}
						onChange={onChangeSearchInput}
					></SearchInput>
					<Navigation>
						<Link href="/profile">
							<a>프로필</a>
						</Link>
						<Divider></Divider>
						<Link href="signup">
							<a>회원가입</a>
						</Link>
					</Navigation>
				</UseMenu>
				<Logo></Logo>
				{/* <GlobalNavigationBar></GlobalNavigationBar> */}
			</Header>
			<Row>
				<Col xs={24} md={6}>
					{me ? <UserProfile></UserProfile> : <LoginForm></LoginForm>}
				</Col>
				<Col xs={24} md={12}>
					중간 {children}
				</Col>
				<Col xs={24} md={6}>
					Made by pius
				</Col>
			</Row>
		</div>
	);
};

AppLayout.propTypes = {
	children: propTypes.node.isRequired,
};
export default AppLayout;
