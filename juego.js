window.onload = function() {

    const TOPEARRIBA = 600;
    const TOPEABAJO = 0;
    const TOPEIZQUIERDA = 0;
    const TOPEDERECHA = 400;

	let navePlayer;                    // Objeto nave base

    
    //Captura del click del botón de hmtl
    let botonJuego = document.getElementById("comenzarJuego").onclick = comenzarJuego;

    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (navePlayer) {
            dibujarNave();
        }
    }

    //Funcion crearnave
    function crearNave() {
        navePlayer = new nave();
        
    }

    //Funcion para dibujar la nave
    function dibujarNave() {
        navePlayer.dibujar();

    }

    //Funcion para mover la nave
    function moverNave() {
        navePlayer.mover();
    }
    

    //Dibujar el fondo del canvas
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/assets/fondo.png';
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    //Función que se ejecuta al hacer click en el botón
    function comenzarJuego(botonJuego) { 
        console.log("El juego ha comenzado");
        crearNave();
        dibujar();
        
    }


}
