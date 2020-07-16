import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import ZoomImage from './ZoomImage';
const HalfImage = styled.img`
	height: 100%;
	width: 100%;
	/* display: inline; */
`;
const UpperImage = styled.img`
	width: 100%;
	height: 50%;
`;
const LowerImageContainer = styled.div`
	position: relative;
	/* display: inline-block; */
	width: 100%;
	height: 50%;
`;

const LowerImageBackground = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	background-image: url(${props => props.src});
	background-size: cover;
	filter: blur(1px);
`;
const LowerImageForeground = styled.div`
	position: absolute;
	top: 45%;
	/* text-align: center; */
	left: 35%;
	color: white;
`;
const ImageContainer = styled.div`
	display: flex;
`;
const LeftImageContainer = styled.div`
	flex-basis: 65%;
`;
const RightImageContainer = styled.div`
	flex-basis: 35%;
	display: flex;
	flex-direction: column;
`;
const PostImages = ({ images }) => {
	const [imageZoom, setImageZoom] = useState(false);
	const onClose = useCallback(() => {
		setImageZoom(false);
	}, []);
	const onZoomImage = useCallback(() => {
		setImageZoom(true);
	}, []);
	if (images.length === 0) {
		return <></>;
	}
	if (images.length === 1) {
		return (
			<>
				<img src={images[0].src} alt="" />
			</>
		);
	}
	if (images.length === 2) {
		return (
			<>
				<HalfImage src={images[0].src}></HalfImage>
				<HalfImage src={images[1].src}></HalfImage>
			</>
		);
	}

	return (
		<>
			<ImageContainer>
				<LeftImageContainer>
					<HalfImage src={images[0].src} alt="" onClick={onZoomImage} />
				</LeftImageContainer>
				<RightImageContainer>
					<UpperImage src={images[1].src} onClick={onZoomImage}></UpperImage>
					<LowerImageContainer>
						<LowerImageBackground
							src={images[2].src}
							onClick={onZoomImage}
						></LowerImageBackground>
						<LowerImageForeground>더보기</LowerImageForeground>
					</LowerImageContainer>
				</RightImageContainer>
			</ImageContainer>
			{imageZoom && <ZoomImage images={images} onClose={onClose}></ZoomImage>}
		</>
	);
};

PostImages.propTypes = {
	images: propTypes.array,
};

export default PostImages;
