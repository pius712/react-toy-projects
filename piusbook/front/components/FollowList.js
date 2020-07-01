import React from 'react';

import styled from 'styled-components';
const List = styled.div`
	display: flex;
	flex-direction: column;
`;
const ListItem = styled.div`
	display: grid;
`;
const Item = styled.div``;
const Title = styled.div`
	text-align: center;
`;
const LoadMoreButton = styled.button``;

const FollowerList = ({ header, data }) => {
	return (
		<List>
			<Title>{header}</Title>
			<ListItem>
				{data ? data.map(data => <Item>{data.nickname}</Item>) : null}
			</ListItem>
			<LoadMoreButton>더보기</LoadMoreButton>
		</List>
	);
};

export default FollowerList;
