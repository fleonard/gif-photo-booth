'use strict';

const express = require('express'),
  router = express.Router();

/* GET Sub sectoin ATOMS page. */
router.get('/',  (req, res) => {
  res.render('home', {
    title: 'HOME',
    isDev: req.app.locals.isDev
  });
});

module.exports = router;
