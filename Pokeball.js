var  Pokeball = Entity.extend(function(){
	var _this=this;
	var vFrame=0;
	this.jaFoi = false;
	var estaAtirar =false;
  	this.states={
	  	BOLA:'BOLA'
  	};
  
  	this.constructor= function(spriteSheet,x,y, sounds){
	  	this.super();
	  	this.spriteSheet=spriteSheet; // spriteSheet
	  	this.x=x;  //posX inicial
	  	this.y=y;  // posY inicial
	  	this.currentState=this.states.BOLA;  //estado inicial
	  	this.currentFrame=0;  //frame inicial
	  	this.vx=3;
	  	this.vy=1;
	  	this.sounds=sounds;
 	  	setup();
  	};

	this.update=function(){
		vFrame= vFrame < this.frames.length-1?vFrame+0.1:0;
		
		if(estaAtirar){
			this.x-=this.vx;
			this.vx -=this.vx>0.8?0.2:0.5;
			this.y-=this.vy;
		}
		
		this.currentFrame=Math.floor(vFrame);
		//this.currentFrame=this.currentFrame< this.frames.length-1?this.currentFrame+1:0;
		this.width=this.frames[this.currentFrame].width;    //atualizar a altura
		this.height=this.frames[this.currentFrame].height;  // atualizar os

		this.resize();
	};
     
  	function setup(){
		_this.eStates[_this.states.BOLA]=_this.spriteSheet.getStats('BOLA');
		//_this.eStates[_this.states.ATINGIDO]=_this.spriteSheet.getStats('ATINGIDO');
 
    	_this.frames=_this.eStates[_this.currentState];
    	_this.width=_this.frames[0].width;
    	_this.height=_this.frames[0].height;
 	}
 
 	this.atirar = function(){
	  	if(!this.active) return;
	  	toogleState(this.states.BOLA);
		this.vx =0
		estaAtirar =true;
	 };
	/*
 	this.atingido = function(){
	  	if(!this.active) return;
	  	toogleState(this.states.ATINGIDO);
 	}*/
 
 	function toogleState(theState){
	  	if(_this.currState!=theState){
			_this.currState=theState;
			_this.frames=_this.eStates[theState];
			_this.currentFrame=0;
	  	}
  	}
});
