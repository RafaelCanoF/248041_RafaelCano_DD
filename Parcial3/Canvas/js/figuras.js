class Figura{
    constructor(posicionesCursor={}, colorLinea="black", colorRelleno="black", grosorLinea=5, usarRelleno=true){
        this.posicion_X = Math.min(posicionesCursor.iniciales.x, posicionesCursor.finales.x);
        this.posicion_Y = Math.min(posicionesCursor.iniciales.y, posicionesCursor.finales.y);
        this.posicionFinalX = posicionesCursor.finales.x;
        this.posicionFinalY = posicionesCursor.finales.y;

        this.colorLinea = colorLinea;
        this.colorRelleno = colorRelleno;
        this.grosorLinea = grosorLinea;
        this.usarRelleno = usarRelleno; 
    }
}

export class Cuadrado extends Figura{
constructor(posicionesCursor, colorLinea, colorRelleno, grosorLinea, usarRelleno) {
super(posicionesCursor, colorLinea, colorRelleno, grosorLinea, usarRelleno);

        this.ancho = Math.abs(posicionesCursor.finales.x - posicionesCursor.iniciales.x);
        this.alto = Math.abs(posicionesCursor.finales.y - posicionesCursor.iniciales.y);
    }

    Dibujar(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;
        ctx.lineWidth = this.grosorLinea;

        ctx.rect(this.posicion_X, this.posicion_Y, this.ancho, this.alto);
        if (this.usarRelleno) {
                    ctx.fillStyle = this.colorRelleno;
                    ctx.fill();
                }
        ctx.stroke();
    }
}

export class Circulo extends Figura{
    constructor(posicionesCursor, colorLinea, colorRelleno, grosorLinea, usarRelleno) {
        super(posicionesCursor, colorLinea, colorRelleno, grosorLinea, usarRelleno);

        const dx = posicionesCursor.finales.x - posicionesCursor.iniciales.x;
        const dy = posicionesCursor.finales.y - posicionesCursor.iniciales.y;

        this.radio = Math.sqrt(dx * dx + dy * dy);
        this.centroX = posicionesCursor.iniciales.x;
        this.centroY = posicionesCursor.iniciales.y;
    }

    Dibujar(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;
        ctx.lineWidth = this.grosorLinea;

        ctx.arc(this.centroX, this.centroY, this.radio, 0, Math.PI * 2);
if (this.usarRelleno) {
            ctx.fillStyle = this.colorRelleno;
            ctx.fill();
        }
        ctx.stroke();
    }
}

export class Linea{
    constructor(posicionesCursor = {}, colorLinea = "black",grosorLinea =5){
        this.posicionesCursor = posicionesCursor || {
            iniciales: {x : 0, y : 0},
            finales: {x : 0, y : 0}
        }

        this.colorLinea = colorLinea;
        this.grosorLinea = grosorLinea;
    }

    Dibujar(ctx){
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoint = "round";
        ctx.strokeStyle = this.colorLinea;
        ctx.lineWidth = this.grosorLinea;

        ctx.moveTo(this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y);
        ctx.lineTo(this.posicionesCursor.finales.x, this.posicionesCursor.finales.y);
        ctx.stroke();
    }

}



export class Sticker {
    constructor(posicionesCursor = {}, urlImagen, tamañoManual = 50, alCallbackRedibujo) {
        this.x = posicionesCursor.finales.x; 
        this.y = posicionesCursor.finales.y;
        
        this.anchoDestino = tamañoManual * 2;
        this.altoDestino = 0; 
        this.cargada = false;

        this.imagen = new Image();
        this.imagen.src = urlImagen;

        this.imagen.onload = () => {
            const proporcion = this.imagen.width / this.imagen.height;
            this.altoDestino = this.anchoDestino / proporcion;
            this.cargada = true;
            if(alCallbackRedibujo) {
                alCallbackRedibujo();
            }
        };
    }

    Dibujar(ctx) {
        if (!this.cargada) return;

        ctx.drawImage(
            this.imagen,
            this.x - this.anchoDestino / 2,
            this.y - this.altoDestino / 2,
            this.anchoDestino,
            this.altoDestino
        );
    }

}

export class Carita extends Figura{
constructor(posicionesCursor, colorLinea, colorRelleno, grosorLinea, usarRelleno) {
super(posicionesCursor, colorLinea, colorRelleno, grosorLinea, usarRelleno);

        const dx = posicionesCursor.finales.x - posicionesCursor.iniciales.x;
        const dy = posicionesCursor.finales.y - posicionesCursor.iniciales.y;

        this.radio = Math.sqrt(dx * dx + dy * dy);
        this.centroX = posicionesCursor.iniciales.x;
        this.centroY = posicionesCursor.iniciales.y;
    }

