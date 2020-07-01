import React from 'react';
import 'antd/dist/antd.css';
import '../css/reset.css';
import wrapper from '../store/configureStore';
const App = ({ Component }) => <Component></Component>;

export default wrapper.withRedux(App);
