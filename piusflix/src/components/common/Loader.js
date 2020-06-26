import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100px;
  width: 100px;
  display:flex;
  justify-content: center;
  font-size: 40px;
`
const Loader = () => (
  <Container>
    <span>⏰</span>
  </Container>
)

export default Loader; 