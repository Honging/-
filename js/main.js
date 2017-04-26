// main.js

(function () {
    preLoading();
    loadH();
})();

// load js
var done = false;
// 预加载
function preLoading () {
    var imgData = [
            'images/main/p1.png',
            'images/main/p2.png',
            'images/main/p3.png',
            'images/main/p4.png',
            'images/main/p5.png',
            'images/main/p6.png',
            'images/main/p7.png',
            'images/main/p8.png',
            'images/main/p9.png',
            'images/main/p10.png',
            'images/main/p11.png',
            'images/main/p12.png',
            'images/main/p13.png',
            'images/main/p14.png',
            'images/main/p15.png',
            'images/main/p16.png',
            'images/main/p17.png',
            'images/main/p18.png',
            'images/main/p19.png',
            'images/main/p20.png',
            'images/main/666.jpg'
    ];
    var nub = 0;
    for(var i = 0; i < imgData.length; i++){
        var img = new Image();
        img.src = imgData[i];
        img.onload = function(){
            nub++;
            // console.log(nub);
            if (nub>=imgData.length) {
                done = true;
            }
        };
    }
}


// load-1 js


function loadH() {
    var rLoad = document.querySelector(".r-load");
    rLoad.style.display = "block";

    function load1() {
        var zLoad = document.querySelector(".z-load");
        var load = document.querySelector(".load");
        var loadStar = document.querySelector(".load-star");
        var loadSide = document.querySelector(".load-side");
        loadSide.innerHTML = "";
        var cloud = ["images/cloud/cloud1.png", "images/cloud/cloud2.png", "images/cloud/cloud3.png"];
        var cube = ["images/load/load2.png", "images/load/load3.png", "images/load/load4.png"];

        // 中心三角
        for (var i = 0; i < 4; i++) {
            var span = document.createElement("span");
            span.style.backgroundImage = "url(images/load/load1.png)";
            css(span, "rotateY", 75 * i);
            css(span, "rotateX", 15 * i);
            css(span, "rotateZ", 15 * i);
            if (Math.random() > 0.5) css(span, "skewX", 30);
            if (Math.random() > 0.5) css(span, "skewY", 30);
            loadStar.appendChild(span);
        }

        // 云
        for (var i = 0; i < 6; i++) {
            var span = document.createElement("span");
            span.className = "cloud";
            span.style.backgroundImage = "url(" + cloud[i % 3] + ")";
            loadSide.appendChild(span);
        }

        // 几何体
        for (var i = 0; i < 3; i++) {
            var span = document.createElement("span");
            span.style.backgroundImage = "url(" + cube[i % 3] + ")";
            loadSide.appendChild(span);
        }

        // 初始化
        css(zLoad, "translateZ", -5000);
        loadStar.style.background = "transparent";
        loadSide.style.visibility = "hidden";

        setTimeout(function() {
            loadStar.style.background = "";
            MTween({
                el: zLoad,
                target: { translateZ: -150 },
                time: 200,
                type: "linear",
                callBack: load2
            });
        }, 500);

    }

    function load2() {
        var loadSide = document.querySelector(".load-side");
        var spans = loadSide.getElementsByTagName("span");

        loadSide.style.visibility = "";
        for (var i = 0; i < spans.length; i++) {
            css(spans[i], "rotateY", -90);
            var x = (Math.random() - 0.5) > 0 ? (20 + Math.ceil(Math.random() * 220)) : -(20 + Math.ceil(Math.random() * 220));
            var y = (Math.random() - 0.5) > 0 ? (10 + Math.ceil(Math.random() * 20)) : -(10 + Math.ceil(Math.random() * 20));
            var z = (Math.random() - 0.5) > 0 ? (20 + Math.ceil(Math.random() * 220)) : -(20 + Math.ceil(Math.random() * 220));
            MTween({
                el: spans[i],
                target: { translateX: x, translateY: y, translateZ: z, rotateY: -30 },
                time: 500,
                type: "linear",
                callBack: load3
            });
        }
    }

    function load3() {
        var loadSide = document.querySelector(".load-side");
        var spans = loadSide.getElementsByTagName("span");

        for (var i = 0; i < spans.length; i++) {
            MTween({
                el: spans[i],
                target: { rotateY: 0 },
                time: 250,
                type: "linear",
                callBack: load4
            });
        }

    }

    function load4() {
        var zLoad = document.querySelector(".z-load");
        var loadSide = document.querySelector(".load-side");
        var spans = loadSide.getElementsByTagName("span");

        for (var i = 0; i < spans.length; i++) {
            MTween({
                el: spans[i],
                target: { translateX: 0, translateY: 0, translateZ: 0, rotateY: 90 },
                time: 750,
                type: "linear",
                callBack: load5
            });
        }

        MTween({
            el: zLoad,
            target: { translateZ: -1000 },
            time: 750,
            type: "linear"
        });

    }

    function load5() {
        var zLoad = document.querySelector(".z-load");
        var loadSide = document.querySelector(".load-side");
        loadSide.style.visibility = "hidden";

        MTween({
            el: zLoad,
            target: { translateZ: -5000 },
            time: 500,
            type: "linear",
            callBack: exportH
        });
    }

    load1();
}

