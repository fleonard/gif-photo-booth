'use strict';

const express = require('express'),
  fse = require('fs-extra'),
  router = express.Router();

router.post('/saveGif', (req, res) => {

  const img = req.body.data;
  const ext = img.split(';')[0].match(/jpeg|png|gif/)[0];
  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = new Buffer(data, 'base64');
  const timestamp = new Date().getTime().toString();
  const filename = 'gif_' + timestamp;

  fse.outputFile('./public/assets/gifs/' + filename + '.' + ext, buf, (err) => {
      console.log(err);
  });

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: 'Gif Saved!' }, null, 3));
});

module.exports = router;
