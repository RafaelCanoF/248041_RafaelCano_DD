const nombre = document.querySelector("#input_txt_nombre");
const apellido = document.querySelector("#input_txt_apellido");
const boton_guardar = document.querySelector("#boton_guardar")

boton_guardar.addEventListener("click", (e) => {
    e.preventDefault();

 
    const usuario = new Usuario(nombre.value, apellido.value);

    console.log(usuario);

    const nombre_info = document.createElement("h2");

    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);
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
    constructor(nom, ape) {
        this.nombre = nom;
        this.apellido = ape;
    }
}



