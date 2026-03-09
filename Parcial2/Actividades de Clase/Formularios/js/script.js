const nombre = document.querySelector("#input_txt_nombre");
const apellido = document.querySelector("#input_txt_apellido");
const boton_guardar = document.querySelector("#boton_guardar")


const formulario = document.querySelector("#form_2");

const Usuarios = [
    {
        nombre: "Rafael",
        apellido: "Cano",
        correo: "rafaelcano1204@gmail.com",
        contrasena: "120406",
    },
        {
        nombre: "María",
        apellido: "González",
        correo: "maria.gonzalez01@gmail.com",
        contrasena: "maria123",
    },
    {
        nombre: "Luis",
        apellido: "Hernández",
        correo: "luis.hdz99@gmail.com",
        contrasena: "luis456",
    },
    {
        nombre: "Ana",
        apellido: "Martínez",
        correo: "ana.mtz22@gmail.com",
        contrasena: "ana789",
    },
    {
        nombre: "Carlos",
        apellido: "Ramírez",
        correo: "carlos.ramirez10@gmail.com",
        contrasena: "cramirez",
    },
    {
        nombre: "Fernanda",
        apellido: "López",
        correo: "fernanda.lopez07@gmail.com",
        contrasena: "fer2024",
    },
    {
        nombre: "Diego",
        apellido: "Torres",
        correo: "diego.torres88@gmail.com",
        contrasena: "dtorres",
    },
    {
        nombre: "Valeria",
        apellido: "Sánchez",
        correo: "valeria.sanchez55@gmail.com",
        contrasena: "vale321",
    },
    {
        nombre: "Jorge",
        apellido: "Morales",
        correo: "jorge.morales77@gmail.com",
        contrasena: "jmorales",
    },
    {
        nombre: "Sofía",
        apellido: "Castillo",
        correo: "sofia.castillo33@gmail.com",
        contrasena: "sofia2025",
    },
]


boton_guardar.addEventListener("click", (e) => {
    e.preventDefault();

    const nuevoNombre = document.querySelector("#input_txt_nombre");
    const nuevoApellido = document.querySelector("#input_txt_apellido");
    const nuevoCorreo = document.querySelector("#input_txt_correo");
    const nuevaContrasena = document.querySelector("#input_txt_contrasena");

    const usuario = new Usuario(nombre.value, apellido.value);

    console.log(usuario);

    const nombre_info = document.createElement("h2");

    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);

    guardarDatos(usuario);

    guardarDatos = () => {
        console.log("modificando función");
    }

    guardarDatos();

    Usuarios.push({
        nombre: nuevoNombre.value,
        apellido: nuevoApellido.value,
        correo: nuevoCorreo.value,
        contrasena: nuevaContrasena.value,
    })

});

function cambiarNumero(event){
    console.log(event.target.value);
    const contenido = document.querySelector("#contenedor_correos");
    contenido.innerHTML = " ";
    for(let i = 1; i<= event.target.value; i++){
    //Este método reemplaza TODO lo que está dentro de la etiqueta

    const htmlAgregar = `
    <label for="correo-${i}">Ingrese el correo ${i}</label>
    <input type="email" name="correo-${i}" id="correo-${i}">
    <br>`;
    contenido.innerHTML += htmlAgregar;
    }

}


class Usuario {
    constructor(nom, ape, correo, contra) {
        this.nombre = nom;
        this.apellido = ape;
        this.correo = correo;
        this.contrasena = contra;
    }
}


document.addEventListener("DOMContentLoaded",()=>{
    const contenedor_usuarios = document.querySelector("#contenedor_usuarios");



    for(let i = 0; i < Usuarios.length; i++){
    Usuarios[i].nombre;
    Usuarios[i].apellido;
    const contenedor_usuario = document.createElement("div");


    contenedor_usuario.id = "contenedor_usuario";

    const nombre = document.createElement("label");
    nombre.textContent = "Nombre:"
    const contenidoNombre = document.createElement("span");
    contenidoNombre.textContent = Usuarios[i].nombre;


    const apellido = document.createElement("label");
    apellido.textContent = "Apellido:";
    const contenidoApellido = document.createElement("span");
    contenidoApellido.textContent = Usuarios[i].apellido;

    contenedor_usuario.onclick = (event) => {
        event.stopImmediatePropagation;
        const correo = document.createElement("input");
        correo.placeholder = "Ingresa el correo";
        correo.type = "email";

        const contraseña = document.createElement("input");
        contraseña.placeholder = "Ingresa la contraseña";
        contraseña.type = "password";

        contenedor_usuario.appendChild(correo);
        contenedor_usuario.appendChild(contraseña);
        console.log(` ---Usuario---
            Nombre: ${Usuarios[i].nombre}
            Apellido: ${Usuarios[i].apellido}
            Correo: ${Usuarios[i].correo}
            Contraseña: ${Usuarios[i].contrasena}`);
    }


    contenedor_usuario.appendChild(nombre);
    contenedor_usuario.appendChild(contenidoNombre);

    contenedor_usuario.appendChild(apellido);
    contenedor_usuario.appendChild(contenidoApellido);
    contenedor_usuarios.appendChild(contenedor_usuario);
    }

})


function leerDatos(){
    const datosFormulario = new FormData(formulario);

    const datos = Object.fromEntries(datosFormulario.entries());

    let usuarioNuevo = new Usuario(datos.nombre, datos.apellido, datos.correo, datos.contrasena)
    console.log(usuarioNuevo);
}