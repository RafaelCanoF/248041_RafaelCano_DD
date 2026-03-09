//Verificar sesión
const usuario = localStorage.getItem("usuarioActivo");

if (!usuario) {
    window.location.href = "../../index.html";
}

//  Cerrar sesión
document.getElementById("cerrarSesion")
.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "../../index.html";
});

//  HARRY POTTER API
const contenedor = document.getElementById("contenedor");
const url = "https://hp-api.onrender.com/api/characters";

fetch(url)
    .then(res => {
        if (!res.ok) {
            throw new Error("Error al obtener datos");
        }
        return res.json();
    })
    .then(data => {

        data.slice(0, 20).forEach(personaje => {

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");

            tarjeta.innerHTML = `
                <h2>${personaje.name}</h2>
                <img src="${personaje.image}" alt="${personaje.name}" width="150">
                <p><strong>Casa:</strong> ${personaje.house || "Desconocida"}</p>
                <p><strong>Actor:</strong> ${personaje.actor || "N/A"}</p>
                <p><strong>Especie:</strong> ${personaje.species}</p>
            `;

            contenedor.appendChild(tarjeta);
        });

    })
    .catch(error => {
        console.error(error);
        contenedor.innerHTML = `
            <p style="color:red;">
                No se pudieron cargar los personajes.
            </p>
        `;
    });