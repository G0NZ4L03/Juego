window.onload = function () {

    // 1. Declaración de variables
    let miNave;
    let miEnemigo;

    let disparos = [];
    let existeDisparo = false;

    let id;


    function generarNave () {
        miNave = new Nave(183, 545); 
    }

    function generarEnemigo () {
        miEnemigo = new Enemigo();
    }



    // 4. Funciones de dibujo
   function dibujarFondo() {
       ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarDisparo(disparo) {
        ctx.fillStyle = 'red';
        ctx.fillRect(disparo.x, disparo.y, DISPAROANCHO, DISPAROALTURA);
        disparo.y -= DISPAROVELOCIDAD;
    }

    function dibujarEnemigo() {
        miEnemigo.dibujarEnemigo(ctx);
    }

    function dibujarNave() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        miNave.dibujarNave(ctx);
    }

    // 5. Funciones de manejo de eventos
    function keyDown(evt) {
        switch (evt.keyCode) {
            case TECLAIZQ:
                miNave.moverNaveIzq(); 
                dibujarFondo();
                dibujarNave();
                console.log("mover izquierda");
                break;
            case TECLADRCH:
                miNave.moverNaveDrch();
                dibujarFondo();
                dibujarNave();
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
                x: miNave.x + NAVEANCHO / 2 + DISPAROANCHO,
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
        dibujarNave();
        dibujarEnemigo();
        // dibujarFondo();
        disparos = disparos.filter(disparo => disparo.y > TOPEARRIBA); // Eliminar disparos que han salido del canvas
        disparos.forEach(dibujarDisparo);
        if (disparos.length > 0) {
            requestAnimationFrame(actualizarDisparos);
        } else {
            existeDisparo = false;
        }
    }

    // 6. Configuración de boton de inicio
    document.getElementById("comenzarJuego").onclick = comenzarJuego;

    // 7. Función para comenzar el juego
    function comenzarJuego() {
        canvas = document.getElementById('miCanvas');
        ctx = canvas.getContext('2d');


        console.log("empieza el juego");
        generarNave();
        generarEnemigo(); 
        
        dibujarNave();
        dibujarEnemigo();
        
		id=setInterval(generaAnimación, 500 / 32);


        // Desactivar el botón para evitar múltiples llamadas
        document.getElementById("comenzarJuego").onclick = null;

        // Añadir el evento keydown
        window.addEventListener('keydown', keyDown, false);
    }
}