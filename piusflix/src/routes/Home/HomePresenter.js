import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'components/Section';
import Card from 'components/Card.js';
import Loader from 'components/common/Loader.js';
import Error from 'components/common/Error.js';
const Container = styled.div`
	padding: 0px 10px;
`;
// id, title, poster_path, year, isMovie
const HomePresenter = ({ popular, topRated, error, isLoading }) => {
	console.log('topRated', topRated);
	return isLoading ? (
		<Loader></Loader>
	) : (
		<Container>
			{topRated && topRated.length > 0 && (
				<Section title="Top Rated">
					{topRated.map(item => (
						<Card
							key={item.id}
							id={item.id}
							title={item.title}
							poster_path={item.poster_path}
							year={new Date(item.release_date).getFullYear()}
							isMovie={true}
						></Card>
					))}
				</Section>
			)}
			{popular && popular.length > 0 && (
				<Section title="Popular">
					{popular.map(item => (
						<Card
							key={item.id}
							id={item.id}
							title={item.title}
							poster_path={item.poster_path}
							year={new Date(item.release_date).getFullYear()}
							isMovie={true}
						></Card>
					))}
				</Section>
			)}
			{error && <Error message={error}></Error>}
		</Container>
	);
};

HomePresenter.propTypes = {
	popular: propTypes.array,
	onAir: propTypes.array,
	error: propTypes.string,
	isLoading: propTypes.bool,
};
export default HomePresenter;
