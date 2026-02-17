// Selecciona todas las tarjetas
const tarjetasGaleria = document.querySelectorAll(".tarjeta");

// Información alternativa
const personajesAlternativos = {
    reinhardt: {
        nombre: "Doomfist",
        descripcion: "Luchador ofensivo cuerpo a cuerpo.",
        imagen: "recursos/Doom.webp"
    },
    tracer: {
        nombre: "Widowmaker",
        descripcion: "Francotiradora letal de largo alcance.",
        imagen: "recursos/Widow.png"
    },
    mercy: {
        nombre: "Moira",
        descripcion: "Genetista que manipula energía biótica.",
        imagen: "recursos/Moira.png"
    }
};

// Información original (para volver atrás sin reload)
const personajesOriginales = {
    reinhardt: {
        nombre: "Reinhardt",
        descripcion: "Tanque alemán con un martillo y escudo.",
        imagen: "recursos/Rein.png"
    },
    tracer: {
        nombre: "Tracer",
        descripcion: "Especialista en movilidad y daño rápido.",
        imagen: "recursos/Tracer.png"
    },
    mercy: {
        nombre: "Mercy",
        descripcion: "Soporte esencial en el campo de batalla.",
        imagen: "recursos/Mercy.webp"
    }
};

tarjetasGaleria.forEach((tarjetaActual)=>{

    tarjetaActual.addEventListener("click", ()=>{

        const personajeBase = tarjetaActual.dataset.personaje;
        const estadoVolteado = tarjetaActual.dataset.volteado === "true";

        const imagenTarjeta = tarjetaActual.querySelector("img");
        const tituloTarjeta = tarjetaActual.querySelector("h3");
        const descripcionTarjeta = tarjetaActual.querySelector("p");

        // Alternar estado
        tarjetaActual.dataset.volteado = !estadoVolteado;

        if(!estadoVolteado){

            // Gira primero
            tarjetaActual.style.transform = "rotateY(180deg)";

            // Espera a que termine animación
            setTimeout(()=>{

                tituloTarjeta.textContent = personajesAlternativos[personajeBase].nombre;
                descripcionTarjeta.textContent = personajesAlternativos[personajeBase].descripcion;
                imagenTarjeta.src = personajesAlternativos[personajeBase].imagen;

                // Regresa suavemente
                tarjetaActual.style.transform = "rotateY(0deg)";

            }, 600);

        } else {

            tarjetaActual.style.transform = "rotateY(180deg)";

            setTimeout(()=>{

                tituloTarjeta.textContent = personajesOriginales[personajeBase].nombre;
                descripcionTarjeta.textContent = personajesOriginales[personajeBase].descripcion;
                imagenTarjeta.src = personajesOriginales[personajeBase].imagen;

                tarjetaActual.style.transform = "rotateY(0deg)";

            }, 600);

        }

    });

});


// Selecciona sección parallax
const seccionParallax = document.querySelector(".seccion-parallax");
const contenedorTitulo = document.querySelector(".contenedor-titulo");
const subtitulo = document.querySelector(".subtitulo");

// Estado del parallax
let estadoTalon = false;

seccionParallax.addEventListener("click", ()=>{

    estadoTalon = !estadoTalon;

    // ESTRUCTURA DE CONTROL
    if(estadoTalon){

        // Mover título hacia abajo
        contenedorTitulo.style.transform = "translateY(80px)";

        // Cambiar texto
        subtitulo.textContent = "Talon";

        // Cambiar fondo
        seccionParallax.style.backgroundImage = "url('recursos/Talon.jpg')";

    } else {

        contenedorTitulo.style.transform = "translateY(0px)";
        subtitulo.textContent = "Overwatch";
        seccionParallax.style.backgroundImage = "url('recursos/Overwatch2.jpg')";

    }

});