    Dibujar(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;
        ctx.lineWidth = this.grosorLinea;
        ctx.arc(this.centroX, this.centroY, this.radio, 0, Math.PI * 2);
if (this.usarRelleno) {
            ctx.fillStyle = this.colorRelleno;
            ctx.fill();
        }
        ctx.stroke();


        const radioOjo = this.radio * 0.12; 
        const offsetX = this.radio * 0.35; 
        const offsetY = this.radio * 0.25; 
        ctx.fillStyle = this.colorLinea; 

        ctx.beginPath();
        ctx.arc(this.centroX - offsetX, this.centroY - offsetY, radioOjo, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.centroX + offsetX, this.centroY - offsetY, radioOjo, 0, Math.PI * 2);
        ctx.fill();

        const radioBoca = this.radio * 0.6;
        ctx.beginPath();
        ctx.lineCap = "round";
        
        ctx.arc(this.centroX, this.centroY, radioBoca, 0.15 * Math.PI, 0.85 * Math.PI);
        ctx.stroke();
    }
}

export class Relleno {
    constructor(startX, startY, colorHex, ctx, canvasWidth, canvasHeight) {
        this.width = canvasWidth;
        this.height = canvasHeight;
        
        this.capa = document.createElement('canvas');
        this.capa.width = canvasWidth;
        this.capa.height = canvasHeight;
        this.ctxCapa = this.capa.getContext('2d');

        this.aplicarRelleno(startX, startY, colorHex, ctx);
    }


    hexToRgba(hex) {
        return [
            parseInt(hex.substring(1, 3), 16),
            parseInt(hex.substring(3, 5), 16),
            parseInt(hex.substring(5, 7), 16),
            255
        ];
    }

    aplicarRelleno(startX, startY, colorHex, ctx) {
        const imageData = ctx.getImageData(0, 0, this.width, this.height);
        const data = imageData.data;
        const fillColor = this.hexToRgba(colorHex);
        
        const startPos = (startY * this.width + startX) * 4;
        const startColor = [
            data[startPos], data[startPos + 1], data[startPos + 2], data[startPos + 3]
        ];

        if (startColor[0] === fillColor[0] && startColor[1] === fillColor[1] && 
            startColor[2] === fillColor[2] && startColor[3] === fillColor[3]) {
            return;
        }

        const nuevaCapaData = this.ctxCapa.createImageData(this.width, this.height);
        
        const pixelStack = [[startX, startY]];

        const matchColor = (pos) => {
            return data[pos] === startColor[0] &&
                   data[pos + 1] === startColor[1] &&
                   data[pos + 2] === startColor[2] &&
                   data[pos + 3] === startColor[3];
        };

        const colorPixel = (pos) => {
            data[pos] = fillColor[0];
            data[pos + 1] = fillColor[1];
            data[pos + 2] = fillColor[2];
            data[pos + 3] = 255;
            
            nuevaCapaData.data[pos] = fillColor[0];
            nuevaCapaData.data[pos + 1] = fillColor[1];
            nuevaCapaData.data[pos + 2] = fillColor[2];
            nuevaCapaData.data[pos + 3] = 255;
        };

        while (pixelStack.length) {
            const newPos = pixelStack.pop();
            let x = newPos[0];
            let y = newPos[1];
            let pixelPos = (y * this.width + x) * 4;
            
            while (y-- >= 0 && matchColor(pixelPos)) {
                pixelPos -= this.width * 4;
            }
            
            pixelPos += this.width * 4;
            ++y;
            
            let reachLeft = false;
            let reachRight = false;
            
            while (y++ < this.height - 1 && matchColor(pixelPos)) {
                colorPixel(pixelPos);
                
                if (x > 0) {
                    if (matchColor(pixelPos - 4)) {
                        if (!reachLeft) {
                            pixelStack.push([x - 1, y]);
                            reachLeft = true;
                        }
                    } else if (reachLeft) reachLeft = false;
                }
                
                if (x < this.width - 1) {
                    if (matchColor(pixelPos + 4)) {
                        if (!reachRight) {
                            pixelStack.push([x + 1, y]);
                            reachRight = true;
                        }
                    } else if (reachRight) reachRight = false;
                }
                pixelPos += this.width * 4;
            }
        }
        this.ctxCapa.putImageData(nuevaCapaData, 0, 0);
    }

    Dibujar(ctx) {
        ctx.drawImage(this.capa, 0, 0);
    }
}


export class Borrador {
    constructor(grosor) {
        this.puntos = []; 
        this.grosor = grosor;
    }

    agregarPunto(x, y) {
        this.puntos.push({ x, y });
    }

    Dibujar(ctx) {
        if (this.puntos.length < 2) return;

        ctx.save();
        
        ctx.globalCompositeOperation = 'destination-out';
        
        ctx.beginPath();
        ctx.lineWidth = this.grosor;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        ctx.moveTo(this.puntos[0].x, this.puntos[0].y);
        for (let i = 1; i < this.puntos.length; i++) {
            ctx.lineTo(this.puntos[i].x, this.puntos[i].y);
        }
        ctx.stroke();

        ctx.restore();
    }
}

