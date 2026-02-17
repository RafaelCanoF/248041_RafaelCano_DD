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


window.addEventListener("scroll", ()=>{

    const desplazamiento = window.scrollY;

    titulo.style.left = desplazamiento * 1.5 + "px";

    luna.style.transform = `scale(${1 + desplazamiento * 0.001})`;

    edificios.style.transform = 
        `translateY(${desplazamiento * .5 }px) 
         scaleY(${1 - desplazamiento * 0.0008})`;

    // Estructura de control obligatoria
    if(desplazamiento > 400){
        document.querySelector(".navbar").style.backgroundColor = "#1a1c20";
    } else {
        document.querySelector(".navbar").style.backgroundColor = "#292c31";
    }

});