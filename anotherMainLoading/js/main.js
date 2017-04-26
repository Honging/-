// main.js


// 封装函数
(function mainLoading () {

var imgData = {
	mainBg:[
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
	    'images/main/p20.png'
	],
	cloud:[
		'images/cloud/cloud1.png',
		'images/cloud/cloud2.png',
		'images/cloud/cloud3.png'
	]
};
var main = document.querySelector('#zwj-main');
var mainTz = document.querySelector('.main-tz');
var mainUpDown = document.querySelector('.main-upDown');
var mainLeftRight = document.querySelector('.main-leftRight');
var mainBg = document.querySelector('.main-bg');
var mainCloud = document.querySelector('.main-cloud');

function renderMainBg () {
	var n = imgData.mainBg.length;
	var width = 129;
	var deg = 360/n;
	var R = parseInt(width/2/Math.tan(Math.PI*2*deg/2/360))-2;
	for (var i = 0; i < n; i++) {
		var node = document.createElement('img');
		node.className = 'bg';
		node.src = imgData.mainBg[n-1-i];
		mainBg.appendChild(node);
		css(node,'opacity',0);
		css(node,'rotateY',0);
		css(node,'translateZ',-R);
		// loadMainBg(node,i,deg,R);
	}
	
}

function renderMainBgFalse () {
	var mainBgFalse = mainBg.cloneNode(true);
	mainBgFalse.className = 'main-bg-false';
	mainLeftRight.insertBefore(mainBgFalse,mainBg);
	var n = imgData.mainBg.length;
	var width = 129;
	var deg = 360/n;
	var R = parseInt(width/2/Math.tan(Math.PI*2*deg/2/360))-2;
	var bgs = mainBg.querySelectorAll('.bg');
	var bgsFalse = document.querySelectorAll('#zwj-main .main-bg-false .bg');
	css(mainBgFalse,'translateZ',-2*R);
	for (var i = 0; i < bgsFalse.length; i++) {
		css(bgsFalse[i],'rotateY',(n-i)*deg);
		css(bgsFalse[i],'translateZ',R);
		css(bgsFalse[i],'opacity',100);
		loadMainBg(bgsFalse,bgs,i,deg,R);
	}
}

function loadMainBg (obj1,obj2,i,deg,R) {
	MTween({
		el: obj1[i],
		target: {
			rotateY: 0
		},
		time: (obj1.length-i)*60,
		type: 'linear',
		callBack: function () {
			obj1[i].style.opacity = 0;
			obj2[i].style.opacity = 1;
			MTween({
				el: obj2[i],
				target: {
					rotateY: (i+2)*deg
				},
				time: (i+2)*60,
				type: 'linear',
				callBack: function () {
					if (i>=obj1.length-1) {
						obj1[i].parentNode.style.display = 'none';
						moreRotateY(deg);
						showInner();
					}
				}
			});
		}
	});	
}

function moreRotateY (deg) {
	MTween({
		el: mainLeftRight,
		target: {
			rotateY: 8*deg
		},
		time: 2000,
		type: 'easeOutStrong',
		callBack: oarPanel
	});
}

function showInner () {
	
}

function oarPanel () {
	var startPoint = {x:0,y:0};
	var oldPoint = {x:0,y:0};
	var orginDeg = {x:0,y:0};
	var scale = {x:129/40,y:1170/80};
	var orginZ = css(mainTz,'translateZ');
	var startZ = orginZ;
	var lastDis = {x:0,y:0};
	var lastDeg = {x:0,y:0};
	var timer = {x:null,y:null,z:null,cancelz:null};

	document.addEventListener('touchstart', function (ev) {
		clearInterval(timer.x);
		clearInterval(timer.y);
		clearInterval(timer.z);
		clearInterval(timer.cancelz);
		lastDis.x = 0;
		lastDis.y = 0;
		startZ = css(mainTz,'translateZ');
		oldPoint.x = startPoint.x = ev.changedTouches[0].pageX;
		oldPoint.y = startPoint.y = ev.changedTouches[0].pageY;
		orginDeg.x = css(mainLeftRight,'rotateY');
		orginDeg.y = css(mainUpDown,'rotateX');
	});

	document.addEventListener('touchmove', function (ev) {
		clearInterval(timer.z);
		clearInterval(timer.cancelz);
		var nowPoint = {};
		var nowDeg = {};
		var dis = {};
		var disDeg = {};
		nowPoint.x = ev.changedTouches[0].pageX;
		nowPoint.y = ev.changedTouches[0].pageY;
		dis.x = nowPoint.x - oldPoint.x;
		dis.y = nowPoint.y - oldPoint.y;
		lastDis.x = disDeg.x = -(dis.x/scale.x);
		lastDis.y = disDeg.y = dis.y/scale.y;
		nowDeg.x = orginDeg.x + disDeg.x;
		nowDeg.y = orginDeg.y + disDeg.y;
		if (nowDeg.y>40) {
			nowDeg.y = 40;
		}else if (nowDeg.y<-40) {
			nowDeg.y = -40;
		}
		oldPoint.x = nowPoint.x;
		oldPoint.y = nowPoint.y;
		orginDeg.x = nowDeg.x;
		orginDeg.y = nowDeg.y;
		css(mainLeftRight,'rotateY',nowDeg.x);
		css(mainUpDown,'rotateX',nowDeg.y);
		startZ = css(mainTz,'translateZ');
		var disZ = startZ - Math.abs(dis.x);
		if ( Math.abs(disZ)>3000 ) {
			disZ = -3000;
		}
		css(mainTz,'translateZ',disZ);
		timer.cancelz = setTimeout(function () {
			timer.z = MTween({
				el: mainTz,
				target: {
					translateZ:orginZ
				},
				time: 500,
				type: 'easeOut'
			});
		}, 20);
	});

	document.addEventListener('touchend', function (ev) {
		var nowDeg = {x:css(mainLeftRight,'rotateY'),y:css(mainUpDown,'rotateX')};
		var disDeg = {x:lastDis.x*10,y:lastDis.y*10};
		var disY = nowDeg.y + disDeg.y;
		if (disY>40) {
			disY = 40;
		}else if(disY<-40) {
			dixY = -40;
		}
		if (Math.abs(lastDis.x)>6) {
			timer.x = MTween({
				el: mainLeftRight,
				target: {
					rotateY: nowDeg.x + disDeg.x
				},
				time: 800,
				type: 'easeOut'
			});
		}
		if (Math.abs(lastDis.x)>6) {
			timer.y = MTween({
				el: mainUpDown,
				target: {
					rotateY: disY
				},
				time: 800,
				type: 'easeOut'
			});
		}
	});
}


function renderCloud (n) {
	var bgs = mainBg.querySelectorAll('.bg');
	css(mainCloud,'translateZ',300);
	for (var i = 0; i < n; i++) {
		var node = document.createElement('img');
		node.className = 'cloud';
		node.src = imgData.cloud[i%imgData.cloud.length];
		mainCloud.appendChild(node);
		css(node,'translateZ',(Math.random()-0.5)*2*main.offsetWidth);
		css(node,'translateX',(Math.random()-0.5)*2*main.offsetWidth);
		css(node,'translateY',(Math.random()-0.5)*main.offsetHeight);
		MTween({
			el: node,
			target: {
				translateX:  css(node,'translateX')+(Math.random()-0.5)*2*main.offsetWidth
			},
			time: bgs.length*60,
			type: 'linear',
			callBack: function () {
				mainCloud.style.opacity = 0;
				mainCloud.style.display = 'none';
			}
		});
	}
}

function renderMainTz () {
	var bgs = mainBg.querySelectorAll('.bg');
	css(mainTz,'translateZ',-2000);
	main.style.opacity = 1;
	MTween({
		el: mainTz,
		target: {
			translateZ: 400
		},
		time: (bgs.length+2)*60+2000,
		type: 'easeOutStrong'
	});
}


(function mainStart () {
	renderMainBg();
	renderCloud(6);
	renderMainBgFalse();
	renderMainTz();
})();






})();