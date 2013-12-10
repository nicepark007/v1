var getItem = function(target){
	return document.querySelector(target);
}
var rsize, rcolor, rbright, rsatur, rtexture; // 커스텀 range
var cstar; //미리보기 행성
var star = new Array();
var rs="", rc="", rsa="", rb="", rt=""; //커스텀 값
var mx, my; //마우스 위치
var z=0; //화면의 z위치
var sz=0; //별의 z위치
var rx=0; //화면 회전
var newstar, random;
var timer=0; //화면전환 타이머
var ctimer=0; //커스텀창 띄울때 space 디스플레이 제어 타이머

//키입력 wasd
var up = false;
var left = false;
var right = false;
var down = false;
var drag = false;

var spacex = 0;
var spacez = 0;
var spacey = 0;

//누르는 순간의 마우스 좌표
var nowx = 0;
var nowy = 0;

var spacewidth=2600;
var spaceheight=2600;


var body;

var num = 0;  //별 갯수

var close, add, reset, random; //버튼

var space, custom; //전체 공간과 커스텀창

var drop = 0;

var init = function() {
	body = getItem('body');
	custom = getItem('#custom');
	space = getItem('#space');
	space.style.opacity = '0';

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
	random = getItem('#random');
	reset = getItem('#reset');
	newstar = getItem('#newstar');
	randomstar = getItem('#randomstar');


	//space 사이즈 계산
	for(i=0; i<20; i++){
		if(spacewidth>=window.innerWidth){
			spacewidth = spacewidth-100;
		}else{i=20}
	}

	for(i=0; i<20; i++){
		if(spaceheight>=window.innerHeight){
			spaceheight = spaceheight-100;
		}else{spaceheight = spaceheight-100; i=20;}
	}

	space.style.width = spacewidth + 'px';
	space.style.height = spaceheight + 'px';

	console.log(spacewidth, spaceheight);

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
	add.onclick =function(e) {
		space.style.opacity = "1";
		space.style.display = "block";
		custom.style.display = "none";
		var obj = document.createElement('div');
		star.push(obj);
		star[num].id = "star"+[num];
		star[num].className = "star";

		
		
				
		rs = 'scale(' + rsize.value/25 + ',' + rsize.value/25 + ')';
		rc = 'hue-rotate(' + rcolor.value*4 + 'deg)';
		rb = 'brightness(' + rbright.value*2 + '%)';
		rsa = 'saturate(' + rsatur.value*4 + '%)';
		rt = 'url(images/tx.png) -' + rtexture.value * 130 + 'px 0';

		star[num].style.width = "130px";
		star[num].style.height = "130px";
		star[num].style.borderRadius = "65px";
		star[num].style['-webkit-transform'] = rs;
		star[num].style['-webkit-filter'] = rc+rsa+rb;
		star[num].style.background = rt;



		space.style.transition = '0.3s';
		space.style.opacity = '1';

		space.appendChild(star[num]);

		var dx = e.pageX - 65;
		var dy = e.pageY - 65;
		
		star[num].style.left = dx + 'px';
		star[num].style.top = dy + 'px';

		drop=1;
		newstar.style.display = "block";
		randomstar.style.display = "block";
		newstar.style.left = window.innerWidth - 120 + 'px';
		randomstar.style.left = window.innerWidth - 210 + 'px';
	};

	//랜덤 버튼
	random.onclick = function() {
		rsize.value = Math.floor(Math.random() * (45 - 4) + 5);
		rcolor.value = 45 - (Math.random() * 90);
		rsatur.value = Math.floor(Math.random() * (50 + 1) + 0);
		rbright.value = Math.floor(Math.random() * (70 - 29) + 30);
		rtexture.value = Math.floor(Math.random() * (10 + 1) + 0);

		rs = 'scale(' + rsize.value/25 + ',' + rsize.value/25 + ')';
		rc = 'hue-rotate(' + rcolor.value*4 + 'deg)';
		rb = 'brightness(' + rbright.value*2 + '%)';
		rsa = 'saturate(' + rsatur.value*4 + '%)';
		rt = 'url(images/tx.png) -' + rtexture.value * 130 + 'px 0';
		
		cstar.style['-webkit-transform'] = rs;
		cstar.style['-webkit-filter'] = rc+rsa+rb;
		cstar.style.background = rt;
	}

	randomstar.onclick = function() {
		random_make();
	};

    //new star 버튼
	newstar.onclick = function() {
		space.style.transition = '2s';
		custom.style.transition = '2s';
		space.style.opacity = "0";
		custom.style.display = "block";
		custom.style.opacity = "0";
		custom.style.opacity = "1";
		space.style['-webkit-transform'] = 'perspective(500px) translate3d(0,0,0)' + rx;
		space.style.left = '0px';
		space.style.top = '50px';
		ctimer=1;
		spacehidden();
	};

	//커스텀창 띄울때 스페이스 가리기
	var spacehidden = function(){
		if(ctimer<120&&ctimer!=0)requestAnimationFrame(spacehidden); ctimer++;
		if(ctimer==120){
			ctimer=0;
			if(custom.style.display=="block"){
				space.style.display="none";
			}
		};
	};


	close.onclick = function() {
		custom.style.display = "none";
		space.style.opacity = "1";
		space.style.display = "block";

		drop=0;
		newstar.style.display = "block";
		randomstar.style.display = "block";
		newstar.style.left = window.innerWidth - 120 + 'px';
		randomstar.style.left = window.innerWidth - 210 + 'px';
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
	};




	//3d로 전환 0.3초
	function into3d() {
		space.style.transition = '0.3s';
		var rx = 'rotateY(' + mx + 'deg) rotateX(' + my + 'deg)';
		space.style['-webkit-transform'] = 'perspective(500px) translate3d(0,0,'+z+'px)' + rx;
		timer++;
		if(timer<18&&timer!=0)requestAnimationFrame(into3d);
		if(timer==18){
			space.style.transition = '0s';
			drop=0;
			timer=0;
		};
	};


	window.onmousemove = function(e) {
		//행성 생성 후 마우스 따라가기
		//drop 1일땐 행성 위치이동 2일댄 붙여넣기와 3d전환 3일때 화면살펴보기
		if(drop>=1&&timer==0){ 
			space.style.transition = '0s';
			var dx = e.pageX - 65;
			var dy = e.pageY - 65;
			
			space.style['-webkit-transform'] = 'perspective(500px) translate3d(0,0,'+sz+'px)' + rx;
			star[num].style.left = dx + 'px';
			star[num].style.top = dy + 'px';


			drop=2;
		};

		//행성 위치 선정 후 화면 이동
		if(drop==0&&custom.style.display=="none"&&timer==0&&drag==false){


			mx =  window.innerWidth / 2 - e.pageX - spacex;
			mx = mx*(-0.05);
			my =  window.innerHeight / 2 - e.pageY - spacey;
			my = my*0.05;


			space.style.transition = 0;
		   	var rx = 'rotateY(' + mx + 'deg) rotateX(' + my + 'deg)';
		    space.style['-webkit-transform'] = 'perspective(500px) translate3d(0,0,'+z+'px)' + rx;
		}

		//드래그로 화면 이동
		else if(drop==0&&custom.style.display=="none"&&timer==0&&drag==true){



			space.style.transition = 0;
		   	var rx = 'rotateY(' + mx + 'deg) rotateX(' + my + 'deg)';
		    space.style['-webkit-transform'] = 'perspective(500px) translate3d(0,0,'+z+'px)' + rx;


			spacex = nowx - e.pageX;
			spacey = nowy - e.pageY;

			space.style.left = -spacex + 'px';
			space.style.top = -spacey + 'px';


			//origin 위치변경
			// var tfo = -spacex/window.innerWidth + '% ' + -spacey/window.innerHeight + '%'
			// space.style.transformOrigin = tfo;

		}else{
			//화면 기본상태로
			space.style.transition = 0.3;
			var rx = 'rotateY(' + 0 + 'deg) rotateX(' + 0 + 'deg)';
		    space.style['-webkit-transform'] = 'perspective(500px) translate3d(0,0,'+z+'px)' + rx;
		};




	};

	window.onmousedown = function(e) {
		//화면 드래그 시작
		if(drop==0&&custom.style.display=="none"&&timer==0){

			body.style.cursor = 'all-scroll';
			nowx = e.pageX + spacex;
			nowy = e.pageY + spacey;

			drag = true;
		};

		//행성 붙여넣기
		if(drop==2){


			var dx = e.pageX - 65;
			var dy = e.pageY - 65;
			star[num].style.left = dx + 'px';
			star[num].style.top = dy + 'px';
			num++;
			timer=1;

			mx = window.innerWidth / 2 - e.pageX;
			mx = - mx*0.03;
			my = window.innerHeight / 2 - e.pageY;
			my = my*0.05;


			into3d();
		};


	};

	window.onmouseup = function(e) {
		//화면 드래그 끝
		if(drop==0&&custom.style.display=="none"&&timer==0){

			body.style.cursor = 'default';			
			drag = false;
		};
	};





	//휠에 따른 반응
	window.onmousewheel = function(e) {
		var rx = 'rotateY(' + mx + 'deg) rotateX(' + my + 'deg)';
	   

	 //    if(drop==0&&custom.style.display=="none"&&timer==0){

		// 	if(e.wheelDelta==-120){
		// 		spacey += 30; space.style.top = spacey + 'px';
		// 	};
		// 	if(e.wheelDelta==120){
		// 		spacey -= 30; space.style.top = spacey + 'px';
		// 	};
		// };

		if(drop>=1&&timer==0){ 
			if(e.wheelDelta==-120)sz += 10;
			if(e.wheelDelta==120)sz -= 10;
			star[num].style['-webkit-transform'] = 'perspective(500px) translate3d(0,0,'+sz+'px)' + rs;
		};
    };

};


