const contenedor = document.querySelector("#contenedor");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
    constructor(nombre, apellido, correo, contrasena) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasena = contrasena;
    }
}
/* CREAR LOGIN */
function crearLogin() {

    contenedor.innerHTML = "";

    const formLogin = document.createElement("form");
    formLogin.classList.add("formulario");

    formLogin.innerHTML = `
        <h2>Iniciar Sesión</h2>

        <label>Correo</label>
        <input type="email" name="correo">

        <label>Contraseña</label>
        <input type="password" name="contrasena">

        <button type="submit">Iniciar Sesión</button>

        <p>¿No tienes cuenta?</p>
        <button type="button" id="btn_ir_registro" class="secundario">
            Crear cuenta
        </button>
    `;

    contenedor.appendChild(formLogin);

/* Evento Login */

    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const datosFormulario = new FormData(formLogin);
        const datos = Object.fromEntries(datosFormulario.entries());

        if (!datos.correo || !datos.contrasena) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const usuarioEncontrado = usuarios.find(
            user => user.correo === datos.correo && user.contrasena === datos.contrasena
        );

        if (usuarioEncontrado) {

            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

            alert("Sesión iniciada correctamente");
            window.location.href = "Paginas/HarryPotter/HarryPotter.html";
        }else {
            alert("Correo o contraseña incorrectos");
        }

        formLogin.reset();
    });

    /* Ir a registro */
    formLogin.querySelector("#btn_ir_registro")
        .addEventListener("click", crearRegistro);
}


/* CREAR REGISTRO */
function crearRegistro() {

    contenedor.innerHTML = "";

    const formRegistro = document.createElement("form");
    formRegistro.classList.add("formulario");

    formRegistro.innerHTML = `
        <h2>Registro</h2>

        <label>Nombre</label>
        <input type="text" name="nombre">

        <label>Apellido</label>
        <input type="text" name="apellido">

        <label>Correo</label>
        <input type="email" name="correo">

        <label>Contraseña</label>
        <input type="password" name="contrasena">

        <label>Confirmar Contraseña</label>
        <input type="password" name="confirmar">

        <button type="submit">Registrarse</button>

        <p>¿Ya tienes cuenta?</p>
        <button type="button" id="btn_ir_login" class="secundario">
            Iniciar sesión
        </button>
    `;

    contenedor.appendChild(formRegistro);

    // Evento Registro
    formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();

        const datosFormulario = new FormData(formRegistro);
        const datos = Object.fromEntries(datosFormulario.entries());

        if (!datos.nombre || !datos.apellido || !datos.correo || !datos.contrasena || !datos.confirmar) {
            alert("Todos los campos son obligatorios");
            return;
        }

        if (datos.contrasena !== datos.confirmar) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const usuarioExistente = usuarios.find(user => user.correo === datos.correo);

        if (usuarioExistente) {
            alert("El correo ya está registrado");
            return;
        }

        const nuevoUsuario = new Usuario(
            datos.nombre,
            datos.apellido,
            datos.correo,
            datos.contrasena
        );

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Usuario registrado correctamente");

        crearLogin(); // reemplaza registro por login
    });

    // Volver a login
    formRegistro.querySelector("#btn_ir_login")
        .addEventListener("click", crearLogin);
}


// INICIAR MOSTRANDO LOGIN
crearLogin();