var getItem = function(target){
	return document.querySelector(target);
}
var rsize, rcolor, rbright, rsatur, rtexture; // 커스텀 range
var cstar; //미리보기 행성
var star = new Array();
var rs="", rc="", rsa="", rb="", rt=""; //커스텀 값
var newstar;

var close, add, reset; //버튼

var space, custom;

var drop = 0;

var init = function() {
	custom = getItem('#custom');

	space = getItem('#space');

	//range
	rsize = getItem('#rsize');
	rcolor = getItem('#rcolor');
	rsatur = getItem('#rsatur');
	rbright = getItem('#rbright');
	rtexture = getItem('#rtexture');

	//미리보기 별
	cstar = getItem('#cstar');

	//버튼
	close = getItem('#close');
	add = getItem('#add');
	reset = getItem('#reset');
	newstar = getItem('#newstar');

	//range 변화시 이벤트
	rsize.onchange = function() {
		rs = 'scale(' + rsize.value/25 + ',' + rsize.value/25 + ')';
		cstar.style['-webkit-transform'] = rs;
	};

	rcolor.onchange = function() {
		rc = 'hue-rotate(' + rcolor.value*4 + 'deg)';
		cstar.style['-webkit-filter'] = rc+rsa+rb;
	};

	rsatur.onchange = function() {
		rsa = 'saturate(' + rsatur.value*4 + '%)';
		cstar.style['-webkit-filter'] = rc+rsa+rb;
	};

	rbright.onchange = function() {
		rb = 'brightness(' + rbright.value*2 + '%)';
		cstar.style['-webkit-filter'] = rc+rsa+rb;
	};


	rtexture.onchange = function() {
		rt = 'url(images/tx.png) -' + rtexture.value * 130 + 'px 0';
		cstar.style.background = rt;
	};


	//버튼 기능
	add.onclick =function() {
		custom.style.display = "none";
		var obj = {};
		obj = cstar;
		var i = star.length - 1;
		space.appendChild(obj);
		star.push(obj);
		drop=1;
		newstar.style.display = "block";
	};

	window.onmousemove = function(e) {
		if(drop>=1){
			var i = star.length - 1;
			
			star[i].style.left = e.pageX + 'px';
			star[i].style.top = e.pageY + 'px';
			drop=2;
		};	
	};

	window.onclick = function(e) {
		if(drop==2){
			var i = star.length - 1;
			star[i].style.left = e.pageX + 'px';
			star[i].style.top = e.pageY + 'px';
			drop=0;
		};
	};

	newstar.onclick = function(e) {
		custom.style.display = "block";
	};
	close.onclick = function() {
		custom.style.display = "none";
	};

	reset.onclick = function() {
		rsize.value = 25;
		rcolor.value = 0;
		rsatur.value = 25;
		rbright.value = 50;
		rtexture.value = 5;

		rs = 'scale(' + rsize.value/25 + ',' + rsize.value/25 + ')';
		rc = 'hue-rotate(' + rcolor.value*4 + 'deg)';
		rb = 'brightness(' + rbright.value*2 + '%)';
		rsa = 'saturate(' + rsatur.value*4 + '%)';
		rt = 'url(images/tx.png) -' + rtexture.value * 130 + 'px 0';
		
		cstar.style['-webkit-transform'] = rs;
		cstar.style['-webkit-filter'] = rc+rsa+rb;
		cstar.style.background = rt;	
	}
};



window.onload = function() {
	init();
}