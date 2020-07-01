import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const Image = styled.img`
	width: 100px;
	height: 100px;
	overflow: hidden;
	border: 1px solid gray;
`;
const NotFoundImage = styled.div`
	width: 100px;
	height: 100px;
	font-size: 20px;
	border: 1px solid gray;
`;
const baseURL = 'https://image.tmdb.org/t/p/w500/';
const Poster = ({ poster_path }) => (
	<Container>
		{poster_path ? (
			<Image src={`${baseURL}${poster_path}`}></Image>
		) : (
			<NotFoundImage>이미지 준비중</NotFoundImage>
		)}
	</Container>
);

export default Poster;
