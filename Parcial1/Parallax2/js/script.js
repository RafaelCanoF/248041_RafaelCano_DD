const titulo = document.querySelector("#titulo")
const moira = document.querySelector("#moira")
const luna = document.querySelector("#luna")
const follaje = document.querySelector("#follaje")
const edificios = document.querySelector("#edificios")
const nubes = document.querySelector("#nubes")

window.addEventListener("scroll", (event)=>{
    titulo.style.left = window.scrollY *1.5 + "px";
    moira.style.top= window.scrollY *.1 + "px";
    moira.style.right= window.scrollY *.1 + "px";
    luna.style.left = window.scrollY *1 + "px";
    luna.style.transform = `scale(${1 + window.scrollY * 0.001})`;
    follaje.style.top= -window.scrollY *.2 + "px";
    nubes.style.top= -window.scrollY *.2 + "px";
    edificios.style.transform = `translateY(${window.scrollY * .5 }px) scaleY(${1 - window.scrollY * 0.0008})`;
});