// 输出接口
function exportH() {
    var loadStar = document.querySelector(".load-star");
    var rLoad = document.querySelector(".r-load");
    loadStar.style.background = "transparent";
    shake(function() {
        console.log('shakend');
        setTimeout(function() {
            if (done) {
                load2(1,function () {
                    console.log('load2-1end');
                    var zLoad = document.querySelector( ".z-load" ); // shake对接
                    css( zLoad, "translateZ", -4000 );
                    setTimeout(function () {
                        shake(function () {
                            console.log('shakend');
                            setTimeout(function () {
                                load2(2,function () {
                                    console.log('load2-2end');
                                    setTimeout(function () {
                                        shake(function () {
                                            console.log('shakend');
                                            setTimeout(function () {
                                                console.log('loadingMain');
                                                // 接口
                                                // preLoading();
                                                // loadH();
                                                mainShow();
                                            }, 500);
                                        });
                                    }, 500);
                                });
                            },500);
                        });
                    }, 500);
                });
            }else {
                loadH();
            }
        }, 500);
    });
}

function shake(callBack) {
    var loadStar = document.querySelector(".load-star");
    var begin = parseInt(window.getComputedStyle(loadStar)["left"]);
    var arr = [];

    for (var i = 20; i > 0;) {
        arr.push(i);
        arr.push(-i);
        i -= 3;
    }

    arr.push(0);
    i = 0;
    var timer = setInterval(function() {
        loadStar.style.left = begin + arr[i] + "px";
        i++;

        if (i >= arr.length) {
            i = arr.length;
            clearInterval(timer);
            callBack && callBack();
        }

    }, 50);
}



// load-2 js

