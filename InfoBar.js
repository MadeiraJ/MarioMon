var InfoBar = Component.extend(function(){
    this.pokebolas = 1;
    var _this=this;
    var prevPokebolas=-1;
    this.x2=0;
    this.y2=0;
    this.img="";
    this.direito = false;
    this.nivel="";
    var n = 0;
    //this.active = true;


    this.constructor= function(x1,y1,x2,y2,w,h,drawContext,img,direito/*,nivel*/) {
        this.super();
        this.x=x1;
        this.y=y1;
        this.x2=x2;
        this.y2=y2;
        this.width=w;
        this.height=h;
        this.ctx=drawContext;
        this.img=img;
        this.direito = direito;
       // this.nivel = nivel;
        this.update(1);
    };

    this.update=function(pokeLevel){
        if(pokeLevel<0)pokeLevel=0;
        this.pokebolas=pokeLevel;
    };

    this.render=function() {
        if (this.pokebolas == prevPokebolas)return;
        prevPokebolas = this.pokebolas;

        this.ctx.clearRect(this.x2-10, this.y2-10, this.width+10, this.height+10);
        this.ctx.save();
        //desenho do fundo

        this.ctx.beginPath();

        this.ctx.rect(this.x2-10, this.y2-10,this.width,this.height);
        this.ctx.font = "15px Verdana";
        this.ctx.strokeText(this.pokebolas, this.x, this.y);
        this.ctx.closePath();
        this.ctx.restore();

        if (this.img == "pokeball") {
            var umaPokeball = new Pokeball(gSpriteSheets['assets//pokeball.png'], this.x2, this.y2);
            umaPokeball.render(this.ctx);
        }else {
            var poke = 'assets//'+this.img+".png";
            var p = new Pokemon(gSpriteSheets[poke], this.x2, this.y2);
            p.scale(0.3);
            p.render(this.ctx);
        }
    };

    this.desativar=function(){
        this.ctx.rect(0, 0, 950 , 100);
        this.ctx.save();
    }
});
