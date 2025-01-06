    // 3. Definición de la clase enemigo y sus métodos en el prototipo

    let posicion;

    function Enemigo(x_, y_) {
        this.x = x_;
        this.y = y_; 
        this.velocidad = ENEMIGOVELOCIDAD;
        this.tamañoX = RECORTEENEMIGOX;
        this.tamañoY = RECORTEENEMIGOY;
        this.animacionEnemigos = [
            [21, 11], [50, 11], // Enemigo 1
            // [21, 37], [50, 37], // Enemigo 2
            // [21, 67], [51, 67]  // Enemigo 3
        ];
        this.posicion = 0;

        this.actualizarAnimacion = function () {
            this.posicion = (this.posicion + 1) % 2; // Avanzar entre frames del sprite
            this.moverEnemigo(); // Llamar a la función para mover el enemigo
        };
    
        this.moverEnemigo = function () {
            this.y += this.velocidad; // Mover el enemigo hacia abajo
            if (this.y > TOPEABAJO) {
                this.y = -this.tamañoY; // Reiniciar la posición si sale del canvas
            }
        };
    }

    Enemigo.prototype.imagen = new Image();
    Enemigo.prototype.imagen.src = "./assets/enemigos.png";	   	

    Enemigo.prototype.dibujarEnemigo = function (ctx_) {
 		// Dibujamos los enemigos

        
        ctx_.drawImage(this.imagen, // Imagen completa con todos los comecocos (Sprite)
            this.animacionEnemigos[0][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            this.animacionEnemigos[1][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            this.tamañoX ,		  // Tamaño X del comecocos que voy a recortar para dibujar
            this.tamañoY,	      // Tamaño Y del comecocos que voy a recortar para dibujar
            this.x,      // Posicion x de pantalla donde voy a dibujar el comecocos recortado
            this.y,				  // Posicion y de pantalla donde voy a dibujar el comecocos recortado
            this.tamañoX,		  // Tamaño X del comecocos que voy a dibujar
            this.tamañoY);       // Tamaño Y del comecocos que voy a dibujar
            
    }

	function abreCierraBoca() {
		
		if (xDerecha) miComecocos.animacionComecocos = miComecocos.spriteDerecha;		
		
		if (xIzquierda) miComecocos.animacionComecocos = miComecocos.spriteIzquierda;				

	    posicion = (posicion + 1) % 2;  // Cargará posiciones 0 y 1 del array
		
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

