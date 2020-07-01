import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'components/common/Loader.js';

const Container = styled.div`
	height: calc(100vh - 50px);
	width: 100%;
	position: relative;
	/* overflow: hidden; */
`;

const BackdropImage = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	filter: blur(3px);
	/* background-color: black; */
`;
const Content = styled.div`
	display: flex;
	height: 100%;
`;
const CoverImage = styled.div`
	flex-grow: 3;
`;

const Data = styled.div`
	flex-grow: 7;
`;
const Title = styled.div``;
const Overview = styled.div``;
const Divider = styled.span`
	margin: 0 5px;
`;

const DeatailPresenter = ({ result, error, isLoading }) =>
	isLoading ? (
		<Loader></Loader>
	) : (
		<Container>
			<BackdropImage></BackdropImage>
			<Content>
				<CoverImage></CoverImage>
				<Data>
					<Title>{result.title ? result.title : result.name}</Title>
					<Overview></Overview>
				</Data>
			</Content>
		</Container>
	);

DeatailPresenter.propTypes = {
	result: propTypes.object,
	error: propTypes.string,
	isLoading: propTypes.bool,
};
export default DeatailPresenter;
