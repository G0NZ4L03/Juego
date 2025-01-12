window.onload = function () {

    // 1. Declaración de variables
    let miNave;
    let miEnemigo;
    let frecuenciaJuego;
    let frecuenciaSprite;

   //Variables canvas
   let canvas;
   let ctx;
 
    let disparos = [];
    let existeDisparo = false;

	let navesEnemigas = [];      // Array con todas las naves enemigas

    let estoyMuerto = false;







    function generarNave () {
        miNave = new Nave(179, 545); 
    }

    function generarNavesEnemigas() {
        miEnemigo = new Enemigo(100,200);

        navesEnemigas.push(miEnemigo);
    }

    // 4. Funciones de dibujo
   function dibujarFondo() {
       ctx.fillStyle = '#00137A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarDisparo(disparo) {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(disparo.x, disparo.y, DISPAROANCHO, DISPAROALTURA);
        disparo.y -= DISPAROVELOCIDAD;
    }

    function dibujarEnemigo() {
        miEnemigo.dibujarEnemigo(ctx);
    }

    function dibujarNave() {  
        miNave.dibujarNave(ctx);
    }

function movimientoEnemigos() {
    miEnemigo.actualizarAnimacion();

    };


    // 5. Funciones de manejo de eventos
    function keyDown(evt) {
        switch (evt.keyCode) {
            case TECLAIZQ:
                miNave.moverNaveIzq(); 
                // dibujarFondo();
                // dibujarNave();
                console.log("mover izquierda");
                break;
            case TECLADRCH:
                miNave.moverNaveDrch();
                // dibujarFondo();
                // dibujarNave();
                console.log("mover derecha");
                break;
            case TECLAESPACIO:
                disparo(evt);
                break;
        }
        dibujarEnemigo();
        dibujarNave();
    }

    function reproducirSonidoDisparo() {
        SONIDODISPARO.currentTime = 0;
        SONIDODISPARO.play();
    }

    function disparo(evt) {
        if (evt.keyCode == TECLAESPACIO) {
            reproducirSonidoDisparo();
            console.log("funcion disparo llamada");
            let nuevoDisparo = {
                x: miNave.x + miNave.ancho / 2 - DISPAROANCHO /2,
                y: miNave.y
            };
            disparos.push(nuevoDisparo);
            if(!existeDisparo){
                existeDisparo = true;
                actualizarDisparos();
            }
        }
    }

    function actualizarDisparos() {
        disparos = disparos.filter(disparo => disparo.y > TOPEARRIBA); // Eliminar disparos que han salido del canvas
        
        disparos.forEach(dibujarDisparo);
        if (disparos.length > 0) {
            requestAnimationFrame(actualizarDisparos);
        } else {
            existeDisparo = false;
        }
    }

    function generaAnimación() {    
        dibujarFondo();
        dibujarNave();
        dibujarEnemigo();

    }   

function heMuerto() {
    do{
        if (colision(miNave, miEnemigo)) {
            estoyMuerto = true;
            console.log("he muerto");
        }
    }
    while (!estoyMuerto);
}
    function colision(disparo, enemigo) {
        // Aquí puedes definir la lógica de colisión, por ejemplo:
        return disparo.x < enemigo.x + enemigo.width &&
               disparo.x + disparo.width > enemigo.x &&
               disparo.y < enemigo.y + enemigo.height &&
               disparo.y + disparo.height > enemigo.y;

    }

    document.getElementById("comenzarJuego").onclick = comenzarJuego;

    // 7. Función para comenzar el juego
    function comenzarJuego() {
        canvas = document.getElementById('miCanvas');
        ctx = canvas.getContext('2d');


        console.log("empieza el juego");
        generarNave();
        generarNavesEnemigas(); 
        
        dibujarFondo();
        dibujarNave();
        dibujarEnemigo();
        
        //frecuencia de refresco
		frecuenciaJuego = setInterval(generaAnimación, 1000 / 60);
		frecuenciaSprite = setInterval(movimientoEnemigos, 1000 / 3);


        // Desactivar el botón para evitar múltiples llamadas
        document.getElementById("comenzarJuego").onclick = null;

        // Añadir el evento keydown
        window.addEventListener('keydown', keyDown, false);
    }
}