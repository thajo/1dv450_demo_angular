var express = require('express');
var app = express();


  // static - all our js, css, images, etc go into the assets path
 // app.use('/assets', express.static('/assets'));

  app.use('/app', express.static(__dirname +'/app'));
//app.use('/partials', express.static(__dirname +'/app/partials'));
//app.use('/services', express.static(__dirname +'/services'));
//app.use('/partials', express.static(__dirname +'/'));

  app.use('/app', function(req, res, next) {
    res.sendStatus(404);
  });

  

  // This route deals enables HTML5Mode by forwarding missing files to the index.html
 app.get('/*', function(req, res) {
    console.log(req.url)
    //res.sendFile(__dirname + '/index.html');
  });


app.listen(3000);
console.log("Server listning in port 3000");