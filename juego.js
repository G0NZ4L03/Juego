window.onload = function() {

    const TOPEARRIBA = 600;
    const TOPEABAJO = 0;
    const TOPEIZQUIERDA = 0;
    const TOPEDERECHA = 400;

    const fondo = new Image();
    fondo.src = '/assets/fondo.png';
    const nave = new Image();
    nave.src = '/assets/naveImagen.png';

	let navePlayer;                    // Objeto nave base

    
    //Captura del click del botón de hmtl
    let botonJuego = document.getElementById("comenzarJuego").onclick = comenzarJuego;


    //funcion nave
    function crearNave(x_, y_) {
        this.x = x_;
        this.y = y_;
        this.velocidad = 3;
        
        this.tamañoX= 40;
        this.tamañoY= 40;
    }

    nave.prototype.Image= nave;
    nave = new nave(x, y);

    //Funcion para dibujar la nave
    function dibujarNave() {
        const canvas = document.getElementById('miCanvas');
        const ctx = canvas.getContext('2d');
        nave.onload = function() {
            ctx.drawImage(nave, 5, 5, 100,100);
        }

    }


    //Dibujar el fondo del canvas
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');
    fondo.onload = function() {
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
    }

    //Función que se ejecuta al hacer click en el botón
    function comenzarJuego(botonJuego) { 
        console.log("El juego ha comenzado");
        crearNave();
        
    }


}
