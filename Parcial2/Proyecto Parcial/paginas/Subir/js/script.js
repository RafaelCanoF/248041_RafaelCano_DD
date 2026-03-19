// VERIFICAR SESIÓN

let user = JSON.parse(localStorage.getItem("session"))

if(!user){

window.location = "index.html"

}


// CARGAR PRODUCTOS DEL JSON

fetch("../../data/productos.json")

.then(res => res.json())

.then(products => {

let container = document.getElementById("products")

products.forEach(p => {

container.innerHTML += `

<div class="product">

<img src="${p.image}" width="150">

<h3>${p.name}</h3>

<p>${p.description}</p>

<span>$${p.price}</span>

</div>

`

})

})


document.getElementById("userName").textContent = user.name
document.getElementById("userPhoto").src = user.photo

// ocultar admin si no es administrador

if(!user.admin){

document.getElementById("adminLink").style.display = "none"

}


function goProfile(){

window.location = "../perfil/perfil.html"

}



// CARGAR PRODUCTOS

let products = JSON.parse(localStorage.getItem("products"))

if(!products){

fetch("../../Data/productos.json")
.then(res => res.json())
.then(data => {

products = data

localStorage.setItem("products", JSON.stringify(products))

renderProducts()

})

}else{

renderProducts()

}


// MOSTRAR PRODUCTOS

function renderProducts(){

let container = document.getElementById("productsList")

container.innerHTML = ""

products.forEach((p,index)=>{

container.innerHTML += `

<div class="product">

<img src="${p.image}">

<h3>${p.name}</h3>

<p>$${p.price}</p>

<p>${p.description}</p>

<button class="deleteBtn" onclick="deleteProduct(${index})">
Eliminar
</button>

</div>

`

})

}


// AGREGAR PRODUCTO

document.getElementById("productForm").addEventListener("submit", function(e){

e.preventDefault()

let newProduct = {

name: document.getElementById("name").value,

price: parseFloat(document.getElementById("price").value),

image: preview.src,

description: document.getElementById("description").value

}

products.push(newProduct)

localStorage.setItem("products", JSON.stringify(products))

renderProducts()

this.reset()

})


// ELIMINAR PRODUCTO

function deleteProduct(index){

products.splice(index,1)

localStorage.setItem("products", JSON.stringify(products))

renderProducts()

}


// LOGOUT

function logout(){

localStorage.removeItem("session")

window.location = "../../../index.html"

}


let photoInput = document.getElementById("photo")
let preview = document.getElementById("preview")

photoInput.addEventListener("change", function(){

let file = this.files[0]

if(file){

let reader = new FileReader()

reader.onload = function(e){

preview.src = e.target.result

}

reader.readAsDataURL(file)

}

})







function loadJSON(){

let fileInput = document.getElementById("jsonFile")
let file = fileInput.files[0]

if(!file){
alert("Selecciona un archivo JSON")
return
}

let reader = new FileReader()

reader.onload = function(e){

try{

let data = JSON.parse(e.target.result)

// Validación básica
if(!Array.isArray(data)){
alert("El JSON debe ser un arreglo de productos")
return
}

// Guardar y renderizar
products = data
localStorage.setItem("products", JSON.stringify(products))
renderProducts()

alert("Productos cargados correctamente")

}catch(error){

alert("JSON inválido")

}

}

reader.readAsText(file)

}