import React, { useState } from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile.js';
import LoginForm from './LoginForm.js';

const Header = styled.div`
	/* display: flex;
	justify-content: space-between;
	align-items: center; */
	margin-bottom: 15px;
`;
const Banner = styled.div`
	background-color: #5f0080;
	height: 42px;
	color: white;
	display: flex;
	justify-content: center;
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
	return (
		<div>
			<Header>
				<Banner>Piusbook</Banner>
				<UseMenu>
					<div>
						<Link href="/">
							<a>Piusbook</a>
						</Link>
					</div>
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
				<GlobalNavigationBar></GlobalNavigationBar>
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
