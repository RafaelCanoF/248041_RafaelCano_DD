// BOTÓN CAMBIAR LOGIN / REGISTRO

let toggle = document.getElementById("toggle")

let loginForm = document.getElementById("loginForm")
let registerForm = document.getElementById("registerForm")

toggle.onclick = function(){

if(loginForm.style.display === "none"){

loginForm.style.display = "flex"
registerForm.style.display = "none"

document.querySelector(".registerText").textContent = "¿No tienes cuenta?"
toggle.textContent = "Regístrate"

}else{

loginForm.style.display = "none"
registerForm.style.display = "flex"

document.querySelector(".registerText").textContent = "¿Ya tienes cuenta?"
toggle.textContent = "Inicia sesión"

}

}

// USUARIOS POR DEFECTO (ADMIN Y VISITANTE)

let defaultUsers = [

{
name: "Administrador",
email: "admin@poppy.com",
password: "1234",
photo: "../../recursos/defaultProfile.png",
admin: true
},

{
name: "Visitante",
email: "user@poppy.com",
password: "1234",
photo: "../../recursos/defaultProfile.png",
admin: false
}

]


// SI NO EXISTEN USUARIOS EN LOCALSTORAGE, SE CREAN

let users = JSON.parse(localStorage.getItem("users"))

if(!users){
localStorage.setItem("users", JSON.stringify(defaultUsers))
}


// REGISTRO

registerForm.addEventListener("submit", function(e){

e.preventDefault()

let users = JSON.parse(localStorage.getItem("users")) || []

let name = document.getElementById("name").value
let email = document.getElementById("email").value
let password = document.getElementById("password").value
let admin = document.getElementById("admin").checked

// VALIDAR SI EL USUARIO YA EXISTE

let existingUser = users.find(u => u.email === email)

if(existingUser){

alert("Este correo ya está registrado")
return

}

let file = document.getElementById("photo").files[0]

if(!file){

alert("Selecciona una foto")
return

}

let reader = new FileReader()

reader.onload = function(){

let newUser = {

name: name,
email: email,
password: password,
photo: reader.result,
admin: admin

}

users.push(newUser)

localStorage.setItem("users", JSON.stringify(users))

alert("Usuario registrado correctamente")

// CAMBIAR A LOGIN

loginForm.style.display = "flex"
registerForm.style.display = "none"

document.querySelector(".registerText").textContent = "¿No tienes cuenta?"
toggle.textContent = "Regístrate"


}

reader.readAsDataURL(file)

})

// LOGIN

loginForm.addEventListener("submit", function(e){

e.preventDefault()

let email = document.getElementById("loginEmail").value
let password = document.getElementById("loginPassword").value

let users = JSON.parse(localStorage.getItem("users"))

let user = users.find(u => u.email === email && u.password === password)

if(user){

localStorage.setItem("session", JSON.stringify(user))

window.location = "../paginas/Inicio/inicio.html"

}else{

alert("Usuario no encontrado")

}

})

// PREVIEW DE FOTO

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