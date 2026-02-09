let contenido = document.querySelector("#contenedor_contenido");
const boton = document.querySelector("#boton");
let bandera = false;

function cambiarColor(color){
    contenido.style.background = color;
}

function cambiarTamano(ancho, alto){
    contenido.style.width = ancho;
    contenido.style.height = alto;
}

function cambiarTamanoIntervalo(){
    if (contenido.style.width === "1000px") {
        cambiarTamano("500px", "500px");
    } else {
        cambiarTamano("1000px", "1000px");
    }
}

// Evento addEventListener: click
boton.addEventListener('click', () => {
    if(bandera){
        cambiarColor("white");   
        cambiarTamano("1000px", "1000px");    
        bandera = false;
    } else {
        cambiarColor("blue");
        cambiarTamano("500px", "500px");  
        bandera = true;
    }
});

// Evento JS: setInterval
setInterval(cambiarTamanoIntervalo, 1000);

// Evento JS NUEVO: setTimeout
setTimeout(() => {
    contenido.textContent = "Este texto apareció después de 3 segundos";
}, 3000);

// Evento addEventListener NUEVO: mouseover
contenido.addEventListener("mouseover", () => {
    cambiarColor("green");
});


