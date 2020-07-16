import React, { useState } from 'react';
import propTypes from 'prop-types';
import Slider from 'react-slick';
import styled from 'styled-components';
import { CloseCircleOutlined } from '@ant-design/icons';
const Container = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color: #364f6b;
	z-index: 10;
`;
const Header = styled.header`
	position: relative;
`;
const CloseBtn = styled(CloseCircleOutlined)`
	position: absolute;
	font-size: 40px;
	left: 30px;
	top: 30px;
	z-index: 15;
`;
const ImageContainer = styled.div`
	position: relative;
`;
// 	width: 100%;
// 	height: 100%;
// 	position: absolute;
// 	background-image: url(${props => props.src});
// 	background-size: cover;
// 	filter: blur(5px);
// 	z-index: 50;
// `;
const ForeGroundImage = styled.img`
	/* position: absolute; */
	/* z-index: 100; */
	margin: auto;
`;
const ZoomImage = ({ images, onClose }) => {
	const [config, setConfig] = useState({
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
	return (
		<Container>
			<Header>
				<CloseBtn onClick={onClose} />
			</Header>
			<Slider {...config}>
				<ImageContainer>
					<ForeGroundImage src={images[0].src} alt="" />
				</ImageContainer>
				<ImageContainer>
					<ForeGroundImage src={images[1].src} alt="" />
				</ImageContainer>
				<ImageContainer>
					<ForeGroundImage src={images[2].src} alt="" />
				</ImageContainer>
				{/* {images.map((image, index) => (
					<div key={index}>
						<img src={image.src}></img>
					</div>
				))} */}
			</Slider>
		</Container>
	);
};
ZoomImage.propTypes = {
	images: propTypes.array,
	onClose: propTypes.func,
};
export default ZoomImage;
