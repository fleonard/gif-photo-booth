import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import sagas from '../sagas';

const applyDevTools = () => {
  const win = window;

  return win.__REDUX_DEVTOOLS_EXTENSION__
    ? win.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyDevTools(), applyMiddleware(sagaMiddleware));

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

sagaMiddleware.run(sagas);

export default store;
