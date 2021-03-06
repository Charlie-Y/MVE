
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var https = require("https");
var path = require('path');
var handlebars = require('express3-handlebars');

var mongoose = require("mongoose");
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/test';
mongoose.connect(uristring);

mongoose.model('Video', require('./models/video').Video, "videos");
mongoose.model('VideoSigh', require('./models/videoSighs').VideoSigh, "videoSighs");
// mongoose.model('Setlist', require('./models/setlist').Setlist, "setlists");
var Video = mongoose.model('Video');
var VideoSigh = mongoose.model('VideoSigh');

var index = require('./routes/index');
var video = require('./routes/video');
// var videoSighs = require('./routes/videoSighs');

// var sandbox = require('./routes/sandbox');
// var playlist = require('./routes/playlist');
// var help = require('./routes/help');
// var create = require('./routes/create');
// var setlist = require('./routes/setlist');
// var createsetlist = require('./routes/createsetlist');
// var addtosetlist = require('./routes/addtosetlist');
// var editsetlist = require('./routes/editsetlist');
// var editvideo = require('./routes/editvideo');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({'defaultLayout':'main'}));
// app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('My secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.logger({
	format: ':method :status :url'
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/:id', index.view);


app.get('/video', video.watchVideo);
app.get('/sigh', video.videoSigh);
app.get('/sigh/:ytid', video.videoSigh);
app.get('/sigh/:ytid/:imgs', video.videoSigh);
app.get('/clear', video.devClear);









// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
