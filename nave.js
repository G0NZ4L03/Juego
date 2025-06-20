// 2. Definición de la clase nave y sus métodos en el prototipo
    function Nave (naveX, naveY) {
        this.x = naveX;
        this.y = naveY;
        this.ancho = NAVEANCHO;
        this.alto = NAVEALTURA;
        this.velocidad = NAVEVELOCIDAD;
    }
    
    Nave.prototype.imagen = new Image();
    Nave.prototype.imagen.src="./assets/nave.png";

    Nave.prototype.dibujarNave = function (ctx_) {
        ctx_.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
    }

    Nave.prototype.moverNaveDrch = function () {
        if (this.x + this.ancho < TOPEDERECHA) {
            this.x += this.velocidad;
            // Ajuste para no pasar el borde derecho
            if (this.x + this.ancho > TOPEDERECHA) {
                this.x = TOPEDERECHA - this.ancho;
            }
        }
    }

    Nave.prototype.moverNaveIzq = function () {
        if (this.x > TOPEIZQUIERDA) {
            this.x -= this.velocidad;
        }
    }

