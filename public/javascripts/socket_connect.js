var socket = io.connect('ws://web-lj.ayafuji.com');
var sessionID;

socket.on('connect', function(msg) {
  //console.log("connet");
  document.getElementById("connectId").innerHTML = 
    "あなたの接続ID::" + socket.socket.transport.sessid;
    sessionID =  socket.socket.transport.sessid;
  document.getElementById("type").innerHTML = 
    "接続方式::" + socket.socket.transport.name;
});


var str = "";
// メッセージを受けたとき
socket.on('message', function(msg) {
  // メッセージを画面に表示する
  document.getElementById("receiveMsg").innerHTML = msg.value.uid + "さんがシェイクしています！";
});

// メッセージを送る
function SendMsg() {
  var msg = document.getElementById("message").value;
  // メッセージを発射する
  socket.emit('message', { value: msg });
}
// 切断する
function DisConnect() {
  var msg = socket.socket.transport.sessid + "は切断しました。";
  // メッセージを発射する
  socket.emit('message', { value: msg });
  // socketを切断する
  socket.disconnect();
}
