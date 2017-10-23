import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import gifshot from 'gifshot';

import styles from './photobooth.css';
import cn from '../../utils/classname';

class PhotoBooth extends React.Component {
  
  constructor(props) {
    super(props);
  }

  recordGif(e){
    e.preventDefault();

    const downloadAttrSupported = ('download' in document.createElement('a'));
    const gifshotImagePreview = document.querySelector('.photobooth-imagePreview');
    const progressBar = document.querySelector('.photobooth-progressBar');
    const saveGIFButton = document.querySelector('#save-gif');


    gifshot.createGIF({
      progressCallback: function (captureProgress) {
        gifshotImagePreview.innerHTML = '';
        progressBar.classList.remove('hidden');
        progressBar.value = captureProgress;
      }
    }, function(obj) {
      if (!obj.error) {
        const image = obj.image,
          animatedImage = document.createElement('img');
        
        animatedImage.src = image;

        progressBar.classList.add('hidden');
        progressBar.value = 0;

        gifshotImagePreview.innerHTML = '';
        gifshotImagePreview.appendChild(animatedImage);

        if (downloadAttrSupported) {
          saveGIFButton.setAttribute('href', image);
          saveGIFButton.classList.remove('hidden');
        }

        const formData = new FormData();
        formData.append('data', image);
        
        fetch('php/saveGif.php', { method: 'POST', body: formData })
          .then(function (response) {
            return response.text();
          })
          .then(function (body) {
            alert(body);
          });
      }
    });

  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={'SlideOut'}
      >
        <div className={cn(styles.container)}>
          <p className={cn(styles.text)}>PhotoBooth</p>
          <div className={cn(styles.imagePreview)}></div>
          <a href="#" onClick={(e) => this.recordGif(e)} type="button" id="create-gif" role="button">Create GIF</a>
          <a href="#" className="hidden" type="button" id="save-gif" role="button" download="demo.gif">Save GIF</a>
          <progress max="1" value="0" className={cn(styles.progressBar) + ' hidden'}></progress>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default PhotoBooth;
