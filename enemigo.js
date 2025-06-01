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
            [21, 37], [50, 37], // Enemigo 2
            [21, 67], [51, 67]  // Enemigo 3
        ];
        this.posicion = 0;

        this.actualizarAnimacion = function () {
            this.posicion = (this.posicion + 1) % 2; // Avanzar entre frames del sprite
        };
    
    }

    Enemigo.prototype.imagen = new Image();
    Enemigo.prototype.imagen.src = "./assets/enemigos.png";	   	

    Enemigo.prototype.dibujarEnemigo = function (ctx_) {
 		// Dibujamos los enemigos

         ctx_.drawImage(this.imagen, // Imagen completa con todos los comecocos (Sprite)
            this.animacionEnemigos[this.posicion][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            this.animacionEnemigos[this.posicion][1],      // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
            this.tamañoX, this.tamañoY, // Tamaño del recorte
            this.x, this.y, // Posición en el canvas
            this.tamañoX, this.tamañoY // Tamaño en el canvas
        );
            
    }

