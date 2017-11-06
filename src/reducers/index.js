import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { types } from '../actions';

const ui = handleActions(
  {
    [types.STORE_GIFS] (state, action) {
      return { ...state, gifs: action.payload };
    }
  },
  {
    gifs: []
  }
);

const reducers = combineReducers({
  ui
});

export default reducers;
