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
    let i;

    // スクリーン読み込み。大きさの固定
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 256;
    screenCanvas.height = 256;

    ctx = screenCanvas.getContext('2d');

    // マウスの動き取得
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    screenCanvas.addEventListener('mousedown', mouseDown, true);
    window.addEventListener('keydown', keyDown, true);

    //
    info = document.getElementById('info');

    // characterjsからひっぱってきてる
    let chara = new Character();
    chara.init(10);

    // たまの初期化
    let charaShot = new Array(CHARA_SHOT_MAX_COUNT);
    for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        charaShot[i] = new CharacterShot();
    }

    // 描画周りのあれこれ
    (function(){

        info.innerHTML = mouse.x + ' : ' + mouse.y;


        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);


        ctx.beginPath();

        // マウスの位置とあわせるよ
        chara.position.x = mouse.x;
        chara.position.y = mouse.y;


        ctx.arc(chara.position.x, chara.position.y, chara.size, 0, Math.PI * 2, false);


        ctx.fillStyle = CHARA_COLOR;


        ctx.fill();

        // たまを打ち出す周りの処理
        if(fire){

            for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){

                if(!charaShot[i].alive){

                    charaShot[i].set(chara.position, 3, 5);

                    break;
                }
            }
            // フラグたてとく
            fire = false;
        }

        ctx.beginPath();

        for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
            if(charaShot[i].alive){
                charaShot[i].move();

                ctx.arc(
                    charaShot[i].position.x,
                    charaShot[i].position.y,
                    charaShot[i].size,
                    0, Math.PI * 2, false
                );

                ctx.closePath();
            }
        }

        ctx.fillStyle = CHARA_SHOT_COLOR;

        ctx.fill();

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