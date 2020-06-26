import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid gray;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 20px 0px;
  
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`


const Section = ({title, children}) => (
  <Container>
    <Title>{title}</Title>
    <Grid>
      {children}
    </Grid>
  </Container>
)

export default Section;