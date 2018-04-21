var EntiBackground = Entity.extend(function(){
  	var _this=this;
  	this.state = undefined;
	this.jaFoi = false;

	this.sounds=undefined;

 	this.constructor= function(spriteSheet,x,y,state/*,sounds*/){
	  	this.super();
		this.x=x;
		this.y=y;
		this.spriteSheet=spriteSheet;
		this.vx=0;
		this.vy=0;
		this.state=state;
		//this.sounds=sounds;
	  	setup();
  	};

	this.update=function(){
		this.x+=this.vx;
	};

  	setup=function(){
		var	estado = _this.state.substring(0,_this.state.length-2);
		_this.eStates[estado]=_this.spriteSheet.getStats(_this.state);
		_this.frames=_this.eStates[_this.state.substring(0,_this.state.length-2)];
		_this.width=_this.frames[0].width;
		_this.height=_this.frames[0].height;
		_this.y -= _this.height;
  	};

	this.normal= function(oState){
		toogleState(oState);
	};

	function toogleState(theState){
		var aState = theState.substring(0,theState.length-2);
		if(_this.killed) return;
		if(_this.state!=aState){
			_this.eStates[aState]=_this.spriteSheet.getStats(theState);
			_this.frames=_this.eStates[aState];
		}
	}
}
);


