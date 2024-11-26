window.onload = function () {

    // 1. Declaración de variables y constantes globales

    //Bordes del canva
    const TOPEABAJO = 600;
    const TOPEARRIBA = 0;
    const TOPEIZQUIERDA = 0;
    const TOPEDERECHA = 400;

    //Teclas
    const teclaDrch = 39;
    const teclaIzq = 37;
    const teclaEspacio = 32;

    //Canvas y su contexto
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');

    //Objeto nave
    let naveX = 180;
    const naveY = 560;
    const naveAncho = 40;
    const naveAltura = 34;
    let naveVelocidad = 20;

    //Objeto disparo
    const disparoX = naveX + naveAncho / 2;
    let disparoY = naveY;
    const disparoAncho = 3;
    const disparoAltura = 15;
    const disparoVelocidad = 1;

    let disparos = [];
    let existeDisparo = false;

    //Objeto enemigo
    const enemigoX = 80;
    const enemigoY = 50;
    const enemigoAncho = 260;
    const enemigoAltura = 180;
    const enemigoVelocidad = 10;
    

    //Imagen de fondo
    const fondo = new Image();
    fondo.src = '/assets/fondo.png';

    // 2. Definición de la clase nave y sus métodos en el prototipo
    function nave() {
        this.x = naveX;
        this.y = naveY;
        this.ancho = naveAncho;
        this.altura = naveAltura;
        this.velocidad = naveVelocidad;
        this.imagen = new Image();
        this.imagen.src = '/assets/nave2.png';
    }

    nave.prototype.dibujarNave = function (ctx) {
        ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.altura);
    }

    nave.prototype.moverNaveDrch = function () {
        if (this.x < canvas.width - this.ancho) {
            this.x += this.velocidad;
        }
    }

    nave.prototype.moverNaveIzq = function () {
        if (this.x > 0) {
            this.x -= this.velocidad;
        }
    }


    let miNave = new nave();


    // 3. Definición de la clase enemigo y sus métodos en el prototipo

    function enemigo() {
        this.x = enemigoX;
        this.y = enemigoY;
        this.ancho = enemigoAncho;
        this.altura = enemigoAltura;
        this.velocidad = enemigoVelocidad;
        this.imagen = new Image();
        this.imagen.src = 'assets/enemigos.png';
    }

    enemigo.prototype.dibujarEnemigo = function (ctx) {
        ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.altura);
    }

    enemigo.prototype.moverEnemigoDrch = function () {
        if (this.x < canvas.width - this.ancho) {
            this.x += this.velocidad;
        }
    }

    enemigo.prototype.moverEnemigoIzq = function () {
        if (this.x > 0) {
            this.x -= this.velocidad;
        }
    }


    let mienemigo = new enemigo();

    // 4. Funciones de dibujo
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

    function dibujarEnemigo() {
        mienemigo.dibujarEnemigo(ctx);
    }

    // 5. Funciones de manejo de eventos
    function keyDown(evt) {
        switch (evt.keyCode) {
            case teclaIzq:
                miNave.moverNaveIzq();
                console.log("mover izquierda");
                break;
            case teclaDrch:
                miNave.moverNaveDrch();
                console.log("mover derecha");
                break;
            case teclaEspacio:
                disparo(evt);
                break;
        }
        dibujarFondo();
        dibujarNave();
        dibujarEnemigo();
    }

    function disparo(evt) {
        if (evt.keyCode == teclaEspacio) {
            console.log("funcion disparo llamada");
            let nuevoDisparo = {
                x: miNave.x + naveAncho / 2 - disparoAncho / 2,
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
        dibujarFondo();
        dibujarNave();
        dibujarEnemigo();
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
        console.log("empieza el juego");
        dibujarFondo();
        dibujarNave();
        dibujarEnemigo();

        // Desactivar el botón para evitar múltiples llamadas
        document.getElementById("comenzarJuego").onclick = null;

        // Añadir el evento keydown
        window.addEventListener('keydown', keyDown, false);
    }
}