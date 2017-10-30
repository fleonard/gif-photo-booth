import React from 'react';

import PropTypes from 'prop-types';

import styles from './photobooth.module.css';
import cn from '../../utils/classname';

class PhotoBooth extends React.Component {
  
  constructor(props) {
    super(props);
  }

  createGif(e) {
    e.preventDefault();
    return this.props.onCreateGif && this.props.onCreateGif();
  }

  render() {
    return (
      <div className={cn(styles.container)}>
        <p className={cn(styles.text)}>PhotoBooth</p>
        <div className={cn(styles.imagePreview)}></div>
        <a href="#" onClick={(e) => this.createGif(e)} type="button" id="create-gif" role="button">Create GIF</a>
        <a href="#" className="hidden" type="button" id="save-gif" role="button" download="demo.gif">Save GIF</a>
        <progress max="1" value="0" className={cn(styles.progressBar) + ' hidden'}></progress>
      </div>
    );
  }
}

PhotoBooth.propTypes = {
  onCreateGif: PropTypes.func
};

export default PhotoBooth;
