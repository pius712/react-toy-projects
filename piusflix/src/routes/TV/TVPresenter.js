import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'components/Section.js';
import Card from 'components/Card.js';
import Loader from 'components/common/Loader.js';
import Error from 'components/common/Error.js';
const Container = styled.div``;

const TVPresenter = ({ popular, onAir, error, isLoading }) => {
	console.log('popular', popular);

	return isLoading ? (
		<Loader></Loader>
	) : (
		<Container>
			{popular && popular.length > 0 && (
				<Section title="Popular">
					{popular.map(item => (
						<Card
							key={item.id}
							id={item.id}
							title={item.name}
							year={new Date(item.first_air_date).getFullYear()}
							poster_path={item.poster_path}
							isMovie={false}
						></Card>
					))}
					)
				</Section>
			)}
			{onAir && onAir.length > 0 && (
				<Section title="On Air">
					{onAir.map(item => (
						<Card
							key={item.id}
							id={item.id}
							title={item.name}
							year={new Date(item.first_air_date).getFullYear()}
							poster_path={item.poster_path}
							isMovie={false}
						></Card>
					))}
					)
				</Section>
			)}
			{error && <Error message={error}></Error>}
		</Container>
	);
};

TVPresenter.propTypes = {
	popular: propTypes.array,
	onAir: propTypes.array,
	error: propTypes.string,
	loading: propTypes.bool,
};
export default TVPresenter;
