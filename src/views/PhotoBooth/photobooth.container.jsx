import Photobooth from './photobooth.component';
import { connect } from 'react-redux';

import actions from '../../actions';

function mapStateToProps () {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onCreateGif() {
      dispatch(actions.createGif());
    }
  };
}

const PhotoboothContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Photobooth);

export default PhotoboothContainer;
