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
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);
	return (
		<div>
			<Header>
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
				<Col xs={6}>
					{isLoggedIn ? <UserProfile></UserProfile> : <LoginForm></LoginForm>}
				</Col>
				<Col xs={12}>중간 {children}</Col>
				<Col xs={6}>오른쪽</Col>
			</Row>
		</div>
	);
};

AppLayout.propTypes = {
	children: propTypes.node.isRequired,
};
export default AppLayout;
