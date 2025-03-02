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

    function generarNave() {
        miNave = new Nave(179, 545);
    }

    function generarNavesEnemigas() {
        let posicionX = 50;
        let posicionY = 100;
        for (let i = 0; i < 24; i++) {
            miEnemigo = new Enemigo(posicionX, posicionY);
            navesEnemigas.push(miEnemigo);
            posicionX += 40; // Espacio entre naves enemigas
            if (posicionX > canvas.width - 60) { // A 60px del borde se baja una fila
                posicionX = 50;
                posicionY += 50;
            }
        }
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
        for (let i = 0; i < navesEnemigas.length; i++) { // Dibujo cada enemigo que haya en el array
            navesEnemigas[i].dibujarEnemigo(ctx);
        }
    }

    function dibujarNave() {
        miNave.dibujarNave(ctx);
    }

    function movimientoEnemigos() {
        for (let i = 0; i < navesEnemigas.length; i++) {
            navesEnemigas[i].actualizarAnimacion();
        }
    };

    // 5. Funciones de manejo de eventos
    function keyDown(evt) {
        switch (evt.keyCode) {
            case TECLAIZQ:
                miNave.moverNaveIzq();
                console.log("mover izquierda");
                break;
            case TECLADRCH:
                miNave.moverNaveDrch();
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
                x: miNave.x + miNave.ancho / 2 - DISPAROANCHO / 2,
                y: miNave.y
            };
            disparos.push(nuevoDisparo);
            if (!existeDisparo) {
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
        console.log("Mi nave:", miNave); // Depuración
        console.log("Enemigos:", navesEnemigas);// Depuración

        // Compruebo colision de nave con enemigos y paro el juego
        if (heMuerto()) {
            estoyMuerto = true;
            console.log("He muerto");
            pararJuego();
        }
    }

    function heMuerto() {
        for (let i = 0; i < navesEnemigas.length; i++) {
            if (colision(miNave, navesEnemigas[i])) {
                return true;
            }
        }
        return false;
    }

    function colision(objeto1, objeto2) {
        console.log("Verificando colisión entre:", objeto1, objeto2); // Depuración
        if (objeto1.x < objeto2.x + objeto2.width &&
            objeto1.x + objeto1.width > objeto2.x &&
            objeto1.y < objeto2.y + objeto2.height &&
            objeto1.y + objeto1.height > objeto2.y) {
            return true;
        }
        return false;
    }

    function pararJuego() {
        clearInterval(frecuenciaJuego);
        clearInterval(frecuenciaSprite);
        console.log("Animaciones paradas");
    }

    document.getElementById("comenzarJuego").onclick = comenzarJuego;

    // 7. Función para comenzar el juego
    function comenzarJuego() {
        canvas = document.getElementById('miCanvas');
        ctx = canvas.getContext('2d');

        console.log("empieza el juego");
        console.log(navesEnemigas); // Depuración

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