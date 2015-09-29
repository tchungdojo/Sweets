var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './client/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({storage: storage});








require('./config/mongoose.js');
require('./config/routes.js')(app, upload);

app.listen(8888, function(){
	console.log('we are listening on port 8888');
})