import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Poster from 'components/Poster.js'
const Container = styled.div`
  display: flex;
  flex-basis: 100px;
  margin:10px;
  flex-direction: column;
`
const Title = styled.div`
`
const Year = styled.div`
`
const Card = ({ id, title, poster_path, year, isMovie=false }) => (
  <Link to={isMovie? `movie/${id}` : `tv/${id}`}>
    <Container>
      <Poster poster_path={poster_path}></Poster>
      <Title>{title}</Title>
      <Year>{year}</Year>
    </Container>
  </Link>
)

export default Card;