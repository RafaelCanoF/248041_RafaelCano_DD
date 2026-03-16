// VERIFICAR SESIÓN

let user = JSON.parse(localStorage.getItem("session"))

if(!user){

window.location = "index.html"

}


// CARGAR PRODUCTOS DEL JSON

let products = JSON.parse(localStorage.getItem("products"))

if(products){

render(products)

}else{

fetch("../../Data/productos.json")
.then(res => res.json())
.then(data => {

localStorage.setItem("products", JSON.stringify(data))

render(data)

})

}

function render(products){

let container = document.getElementById("products")

products.forEach(p=>{

container.innerHTML += `
<div class="product">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>${p.description}</p>
<span>$${p.price}</span>
</div>
`

})

}


// LOGOUT

function logout(){

localStorage.removeItem("session")

window.location = "../../../index.html"

}


document.getElementById("userName").textContent = user.name
document.getElementById("userPhoto").src = user.photo

// ocultar admin si no es administrador

if(!user.admin){

document.getElementById("adminLink").style.display = "none"

}


function goProfile(){

window.location = "../Perfil/perfil.html"

}
