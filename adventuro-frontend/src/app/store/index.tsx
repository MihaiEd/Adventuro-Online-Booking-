import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from "redux-logger";
import {createPromise} from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import createRootReducer from '../reducers';

export const history = createBrowserHistory({basename: '/'});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStoreDevelopment = (preloadedState?: any) => {
	return createStore(
		createRootReducer(history),
		preloadedState,
		composeEnhancers(
			applyMiddleware(
				require('redux-immutable-state-invariant').default(),
				routerMiddleware(history),
				thunkMiddleware,
				createPromise({promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'ERROR']}),
				createLogger({
					collapsed: true,
				})
			)
		)
	);
};

const configureStoreProduction = (preloadedState?: any) => {
	return createStore(
		createRootReducer(history),
		preloadedState,
		applyMiddleware(
			routerMiddleware(history),
			thunkMiddleware,
			createPromise({promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'ERROR']}),
			createLogger({
				collapsed: true,
			})
		)
	);
};

const store = process.env.NODE_ENV === 'production'
	? configureStoreProduction
	: configureStoreDevelopment;
export default store;
