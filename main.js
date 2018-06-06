// - global -------------------------------------------------------------------
let screenCanvas, info;
let run = true;
let fps = 1000 / 30;
let mouse = new Point();
let ctx;

// - main ---------------------------------------------------------------------
window.onload = function(){

    // スクリーンの初期化
    screenCanvas = document.getElementById('screen');
    console.log(screenCanvas.style.width)
    screenCanvas.width = 512;
    screenCanvas.height = 512;

    // 2dコンテキスト
    ctx = screenCanvas.getContext('2d');

    // イベントの登録
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    window.addEventListener('keydown', keyDown, true);

    // その他のエレメント関連
    info = document.getElementById('info');

    // レンダリング処理を呼び出す
    (function(){
        // HTMLを更新
        info.innerHTML = mouse.x + ' : ' + mouse.y;

        // screenクリア
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
        ctx.strokeRect(mouse.x-6,mouse.y-5,20,20)

        // パスの設定を開始
        ctx.beginPath();

        // 円の色を設定する
        ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';

        // 円を描くパスを設定
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2, false);

        // 円を描く
        ctx.fill();

        // フラグにより再帰呼び出し
        if(run){setTimeout(arguments.callee, fps);}
    })();
};

// - event --------------------------------------------------------------------
function mouseMove(event){
    // マウスカーソル座標の更新
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
    // キーコードを取得
    let ck = event.keyCode;

    // Escキーが押されていたらフラグを降ろす
    if(ck === 27){run = false;}
}