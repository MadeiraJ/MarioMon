var Mario = Entity.extend(function(){
  	this.currState=undefined; // estado atual;
  	var podeLancar=false;
	var vFrame=0;
  	var _this=this;
	this.morreuMesmo=false;

	this.accelerationX = 0;
	this.accelerationY = 0;
	this.speedLimit = 5;
	this.friction = 0.90;
	this.bounce = -0.7;
	this.gravity = 0.3;

	//Platform game properties
	this.isOnGround = undefined;
	this.jumpForce = -10;

	this.sounds=undefined;

  	this.states={
		ANDAR_FRENTE:'ANDAR_FRENTE',
		ANDAR_TRAS: 'ANDAR_TRAS',

		JUMP_FRENTE:'JUMP_FRENTE',
		JUMP_TRAS:'JUMP_TRAS',

		LANCAR_FRENTE: 'LANCAR_FRENTE',
		LANCAR_TRAS:'LANCAR_TRAS',

		MORRER_FRENTE:'MORRER_FRENTE',
		MORRER_TRAS:'MORRER_TRAS',

		STAY_FRENTE:'STAY_FRENTE',
		STAY_TRAS:'STAY_TRAS'
  	};
  
 /*
	this.constructor= function(spriteSheet,x, y,sounds){
		this.super();
		this.x=x;
		this.y=y;
		this.spriteSheet=spriteSheet;
		this.currState=this.states.STAY_FRENTE;
		this.currentFrame=0;
		this.sounds=sounds;
		setup();
	};*/

	this.constructor= function(spriteSheet,x, y){
		this.super();
		this.x=x;
		this.y=y;
		this.spriteSheet=spriteSheet;
		this.currState=this.states.STAY_FRENTE;
		this.currentFrame=0;
		setup();
	};

	this.update=function(){
		if(this.morreuMesmo) return;
		vFrame= vFrame < this.frames.length-1?vFrame+0.2:0;

		this.currentFrame=Math.floor(vFrame);

		if(this.currentFrame == this.frames.length-1 && (this.currState == this.states.MORRER_FRENTE || this.currState == this.states.MORRER_TRAS)) this.morreuMesmo = true;
		 //this.currentFrame=this.currentFrame< this.frames.length-1?this.currentFrame+1:0;
		this.width=this.frames[this.currentFrame].width;    //atualizar a altura
		this.height=this.frames[this.currentFrame].height;  // atualizar os

		this.resize();
	};

	this.getSprite=function(){
		return this.frames[this.currentFrame];
	};


	function setup(){

		_this.eStates['ANDAR_FRENTE']=_this.spriteSheet.getStats('ANDAR_FRENTE');
		_this.eStates['ANDAR_TRAS']=_this.spriteSheet.getStats('ANDAR_TRAS');

		_this.eStates['JUMP_FRENTE']=_this.spriteSheet.getStats('JUMP_FRENTE');
		_this.eStates['JUMP_TRAS']=_this.spriteSheet.getStats('JUMP_TRAS');

		_this.eStates['LANCAR_FRENTE']=_this.spriteSheet.getStats('LANCAR_FRENTE');
		_this.eStates['LANCAR_TRAS']=_this.spriteSheet.getStats('LANCAR_TRAS');

		_this.eStates['MORRER_FRENTE']=_this.spriteSheet.getStats('MORRER_FRENTE');
		_this.eStates['MORRER_TRAS']=_this.spriteSheet.getStats('MORRER_TRAS');

		_this.eStates['STAY_FRENTE']=_this.spriteSheet.getStats('STAY_FRENTE');
		_this.eStates['STAY_TRAS']=_this.spriteSheet.getStats('STAY_TRAS');

		_this.frames=_this.eStates[_this.currState];
		_this.width=_this.frames.width;  //atualizar a altura
		_this.height=_this.frames.height;  // atualizar a largura

	}


	this.andar=function(){
		toogleState(this.states.ANDAR_FRENTE);
	};

	this.recuar=function(){
		toogleState(this.states.ANDAR_TRAS);
	};

	this.jump=function(){
		toogleState(this.states.JUMP_FRENTE);
		//this.sounds.JUMP.play(true,0.25);
	};

	this.jumpInverse=function(){
		toogleState(this.states.JUMP_TRAS);
		//this.sounds.JUMP.play(true,0.25);
	};

	this.lancar=function(){
		toogleState(this.states.LANCAR_FRENTE);
	};

	this.lancarInverse=function(){
		toogleState(this.states.LANCAR_TRAS);
	};

	this.morrer=function(){
		toogleState(this.states.MORRER_FRENTE);
		this.y +=45;
	};

	this.morrerInverse=function(){
		toogleState(this.states.MORRER_TRAS);
		this.y +=45;
	};

	this.ficar= function(){
		toogleState(this.states.STAY_FRENTE);
	};

	this.ficarInverse= function(){
		toogleState(this.states.STAY_TRAS);
	};

	function toogleState(theState){
		if(_this.killed) return;
		if(_this.currState!=theState){
			_this.currState=theState;
			_this.frames=_this.eStates[theState];
			_this.currentFrame=0;
		}
	}
});


