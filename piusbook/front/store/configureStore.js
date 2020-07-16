import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducer/index.js';
import rootSaga from '../sagas';

// preloadedState, { isServer, req = null }
const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [sagaMiddleware];

	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middleware))
			: composeWithDevTools(applyMiddleware(...middleware));

	const store = createStore(reducer, enhancer);
	// if (req || !isServer) {
	store.sagaTask = sagaMiddleware.run(rootSaga);
	// }
	return store;
};
const wrapper = createWrapper(configureStore, {
	debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
