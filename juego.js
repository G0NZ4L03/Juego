window.onload = function () {

    // 1. Declaración de variables
    let miNave;
    let miEnemigo;
    let frecuenciaJuego;
    let frecuenciaSprite;

    let direccionHorda = 1; // 1: derecha, -1: izquierda
    let navesDestruidas = 0;
    let nivel = 1;

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
            // Aumenta la velocidad según el nivel
            miEnemigo.velocidad += (nivel - 1) * 0.9;
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
        navesEnemigas.forEach(enemigo => {
            enemigo.actualizarAnimacion();
        });
    }


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
                y: miNave.y,
                ancho: DISPAROANCHO,
                alto: DISPAROALTURA,
            };
            disparos.push(nuevoDisparo);
            if (!existeDisparo) {
                existeDisparo = true;
                actualizarDisparos();
            }
        }
    }

    function moverHorda() {
        // Calcular si algún enemigo toca el borde
        let tocaBorde = false;
        // Mover todos los enemigos en la dirección de la horda
        navesEnemigas.forEach(enemigo => {
            enemigo.x += direccionHorda * enemigo.velocidad;
            if (enemigo.x + enemigo.tamañoX >= canvas.width || enemigo.x <= 0) {
                tocaBorde = true;
            }
        });
        // Si algún enemigo toca el borde, cambiar dirección y bajar la horda
        if (tocaBorde) {
            direccionHorda *= -1;
            navesEnemigas.forEach(enemigo => {
                enemigo.y += BAJADAENEMIGO; // Bajar la horda
                enemigo.velocidad += 0.15; // Aumento de dificultad aumentando velocidad
            });
        }

    }

    function actualizarDisparos() {
        if (estoyMuerto) return;

        disparos = disparos.filter(disparo => disparo.y > TOPEARRIBA); // Eliminar disparos que han salido del canvas

        disparos.forEach(dibujarDisparo);
        if (disparos.length > 0) {
            requestAnimationFrame(actualizarDisparos);
        } else {
            existeDisparo = false;
        }
    }

    function generaAnimación() {

        if (heMuerto()) {
            estoyMuerto = true;
            console.log("He muerto");
            pararJuego();

            // Repintar canvas al morir
            // Pintar fondo negro
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Pintar GAME OVER
            ctx.fillStyle = "white";
            ctx.font = "48px Arial";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, 150);

            return;
        }
        // Si no estoy muerto y he matado a todos los enemigos, subo de nivel
        if (navesEnemigas.length === 0) {
            nivel++;
            document.getElementById("nivel").textContent = "Nivel: " + nivel;
            generarNavesEnemigas();
        }
        dibujarFondo();
        dibujarNave();
        moverHorda();
        dibujarEnemigo();
        detectarColisionesDisparos();

        console.log("Mi nave:", miNave); // Depuración
        console.log("Enemigos:", navesEnemigas);// Depuración

    }

    function heMuerto() {
        for (let i = 0; i < navesEnemigas.length; i++) {
            if (colision(miNave, navesEnemigas[i])) {
                return true;
            }
        }
        return false;
    }

    function detectarColisionesDisparos() {
        let enemigosAEliminar = [];
        let disparosAEliminar = [];

        disparos.forEach((disparo, i) => {
            navesEnemigas.forEach((enemigo, j) => {
                if (colision(disparo, enemigo)) {
                    enemigosAEliminar.push(j);
                    disparosAEliminar.push(i);
                    navesDestruidas++;
                    document.getElementById("navesDestruidas").textContent = "Naves Destruidas: " + navesDestruidas;
                }
            });
        });

        // Eliminar enemigos y disparos SIN errores en los índices
        navesEnemigas = navesEnemigas.filter((_, idx) => !enemigosAEliminar.includes(idx));
        disparos = disparos.filter((_, idx) => !disparosAEliminar.includes(idx));
    }

    function colision(objeto1, objeto2) {
        // Englobo las propiedades de ancho y alto para que funcione con mis distintos objetos
        const ancho1 = objeto1.ancho || objeto1.width || objeto1.tamañoX;
        const alto1 = objeto1.alto || objeto1.height || objeto1.tamañoY;
        const ancho2 = objeto2.ancho || objeto2.width || objeto2.tamañoX;
        const alto2 = objeto2.alto || objeto2.height || objeto2.tamañoY;

        if (
            objeto1.x < objeto2.x + ancho2 &&
            objeto1.x + ancho1 > objeto2.x &&
            objeto1.y < objeto2.y + alto2 &&
            objeto1.y + alto1 > objeto2.y
        ) {
            return true;
        }
        return false;
    }

    // Función para guardar la puntuación
    function guardarPuntuacion(puntos) {
        let puntuaciones = JSON.parse(localStorage.getItem('puntuacionesAltas')) || [];
        puntuaciones.push(puntos);
        puntuaciones.sort((a, b) => b - a); // Ordenar de mayor a menor
        puntuaciones = puntuaciones.slice(0, 5); // Solo las 5 mejores
        localStorage.setItem('puntuacionesAltas', JSON.stringify(puntuaciones));
    }

    // Función para mostrar las puntuaciones en el HTML
    function mostrarPuntuacionesAltas() {
        let puntuaciones = JSON.parse(localStorage.getItem('puntuacionesAltas')) || [];
        let lista = document.getElementById('listaPuntuacionesAltas');
        lista.innerHTML = '';
        puntuaciones.forEach(puntos => {
            let li = document.createElement('li');
            li.textContent = puntos + ' naves destruidas';
            lista.appendChild(li);
        });
    }

    function pararJuego() {
        estoyMuerto = true;
        clearInterval(frecuenciaJuego);
        clearInterval(frecuenciaSprite);
        disparos = [];
        console.log("Animaciones paradas");

        // Guardo puntuación en localStorage
        guardarPuntuacion(navesDestruidas);
        mostrarPuntuacionesAltas();
    }

    mostrarPuntuacionesAltas();
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