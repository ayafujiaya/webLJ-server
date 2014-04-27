var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
//app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/quadphase', function(req, res){
    res.render('quadphase', { title: 'kurukuru' });
});
app.get('/strobo', function(req, res){
    res.render('strobo', { title: 'strobo' });
});


server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var socketIO = require('socket.io');
// クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
var io = socketIO.listen(server, {'log level':3});

// クライアントが接続してきたときの処理
io.sockets.on('connection', function(socket) {
    
    console.log("connection");
  // メッセージを受けたときの処理
    socket.on('message', function(data) {
    // つながっているクライアント全員に送信
	//console.log("message");
	io.sockets.emit('message', { value: data.value });
    });

  // クライアントが切断したときの処理
    socket.on('disconnect', function(){
	console.log("disconnect");
    });
});
// add end