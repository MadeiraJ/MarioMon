window.addEventListener("load", init, false);
//forçar animação ATINGIDO_TRAS_06 ou ATINGIDO_FRENTE_06 linha 360
//percorrer animação uma so vez linha 386

//rui
//atacar autocamitamente, audio, cena do controlos pagina inicial, sprite boss, 3 atAQUES


//joao
//pokemon escolhido e boss, pi iniciar jogo so no fim de carregar


var okS;
var fim;
var vencer;
var okF;
var okV;

var canvases={
    background:{
        canvas:null,
        drawingSurface:null
    },
    entities:{
        canvas:null,
        drawingSurface:null
    },
    components:{
        canvas:null,
        drawingSurface:null
    }
};
var GameSounds={MARIO:{},
    POKEMONS:{},
    POKEBALL:{},
    JOGO:{},
    AMBIENTE:{}
};


var xChao = [0,677,1444,2551,2949,3152,3413];
var xTubos = [1696,2259];
var xObstaculos = [
    [1829,1],
    [1877,2],
    [1925,3],
    [2577,1],
    [2625,2],
    [2673,3],
    [3437,3],
    [3485,2],
    [3533,3],
    [3581,4]
];

var xBlocos = [
    [350,1],
    [846,3],
    [1235,2],
    [1500,1],
    [2053,1],
    [2149,1],
    [2427,2],
    [2821,1]
];

var xInterrogacoes = [
    [398,0],
    [798,0],
    [886,150],
    [1035,0],
    [1548,0],
    [1721,150],
    [2101,0],
    [2103,150],
    [2677,150],
    [3199,0],
    [3169,150]
];

var xBarra = [
    [200,170],
    [290,250],
    [365, 325],
    [455, 405],
    [540, 490],
    [645, 585]
];

var body;
var bt_inicio;
var entrada;
var zonaJogo;
//var somInicio;
var camera=undefined;
var gameWorld=undefined;
var debugMode=true;
var entities = [];
var asPokebolas =[];
var chao=[];
var interrogacoes=[];
var blocos=[];
var tubos=[];
var obstaculos=[];
var animationHandler;
var teclas= new Array(255);
var oBackground;
var oMario;
var umAlakazam, umBlastoise, umCharizard, umRaichu, umCrobat;
var osPokemons = [];
var meuPokemons =[];
var check = [60,90,120,150,180];

var pokeAnda = [];

var barraEnergia = [];
//var tempoJogo = undefined;
var n=1;

var nPokeboll = 1;
var jaSom = false;

function init() {
    body = document.querySelector("body");
    entrada = document.querySelector("#entrada");
    bt_inicio = document.querySelector("#carregarJogo");
    zonaJogo = document.querySelector("#zonaJogo");
    carregar = document.querySelector("#carregar");
    okS = document.querySelector("#okS");
    okF = document.querySelector("#okF");
    fim = document.querySelector("#fim");
    okV = document.querySelector("#okV");
    vencer = document.querySelector("#ganhou");

    canvases.background.canvas = document.querySelector("#canvasFundo");
    canvases.background.drawingSurface= canvases.background.canvas.getContext("2d");

    canvases.entities.canvas = document.querySelector("#canvasEntidade");
    canvases.entities.drawingSurface= canvases.entities.canvas.getContext("2d");

    canvases.components.canvas = document.querySelector("#canvasComponentes");
    canvases.components.drawingSurface= canvases.components.canvas.getContext("2d");

    sprites();
    sons();

    //somInicio.play();

    bt_inicio.addEventListener("mousedown", iniciarJogo, false);
}

