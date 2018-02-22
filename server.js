var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var configDB = require('./config/database.js');
var cmd = require('node-cmd');
var multer = require('multer');	

mongoose.connect(configDB.url);
app.set('view engine', 'ejs');



app.use(morgan('dev'));
app.use(bodyParser());
app.use(cookieParser());



cmd.get('python3 -m scripts.label_image \
    --graph=tf_files/retrained_graph.pb  \
    --image=x.png',
              function(data, err, stderr) {
                if (!err) {
                  console.log("data from python script " + data)
                } else {
                  console.log("python script cmd error: " + err)
                  }
                }
              );


require('./app/routes')(app);

var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "/best");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });

var upload = multer({
     storage: Storage
 }).array("imgUploader", 3);

 app.post("/api/Upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         return res.end("File uploaded sucessfully!.");
     });
 });

app.listen(8080);
console.log('server running on port 8080');
