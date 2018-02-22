var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var configDB = require('./config/database.js');
var cmd = require('node-cmd');

mongoose.connect(configDB.url);
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser());
app.use(cookieParser());

cmd.run('cd best');

/*cmd.get('python3 -m scripts.label_image \
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
*/

require('./app/routes')(app);

app.listen(8080);
console.log('server running on port 8080');