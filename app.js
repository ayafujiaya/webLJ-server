
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

var RedisStore = require('connect-redis')(express);
var TWITTER_CONSUMER_KEY = process.env.NODE_C_KEY;
var TWITTER_CONSUMER_SECRET = process.env.NODE_C_SECRET;
var userId = "";
var preData = "";

console.log(process.env);

// Passport sessionのセットアップ
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// PassportでTwitterStrategyを使うための設定
passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://web-lj.ayafuji.com/auth/twitter/callback"
}, 
function(token, tokenSecret, profile, done) {
    profile.twitter_token = token;
    profile.twitter_token_secret = tokenSecret;
    console.log(profile.id + " : logined");
    userId = profile.id;

    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
  // ここから追加
app.use(express.cookieParser()); 
app.use(express.session({
    secret: "hogehoge",
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}, // 1week
    store: new RedisStore({db: 1, prefix: 'session:'})
}));
app.use(passport.initialize()); 
app.use(passport.session()); 

// ここまで追加
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var login_check = function(req, res, next){
    if(req.user){
        next();
    }else{
	res.render('index', {error: '再度、ログインして下さい。'});
    }
}

app.get('/', login_check, function(req,res){
    
    passport._strategies.twitter._oauth.getProtectedResource(
        'https://api.twitter.com/1.1/statuses/user_timeline.json',
        'GET',
	req.user.twitter_token,
	req.user.twitter_token_secret,
	function (err, data, response) {

            var jsonObj = JSON.parse(data);
        // ユーザ名とツイート内容だけ抜き出す
            var result = [];
            for(i in jsonObj){
		//result.push(jsonObj[i].user.screen_name  + " : "+ jsonObj[i].user.profile_image_url);
            }
	    res.redirect("/user");
	});

});

app.get('/users', user.list);

app.get('/quadphase', login_check, function(req,res){
    passport._strategies.twitter._oauth.getProtectedResource(
        'https://api.twitter.com/1.1/statuses/user_timeline.json',
        'GET',
	req.user.twitter_token,
	req.user.twitter_token_secret,
	function (err, data, response) {
            if(err) {
		res.send('index', {error: '再度、ログインして下さい。'});
		//res.send(err, 500);
		//return;
            }
            var jsonObj = JSON.parse(data);
            var result = [];
            for(i in jsonObj){
		result.push(jsonObj[i].user.screen_name  + " : "+ jsonObj[i].user.profile_image_url);
            }
	    res.render('quadphase', { title: 'QUADPHASE', user_name: jsonObj[0].user.screen_name, user_img:jsonObj[0].user.profile_image_url});
	});
});

app.get('/green', login_check, function(req,res){
    passport._strategies.twitter._oauth.getProtectedResource(
        'https://api.twitter.com/1.1/statuses/user_timeline.json',
        'GET',
	req.user.twitter_token,
	req.user.twitter_token_secret,
	function (err, data, response) {
            if(err) {
		res.send('index', {error: '再度、ログインして下さい。'});
		//res.send(err, 500);
		//return;
            }
            var jsonObj = JSON.parse(data);
            var result = [];
            for(i in jsonObj){
		result.push(jsonObj[i].user.screen_name  + " : "+ jsonObj[i].user.profile_image_url);
            }
	    res.render('green', { title: 'GREEN', user_name: jsonObj[0].user.screen_name, user_img:jsonObj[0].user.profile_image_url});
	});
});

app.get('/led', login_check, function(req,res){
    passport._strategies.twitter._oauth.getProtectedResource(
        'https://api.twitter.com/1.1/statuses/user_timeline.json',
        'GET',
	req.user.twitter_token,
	req.user.twitter_token_secret,
	function (err, data, response) {
            if(err) {
		res.send('index', {error: '再度、ログインして下さい。'});
		//res.send(err, 500);
		//return;
            }
            var jsonObj = JSON.parse(data);
            var result = [];
            for(i in jsonObj){
		result.push(jsonObj[i].user.screen_name  + " : "+ jsonObj[i].user.profile_image_url);
            }
	    res.render('led', { title: 'LED', user_name: jsonObj[0].user.screen_name, user_img:jsonObj[0].user.profile_image_url});
	});
});



