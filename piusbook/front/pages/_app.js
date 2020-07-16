import React from 'react';
import 'antd/dist/antd.css';
import '../css/reset.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';
const App = ({ Component }) => <Component></Component>;

export default wrapper.withRedux(withReduxSaga(App));
