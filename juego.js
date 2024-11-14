window.onload = function() {

    const TOPEARRIBA = 600;
    const TOPEABAJO = 0;
    const TOPEIZQUIERDA = 0;
    const TOPEDERECHA = 400;


    
    //Captura del click del botón de hmtl
    let botonJuego = document.getElementById("comenzarJuego").onclick = comenzarJuego;

    //Función que se ejecuta al hacer click en el botón
    function comenzarJuego(botonJuego) { 
        alert("El juego ha comenzado")
    }


    //Dibujar el fondo del canvas
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/assets/fondo.png';
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

}
