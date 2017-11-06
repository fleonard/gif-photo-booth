'use strict';
/* eslint no-console:0 */
/* eslint no-magic-numbers:0 */

const express = require('express'),
  fse = require('fs-extra'),
  path = require('path'),
  router = express.Router();

/**
 * Save created gif in public/assets/gif
 */
router.post('/saveGif', (req, res) => {

  const img = req.body.data,
    ext = img.split(';')[0].match(/jpeg|png|gif/)[0],
    data = img.replace(/^data:image\/\w+;base64,/, ''),
    buf = new Buffer(data, 'base64'),
    timestamp = new Date().getTime().toString(),
    filename = 'gif_' + timestamp;

  fse.outputFile(path.join(__dirname, '../public/assets/gifs/') + filename + '.' + ext, buf, (err) => {
    console.log(err);
  });

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: 'Gif Saved!' }));
});

/**
 * Get all gifs from folder
 */
function getFiles(dir) {
  return fse.statSync(dir).isDirectory()
      ? Array.prototype.concat(...fse.readdirSync(dir).map(f => getFiles(path.join(dir, f))))
      : dir;
}

router.get('/getGifs', (req, res) => {

  const files = getFiles('./server/public/assets/gifs');

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: 'Here you go all the Gifs!', gifs: files }));
});

module.exports = router;