function sons(){
    gSoundManager.loadAsync("audio/inicio.mp3", function(som){GameSounds.AMBIENTE.FIRST=som;});
    gSoundManager.loadAsync("audio/inicio2.mp3", function(som){GameSounds.AMBIENTE.SECOND=som;});

    gSoundManager.loadAsync("audio/jump.mp3", function(som){GameSounds.MARIO.JUMP=som;});
    gSoundManager.loadAsync("audio/morte_mario.mp3", function(som){GameSounds.MARIO.DIE=som;});

    /*gSoundManager.loadAsync("audio/alakazam.mp3", function(som){GameSounds.POKEMONS.ALAKAZAM=som;});
     gSoundManager.loadAsync("audio/blastoise.mp3", function(som){GameSounds.POKEMONS.BLASTOISE=som;});
     gSoundManager.loadAsync("audio/charizard.mp3", function(som){GameSounds.POKEMONS.CHARIZARD=som;});
     gSoundManager.loadAsync("audio/crobat.mp3", function(som){GameSounds.POKEMONS.CROBAT=som; loaded;});
     gSoundManager.loadAsync("audio/raichu.mp3", function(som){GameSounds.POKEMONS.RAICHU=som; loaded;});
     gSoundManager.loadAsync("audio/mewtwo.mp3", function(som){GameSounds.POKEMONS.MEWTWO=som; loaded;});*/

    gSoundManager.loadAsync("audio/apanha_pokeball.mp3", function(som){GameSounds.POKEBALL.APANHAR=som;});
    gSoundManager.loadAsync("audio/catch.mp3",function(som){GameSounds.POKEBALL.CAPTURA=som;});

    gSoundManager.loadAsync("audio/ganhou.mp3", function(som){GameSounds.JOGO.VICTORY=som;});
    gSoundManager.loadAsync("audio/game_over.mp3",function(som){GameSounds.JOGO.GAMEOVER=som;});
}

function sprites(){
	var spBackground= new SpriteSheet();
    spBackground.load("assets//background.png", "assets//background.json",loaded);

    var spMario= new SpriteSheet();
    spMario.load("assets//mario.png", "assets//mario.json",loaded);

    var spEBackground = new SpriteSheet();
    spEBackground.load("assets//e_background.png", "assets//e_background.json",loaded);
    
    var spPokeball = new SpriteSheet();
    spPokeball.load("assets//pokeball.png", "assets//pokeball.json",loaded);

    var spAlakazam = new SpriteSheet();
    spAlakazam.load("assets//alakazam.png", "assets//alakazam.json",loaded);

    var spBlastoise = new SpriteSheet();
    spBlastoise.load("assets//blastoise.png", "assets//blastoise.json",loaded);

    var spCharizard = new SpriteSheet();
    spCharizard.load("assets//charizard.png", "assets//charizard.json",loaded);

    var spRaichu = new SpriteSheet();
    spRaichu.load("assets//raichu.png", "assets//raichu.json",loaded);
	
	var spCrobat = new SpriteSheet();
    spCrobat.load("assets//crobat.png", "assets//crobat.json",loaded);


    //gSoundManager.loadAsync("audio/jump.mp3", 	  function(so){GameSounds.MARIO.JUMP=so; loaded("audio/jump.mp3");});

    //gSoundManager.loadAsync("audio/bInterro.mp3", 	  function(so){GameSounds.EBACKGROUND.INTERROGACAO=so; loaded("audio/bInterro.mp3");});
}

