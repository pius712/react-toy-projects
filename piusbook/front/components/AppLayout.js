import React from 'react';
import propTypes from 'prop-types';

const AppLayout = ({children}) =>{
  return (
    <div>
      <div>공통메뉴</div>
      { children }
    </div>
  )
}

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
}
export default AppLayout;