function random_make() {
		var obj = document.createElement('div');
		star.push(obj);
		star[num].id = "star"+[num];
		star[num].className = "star";

		rsize.value = Math.floor(Math.random() * (45 - 4) + 5);
		rcolor.value = 45 - (Math.random() * 90);
		rsatur.value = Math.floor(Math.random() * (50 + 1) + 0);
		rbright.value = Math.floor(Math.random() * (70 - 29) + 30);
		rtexture.value = Math.floor(Math.random() * (10 + 1) + 0);
				
		rs = 'scale(' + rsize.value/25 + ',' + rsize.value/25 + ')';
		rc = 'hue-rotate(' + rcolor.value*4 + 'deg)';
		rb = 'brightness(' + rbright.value*2 + '%)';
		rsa = 'saturate(' + rsatur.value*4 + '%)';
		rt = 'url(images/tx.png) -' + rtexture.value * 130 + 'px 0';

		star[num].style.width = "130px";
		star[num].style.height = "130px";
		star[num].style.borderRadius = "65px";
		star[num].style['-webkit-transform'] = rs;
		star[num].style['-webkit-filter'] = rc+rsa+rb;
		star[num].style.background = rt;

		var sz = (Math.random() * -200) + (Math.random() * 200);
		var dx = Math.random() * spacewidth;
		var dy = Math.random() * spaceheight;

		star[num].style['-webkit-transform'] = 'perspective(500px) translate3d(0,0,'+sz+'px)' + rs;
		star[num].style.left = dx + 'px';
		star[num].style.top = dy + 'px';

		space.appendChild(star[num]);

		num++;
		timer=0;
		drop=0;
		console.log('end');	
}



	//화면 살펴보기
