window.onload = function() {

// 1. Declaración de variables y constantes globales

    //Constantes bordes del canva
    const TOPEARRIBA = 600;
    const TOPEABAJO = 0;
    const TOPEIZQUIERDA = 0;
    const TOPEDERECHA = 400;

    const teclaDrch = 39;
    const teclaIzq = 37;
    const teclaEspacio = 32;
        
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');

    //Objeto nave
    let naveX = 180;
    const naveY = 560;
    const naveAncho = 40;
    const naveAltura = 34;
    let naveVelocidad = 10;

    //Objeto disparo

    const disparoX = naveX + naveAncho / 2;
    let disparoY = naveY;
    const disparoAncho = 5;
    const disparoAltura = 10;
    const disparoVelocidad = 10;

    let disparos = [];

const fondo = new Image();
fondo.src = '/assets/fondo.png';

// 2. Definición de la clase nave y sus métodos
function nave() {
    this.x = naveX;
    this.y = naveY;
    this.ancho = naveAncho;
    this.altura = naveAltura;
    this.velocidad = naveVelocidad;
    this.imagen = new Image();
    this.imagen.src = '/assets/naveImagen.png';
}

nave.prototype.dibujarNave = function(ctx) {
    console.log("Dibujando nave en", this.x, this.y);
    ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.altura);
}

nave.prototype.moverNaveDrch = function() {
    if (this.x < canvas.width - this.ancho) {
        this.x += this.velocidad;
        console.log("Me muevo a la drch", this.x);
    }
}

nave.prototype.moverNaveIzq = function() {
    if (this.x > 0) {
        this.x -= this.velocidad;
        console.log("Me muevo a la izq", this.x);
    }
}

let miNave = new nave();

// 3. Funciones de dibujo
function dibujarFondo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
}

function dibujarNave() {
    miNave.dibujarNave(ctx);
}

function dibujarDisparo(disparo) {
    ctx.fillStyle = 'red';
    ctx.fillRect(disparo.x, disparo.y, disparoAncho, disparoAltura);
    disparo.y -= disparoVelocidad;
}

// 4. Funciones de manejo de eventos
function keyDownHandler(evt) {
    console.log("Key down", evt.keyCode);
    switch (evt.keyCode) {
        case teclaIzq:
            miNave.moverNaveIzq();
            break;
        case teclaDrch:
            miNave.moverNaveDrch();
            break;
    }
    dibujarFondo();
    dibujarNave();
}

function keyUpHandler(evt) {
    switch (evt.keyCode) {
        case teclaIzq:
            // Detener movimiento izquierda
            break;
        case teclaDrch:
            // Detener movimiento derecha
            break;
    }
}

function disparo(evt) {
    if (evt.keyCode == teclaEspacio) {
        let nuevoDisparo = {
            x: miNave.x + naveAncho / 2 - disparoAncho / 2,
            y: miNave.y
        };
        disparos.push(nuevoDisparo);
        actualizarDisparos();
    }
}

function actualizarDisparos() {
    dibujarFondo();
    dibujarNave();
    disparos = disparos.filter(disparo => disparo.y > TOPEABAJO); // Eliminar disparos que han salido del canvas
    disparos.forEach(dibujarDisparo);
    if (disparos.length > 0) {
        requestAnimationFrame(actualizarDisparos);
    }
}

// 5. Configuración de eventos
document.getElementById("comenzarJuego").onclick = comenzarJuego;

// 6. Función para comenzar el juego
function comenzarJuego() { 
    console.log("El juego ha comenzado");
    dibujarFondo();
    dibujarNave();

    window.addEventListener('keydown', keyDownHandler, false);
    window.addEventListener('keyup', keyUpHandler, false);
    window.addEventListener('keypress', disparo, false);
}
}