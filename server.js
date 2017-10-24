import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fs from 'fs-extra';

const app = express();
const port = process.env.PORT || 8888;

//Log with Morgan
app.use(morgan('dev'));

//accept encoded data as well as json format
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

//Static files
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//Routes for the api
const router = express.Router();  

router.use(function(req, res, next) {
    // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});

// saveGif
router.route('/saveGif')

    .post(function(req, res) {

      const img = req.body.data;
      const ext = img.split(';')[0].match(/jpeg|png|gif/)[0];
      const data = img.replace(/^data:image\/\w+;base64,/, '');
      const buf = new Buffer(data, 'base64');
      const timestamp = new Date().getTime().toString();
      const filename = 'gif_' + timestamp;

      fs.outputFile(__dirname + '/public/gifs/' + filename + '.' + ext, buf, (err) => {
          console.log(err);
      });

      res.json({ message: 'Gif Saved!' });

    });

app.use('/api', router);

app.listen(port, function(err) {
  if (err) { 
    console.error(err);
  }    else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', port, port);
  }
});