app.get('/strobo', login_check, function(req,res){
    passport._strategies.twitter._oauth.getProtectedResource(
        'https://api.twitter.com/1.1/statuses/user_timeline.json',
        'GET',
	req.user.twitter_token,
	req.user.twitter_token_secret,
	function (err, data, response) {
            if(err) {
		res.send('index', {error: '再度、ログインして下さい。'});
		//res.send(err, 500);
		return;
            }
            var jsonObj = JSON.parse(data);
            var result = [];
            for(i in jsonObj){
		result.push(jsonObj[i].user.screen_name  + " : "+ jsonObj[i].user.profile_image_url);
            }
	    res.render('strobo', { title: 'STROBO', user_name: jsonObj[0].user.screen_name, user_img:jsonObj[0].user.profile_image_url});
	});
});

app.get('/help', login_check, function(req,res){
    passport._strategies.twitter._oauth.getProtectedResource(
        'https://api.twitter.com/1.1/statuses/user_timeline.json',
        'GET',
	req.user.twitter_token,
	req.user.twitter_token_secret,
	function (err, data, response) {
            if(err) {
		res.send('index', {error: '再度、ログインして下さい。'});
		//res.send(err, 500);
		//return;
            }
            var jsonObj = JSON.parse(data);
            var result = [];
            for(i in jsonObj){
		result.push(jsonObj[i].user.screen_name  + " : "+ jsonObj[i].user.profile_image_url);
            }
	    res.render('help', { title: 'QUADPHASE', user_name: jsonObj[0].user.screen_name, user_img:jsonObj[0].user.profile_image_url});
	});
});


// Twitterの認証
app.get("/auth/twitter", passport.authenticate('twitter'));

// Twitterからのcallback
app.get("/auth/twitter/callback", passport.authenticate('twitter', {
  successRedirect: '/user',
  failureRedirect: '/login'
}));

app.get('/user', login_check, function(req,res){
  // search tweets.
    passport._strategies.twitter._oauth.getProtectedResource(
        'https://api.twitter.com/1.1/statuses/user_timeline.json',
        'GET',
	req.user.twitter_token,
	req.user.twitter_token_secret,
	function (err, data, response) {
            if(err) {
		res.send('index', {error: '再度、ログインして下さい。'});
		//res.send(err, 500);
		return;
            }

            var jsonObj = JSON.parse(data);
        // ユーザ名とツイート内容だけ抜き出す
            var result = [];
            for(i in jsonObj){
		result.push(jsonObj[i].user.screen_name  + " : "+ jsonObj[i].user.profile_image_url);
            }
            //res.send(result);
	    res.render('user', { title: 'Express', user_name: jsonObj[0].user.screen_name, user_img:jsonObj[0].user.profile_image_url});
	});
});

app.get('/logout', function (req, res) {
    console.log("/logout");
    req.session.destroy(function(){
	console.log("session destroyed.");
    });
    res.redirect('/');
});

/*******************************************************/

server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var socketIO = require('socket.io');
// クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
var io = socketIO.listen(server, {'log level':3});

// クライアントが接続してきたときの処理
io.sockets.on('connection', function(socket) {
	io.sockets.emit('message', { value: preData });    
    console.log("connection");

  // メッセージを受けたときの処理
    socket.on('message', function(data) {
    // つながっているクライアント全員に送信
	//console.log("message");
	io.sockets.emit('message', { value: data.value });
	preData = data.value;
    });

  // クライアントが切断したときの処理
    socket.on('disconnect', function(){
	console.log("disconnect");
    });
});
// add end
