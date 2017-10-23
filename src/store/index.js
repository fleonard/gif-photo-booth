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
store.subscribe(() => {
  //console.log('Store changed', store.getState());
});

sagaMiddleware.run(sagas);

export default store;
