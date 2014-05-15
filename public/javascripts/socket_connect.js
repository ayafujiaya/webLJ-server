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
    
    var parser = document.createElement('a');
    parser.href = location.href;
    //alert(parser.pathname);

    switch (parser.pathname) {
    case '/strobo':
	if(msg.value.deviceID == 'strobo_1') {
  document.getElementById("receiveMsg").innerHTML = "NOW ON STAGE  <a class='who_shake' target='_blank' href='https://twitter.com/" + msg.value.twitterID + "'>@" + msg.value.twitterID + "</a> ";
    var url_back = "url(" + msg.value.user_image + ")";
    $('#container').css('background-image', url_back);
	    $('#container').animate({left:"5px"},10).animate({left:"-5px"},10).animate({left:"0px"},10);
  $('#container').css('position', 'absolute');
	}
	break;
    case '/quadphase':
	if(msg.value.deviceID == 'quadphase_1') {
  document.getElementById("receiveMsg").innerHTML = "NOW ON STAGE <a class='who_shake' target='_blank' href='https://twitter.com/" + msg.value.twitterID + "'>@" + msg.value.twitterID + "</a>";
    var url_back = "url(" + msg.value.user_image + ")";
	    $('#container').css('background-image', url_back);
	    $('#container').animate({left:"5px"},10).animate({left:"-5px"},10).animate({left:"0px"},10);
	    $('#container').css('position', 'absolute');
	
	} 
	break;

    case '/green':
	if(msg.value.deviceID == 'green') {
  document.getElementById("receiveMsg").innerHTML = "NOW ON STAGE <a class='who_shake' target='_blank' href='https://twitter.com/" + msg.value.twitterID + "'>@" + msg.value.twitterID + "</a>";
    var url_back = "url(" + msg.value.user_image + ")";
	    $('#container').css('background-image', url_back);
	    $('#container').animate({left:"5px"},10).animate({left:"-5px"},10).animate({left:"0px"},10);
	    $('#container').css('position', 'absolute');
	
	} 
	break;

    case '/led':
	if(msg.value.deviceID == 'led') {
  document.getElementById("receiveMsg").innerHTML = "NOW ON STAGE <a class='who_shake' target='_blank' href='https://twitter.com/" + msg.value.twitterID + "'>@" + msg.value.twitterID + "</a>";
    var url_back = "url(" + msg.value.user_image + ")";
	    $('#container').css('background-image', url_back);
	    $('#container').animate({left:"5px"},10).animate({left:"-5px"},10).animate({left:"0px"},10);
	    $('#container').css('position', 'absolute');
	
	} 
	break;

    }



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