function load2(path, call) {

    var arrName = [
        'load-ball',
        'load-tri',
        'load-muti',
        'load-plat',
        'load-cloud'
    ];
    var arrPath = [
        'images/load/load3.png',
        'images/load/load4.png',
        'images/load/load2.png',
        'images/load/load1.png',
        'images/cloud/cloud1.png',
        'images/cloud/cloud2.png',
        'images/cloud/cloud3.png'
    ];
    var loadAnimat2 = document.querySelector('.load-2')
    var loadBody = document.querySelector('.load-body');
    var loadGoods = document.querySelector('.load-goods');
    var loadTz = document.querySelector('.load-tz');
    var loadBg = document.querySelector('.load-bg');
    var loadText = document.querySelector('.load-text');

    function newGoods(num) {
        var str = '';
        for (var i = 0; i < num; i++) {
            var n = parseInt(Math.random() * 15);
            var path = getPath(n);
            str += '<img class="' + arrName[getPath('name',n)] + '" src="' + arrPath[getPath('path',n)] + '" alt="pieces">';
        }
        loadGoods.innerHTML = str;

        function getPath(num,n) {
            switch (n) {
                case 0:
                    return 0;
                case 2:
                case 3:
                    return 1;
                case 4:
                case 5:
                    return 2;
                case 6:
                case 7:
                case 8:
                case 9:
                    return 3;
                default:
                    if (num=='name') {
                        return 4;
                    }else{
                        return 4 + parseInt(Math.random() * 3);
                    }
            }
        }
    }

    function goodsMove1(goods) {
        MTween({
            el: goods,
            target: {
                translateX: (Math.random() - 0.5) * loadBody.offsetWidth /3*4,
                translateY: (Math.random() - 0.5) * loadBody.offsetHeight / 2,
                translateZ: (Math.random() - 0.5) * loadBody.offsetWidth /3*4,
                rotateY: Math.random()*90+90,
                rotateX: (Math.random() - 0.5)*90,
                rotateZ: (Math.random() - 0.5)*90
            },
            time: 100,
            type: 'linear',
            callBack: function() {
                goodsMove2(goods);
            }
        });
    }

    function goodsMove2(goods) {
        // var time = (Math.random() - 0.5) * 100;
        MTween({
            el: goods,
            target: {
                rotateY: -40
            },
            time: 750,
            type: 'linear',
            callBack: function() {
                goodsMove3(goods);
            }
        });
    }

    function goodsMove3(goods) {
        MTween({
            el: goods,
            target: {
                translateX: 0,
                translateY: 0,
                translateZ: 0,
                rotateY: -(Math.random()*90+90)
            },
            time: 500,
            type: 'linear',
            callBack: function() {
                loadGoods.style.display = 'none';
                loadGoods.innerHTML = '';
            }
        });
    }

    function loadTranslateZ() {
        css(loadTz, 'translateZ', -1000);
        MTween({
            el: loadTz,
            target: {
                translateZ: 100
            },
            time: 100,
            type: 'linear',
            callBack: function() {
                MTween({
                    el: loadTz,
                    target: {
                        // translateZ: 100
                    },
                    time: 750,
                    type: 'linear',
                    callBack: function() {
                        MTween({
                            el: loadTz,
                            target: {
                                translateZ: -1000
                            },
                            time: 500,
                            type: 'linear',
                            callBack: function () {
                                MTween({
                                    el: loadTz,
                                    target: {
                                        translateZ: -5000
                                    },
                                    time: 250,
                                    type: 'linear'
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    function scaleBg() {
        css(loadBg, 'scale', 140);
        MTween({
            el: loadBg,
            target: {
                opacity: 100,
                scale: 160
            },
            time: 300,
            type: 'linear',
            callBack: function() {
                MTween({
                    el: loadBg,
                    target: {
                        scale: 180
                    },
                    time: 600,
                    type: 'linear',
                    callBack: function() {
                        MTween({
                            el: loadBg,
                            target: {
                                opacity: 0,
                                scale: 200
                            },
                            time: 600,
                            type: 'linear',
                            callBack: function() {
                                nextStep();
                            }
                        });
                    }
                });
            }
        });
    }

    function nextStep() {
        loadAnimat2.style.opacity = '';
        loadAnimat2.style.display = '';
        call && call();
    }

    (function start(callBack) {
        // loadText
        if (path == 1) {
            loadText.src = 'images/load/load-triText.png';
        } else if (path == 2) {
            loadText.src = 'images/load/load-text-2.png';
        }
        // goods
        newGoods(15);
        loadGoods.style.display = '';
        // loadAnimat2
        loadAnimat2.style.opacity = 0;
        loadAnimat2.style.display = 'block';
        loadAnimat2.style.opacity = 1;

        // action
        // goods
        var goods = document.querySelectorAll('.load-goods img');
        for (var i = 0; i < goods.length; i++) {
            goodsMove1(goods[i], goodsMove2);
        }
        // loadTz
        loadTranslateZ();
        // bg
        scaleBg();
    })();
}

/*
 * main
 */
 // 主渲染函数
function renderMain() {
  adaptScreen();
  //获取运动元素
  var main = document.querySelector( ".target" );

  //外角度数
  var waijiao = 360 / 20;
  //内角度数
  var neijiao = 180 - waijiao;
  var banjing = Math.floor( Math.tan( ( neijiao / 2 ) * Math.PI / 180 ) * ( 129 / 2 ) );
  var banjing = 406; // 计算半径407多 原网站取406 为保持一致直接取406
  var rot = 360 / 20;
  var startDeg = 180;

  //创建元素添加图片
  for ( var i = 1; i <= 20; i++ ) {
    var span = document.createElement( "span" );
    span.style.backgroundImage = "url(images/" + i + ".png)";
    css( span, "rotateY", startDeg );
    css( span, "translateZ", -banjing );
    main.appendChild( span );
    startDeg -= rot;
  }

}

// 之后为重写部分 对接函数
function mainShow() {
  var zwjLoading = document.querySelector( "#zwj-loading" );
  zwjLoading.style.display = "none";
  var zwjMain = document.querySelector( "#zwj-main" );
  renderMain();
  dotsRender();
  zwjMain.style.display = "none";
  var zBox = document.querySelector( ".zBox" );
  var target = document.querySelector( ".target" );
  css( zBox, "translateZ", -2000 );
  css( target, "rotateX", 0 );
  css( target, "rotateY", -720 );

  setTimeout( function() {
    zwjMain.style.display = "block";
    renderCloud(6);

    MTween( {
      el: zBox,
      target: { translateZ: 430 },
      time: 2000,
      type: "easeOut"
    } );

    MTween( {
      el: target,
      target: { rotateY: 0 },
      time: 2000,
      type: "easeOut",
      callBack: function() {
        setDrag();
      }
    } );

  }, 200 );
}

function renderCloud (n) {
    var clouds = [
        'images/cloud/cloud1.png',
        'images/cloud/cloud2.png',
        'images/cloud/cloud3.png'
    ];
    var mainCloud = document.querySelector('.main-cloud');
    css(mainCloud,'translateZ',300);
    for (var i = 0; i < n; i++) {
        var node = document.createElement('img');
        node.className = 'cloud';
        node.src = clouds[i%clouds.length];
        mainCloud.appendChild(node);
        css(node,'translateZ',(Math.random()-0.5)*1000);
        css(node,'translateX',(Math.random()-0.5)*1000);
        css(node,'translateY',(Math.random()-0.5)*400);
        MTween({
            el: node,
            target: {
                translateX:  css(node,'translateX')+(Math.random()-0.5)*600,
                translateZ:  css(node,'translateX')+(Math.random()-0.5)*600
            },
            time: 1200,
            type: 'linear',
            callBack: function () {
                mainCloud.style.opacity = 0;
                mainCloud.style.display = 'none';
            }
        });
    }
}

function setDrag() {
  var zBox = document.querySelector( ".zBox" );
  var target = document.querySelector( ".target" );
  var panoDots = document.querySelector( ".panoDots" );

  document.addEventListener( "touchstart", function( event ) {
    var disX = event.changedTouches[ 0 ].pageX;
    var disY = event.changedTouches[ 0 ].pageY;
    var startX = css( target, "rotateY" );
    var startY = css( target, "rotateX" );
    var startZ = 430;
    var onoffZ = true;
    var lastX = 0;

    document.addEventListener( "touchmove", function( event ) {
      var moveX = event.changedTouches[ 0 ].pageX - disX;
      var moveY = event.changedTouches[ 0 ].pageY - disY;

      moveX = -360 * moveX / ( 20 * 129 );
      moveY = 63 * moveY / 1170;

      var x = moveX + startX;
      var y = startY + moveY;
      if ( y > 31.5 ) y = 31.5;
      if ( y < -31.5 ) y = -31.5;

      css( target, "rotateX", y );
      css( target, "rotateY", x );
      css( panoDots, "rotateX", y );
      css( panoDots, "rotateY", x );
      checkWidth();

      lastX = moveX - lastX;
      lastX = moveX;

      var z = Math.max( Math.abs( moveX ) * 50, Math.abs( moveY ) * 100 );
      if ( z > 300 ) z = 300;
      if ( onoffZ ) {
        MTween( {
          el: zBox,
          target: { translateZ: startZ - z },
          time: 150,
          type: "linear"
        } );
        onoffZ = false;
      }
    } );

    document.addEventListener( "touchend", function() {
      var endStartX = css( target, "rotateY" );
      lastX = lastX % 20;

      var endX = endStartX + lastX;

      MTween( {
        el: zBox,
        target: { translateZ: startZ },
        time: 700,
        type: "easeOut",
        callBack: function() {
          onoffZ = true;
        }
      } );

      // MTween( {
      //   el: target,
      //   target: { rotateY: endX },
      //   time: 200,
      //   type: "easeOut"
      // } );
      //
      // MTween( {
      //   el: panoDots,
      //   target: { rotateY: endX },
      //   time: 200,
      //   type: "easeOut"
      // } );

    } );
  } );
}

// Dots渲染函数
function dotsRender() {
  var panoDots = document.querySelector( ".panoDots" );

  var div1 = document.createElement( "div" );
  var span1 = document.createElement( "span" );
  var i1 = document.createElement( "i" );

  css( div1, "translateX", -123.84 );
  css( div1, "translateY", -90.9 );
  css( div1, "translateZ", -301.56 );
  css( div1, "rotateY", 17.33 );
  css( div1, "scaleX", 50 );
  css( div1, "scaleY", 50 );
  css( div1, "scaleZ", 50 );

  css( span1, "translateX", 0 );
  css( span1, "translateY", 2 );
  css( span1, "translateZ", 2 );
  css( span1, "rotateX", -7.77 );
  css( i1, "translateY", -25 );
  css( i1, "translateZ", -3 );
  css( i1, "rotateX", -7.77 );

  span1.style.backgroundImage = "url(images/san/san1.png)";
  i1.style.backgroundImage = "url(images/san/1.png)";
  i1.style.width = "0";

  div1.addEventListener( "touchend", function() {
    console.log( 1 );
  } );

  div1.appendChild( i1 );
  div1.appendChild( span1 );
  panoDots.appendChild( div1 );

  var div2 = document.createElement( "div" );
  var span2 = document.createElement( "span" );
  var i2 = document.createElement( "i" );

  css( div2, "translateX", -221.07 );
  css( div2, "translateY", 351.9 );
  css( div2, "translateZ", 239.59 );
  css( div2, "rotateY", 132.3 );
  css( div2, "scaleX", 50 );
  css( div2, "scaleY", 50 );
  css( div2, "scaleZ", 50 );

  css( span2, "translateX", 0 );
  css( span2, "translateY", 2 );
  css( span2, "translateZ", 2 );
  css( i2, "translateY", -25 );

  span2.style.backgroundImage = "url(images/san/san1.png)";
  i2.style.backgroundImage = "url(images/san/2.png)";
  i2.style.width = "0";

  div2.appendChild( i2 );
  div2.appendChild( span2 );
  panoDots.appendChild( div2 );

  var div3 = document.createElement( "div" );
  var span3 = document.createElement( "span" );
  var i3 = document.createElement( "i" );

  css( div3, "translateX", -26.96 );
  css( div3, "translateY", -364.5 );
  css( div3, "translateZ", 324.88 );
  css( div3, "rotateY", 170.26 );
  css( div3, "scaleX", 50 );
  css( div3, "scaleY", 50 );
  css( div3, "scaleZ", 50 );

  css( span3, "translateX", 0 );
  css( span3, "translateY", 2 );
  css( span3, "translateZ", 2 );
  css( i3, "translateY", -25 );

  span3.style.backgroundImage = "url(images/san/san2.png)";
  i3.style.backgroundImage = "url(images/san/3.png)";
  i3.style.width = "0";

  div3.appendChild( i3 );
  div3.appendChild( span3 );
  panoDots.appendChild( div3 );

  var div4 = document.createElement( "div" );
  var span4 = document.createElement( "span" );
  var i4 = document.createElement( "i" );

  css( div4, "translateX", -325.92 );
  css( div4, "translateY", -296.1 );
  css( div4, "translateZ", 7.14 );
  css( div4, "rotateY", 86.26 );
  css( div4, "scaleX", 50 );
  css( div4, "scaleY", 50 );
  css( div4, "scaleZ", 50 );

  css( span4, "translateX", 0 );
  css( span4, "translateY", 2 );
  css( span4, "translateZ", 2 );
  css( i4, "translateY", -25 );

  span4.style.backgroundImage = "url(images/san/san2.png)";
  i4.style.backgroundImage = "url(images/san/4.png)";
  i4.style.width = "0";

  div4.appendChild( i4 );
  div4.appendChild( span4 );
  panoDots.appendChild( div4 );

  var div5 = document.createElement( "div" );
  var span5 = document.createElement( "span" );
  var i5 = document.createElement( "i" );

  css( div5, "translateX", -255.58 );
  css( div5, "translateY", -188.1 );
  css( div5, "translateZ", 202.37 );
  css( div5, "rotateY", 123.37 );
  css( div5, "scaleX", 50 );
  css( div5, "scaleY", 50 );
  css( div5, "scaleZ", 50 );

  css( span5, "translateX", 0 );
  css( span5, "translateY", 2 );
  css( span5, "translateZ", 2 );
  css( i5, "translateY", -25 );

  span5.style.backgroundImage = "url(images/san/san2.png)";
  i5.style.backgroundImage = "url(images/san/5.png)";
  i5.style.width = "0";

  div5.appendChild( i5 );
  div5.appendChild( span5 );
  panoDots.appendChild( div5 );

  var div6 = document.createElement( "div" );
  var span6 = document.createElement( "span" );
  var i6 = document.createElement( "i" );

  css( div6, "translateX", -106.01 );
  css( div6, "translateY", 72.9 );
  css( div6, "translateZ", 308.28 );
  css( div6, "rotateY", 156.02 );
  css( div6, "scaleX", 50 );
  css( div6, "scaleY", 50 );
  css( div6, "scaleZ", 50 );

  css( span6, "translateX", 0 );
  css( span6, "translateY", 2 );
  css( span6, "translateZ", 2 );
  css( span6, "rotateX", 6.23 );
  css( i6, "translateY", -25 );
  css( i6, "translateZ", -3 );
  css( i6, "rotateX", 6.23 );

  span6.style.backgroundImage = "url(images/san/san2.png)";
  i6.style.backgroundImage = "url(images/san/6.png)";
  i6.style.width = "0";

  div6.appendChild( i6 );
  div6.appendChild( span6 );
  panoDots.appendChild( div6 );

  var div7 = document.createElement( "div" );
  var span7 = document.createElement( "span" );
  var i7 = document.createElement( "i" );

  css( div7, "translateX", -237.97 );
  css( div7, "translateY", 144.9 );
  css( div7, "translateZ", -222.81 );
  css( div7, "rotateY", 41.88 );
  css( div7, "scaleX", 50 );
  css( div7, "scaleY", 50 );
  css( div7, "scaleZ", 50 );

  css( span7, "translateX", 0 );
  css( span7, "translateY", 2 );
  css( span7, "translateZ", 2 );
  css( span7, "rotateX", 12.38 );
  css( i7, "translateY", -25 );
  css( i7, "translateZ", -5 );
  css( i7, "rotateX", 12.38 );

  span7.style.backgroundImage = "url(images/san/san3.png)";
  i7.style.backgroundImage = "url(images/san/7.png)";
  i7.style.width = "0";

  div7.appendChild( i7 );
  div7.appendChild( span7 );
  panoDots.appendChild( div7 );
}

function checkWidth() {
  var maxWidth = document.documentElement.clientWidth - 200;
  var panoDots = document.querySelector( ".panoDots" );
  var divs = panoDots.getElementsByTagName( "div" );

  for ( var i = 0; i < divs.length; i++ ) {
    var left = getPosi( divs[ i ] ).left;
    if ( left > 0 && left < maxWidth ) {
      divs[ i ].getElementsByTagName( "i" )[ 0 ].style.width = "";
    } else {
      divs[ i ].getElementsByTagName( "i" )[ 0 ].style.width = "0";
    }
  }
}

function getPosi( obj ) {
  return obj.getBoundingClientRect();
}

function adaptScreen() {
  var zwjMain = document.querySelector( "#zwj-main" );
  var zBox = document.querySelector( ".zBox" );
  var zBox2 = document.querySelector( ".zBox2" );
  var deg = 52.5 * Math.PI / 180;
  var h = document.documentElement.clientHeight / 2;

  // 景深
  var p = Math.floor( Math.tan( deg ) * h );

  zwjMain.style.perspective = p + "px";
  css( zBox2, "translateZ", p );
}
