//----------------------------------------
// 图片资源：
var imgData = ['img/demonI.png', 'img/demonII.png', 'img/demonIII.png', 'img/demonIV.png', 'img/demonV.png'],
		imgLen = imgData.length;

// 获取包裹小人的容器div
var bili = Fq('.bili');
// 获取包裹小人外层容器的宽度
var wrapWidth = fq.css(bili, 'width');
// 定义一个小人的最大宽度：
var oneMaxWidth = 75;
// 获取最外层元素用来做失去分数时候的抖动
var outer = Fq('.content');
// 初始运动的总时间
var speed = 3000;
// 定义加分数
var winScore = 0;
// 定义失分数
var loseScore = 0;
// 定义一个游戏结束的变量
var end = false;

// 开始游戏按钮点击：
Fq('.btn').onclick = function (){
  gameStart();
};


//-----------------------------------------
// 游戏开始：
function gameStart(){
  /*Fq('.win')
  Fq('.lose')
  Fq('.btn')*/
  end = false;
  Fq('.loseNum').innerHTML = Fq('.winNum').innerHTML = winScore = loseScore = 0;
  fq.animate(Fq('.win'), {left: -100}, 1000);
  fq.animate(Fq('.lose'), {left: -100}, 1000);
  fq.animate(Fq('.btn'), {bottom: -60, opacity: 0.2}, 1000, play);
}

// 生成小人对象数据：
function creatObj(){
  var obj = {};
  obj.imgSrc = imgData[fq.rp([0, imgLen-1])];
  obj.x = fq.rp([10, wrapWidth - oneMaxWidth]);
  obj.y = -63;
  return obj;
}

// 创建小人对应的html元素：
function createEle(){
  var obj = creatObj();
  bili.innerHTML = `<img src="${obj.imgSrc}" style="left:${obj.x}px;top:${obj.y}px;">`;
}

// 游戏运行函数：
function play(){
  if(end){
    return;
  }
  createEle();
  var gameImg = Fq('.bili img');
  gameImg.onmouseover = function (){
    clearInterval(this.animate);
    this.src = 'img/demonVI.png';
    fq.shake(this, 'translateX', 20, function (){
      bili.innerHTML = '';
      Fq('.winNum').innerHTML = ++winScore + '分';
      if(winScore % 10 === 0 && speed >= 1000){
        speed -= 500;
      };
      play();
    });
  };
  fq.animate(gameImg, {top: 410}, speed, 'linear', function (){
    fq.shake(outer, 'translateY', 20, function (){
      Fq('.loseNum').innerHTML = ++loseScore + '分';
      gameOver();
      play();
    });
    bili.innerHTML = '';
  });
}

// 游戏结束功能
function gameOver(){
  if(loseScore === 1){
    end = true;
    setTimeout(function() {
      fq.shake(outer, 'translateX', 20, function (){
        fq.animate(Fq('.win'), {left: 14}, 1000);
        fq.animate(Fq('.lose'), {left: 14}, 1000);
        fq.animate(Fq('.btn'), {bottom: 20, opacity: 1}, 1000, function (){
          Fq('.btn').innerHTML = '重新开一局吧！';
        });
      });
    }, 500);
  }
}



