window.onload = function() {

    //Constantes bordes del canva
    const TOPEARRIBA = 600;
    const TOPEABAJO = 0;
    const TOPEIZQUIERDA = 0;
    const TOPEDERECHA = 400;

    const teclaDrch = 39;
    const teclaIzq = 37;
        
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');

    //Objeto nave
    let naveX = 180;
    const naveY = 560;
    const naveAncho = 40;
    const naveAltura = 34;
    let naveVelocidad = 10;


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
            window.addEventListener('keyup', pararNave, false);
    }

    function dibujarFondo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
    }

    function dibujarNave() {
        ctx.fillRect(naveX, naveY, naveAncho, naveAltura);
        ctx.drawImage(nave, naveX, naveY, naveAncho, naveAltura);
    }

    function moverNave(evt) {
        switch(evt.keyCode) {
            // Flecha izq
            case teclaIzq:
                if (naveX > TOPEIZQUIERDA) {
                    naveX -= naveVelocidad;
                }
                break;
            // Flecha derecha
            case teclaDrch:
                if (naveX < TOPEDERECHA - naveAncho) {
                    naveX += naveVelocidad;
                }
                break;
        }
        dibujarFondo();
        dibujarNave();
    }

    function pararNave(evt) {
        switch(evt.keyCode) {
            // Flecha izq
			case 37:
				teclaIzq = false;
				break;

			// Flecha derecha
			case 39:
				teclaDrch = false;
				break;
		}
        dibujarFondo();
        dibujarNave();
	}
    
}