function loaded(){
    if(Object.keys(gSpriteSheets).length<9)
        if(Object.keys(gSoundManager).length<7)return;
    oBackground = new Background(gSpriteSheets['assets//background.png'], 0, 0);

    gameWorld = new GameWorld(0,0,  oBackground.width,  oBackground.height);
    camera = new Camera (0, 0, canvases.background.canvas.width, canvases.background.canvas.height);

    canvases.background.canvas.width=950;
    canvases.background.canvas.height=oBackground.height;
    canvases.entities.canvas.width=950;
    canvases.entities.canvas.height=oBackground.height;
    canvases.components.canvas.width=950;
    canvases.components.canvas.height=oBackground.height;

    entities.push(oBackground);

    for(var i=0;i<xChao.length;i++){
        var x = i + 1;
        chao[i] = new EntiBackground(gSpriteSheets['assets//e_background.png'], xChao[i], oBackground.height, 'CHAO_' + x);
        entities.push(chao[i]);
    }

    var alturaPadrao = canvases.background.canvas.height-chao[0].height;
    var alturaPadraoSusp = alturaPadrao - 120;

    for(var i=0;i<xTubos.length;i++){
        var x = i + 1;
        tubos[i] = new EntiBackground(gSpriteSheets['assets//e_background.png'],xTubos[i],alturaPadrao,'TUBO_'+x);
        entities.push(tubos[i]);
    }

    for(var i=0;i<xObstaculos.length;i++){
        obstaculos[i] = new EntiBackground(gSpriteSheets['assets//e_background.png'],xObstaculos[i][0],alturaPadrao,'OBSTACULO_'+xObstaculos[i][1]);
        entities.push(obstaculos[i]);
    }

    for(var i=0;i<xBlocos.length;i++){
        blocos[i] = new EntiBackground(gSpriteSheets['assets//e_background.png'],xBlocos[i][0],alturaPadraoSusp,'BLOCO_'+xBlocos[i][1]);
        entities.push(blocos[i]);
    }

    for(var i=0;i<xInterrogacoes.length;i++){
        interrogacoes[i] = new EntiBackground(gSpriteSheets['assets//e_background.png'],xInterrogacoes[i][0],alturaPadraoSusp - xInterrogacoes[i][1],'INTERROGACAO_1'/*, GameSounds.EBACKGROUND*/);
        entities.push(interrogacoes[i]);
    }

    oMario = new Mario(gSpriteSheets['assets//mario.png'], 10, alturaPadrao, GameSounds.MARIO);
    oMario.width=50;
    oMario.height=80;
    oMario.scale(0.85);

    umAlakazam = new Pokemon(gSpriteSheets['assets//alakazam.png'], chao[1].x, alturaPadrao-95);
	umAlakazam.scale(1.5);

    umBlastoise = new Pokemon(gSpriteSheets['assets//blastoise.png'], obstaculos[2].x + obstaculos[2].width, alturaPadrao - 95);
	umBlastoise.scale(1.6);

	umCharizard = new Pokemon(gSpriteSheets['assets//charizard.png'], interrogacoes[2].x + interrogacoes[2].width, alturaPadraoSusp-250);
	umCharizard.scale(1.7);

	umRaichu =  new Pokemon(gSpriteSheets['assets//raichu.png'], interrogacoes[1].x , alturaPadrao - 258);
	umRaichu.scale(1.4); 
	
	umCrobat =  new Pokemon(gSpriteSheets['assets//crobat.png'], interrogacoes[6].x + interrogacoes[6].width , alturaPadraoSusp-250);
    umCrobat.scale(1.4); 

    entities.push(oMario);
    entities.push(umAlakazam);
    entities.push(umBlastoise);
    entities.push(umCharizard);
    entities.push(umRaichu);
	entities.push(umCrobat);
    osPokemons.push(umAlakazam);
    osPokemons.push(umBlastoise);
    osPokemons.push(umCharizard);
    osPokemons.push(umRaichu);
	osPokemons.push(umCrobat);

    nivel(canvases.components.drawingSurface);

    var barra = new InfoBar(xBarra[barraEnergia.length][0],25,xBarra[barraEnergia.length][1],7,60,60,canvases.components.drawingSurface,"pokeball");
    barraEnergia.push(barra);

    //tempoJogo = new TempoJogo(750,25,150,40,canvases.components.drawingSurface);
    update();
    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);
}

function nivel(ctx){
    var titulo = "";
    if(n==1){
        titulo="Nivel 1 - A apanha!";
    } else {
        titulo="Nivel 2 - A batalha!";
    }
    ctx.beginPath();
    ctx.rect(0, 0, 60, 40);
    ctx.font = "15px Verdana";
    ctx.strokeText(titulo, 10, 25);
    ctx.closePath();
    ctx.restore();
}

function keyDownHandler(e){
	var codTecla=e.keyCode;
	teclas[codTecla]=true;
    jaSom = false;
	if(codTecla == keyboard.SPACE) {
        oMario.podeLancar = true;
        if(n==2)
            umPokemon.podeAtacar = true;
    }

}

function keyUpHandler(e){
	var codTecla=e.keyCode;
	teclas[codTecla]=false;

    oMario.ficar();
    if(n==2)
        umPokemon.ficar();
}

