window.onload = function() {

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


    //Imagenes
    const fondo = new Image();
    fondo.src = '/assets/fondo.png';
    const nave = new Image();
    nave.src = '/assets/naveImagen.png';
    
    // Captura del click del botón de html
    document.getElementById("comenzarJuego").onclick = comenzarJuego;

    // Función que se ejecuta al hacer click en el botón
    function comenzarJuego() { 
        console.log("El juego ha comenzado");
            dibujarFondo();
            dibujarNave();

            window.addEventListener('keydown', moverNave, false);
            window.addEventListener('keydown', disparo, false);
        }

    function dibujarFondo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
        console.log("Dibujando fondo");

    }

    function dibujarNave() {
        ctx.fillRect(naveX, naveY, naveAncho, naveAltura);
        ctx.drawImage(nave, naveX, naveY, naveAncho, naveAltura);
        console.log("Dibujando nave");

    }

    function moverNave(evt) {
        switch(evt.keyCode) {
            // Flecha izq
            case teclaIzq:
                if (naveX > TOPEIZQUIERDA) {
                    naveX = naveX - naveVelocidad;
                    console.log("Me muevo a la drch");
                }
                break;
            // Flecha derecha
            case teclaDrch:
                if (naveX < TOPEDERECHA - naveAncho) {
                    naveX = naveX + naveVelocidad;
                    console.log("Me muevo a la izq");
                }
                break;
        }
        dibujarFondo();
        dibujarNave();

    }

    function dibujarDisparo(disparo) {
        console.log("Dibujando disparo en", disparo.x, disparo.y);
        ctx.fillStyle = 'red';
        ctx.fillRect(disparo.x, disparo.y, disparoAncho, disparoAltura);
        disparo.y -= disparoVelocidad;
    }

    function actualizarDisparos() {
        console.log("Actualizando disparos");
        dibujarNave();
        disparos = disparos.filter(disparo => disparo.y > TOPEARRIBA); // Eliminar disparos que han llegado al tope
        disparos.forEach(dibujarDisparo);
        if (disparos.length > 0) {
            requestAnimationFrame(actualizarDisparos);
        }
    }

    function disparo(evt) {
        // Captura de la tecla espacio
        if (evt.keyCode == teclaEspacio) {
            console.log("Tecla espacio presionada");
            // Crear un nuevo disparo
            let nuevoDisparo = {
                x: naveX + naveAncho / 2 - disparoAncho / 2,
                y: naveY
            };
            
        }
    }
}