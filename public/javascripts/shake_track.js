var shakeData = '{ "uid" : "_uid","deviceID":"_deviceID", "color": "0", "strobo":"0", "rotate":"0"}';
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

  shakeDataJson.color = color;
  shakeDataJson.strobo = strobo;
  shakeDataJson.rotate = rotate;
  shakeDataJson.uid = sessionID;
  shakeDataJson.deviceID = "quadphase_1";

  limitShakeX = Math.abs(x) - Math.abs(preX);
  limitShakeY = Math.abs(y) - Math.abs(preY);
  limitShakeZ = Math.abs(z) - Math.abs(preZ);


  if (limitShakeX > 7 | limitShakeY > 7 | limitShakeZ > 7) {
       socket.emit('message', { value: shakeDataJson });
       $('body').css({ backgroundColor:"black"});
  } else {
       $('body').css({ backgroundColor:"white"});
  } 


preX = x;
preY = y;
preZ = z;

var txt = "x:"+x+"<br>y:"+y+"<br>z:"+z+"<br>";
document.getElementById("sensor").innerHTML = txt;
}, true);