function checkColisions() {
    choque(chao);
    choque(tubos);
    choque(obstaculos);
    choque(blocos);
    for (var i = 0; i < interrogacoes.length; i++) {
        var colisao = oMario.blockRectangle(interrogacoes[i]);
        if (!interrogacoes[i].killed) {
            if (colisao === "BOTTOM" && oMario.vy >= 0) {
                oMario.isOnGround = true;
                oMario.vy = -oMario.gravity;
            } else if (colisao === "LEFT" && oMario.vx <= 0) {
                oMario.vx = 0;
            } else if (colisao === "RIGHT" && oMario.vx >= 0) {
                oMario.vx = 0;
            } else if (colisao === "TOP" && oMario.vy <= 0 && !interrogacoes[i].jaFoi) {
                GameSounds.POKEBALL.APANHAR.play(false,1);
                oMario.vy = 0;
                interrogacoes[i].normal("INTERROGACAO_2");
                var umaPokeball = new Pokeball(gSpriteSheets['assets//pokeball.png'], interrogacoes[i].x + 14, interrogacoes[i].y - interrogacoes[i].height / 2);
                entities.push(umaPokeball);
                asPokebolas.push(umaPokeball);
            }
            if (colisao !== "BOTTOM" && oMario.vy > 0) {
                oMario.isOnGround = false;
            }
        }
    }

    for (var i = 0; i < asPokebolas.length; i++) {
        if(asPokebolas[i].active) {
            var colisao = oMario.blockRectangle(asPokebolas[i]);
            if ((colisao === "LEFT" || colisao === "RIGHT" || colisao === "BOTTOM") && !asPokebolas[i].jaFoi) {
                nPokeboll++;
                asPokebolas[i].jaFoi = true;
                barraEnergia[0].update(nPokeboll);
                asPokebolas[i].active = false;
                for (var j = 0; j < entities.length; j++) {
                    if (entities[j] == umaPokeball) {
                        if (umaPokeball.x == entities[j].x) {
                            entities[j].active = false;
                        }
                    }
                }
            }
        }
    }
	for (var i = osPokemons.length - 1; i >= 0; i--) {
        for (var j = pokeAnda.length - 1; j >= 0; j--) {
			if(pokeAnda[j].hitTestRectangle(osPokemons[i])){
                captura(osPokemons[i]);
            }
		}
	}
    /*for (var i = osPokemons.length - 1; i >= 0; i--) {
        if(osPokemons[i].hitTestRectangle(oMario) && !oMario.killed){
            GameSounds.MARIO.DIE.play(false,1);
            gameOver();
        }

    }*/


    for (var i = osPokemons.length - 1; i >= 0; i--) {
        for (var j = pokeAnda.length - 1; j >= 0; j--) {
            for (var k = blocos.length - 1; k >= 0; k--) {
                for (var m = interrogacoes.length - 1; m >= 0; m--) {
                    for (var a = tubos.length - 1; a >= 0; a--) {
                        if(pokeAnda[j].hitTestRectangle(osPokemons[i]) || pokeAnda[j].hitTestRectangle(blocos[k]) || pokeAnda[j].hitTestRectangle(interrogacoes[m]) || pokeAnda[j].hitTestRectangle(tubos[a]))
                            pokeAnda[j].active = false;
                    }
                }
            } 
        }    
    }

    /*if(oMario.y + oMario.height == canvases.entities.canvas.height){
        GameSounds.MARIO.DIE.play(false,1);
        gameOver();
    }*/
}

function captura(entidade){
    if(entidade.dir==1)entidade.atingidoFrente();
    else entidade.atingidoTras();
    var x = "";
    if(entidade == umAlakazam)
        x = "alakazam";
    else if(entidade == umBlastoise){
        x = "blastoise";
    }
    else if(entidade == umCharizard){
        x = "charizard";
    }
    else if(entidade == umRaichu){
        x = "raichu";
    }
    else if(entidade == umCrobat){
        x = "crobat";
    }
    GameSounds.POKEBALL.CAPTURA.play(false,1);
    meuPokemons.push(x);
    var barra = new InfoBar(xBarra[barraEnergia.length][0],25,xBarra[barraEnergia.length][1],7,60,60,canvases.components.drawingSurface, x);
    barraEnergia.push(barra);
    entidade.active = false;
}

