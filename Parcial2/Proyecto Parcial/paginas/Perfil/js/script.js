// OBTENER SESIÓN

let session = JSON.parse(localStorage.getItem("session"))

if(!session){
window.location = "../../../index.html"
}


// ELEMENTOS

let nameInput = document.getElementById("name")
let emailInput = document.getElementById("email")
let passwordInput = document.getElementById("password")

let preview = document.getElementById("preview")
let photoInput = document.getElementById("photo")

let form = document.getElementById("profileForm")


// CARGAR DATOS

nameInput.value = session.name
emailInput.value = session.email
preview.src = session.photo


// PREVIEW FOTO

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


// GUARDAR CAMBIOS

form.addEventListener("submit", function(e){

e.preventDefault()

let users = JSON.parse(localStorage.getItem("users"))


// BUSCAR USUARIO POR EMAIL ORIGINAL

let userIndex = users.findIndex(u => u.email === session.email)


// NUEVA FOTO (por defecto la actual)

let photo = preview.src


// ACTUALIZAR DATOS

users[userIndex].name = nameInput.value
users[userIndex].email = emailInput.value

if(passwordInput.value !== ""){
users[userIndex].password = passwordInput.value
}

users[userIndex].photo = photo


// GUARDAR

localStorage.setItem("users", JSON.stringify(users))

// ACTUALIZAR SESIÓN

localStorage.setItem("session", JSON.stringify(users[userIndex]))

alert("Perfil actualizado")

window.location = "../Inicio/inicio.html"

})


// LOGOUT

function logout(){

localStorage.removeItem("session")

window.location = "../../../index.html"

}

