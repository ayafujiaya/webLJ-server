
    var prevPageURL = "http://ayafuji.com";
    var nextPageURL = "http://google.com";
  $(function() {
 
    //イベントの取得
    $("#mainBox").bind("touchstart touchmove touchend", touchHandler);
    function touchHandler(e) {
        e.preventDefault();
        var touch = e.originalEvent.touches[0];  
 
        if (e.type == "touchstart") {   //画面にタッチした
 
            //タッチ開始時のX座標（ startX ）
            startX = touch.pageX; 
 
        } else if (e.type == "touchmove") { //画面をスライドした
 
            //スライド時のX座標 - 開始時のX座標 = 移動距離（ diffX ）
            diffX = touch.pageX - startX;
 
            //移動距離がマイナス（右方向にフリック）し、移動先のページがあるか
            //移動距離がプラス　（左方向にフリック）し、移動先のページがある場合
            if (( diffX > 0 && prevPageURL ) || ( diffX < 0 && nextPageURL)) {
 
                //コンテンツエリアをフリックした分だけ移動
                $('#container').css( "left", diffX );
            }
 
        } else if (e.type == "touchend") { //画面から指を離した
 
            if (diffX > 100) { //右に100px以上移動したか
 
                if ( prevPageURL ) { //移動先のページがあれば、移動
                    location.href = prevPageURL;
                }
            } else if (diffX < -100) { //左に100px以上移動したか
 
                if ( nextPageURL ) { //移動先のページがあれば、移動
                    location.href = nextPageURL;
                }
            } else { //左右100px以下の移動距離であれば、スライドして元の位置に戻る。
                    $( '#container' ).animate({ left: 0 }, 200);
            }
        }
    }  
 
});