    // 3. Definición de la clase enemigo y sus métodos en el prototipo

    function Enemigo(x_, y_, enemigoVelocidad) {
        this.x = x_;
        this.y = y_; 
        this.velocidad = enemigoVelocidad;
        this.imagen = new Image();
        this.imagen.src = './assets/enemigos.png';
        
    }

    Enemigo.prototype.dibujarEnemigo = function (ctx_) {
        ctx_.drawImage(this.imagen, this.x, this.y);
    }

    Enemigo.prototype.moverEnemigoDerecha = function () {
        this.x = this.x + this.velocidad;
    }

    Enemigo.prototype.moverEnemigoIzquierda = function () {
        this.x = this.x - this.velocidad;
    }

    Enemigo.prototype.moverEnemigoAbajo = function () {
        this.y = this.y + BAJADAENEMIGO;	
    }

