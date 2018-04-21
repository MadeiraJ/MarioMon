var escolhar;
var ePokemon;
var oEscolhido;
var umPokemon = undefined;
var umBoss = undefined;

var oBackgroundComb;
var chaoComb;
var blocoComb;
var entitiesComb = [];

var imge;

function nextNivel(e){
    barraEnergia = [];
    n=2;

    GameSounds.AMBIENTE.SECOND.play(true);

    escolhar = document.querySelector("#novoNivel");
    ePokemon = document.querySelector("#ePokemon");
    escolhar.style.display="none";
    canvases.entities.canvas.style.filter = "blur(0px)";

    canvases.background.drawingSurface.clearRect(0, 0,  canvases.background.canvas.width,  canvases.background.canvas.height);
    canvases.entities.drawingSurface.clearRect(0, 0, canvases.entities.canvas.width, canvases.entities.canvas.height);
    canvases.components.drawingSurface.clearRect(0, 0,  canvases.components.canvas.width,  canvases.components.canvas.height);

    qualPokemon();

    var spBackgroundComb = new SpriteSheet();
    spBackgroundComb.load("assets//backgroundComb.png", "assets//backgroundComb.json",loadedComb);

    var spBoss = new SpriteSheet();
    spBoss.load("assets//boss.png", "assets//boss.json",loadedComb);

    imge='assets//'+oEscolhido+'.png';
}

function qualPokemon(){
    for (var i = 0; i < ePokemon.children.length; i++) {
        if (ePokemon.children[i].checked != undefined){
            if (ePokemon.children[i].checked) {
                oEscolhido = ePokemon.children[i].value + "";
            }
        }
    }
}

function loadedComb() {
    if (Object.keys(gSpriteSheets).length < 2) return;

    oBackgroundComb = new Background(gSpriteSheets['assets//backgroundComb.png'], 0, 0);

    canvases.background.canvas.width=950;
    canvases.background.canvas.height=oBackgroundComb.height;
    canvases.entities.canvas.width=950;
    canvases.entities.canvas.height=oBackgroundComb.height;
    canvases.components.canvas.width=950;
    canvases.components.canvas.height=oBackgroundComb.height;

    chaoComb = new EntiBackground(gSpriteSheets['assets//backgroundComb.png'],0,canvases.background.canvas.height ,"CHAO_01");
    var alturaPadrao = canvases.background.canvas.height - chaoComb.height;
    var alturaPadraoSusp = alturaPadrao - 120;
    blocoComb = new EntiBackground(gSpriteSheets['assets//backgroundComb.png'],canvases.background.canvas.width/2-47,alturaPadraoSusp ,"BLOCO_01");

    umPokemon = new Pokemon(gSpriteSheets[imge], 10, alturaPadrao);
    if(oEscolhido=="alakazam"){
        umPokemon.scale(1.5);
    } else if (oEscolhido=="blastoise"){
        umPokemon.scale(1.6);
    } else if (oEscolhido=="charizard"){
        umPokemon.scale(1.7);
    } else if (oEscolhido=="raichu"){
        umPokemon.scale(1.4);
    } else if (oEscolhido=="crobat"){
        umPokemon.scale(1.4);
    }


    umBoss = new Boss(gSpriteSheets['assets//boss.png'], canvases.background.canvas.width - 120, alturaPadrao - 50);
    umBoss.width = 100;
    umBoss.scale(1.5);

    entitiesComb.push(oBackgroundComb);
    entitiesComb.push(chaoComb);
    entitiesComb.push(blocoComb);

    umPokemon.ficar();

    entitiesComb.push(umPokemon);
    entitiesComb.push(umBoss);

    oBackgroundComb.render(canvases.background.drawingSurface);
    chaoComb.render(canvases.background.drawingSurface);
    blocoComb.render(canvases.background.drawingSurface);

    nivel(canvases.components.drawingSurface);

    barraEnergia1=new BarraEnergia(10,40,150,20,canvases.components.drawingSurface,"black","black","red");
    criarIcon(180,40,"images/"+oEscolhido+"I.png");

    barraEnergia2=new BarraEnergia(canvases.components.canvas.width-160,40,150,20,canvases.components.drawingSurface,"black","black","blue");
    criarIcon(canvases.components.canvas.width-180,40,"images/bossI.png");

    updateComb();
    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);
}

function criarIcon(x,y,img){
    var imga = document.createElement("img");
    imga.setAttribute("id", "iconI");
    imga.src = img;
    imga.style.display = "none";
    body.appendChild(imga);

    var ima=document.getElementById("iconI");
    canvases.components.drawingSurface.drawImage(ima,0, 0, ima.width, ima.height, x, y, 24, 24);
}

