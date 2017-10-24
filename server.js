import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8888;

//Log with Morgan
app.use(morgan('dev'));

//accept encoded data as well as json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static files
app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function(err) {
  if (err) { 
    console.error(err);
  }    else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', port, port);
  }
});
