import GifView from './gifview.component';
import { connect } from 'react-redux';

import actions from '../../actions';

function mapStateToProps (state) {
  const { gifs } = state.ui;
  
  return {
    gifs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInit() {
      dispatch(actions.getGifs());
    }
  };
}

const GifViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GifView);

export default GifViewContainer;