function updateComb(){
    updatePoke(umPokemon);
    pokemonBoss(umBoss,0,canvases.entities.canvas.width);

    for (var i=0; i< entitiesComb.length;i++){
        entitiesComb[i].update();
    }

    clearArrays();
    renderComb();

    animationHandler=requestAnimationFrame(updateComb, canvases.entities.canvas);
}

function pokemonBoss(entidade, limiteEsquerda, limiteDireita) {
    if (entidade.killed)return;

    //console.log(umPokemon.x - (entidade.x + 100));
    if(!umPokemon.isColliding && !umBoss.isColliding){
        if ((entidade.x - (umPokemon.x + umPokemon.width) < 80) && (entidade.y + 1 <= (umPokemon.y + umPokemon.height))) {
            if (umPokemon.currState == "ATAQUE_FRENTE"){
                entidade.protegidoInverse();
            } else if ((umPokemon.currState == "ANDAR_FRENTE" || umPokemon.currState == "STAY_FRENTE" || umPokemon.currState == "STAY_TRAS") && !((entidade.x + entidade.width) - umPokemon.x < 80)) {
                entidade.ataqueTras();
                entidade.x -= 5;
            } else {
                a(entidade, limiteEsquerda, limiteDireita)
            }
        } else if (((entidade.x + 100) - umPokemon.x  < -80) && (entidade.y + 1<= (umPokemon.y + umPokemon.height))) {
            if (umPokemon.currState == "ATAQUE_TRAS"){
                entidade.protegido();
            } else if ((umPokemon.currState == "ANDAR_TRAS" || umPokemon.currState == "STAY_TRAS" || umPokemon.currState == "STAY_FRENTE") && !((entidade.x + 100) - umPokemon.x  < -80)){
                entidade.ataqueFrente();
                entidade.x += 5;
            } else {
                a(entidade, limiteEsquerda, limiteDireita)
            }
        } else{
            a(entidade, limiteEsquerda, limiteDireita)
        }
    }
}

function a(entidade, limiteEsquerda, limiteDireita){
    if (entidade.dir == 1 && entidade.x + entidade.width < limiteDireita) {
        entidade.x += 2;
        entidade.andar();
    }
    else if (entidade.dir == -1 && entidade.x > limiteEsquerda) {
        entidade.x -= 2;
        entidade.recuar();
    }
    else if (entidade.x + entidade.width >= limiteDireita) {
        entidade.dir = -1;
    }
    else if (entidade.x <= limiteEsquerda) {
        entidade.dir = 1;
    }
}

function updatePoke(entidade){
    if(entidade.killed) return;
    if(entidade.y + entidade.height == canvases.background.canvas.height - chaoComb.height) {
        entidade.isOnGround = true;
    }

    if(teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT]) {
        entidade.accelerationX = -0.2;
        entidade.friction = 0.96;
        entidade.recuar();
        entidade.dir=-1;
    }
    //Right
    if(teclas[keyboard.RIGHT] && !teclas[keyboard.LEFT]) {
        entidade.accelerationX = 0.2;
        entidade.friction = 0.96;
        entidade.andar();
        entidade.dir=1;

    }

    if(teclas[keyboard.UP] && entidade.isOnGround) {
        entidade.vy += entidade.jumpForce;
        entidade.isOnGround = false;
        entidade.friction = 0.96;
    }

    if (teclas[keyboard.UP]){
        if(teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT]) {
            entidade.ficarInverse();
            entidade.accelerationX = -0.1;
        } else if(teclas[keyboard.RIGHT] && !teclas[keyboard.LEFT]) {
            entidade.ficar();
            entidade.accelerationX = 0.1;
        } else {
            entidade.ficar();
        }
    }

    //Set the cat's acceleration, friction and gravity
    //to zero if none of the arrow keys are being pressed
    if((!teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT])) {
        entidade.accelerationX = 0;
        entidade.friction = 0.90;
        entidade.gravity = 0.3;
    }

    //Apply the acceleration
    entidade.vx += entidade.accelerationX;
    entidade.vy += entidade.accelerationY;

    //Apply friction
    if(entidade.isOnGround) {
        entidade.vx *= entidade.friction;
        if(teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT]) {
            entidade.recuar();
        } else if(teclas[keyboard.RIGHT] && !teclas[keyboard.LEFT]) {
            entidade.andar();
        } else {
            oMario.ficar();
        }
    }

    if (teclas[keyboard.SPACE]){
        if(entidade.podeAtacar){
            entidade.podeAtacar = false;
            if(teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT]) {
                entidade.ataqueTras();
            } else if(teclas[keyboard.RIGHT] && !teclas[keyboard.LEFT]) {
                entidade.ataqueFrente();
            } else {
                entidade.ataqueFrente();
            }
        }
    }

    //Apply gravity
    entidade.vy += entidade.gravity;

    //Limit the speed
    //Don't limit the upward speed because it will choke the jump effect.
    if (entidade.vx > entidade.speedLimit) {
        entidade.vx = entidade.speedLimit;
    }
    if (entidade.vx < -entidade.speedLimit) {
        entidade.vx = -entidade.speedLimit;
    }
    if (entidade.vy > entidade.speedLimit * 2) {
        entidade.vy = entidade.speedLimit * 2;
    }

    entidade.x += entidade.vx;
    entidade.y += entidade.vy;

    checkColisionsComb();
    //Bounce off the screen edges
    //Left
    if(entidade.x < 0){
        entidade.vx *= entidade.bounce;
        entidade.x = 0;
    }
    //Top
    if(entidade.y < 0){
        entidade.vy *= entidade.bounce;
        entidade.y = 0;
    }

    if(entidade.x + entidade.width > canvases.entities.canvas.width)
    {
        entidade.vx *= entidade.bounce;
        entidade.x = canvases.entities.canvas.width - entidade.width;
    }

    if(entidade.y + entidade.height > canvases.entities.canvas.height){
        entidade.y = canvases.entities.canvas.height - entidade.height;
        entidade.isOnGround = true;
        entidade.vy = -entidade.gravity;
    }
}

