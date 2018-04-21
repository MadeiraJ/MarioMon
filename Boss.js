var Boss = Entity.extend(function(){
    this.currState=undefined; // estado atual;
    this.podeAtacar = true;
    var _this=this;
    var vFrame=0;
    this.energia=100;

    this.accelerationX = 0;
    this.accelerationY = 0;
    this.speedLimit = 5;
    this.friction = 0.90;
    this.bounce = -0.7;
    this.gravity = 0.3;

    //Platform game properties
    this.isOnGround = undefined;
    this.jumpForce = -10;

    this.states={
        ANDAR_FRENTE:'ANDAR_FRENTE',
        ANDAR_TRAS:'ANDAR_TRAS',

        ATAQUE_FRENTE:'ATAQUE_FRENTE',
        ATAQUE_TRAS:'ATAQUE_TRAS',

        ATINGIDO_FRENTE:'ATINGIDO_FRENTE',
        ATINGIDO_TRAS:'ATINGIDO_TRAS',

        STAY_FRENTE:'STAY_FRENTE',
        STAY_TRAS:'STAY_TRAS',

        PROTEGIDO_TRAS:'PROTEGIDO_TRAS',
        PROTEGIDO_FRENTE:'PROTEGIDO_FRENTE'
    };

    this.constructor= function(spriteSheet,x,y){
        this.super();
        this.x=x;
        this.y=y;
        this.spriteSheet=spriteSheet;
        this.currState=this.states.ANDAR_TRAS;
        this.currentFrame=0;
        setup();

    };

    this.update=function(){
        //se nao esta ativo nao se faz nada
        if(!this.active)return;
        //cena para não lagar as frames

        if((this.currState == this.states.ATINGIDO_FRENTE || this.currState == this.states.ATINGIDO_TRAS) && (this.currentFrame<this.frames.length-1)){
            vFrame= vFrame < this.frames.length-1?vFrame+0.01:0;
            this.currState = this.frames.length-1;
        }
        else{
            vFrame= vFrame < this.frames.length-1?vFrame+0.3:0;
        }

        this.currentFrame=Math.floor(vFrame);
        this.width=this.frames[this.currentFrame].width;    //atualizar a altura
        this.height=this.frames[this.currentFrame].height;  // atualizar os

        if(this.currState==this.states.ATINGIDO_FRENTE || this.currState==this.states.ATINGIDO_TRAS  && this.currentFrame==this.frames.length-1){
            this.active=false;
        }
        this.resize();
    };

    this.getSprite=function(){
        return this.frames[this.currentFrame];
    };

    function setup(){
        _this.eStates[_this.states.ANDAR_FRENTE]=_this.spriteSheet.getStats(_this.states.ANDAR_FRENTE);
        _this.eStates[_this.states.ANDAR_TRAS]=_this.spriteSheet.getStats(_this.states.ANDAR_TRAS);

        _this.eStates[_this.states.ATAQUE_FRENTE]=_this.spriteSheet.getStats(_this.states.ATAQUE_FRENTE);
        _this.eStates[_this.states.ATAQUE_TRAS]=_this.spriteSheet.getStats(_this.states.ATAQUE_TRAS);

        _this.eStates[_this.states.ATINGIDO_FRENTE]=_this.spriteSheet.getStats(_this.states.ATINGIDO_FRENTE);
        _this.eStates[_this.states.ATINGIDO_TRAS]=_this.spriteSheet.getStats(_this.states.ATINGIDO_TRAS);

        _this.eStates[_this.states.STAY_FRENTE]=_this.spriteSheet.getStats(_this.states.STAY_FRENTE);
        _this.eStates[_this.states.STAY_TRAS]=_this.spriteSheet.getStats(_this.states.STAY_TRAS);

        _this.eStates[_this.states.PROTEGIDO_TRAS]=_this.spriteSheet.getStats(_this.states.PROTEGIDO_TRAS);
        _this.eStates[_this.states.PROTEGIDO_FRENTE]=_this.spriteSheet.getStats(_this.states.PROTEGIDO_FRENTE);

        _this.frames=_this.eStates[_this.currState];
        _this.width=_this.frames[0].width;  //atualizar a altura
        _this.height=_this.frames[0].height;  // atualizar os
    }

    this.andar=function(){
        toogleState(this.states.ANDAR_FRENTE);
    };

    this.recuar=function(){
        toogleState(this.states.ANDAR_TRAS);
    };

    this.ataqueFrente=function(){
        toogleState(this.states.ATAQUE_FRENTE);
    };

    this.ataqueTras=function(){
        toogleState(this.states.ATAQUE_TRAS);
    };

    this.atingidoFrente=function(){
        toogleState(this.states.ATINGIDO_FRENTE);
    };

    this.atingidoTras=function(){
        toogleState(this.states.ATINGIDO_TRAS);
    };

    this.ficar= function(){
        toogleState(this.states.STAY_FRENTE);
    };

    this.ficarInverse= function(){
        toogleState(this.states.STAY_TRAS);
    };

    this.protegido= function(){
        toogleState(this.states.PROTEGIDO_FRENTE);
    };

    this.protegidoInverse= function(){
        toogleState(this.states.PROTEGIDO_TRAS);
    };

    function toogleState(theState){
        if(_this.killed) return;// se ja foi atingido n�o se pode mudar o estado
        if(_this.currState!=theState){
            _this.currState=theState;
            _this.frames=_this.eStates[theState];
            _this.currentFrame=0;
            vFrame=0;
        }
    }
});