function gameOver(){
    oMario.morrer();
	window.removeEventListener("keydown", keyDownHandler, false);
    window.removeEventListener("keyup", keyUpHandler, false);
	oMario.killed = true;
	oMario.vx =0;
	oMario.vy =0;
    fimJogo();
}

function choque(entidade){
    for(var i=0; i<entidade.length; i++){
        var colisao = oMario.blockRectangle(entidade[i]);
        if (colisao === "BOTTOM" && oMario.vy >= 0){
            oMario.isOnGround = true;
            oMario.vy = -oMario.gravity;
        } else if (colisao === "LEFT" && oMario.vx <= 0){
            oMario.vx=0;
        } else if (colisao === "RIGHT" && oMario.vx >= 0){
            oMario.vx=0;
        } else if (colisao === "TOP" && oMario.vy <= 0) {
            oMario.vy = 0;
        }
        if (colisao !== "BOTTOM" && oMario.vy > 0) {
            oMario.isOnGround = false;
        }
    }
}

function marioUpdate(){
	if(oMario.killed) return;
	if(oMario.y + oMario.height == canvases.background.canvas.height - chao[0].height) {
        oMario.isOnGround = true;
    }

    if(teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT]) {
        oMario.accelerationX = -0.2;
        oMario.friction = 0.96;
        oMario.recuar();
        oMario.dir=-1;
    }

    if(teclas[keyboard.RIGHT] && !teclas[keyboard.LEFT]) {
        oMario.accelerationX = 0.2;
        oMario.friction = 0.96;
        oMario.andar();
        oMario.dir=1;

    }

    if(teclas[keyboard.UP] && oMario.isOnGround) {
        oMario.vy += oMario.jumpForce;
        oMario.isOnGround = false;
        oMario.friction = 0.96;
    }

    if (teclas[keyboard.UP]){
        if(!jaSom) {
            GameSounds.MARIO.JUMP.play(false, 1);
            jaSom = true;
        }
        if(teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT]) {
            oMario.jumpInverse();
            oMario.accelerationX = -0.1;
        } else if(teclas[keyboard.RIGHT] && !teclas[keyboard.LEFT]) {
            oMario.jump();
            oMario.accelerationX = 0.1;
        } else {
            oMario.jump();
        }
    }

    if((!teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT])) {
        oMario.accelerationX = 0;
        oMario.friction = 0.90;
        oMario.gravity = 0.3;
    }

    oMario.vx += oMario.accelerationX;
    oMario.vy += oMario.accelerationY;

    if(oMario.isOnGround) {
        oMario.vx *= oMario.friction;
        if(teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT]) {
            oMario.recuar();
        } else if(teclas[keyboard.RIGHT] && !teclas[keyboard.LEFT]) {
            oMario.andar();
        } else {
            oMario.ficar();
        }
    }

    if (teclas[keyboard.SPACE]){
        GameSounds.MARIO.JUMP.play(false,1);
        if(oMario.podeLancar){
            oMario.podeLancar = false;
			if(nPokeboll>0) {
				if(teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT]) {
					oMario.lancarInverse();
				} else if(teclas[keyboard.RIGHT] && !teclas[keyboard.LEFT]) {
					oMario.lancar();
				} else {
					oMario.lancar();
				}
				var umaPokeball = new Pokeball(gSpriteSheets['assets//pokeball.png'], oMario.x, oMario.y);
				umaPokeball.atirar();
				entities.push(umaPokeball);
				pokeAnda.push(umaPokeball);
				nPokeboll--;
				barraEnergia[0].update(nPokeboll);
			}
		}
    }


    oMario.vy += oMario.gravity;

    if (oMario.vx > oMario.speedLimit) {
        oMario.vx = oMario.speedLimit;
    }
    if (oMario.vx < -oMario.speedLimit) {
        oMario.vx = -oMario.speedLimit;
    }
    if (oMario.vy > oMario.speedLimit * 2) {
        oMario.vy = oMario.speedLimit * 2;
    }


    oMario.x += oMario.vx;
    oMario.y += oMario.vy;

    checkColisions();

    if(oMario.x < 0){
        oMario.vx *= oMario.bounce;
        oMario.x = 0;
    }

    if(oMario.y < 0){
        oMario.vy *= oMario.bounce;
        oMario.y = 0;
    }

    if(oMario.y + oMario.height > canvases.entities.canvas.height){
        oMario.y = canvases.entities.canvas.height - oMario.height;
        oMario.isOnGround = true;
        oMario.vy = -oMario.gravity;
    }
    oMario.x = Math.max(0,Math.min(oMario.x+oMario.vx,gameWorld.width-oMario.width));

    if(oMario.x < camera.leftInnerBoundary()){
        oMario.x = camera.leftInnerBoundary();
    }

    if(oMario.right() > camera.rightInnerBoundary()) {
        camera.x = Math.floor(oMario.x + oMario.width - (camera.width * 0.90));
    }
}

