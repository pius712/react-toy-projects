import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'components/common/Loader.js';
import Error from 'components/common/Error.js';
import Section from 'components/Section.js';
import Card from 'components/Card.js';
import Poster from 'components/Poster.js';
const Container = styled.div`
	padding: 0 20px;
`;
const Form = styled.form``;
const Input = styled.input`
	all: unset;
	font-size: 18px;
	width: 100%;
	/* overflow: visible; */
`;

const SearchPresenter = ({
	movieResults,
	tvResults,
	searchTitle,
	error,
	isLoading,
	handleSubmit,
	handleChange,
}) => {
	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Input
					placeholder="Search movies or tv show"
					value={searchTitle}
					onChange={handleChange}
				></Input>
			</Form>
			{isLoading ? (
				<Loader></Loader>
			) : (
				<>
					{movieResults && movieResults.length > 0 && (
						<Section title="영화 검색 결과">
							{movieResults.map(item => (
								<Card
									key={item.id}
									title={item.title}
									poster_path={item.poster_path}
								></Card>
							))}
						</Section>
					)}
					{tvResults && tvResults.length > 0 && (
						<Section title="tv 검색 결과">
							{tvResults.map(item => (
								<Card
									key={item.id}
									title={item.name}
									poster_path={item.poster_path}
								></Card>
							))}
						</Section>
					)}
					{error && <Error message={error}></Error>}
				</>
			)}
		</Container>
	);
};

SearchPresenter.propTypes = {
	movieResults: propTypes.array,
	tvResults: propTypes.array,
	error: propTypes.string,
	loading: propTypes.bool,
	handleSubmit: propTypes.func,
};
export default SearchPresenter;
