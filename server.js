var express = require('express'),
    app = express(),
    request = require('request'),
    proxy = require('./proxy');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.cookieSession({secret: "lalala"}));
app.listen(process.env.PORT || 1235);

/* Routes */
console.log("Running");
app.get('/*', proxy.parse);