function pokemonUpdate(entidade, limiteEsquerda, limiteDireita){
	if(entidade.killed)return;
    if(entidade.dir == 1 && entidade.x + entidade.width < limiteDireita){
	 	entidade.x +=2;
	 	entidade.andar(); 
	 } 	
	else if(entidade.dir == -1 && entidade.x > limiteEsquerda){
	 	entidade.x -=2;
	 	entidade.recuar();
	}
	else if(entidade.x + entidade.width >= limiteDireita){
		entidade.dir = -1;
	}
	else if(entidade.x <= limiteEsquerda){
		entidade.dir = 1;
	}
		
}

function update(){
    if(!oMario.killed){
     	marioUpdate();
        for(var i=0;i<osPokemons.length;i++){
            if(osPokemons[i] == umAlakazam){
                pokemonUpdate(umAlakazam, chao[1].x, (chao[1].x + chao[1].width));
            }
            if(osPokemons[i] == umBlastoise){
                pokemonUpdate(umBlastoise, obstaculos[2].x + obstaculos[2].width, tubos[1].x);
            }
            if(osPokemons[i] == umCharizard){
                pokemonUpdate(umCharizard, interrogacoes[2].x + interrogacoes[2].width, interrogacoes[5].x)
            }
            if(osPokemons[i] == umRaichu){
                pokemonUpdate(umRaichu, interrogacoes[1].x, interrogacoes[3].x + interrogacoes[1].width)
            }
			if(osPokemons[i] == umCrobat){
				pokemonUpdate(umCrobat, interrogacoes[6].x + interrogacoes[6].width, interrogacoes[8].x)
			}
        }
    }
    //manter a camara dentro dos limites do mundo
    if(camera.x < gameWorld.x)  camera.x = gameWorld.x;
    if(camera.y < gameWorld.y)  camera.y = gameWorld.y;
    if(camera.x + camera.width > gameWorld.x + gameWorld.width)  camera.x = gameWorld.x + gameWorld.width - camera.width;
    if(camera.y + camera.height > gameWorld.height) camera.y = gameWorld.height - camera.height;


    for (var i=0; i< entities.length;i++){
        entities[i].update();
    }

    clearArrays();
    render();
    if(gameWorld.x + gameWorld.width - 100 <= oMario.x + oMario.width) {
        oMario.ficar();
        oMario.vx = 0;
        oMario.vy = 0;
        canvases.components.drawingSurface.clearRect(0, 0, 950, 40);
        window.removeEventListener("keydown",keyDownHandler,false);
        window.removeEventListener("keyup",keyUpHandler,false);

        canvases.entities.canvas.style.filter = "blur(4px)";

        if(meuPokemons.length>0) {
            var novoNivel = document.createElement("div");
            novoNivel.setAttribute("id", "novoNivel");
            zonaJogo.appendChild(novoNivel);
            var titulo = document.createElement("h1");
            titulo.setAttribute("id", "nNTitulo");
            var value = document.createTextNode("Nivel 2 - A batalha!");
            titulo.appendChild(value);
            novoNivel.appendChild(titulo);
            var ePokemon = document.createElement("div");
            ePokemon.setAttribute("id", "ePokemon");
            novoNivel.appendChild(ePokemon);
            var label = document.createElement("label");
            label.setAttribute("id", "qual");
            var value1 = document.createTextNode("Escolha o seu pokemon para defrontar o boss");
            label.appendChild(value1);
            ePokemon.appendChild(label);


            for (var i = 0; i < meuPokemons.length; i++) {
                var imga = document.createElement("img");
                imga.setAttribute("id", "imgAla");
                var cami = "images/" + meuPokemons[i] + "I.png";
                imga.src = cami;
                imga.style.top = check[i] + "px";
                ePokemon.appendChild(imga);

                var label1 = document.createElement("label");
                label1.setAttribute("class", "nPokemon");
                label1.style.top = (check[i] + imga.height / 2 - 7) + "px";
                var value2 = document.createTextNode(meuPokemons[i]);
                label1.appendChild(value2);
                ePokemon.appendChild(label1);
                var radioInput1 = document.createElement('input');
                radioInput1.setAttribute('type', 'radio');
                radioInput1.setAttribute("class", "radio");
                radioInput1.setAttribute('name', "Poke");
                radioInput1.setAttribute('value', meuPokemons[i]);
                radioInput1.setAttribute('checked', 'true');
                radioInput1.style.top = (check[i] + imga.height / 2 - 7) + "px";
                ePokemon.appendChild(radioInput1);
            }

            var button = document.createElement('input');
            button.setAttribute('type', 'button"');
            button.setAttribute("id", "bOK");
            ePokemon.appendChild(button);

            button.addEventListener("mousedown", nextNivel, false);
            gSoundManager.stopAll();
            GameSounds.JOGO.VICTORY.play(false,1);
        } else {
            fimJogo();
        }
    } else {
        animationHandler=requestAnimationFrame(update, canvases.entities.canvas);
    }
}

