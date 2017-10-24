import { createActions } from 'redux-actions';

const types = {
  CREATE_GIF: 'CREATE_GIF',
};

const actions = createActions(
  ...Object.keys(types).map(type => types[type])
);

export default actions;
export { types };
