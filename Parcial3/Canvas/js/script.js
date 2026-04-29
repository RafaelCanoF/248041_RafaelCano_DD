import { Cuadrado, Circulo, Linea, Sticker, Carita, Relleno, Borrador } from "./figuras.js";

const canvas = document.querySelector('#lienzo');
const ctx = canvas.getContext("2d");

const figuras = [];
const historialRehacer = [];
let herramientaActual = "pincel";
let mostrarPreviewSticker = false;
let filtroActual = "none";

let borradorActual = null;

const posicionesCursor = {
    iniciales: {x:0,y:0},
    finales: {x:0,y:0}
};

const botonesFiltros = document.querySelectorAll('.filter-btn');

botonesFiltros.forEach(btn => {
    btn.addEventListener("click", () => {
        filtroActual = btn.getAttribute('data-filter');
        redibujarTodo(); 
    });
});

let presionado = false;

const range = document.getElementById("grosorRange");
const colorLineaInput = document.querySelectorAll('input[type="color"]')[0];
const colorRellenoInput = document.querySelectorAll('input[type="color"]')[1];

canvas.addEventListener("mousedown", alPresionarClick);
canvas.addEventListener("mousemove", mientrasPresionaClick);
canvas.addEventListener("mouseup", alSoltarClick);


// HERRAMIENTAS
const tools = document.querySelectorAll(".tool");

tools.forEach(btn => {
    btn.addEventListener("click", () => {
        tools.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");

        mostrarPreviewSticker = false;

        if(btn.classList.contains("pincel")) herramientaActual = "pincel";
        if(btn.classList.contains("linea")) herramientaActual = "linea";
        if(btn.classList.contains("cuadro")) herramientaActual = "cuadro";
        if(btn.classList.contains("circulo")) herramientaActual = "circulo";
        if(btn.classList.contains("carita")) herramientaActual = "carita";
        if(btn.classList.contains("relleno")) herramientaActual = "relleno";
        if(btn.classList.contains("borrador")) herramientaActual = "borrador";

        if(btn.classList.contains("sticker-btn")){
            herramientaActual = "sticker";
            mostrarPreviewSticker = true;
        }
    });
});




// DIBUJO
function alPresionarClick(event){
    posicionesCursor.iniciales.x = event.offsetX;
    posicionesCursor.iniciales.y = event.offsetY;
    presionado = true;
    //Borrador
    if (herramientaActual === "borrador") {
        borradorActual = new Borrador(range.value);
        borradorActual.agregarPunto(event.offsetX, event.offsetY);
        figuras.push(borradorActual);
    }
    //Relleno
    if(herramientaActual === "relleno"){
        const relleno = new Relleno(
            event.offsetX, 
            event.offsetY, 
            colorRellenoInput.value, 
            ctx, 
            canvas.width, 
            canvas.height
        );
        figuras.push(relleno);
        redibujarTodo();
        
        presionado = false; 
    }
}

function mientrasPresionaClick(event){
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    if(!presionado) return;

    if (herramientaActual === "borrador" && borradorActual) {
        borradorActual.agregarPunto(event.offsetX, event.offsetY);
        redibujarTodo();
    }

    if(herramientaActual === "pincel"){
        const linea = new Linea(
            {
                iniciales: { ...posicionesCursor.iniciales },
                finales: { ...posicionesCursor.finales }
            },
            colorLineaInput.value,
            range.value
        );

        figuras.push(linea); 
        redibujarTodo();

        posicionesCursor.iniciales.x = posicionesCursor.finales.x;
        posicionesCursor.iniciales.y = posicionesCursor.finales.y;
    } else {
        redibujarTodo();

        if(herramientaActual === "linea"){
            new Linea(posicionesCursor, colorLineaInput.value, range.value).Dibujar(ctx);
        }

        if(herramientaActual === "cuadro"){
        const rellenoActivo = document.getElementById('con-relleno').checked;
        new Cuadrado(posicionesCursor, colorLineaInput.value, colorRellenoInput.value, range.value, rellenoActivo).Dibujar(ctx);
        }

        if(herramientaActual === "circulo"){
            const rellenoActivo = document.getElementById('con-relleno').checked;
            new Circulo(posicionesCursor, colorLineaInput.value, colorRellenoInput.value, range.value, rellenoActivo).Dibujar(ctx);
        }

        if(herramientaActual === "carita"){
            const rellenoActivo = document.getElementById('con-relleno').checked;
            new Carita(posicionesCursor, colorLineaInput.value, colorRellenoInput.value, range.value, rellenoActivo).Dibujar(ctx);
        }
    }
}
function alSoltarClick(event){
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    let figura = null;
    const rellenoActivo = document.getElementById('con-relleno').checked;

    if(herramientaActual === "linea"){
        figura = new Linea(
            {
                iniciales: { ...posicionesCursor.iniciales },
                finales: { ...posicionesCursor.finales }
            },
            colorLineaInput.value,
            range.value
        );
    }

    if(herramientaActual === "cuadro"){
        figura = new Cuadrado(posicionesCursor, colorLineaInput.value, colorRellenoInput.value, range.value, rellenoActivo);
    }

    if(herramientaActual === "circulo"){
        figura = new Circulo(posicionesCursor, colorLineaInput.value, colorRellenoInput.value, range.value, rellenoActivo);
    }
    
    if(herramientaActual === "carita"){
        figura = new Carita(posicionesCursor, colorLineaInput.value, colorRellenoInput.value, range.value, rellenoActivo);
    }

if(herramientaActual === "sticker"){
    if(preview.src){
        figura = new Sticker(
            posicionesCursor,
            preview.src,
            range.value,
            redibujarTodo
        );
    }
}

    if(figura){
        figuras.push(figura);
        historialRehacer.length = 0;
    }

    redibujarTodo();
borradorActual = null; 
    presionado = false;
}

