var TempoJogo = Component.extend(function(){
  	var _this=this;
  	this.text="";
	var segundos = 0;
	var minutos = 0;
  	//var timer= undefined;
  	//var time;
  	var prevTime="";
 
  	this.constructor= function(x,y,w,h,drawContext/*,_text, _textColor, _borderColor,_fillColor, sCallback, eCallback*/){
	  	this.super();
	  	this.x=x;
	  	this.y=y;
	  	this.width=w;
	  	this.height=h;
	  	this.ctx=drawContext;
	  	//time=0;
	  	this.text="00:00";
  	};
  
  	this.start=function(){
	  	timer = setInterval(update,1000);
  	};

  	this.stop=function(){
		clearInterval(timer);
  	};
  
  	function update(){
		segundos ++;
		if (segundos < 10)
			segundos = "0"+segundos;
		if (minutos < 10)
			minutos = "0"+minutos;
		_this.text = minutos+":"+segundos;
		if (segundos == 59)
			segundos = -1;
		if (segundos == -1) {
			minutos++;
			/*if (minutos < 10)
				minutos = "0"+minutos;*/
		}
		if (minutos == 59)
			minutos = -1;
		// = time;
	}
  
  	this.render=function(){
	  	if(prevTime==this.text)return; // se n�o houve atualiza��es n�o se faz o render
	  	prevTime=this.text;
		this.ctx.clearRect(this.x, this.y, this.width, this.height);
		this.ctx.save();
		//desenho do fundo

		this.ctx.beginPath();

		this.ctx.rect(this.x, this.y , this.width , this.height);
		this.ctx.font = "15px Verdana";
		this.ctx.strokeText("Tempo de jogo: "+this.text, this.x, this.y);
		this.ctx.closePath();
		this.ctx.restore();
  	};
});


