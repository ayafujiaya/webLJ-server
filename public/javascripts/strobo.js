var shakeData = '{ "uid" : "_uid","twitterID":"_twitterID", "deviceID":"_deviceID", "speed": "0", "power":"0"}';
var limitShakeX = 10;
var limitShakeY = 10;
var limitShakeZ = 10;

var preX = 0;
var preY = 0;
var preZ = 0;

window.addEventListener("devicemotion", function(evt){
var x = evt.acceleration.x;	// X方向の加速度
var y = evt.acceleration.y;	// Y方向の加速度 
var z = evt.acceleration.z;	// Z方向の加速度
var shakeDataJson = JSON.parse(shakeData);

  shakeDataJson.speed = speed;
  shakeDataJson.power = power;
  shakeDataJson.uid = "SESSIONID";
  shakeDataJson.deviceID = "strobo_1";
  shakeDataJson.twitterID = "<%= user_name %>"

  limitShakeX = Math.abs(x) - Math.abs(preX);
  limitShakeY = Math.abs(y) - Math.abs(preY);
  limitShakeZ = Math.abs(z) - Math.abs(preZ);


  if (limitShakeX > 7 | limitShakeY > 7 | limitShakeZ > 7) {
       socket.emit('message', { value: shakeDataJson });
       //$('body').css({ backgroundColor:"black"});
       $('#inner_header').css({ backgroundColor:"black"});
  } else {
       //$('body').css({ backgroundColor:"white"});
       $('#inner_header').css({ backgroundColor:"#FF0000"});
  } 


preX = x;
preY = y;
preZ = z;

var txt = "x:"+x+"<br>y:"+y+"<br>z:"+z+"<br>";
document.getElementById("sensor").innerHTML = txt;
}, true);