function checkColisionsComb() {
    choqueComb(umPokemon,blocoComb);
    choqueComb(umPokemon,chaoComb);
    choqueComb(umBoss,blocoComb);
    choqueComb(umBoss,chaoComb);

    var colisao = umPokemon.blockRectangle(umBoss);
    if ((colisao === "LEFT" || colisao === "RIGHT") && !umBoss.jaFoi) {
        umPokemon.isColliding=true;
        if(colisao === "LEFT"){
            umBoss.ficar();
            umPokemon.atingidoFrente();
        } else if (colisao === "RIGHT"){
            umBoss.ficarInverse();
            umPokemon.atingidoTras();
        }
        barraEnergia1.update(0);
        fimJogo();
    }

    var colisao2 = umBoss.blockRectangle(umPokemon);
    if ((colisao2 === "LEFT" || colisao2 === "RIGHT" || colisao2 === "BOTTOM") && !umPokemon.jaFoi) {
        umBoss.isColliding = true;
        umPokemon.isColliding = true;
        if (umPokemon.currState == "ATAQUE_FRENTE" || umPokemon.currState == "ATAQUE_TRAS"){
            if (umPokemon.currState == "ATAQUE_FRENTE") {
                if (colisao2 === "LEFT")
                    umBoss.atingidoFrente();
            } else if (umPokemon.currState == "ATAQUE_TRAS") {
                if (colisao2 === "RIGHT")
                    umBoss.atingidoTras();
            }
        }

        if(colisao2 === "BOTTOM"){
            if(umBoss.energia - 10 >= 10) {
                barraEnergia2.update(umBoss.energia - 10);
                if(umBoss.energia == 10){
                    ganhou();
                }
            }
        }
    }
}

function choqueComb(entidade,obstaculo){
    var colisao = entidade.blockRectangle(obstaculo);
    if (colisao === "BOTTOM" && oMario.vy >= 0){
        entidade.isOnGround = true;
        entidade.vy = -entidade.gravity;
    } else if (colisao === "LEFT" && entidade.vx <= 0){
        entidade.vx=0;
    } else if (colisao === "RIGHT" && entidade.vx >= 0){
        entidade.vx=0;
    } else if (colisao === "TOP" && entidade.vy <= 0) {
        entidade.vy = 0;
    }
    if (colisao !== "BOTTOM" && entidade.vy > 0) {
        entidade.isOnGround = false;
    }
}

function renderComb(){
    canvases.entities.drawingSurface.clearRect(0, 0, canvases.entities.canvas.width, canvases.entities.canvas.height); //limpa canvas

    for(var i=3; i<entitiesComb.length; i++){
        var entity=entitiesComb[i];
        if(entity.right() >0 && entity.bottom()>0 &&
            entity.left()< canvases.entities.canvas.width && entity.top()< canvases.entities.canvas.height){
            entitiesComb[i].render(canvases.entities.drawingSurface);
        }
    }

    barraEnergia1.render();
    barraEnergia2.render();

    cancelAnimationFrame(animationHandler);
}

function ganhou (){
    vencer.style.display = "block";
    okV.addEventListener("mousedown", final, false);
}