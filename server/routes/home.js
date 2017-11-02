'use strict';

const express = require('express'),
  router = express.Router();

router.get('/',  (req, res) => {
  res.render('home', {
    title: 'HOME',
    isDev: req.app.locals.isDev
  });
});

module.exports = router;
