    // 2. Definición de la clase nave y sus métodos en el prototipo
    function Nave (naveX, naveY) {
        this.x = naveX;
        this.y = naveY;
    }
    
    Nave.prototype.imagen = new Image();
    Nave.prototype.imagen.src="./assets/nave2.png";		

    Nave.prototype.dibujarNave = function (ctx_) {
        ctx_.drawImage(this.imagen, this.x, this.y);
    }

    Nave.prototype.moverNaveDrch = function () {
        if (this.x < TOPEDERECHA) {
            this.x += this.velocidad;
        }
    }

    Nave.prototype.moverNaveIzq = function () {
        if (this.x > TOPEIZQUIERDA) {
            this.x -= this.velocidad;
        }
    }

    