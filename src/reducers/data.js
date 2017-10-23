import actions from '../actions';

const init = {

};

export default (state = init, action) => {
  
  switch (action.type) {
    case actions.LOAD_CARAVAN:
      console.log('load a caravan then');
      return state;

    default:
      return state;
  }
};
