import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const logger = createLogger();

const enhancers = [
  applyMiddleware(ReduxThunk, logger)
];

const Store = createStore(rootReducer, composeWithDevTools(...enhancers));

export default Store;
