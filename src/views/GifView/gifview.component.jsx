import React from 'react';

import PropTypes from 'prop-types';

import styles from './gifview.css';
import cn from '../../utils/classname';

class GifView extends React.Component {
  
  constructor(props) {
    super(props);
    props.onInit();
  }

  render() {
    return (
      <div>
        <p className={cn(styles.text)}>GifView</p>
        <img src={this.props.gifs[0]} />
      </div>
    );
  }
}

GifView.propTypes = {
  onInit: PropTypes.func,
  gifs: PropTypes.array
};

export default GifView;
