import { all, put, call, takeEvery, select } from 'redux-saga/effects';

import { types } from '../actions';

import gifshot from 'gifshot';


function* createGif() {
  yield takeEvery(types.CREATE_GIF, handleCreateGif);
}

function handleCreateGif() {
  const downloadAttrSupported = 'download' in document.createElement('a');
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

      fetch('api/saveGif', 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: image
          })
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.message);
        });
    }
  });
}

function* sagas() {
  yield all([
    createGif()
  ]);
}

export default sagas;
