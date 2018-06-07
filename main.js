let screenCanvas, info;
let run = true;
let fps = 1000 / 30;
let mouse = new Point();
let ctx;
let fire = false;

// - const --------------------------------------------------------------------
const CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
const CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
const CHARA_SHOT_MAX_COUNT = 10;

// - main ---------------------------------------------------------------------
window.onload = function(){

    // スクリーンの初期化
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 256;
    screenCanvas.height = 256;
    

    // 2dコンテキスト
    ctx = screenCanvas.getContext('2d');

    // イベントの登録
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    window.addEventListener('keydown', keyDown, true);

    // その他のエレメント関連
    info = document.getElementById('info');

    // 自機初期化
    let chara = new Character();
    chara.init(10);

    // レンダリング処理を呼び出す
    (function(){
        // HTMLを更新
        info.innerHTML = mouse.x + ' : ' + mouse.y;

        // screenクリア
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

        // パスの設定を開始
        ctx.beginPath();

        // 自機の位置を設定
        chara.position.x = mouse.x;
        chara.position.y = mouse.y;

        // 自機を描くパスを設定
        ctx.arc(chara.position.x, chara.position.y, chara.size, 0, Math.PI * 2, false);

        // 自機の色を設定する
        ctx.fillStyle = CHARA_COLOR;

        // 自機を描く
        ctx.fill();
        screenCanvas.addEventListener('mousemove', mouseMove, true);
        screenCanvas.addEventListener('mousedown', mouseDown, true);
        window.addEventListener('keydown', keyDown, true);

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

function mouseDown(event){
    // フラグを立てる
    fire = true;
}

function keyDown(event){
    // キーコードを取得
    let ck = event.keyCode;

    // Escキーが押されていたらフラグを降ろす
    if(ck === 27){run = false;}
}