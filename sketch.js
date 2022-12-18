//Parametros do background
let larguraFundo = 400;
let comprimentoFundo = 600;

//Parametros da bolinha
let eixoXbolinha = 300;
let eixoYbolinha = 200;
let diametroBolinha = 20;
let raioBolinha = diametroBolinha/2;

//Velocidade da bolinha
let velocidadeXbolinha = 2;
let velocidadeYbolinha = 2;

//Variaveis raquete player
let eixoXraquete = 5;
let eixoYraquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//Variaveis raquete oponente
let eixoXraqueteOponente = 585;
let eixoYraqueteOponente = 150;
let velocidadeYoponente;

//Placar do jogo
var pontosPlayer = 0;
var pontosOponente = 0;

//Sons do jogo
let trilha;
let ponto;
let raquetada;
function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(comprimentoFundo, larguraFundo);
  trilha.loop();
}

function draw() {
  background(0);// 0 equivale a cor preta
  marcarPonto();
  mostraPlacar();
  criarBolinha();
  criarRaquete(eixoXraquete,eixoYraquete);
  criarRaquete(eixoXraqueteOponente,eixoYraqueteOponente);
  movimentaBolinha();
  verificaColisaoBorda();
  verificaColisaoRaquete();    
  verificaColisaoRaqueteOponente();
  controleRaquete();
  movimentaRaqueteOponente();
  
  
  
}

function criarBolinha(){
  circle(eixoXbolinha,eixoYbolinha,diametroBolinha);
}
function criarRaquete(eixoX,eixoY){    rect(eixoX,eixoY,comprimentoRaquete,alturaRaquete);
}

function movimentaBolinha(){
  eixoXbolinha += velocidadeXbolinha;
  eixoYbolinha += velocidadeYbolinha;
}

function verificaColisaoBorda(){
  if (eixoXbolinha + raioBolinha > comprimentoFundo || eixoXbolinha - raioBolinha < 0) {
      velocidadeXbolinha *= -1;
  }
  if (eixoYbolinha + raioBolinha > larguraFundo || eixoYbolinha - raioBolinha < 0){
      velocidadeYbolinha *= -1;
  }
}

function controleRaquete(){
  //Controla a raquete pelas setas do teclado
  if(keyIsDown(UP_ARROW)){
    eixoYraquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    eixoYraquete += 10;
  }
  //Controla a raquete pelo mouse
  eixoYraquete = mouseY-alturaRaquete/2;
}

function verificaColisaoRaquete(){
  if(eixoXbolinha-raioBolinha < eixoXraquete+comprimentoRaquete/2 && eixoYbolinha-raioBolinha < eixoYraquete+alturaRaquete/2 && eixoYbolinha+raioBolinha > eixoYraquete-alturaRaquete/2){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}
function verificaColisaoRaqueteOponente(){
  if(eixoXbolinha+raioBolinha > eixoXraqueteOponente-comprimentoRaquete/2 && eixoYbolinha+raioBolinha < eixoYraqueteOponente+alturaRaquete && eixoYbolinha-raioBolinha > eixoYraqueteOponente-alturaRaquete){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  //Raquete controlada por AI
    velocidadeYoponente = eixoYbolinha - eixoYraqueteOponente - comprimentoRaquete / 2 - 30;
    eixoYraqueteOponente += velocidadeYoponente;
  
  //Raquete controlada por 2 jogador
    if (keyIsDown(87)){ //87 equivale a tecla W
        eixoYraqueteOponente -= 10;
    }
    if (keyIsDown(83)){ //83 equivale a tecla S
        eixoYraqueteOponente += 10;
    }
}

function mostraPlacar(){
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150,10,40,20);
  fill(255);
  text(pontosPlayer, 170, 26);
  fill(color(255, 140, 0));
  rect(450,10,40,20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcarPonto(){
  if (eixoXbolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
  if (eixoXbolinha > comprimentoFundo-10){
    pontosPlayer += 1;
    ponto.play();
  }
}