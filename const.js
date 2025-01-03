//Canvas
const TOPEABAJO = 600;
const TOPEARRIBA = 0;
const TOPEIZQUIERDA = 0;
const TOPEDERECHA = 400;

//Teclas
const TECLADRCH = 39;
const TECLAIZQ = 37;
const TECLAESPACIO = 32;

//Objeto nave
const NAVEANCHO = 40;
const NAVEALTURA = 34;
const NAVEVELOCIDAD = 10;

// Objeto disparo
//const DISPAROX = naveX + NAVEANCHO / 2;
//let disparoY = NAVEY;
const DISPAROANCHO = 3;
const DISPAROALTURA = 15;
const DISPAROVELOCIDAD = 5;

//Objeto enemigo
const BAJADAENEMIGO = 20;
const SONIDODISPARO = new Audio('/assets/sonidos/disparo.mp3');

//Variables canvas
let canvas;
let ctx;