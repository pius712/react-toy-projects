import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const DeatailPresenter = ({result, error,isLoading}) => (
  <div></div>
);

DeatailPresenter.propTypes = {
  result: propTypes.object , 
  error: propTypes.array, 
  loading: propTypes.bool
}
export default DeatailPresenter;