// function spacelook() {
// 	if(drop==0&&custom.style.display=="none"&&timer==0&&window.onkeydown){
// 		if(up)spacez += 1.5;;
// 		if(down)spacez -= 1.5;;
// 		if(left)spacex += 1.5;;
// 		if(right)spacex -= 1.5;;
// 	// 	space.style.left = spacex+'px';
		

// 	 	var rx = 'rotateY(' + mx + 'deg) rotateX(' + my + 'deg)';
// 	 	space.style.left = spacex + 'px';
// 	 	space.style['-webkit-transform'] = 'perspective(500px) translate3d(0,0,'+spacez+'px)' + rx;	
// 		requestAnimationFrame(spacelook);
// 	};
// };


window.onkeydown = function(e) { 
	if(drop==0){
		
// 		//키를 눌렀을때 이동방향 설정
// 		if(e.keyCode==87)up=true;
// 		if(e.keyCode==68)right=true;
// 		if(e.keyCode==83)down=true;
// 		if(e.keyCode==65)left=true;
		
		if(e.keyCode==32)random_make();
		if(e.keyCode==17)ctrl=true();



// 		nowx = e.pageX + spacex;
// 		nowy = e.pageY + spacey;
// 		spacelook();
	};
};

window.onkeyup = function(e) { //키를 뗐을때 멈춤 설정 
// 	if(e.keyCode==87)up=false;
// 	if(e.keyCode==68)right=false;
// 	if(e.keyCode==83)down=false;
// 	if(e.keyCode==65)left=false;
};



window.onload = function() {
	init();
	// spacelook();
};
