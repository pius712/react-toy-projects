import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const LogMsg = styled.div`
  color: red;
  font-weight: 600;
`
const Error = ({message}) => (
  <Container>
    <LogMsg>
      {message}
    </LogMsg>
  </Container>

)
export default Error;