//Filtros
function redibujarTodo() {
    // primero limpio todo el canvas pintándolo blanco
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // vuelvo a dibujar todas las figuras guardadas
    figuras.forEach(f => f.Dibujar(ctx));

    if (filtroActual !== "none") {

        // cada pixel = [R, G, B, A]
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // voy de 4 en 4 porque cada pixel ocupa 4 espacios
        for (let i = 0; i < data.length; i += 4) {

            // i     = rojo
            // i + 1 = verde
            // i + 2 = azul
            // i + 3 = alpha (transparencia)
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // gris → todos iguales (promedio)
            if (filtroActual === "gray") {
                const promedio = (r + g + b) / 3;
                data[i] = data[i + 1] = data[i + 2] = promedio;
            } 

            // rojo → dejo R y apago G y B
            // por eso uso +1 y +2 → porque son verde y azul
            else if (filtroActual === "red") {
                data[i + 1] = 0; // verde off
                data[i + 2] = 0; // azul off
            } 

            // verde → dejo G
            else if (filtroActual === "green") {
                data[i] = 0;     // rojo off
                data[i + 2] = 0; // azul off
            } 

            // azul → dejo B
            else if (filtroActual === "blue") {
                data[i] = 0;     // rojo off
                data[i + 1] = 0; // verde off
            }
            // Negativo → Invertimos el valor restándolo de 255
            else if (filtroActual === "negative") {
                data[i]     = 255 - r; // Rojo invertido
                data[i + 1] = 255 - g; // Verde invertido
                data[i + 2] = 255 - b; // Azul invertido
            }

            // Sepia → Aplicamos la fórmula oficial de pesos de color
            else if (filtroActual === "sepia") {
                // La fórmula oficial de Microsoft/W3C para sepia:
                data[i]     = (r * 0.393) + (g * 0.769) + (b * 0.189);
                data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
                data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }
}

const input = document.getElementById("stickerInput");
const preview = document.getElementById("previewImg");

input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = e => preview.src = e.target.result;
        reader.readAsDataURL(file);
    }
});


//Slider
const inputSlider = document.getElementById("grosorInput");

range.addEventListener("input", () => {
    inputSlider.value = range.value;
});

inputSlider.addEventListener("input", () => {
    let value = parseInt(inputSlider.value);
    if(value < 1) value = 1;
    if(value > 100) value = 100;

    range.value = value;
    inputSlider.value = value;
});



const btnLimpiar = document.getElementById("btn-limpiar");
const btnGuardar = document.getElementById("btn-guardar");

btnLimpiar.addEventListener("click", () => {
    // le preguntamos al usuario si quiere borrar TODO
    const confirmar = confirm("¿Deseas borrar todo el lienzo? Esta acción no se puede deshacer.");
    
    if (confirmar) {
        // básicamente vaciamos el array donde guardo todas las figuras
        figuras.length = 0; 
        
        // redibujo el canvas vacío (si no hago esto, se queda lo anterior visualmente)
        redibujarTodo();

        // debug rápido para saber que sí funcionó
        console.log("Lienzo limpio");
    }
});

btnGuardar.addEventListener("click", () => {
    // creo un <a> falso para forzar la descarga
    const enlace = document.createElement('a');
    
    // nombre del archivo que se va a bajar (solamente lo hice como png y no como jpg)
    enlace.download = 'Dibujo.png';
    
    // convierto el canvas en imagen (base64) y se lo asigno al link
    enlace.href = canvas.toDataURL("image/png");
    
    // simulo un click para que se descargue automáticamente
    enlace.click();
});


const btnUndo = document.querySelector('.undo-btn');
const btnRedo = document.querySelector('.redo-btn');

btnUndo.addEventListener("click", () => {
    if (figuras.length > 0) {
        const figuraEliminada = figuras.pop();
        historialRehacer.push(figuraEliminada);
        
        redibujarTodo();
    } else {
        console.log("No hay nada más que deshacer");
    }
});


btnRedo.addEventListener("click", () => {
    if (historialRehacer.length > 0) {
        const figuraRecuperada = historialRehacer.pop();
        figuras.push(figuraRecuperada);
        
        redibujarTodo();
    } else {
        console.log("No hay nada que rehacer");
    }
});


const toolbar = document.querySelector('.toolbar');
const panel = document.querySelector('.panel');

document.getElementById('btnToolbar').addEventListener('click', () => {
    toolbar.classList.toggle('active');
});

document.getElementById('btnPanel').addEventListener('click', () => {
    panel.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!toolbar.contains(e.target) && !e.target.closest('#btnToolbar')) {
        toolbar.classList.remove('active');
    }

    if (!panel.contains(e.target) && !e.target.closest('#btnPanel')) {
        panel.classList.remove('active');
    }
});