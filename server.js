// var io = require('socket.io'),
// var connect = require('connect');
// var app = connect().use(connect.static('public')).listen(8082);

var express  = require('express');
var app = express();
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var gcal     = require('google-calendar');
var path     = require('path');

var config = require('./config.js');
var models    = require('./models.js');

app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
});
// app.listen(8082);
var server = app.listen(8082, function() {
    console.log('Listening on port %d', server.address().port);
});

passport.use(new GoogleStrategy({
    clientID: config.consumer_key,
    clientSecret: config.consumer_secret,
    callbackURL: "http://localhost:8082/auth/callback",
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'] 
  },

  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    console.log('Now Check User');
    models.User.findOne({
        user_id: profile.id
    }, function(err, user) {
        if (err) {
            console.log('user is alredy registered and error!');
            return done(err);
        }
        if (!user) {
            console.log('user is created!');
            models.newUser(profile);
            return done(null, profile);
        } else {
            console.log('user is alredy registered!');
            return done(null, profile);
            //return done(err, user);
        }
    });
  }
  
  /*function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    return done(null, profile);
  }*/

));

function checkAuth(req, res, next) {
    console.log("now check auth!");
    console.log(!req.session.access_token);
  if (!req.session.access_token) {
    return res.redirect('/auth');
  } else {
    next();
  }
}


app.get('/auth',
  passport.authenticate('google', { session: false }));

app.get('/auth/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  function(req, res) { 
    req.session.access_token = req.user.accessToken;
    console.log("app get auth call back");
    console.log(!req.session.access_token);
    res.redirect('/');
});

app.all('/', checkAuth,  function(req, res){
  //if(!req.session.access_token) return res.redirect('/auth');
  
  app.use(express.static(path.join(__dirname, '/public')));
  res.sendfile('public/index.html');
});


app.get('/api/calendarList', function(req, res){

  //Create an instance from accessToken
  var accessToken = req.session.access_token;

  gcal(accessToken).calendarList.list(function(err, data) {
    if(err) return res.send(500,err);
    console.log('api send calendarList');
    console.log(data);
    res.send(data);
  });

});