function fimJogo(){
    fim.style.display = "block";
    okF.addEventListener("mousedown", final, false);
    GameSounds.AMBIENTE.FIRST.stop();
    GameSounds.JOGO.GAMEOVER.play(false,1);
}

function final(){
    location.reload();
}

function clearArrays(){
  	entities=entities.filter(filterByActiveProp);
  	osPokemons=osPokemons.filter(filterByActiveProp);
    pokeAnda=pokeAnda.filter(filterByActiveProp);
    chao=chao.filter(filterByActiveProp);
    blocos=blocos.filter(filterByActiveProp);
    tubos=tubos.filter(filterByActiveProp);
    interrogacoes=interrogacoes.filter(filterByActiveProp);
    obstaculos=obstaculos.filter(filterByActiveProp);
}

function filterByActiveProp(obj){
	if (obj.active == true) return obj;
}

function render(){
    canvases.entities.drawingSurface.clearRect(0, 0, canvases.entities.canvas.width, canvases.entities.canvas.height); //limpa canvas
    canvases.entities.drawingSurface.save();

    canvases.entities.drawingSurface.translate(-camera.x, -camera.y);

    for(var i=0; i<entities.length; i++){
        var entity=entities[i];
        if(!entity.active) return;
        var sprite = entity.getSprite();
        canvases.entities.drawingSurface.drawImage(
            entity.spriteSheet.img,
            sprite.x, sprite.y,
            sprite.width, sprite.height,
            Math.floor(entity.x), Math.floor(entity.y),
            entity.width, entity.height
        );
    }

    for (var i = 0; i < barraEnergia.length;  i++) {
        barraEnergia[i].render();
    }

    cancelAnimationFrame(animationHandler);

    canvases.entities.drawingSurface.restore();
}

function iniciarJogo(e){
    if(Object.keys(gSpriteSheets).length<9) {
        carregar.style.display = "block";
        okS.addEventListener("mousedown", inicial, false);
    } else {
        okS.removeEventListener("mousedown", inicial, false);
        entrada.style.display = "none";
        zonaJogo.style.display = "block";
    }
    GameSounds.AMBIENTE.FIRST.play(true, 0.5);}

function inicial(e){
    carregar.style.display = "none";
}