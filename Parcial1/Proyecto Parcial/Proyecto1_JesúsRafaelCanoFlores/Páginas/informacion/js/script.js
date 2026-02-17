const tarjetasInformacion = document.querySelectorAll(".tarjeta-info");

const observer = new IntersectionObserver((entradas)=>{

    entradas.forEach((entrada)=>{

        if(entrada.isIntersecting){
            entrada.target.style.opacity = "1";
            entrada.target.style.transform = "translateY(0px)";
        }

    });

}, { threshold: 0.3 });

tarjetasInformacion.forEach((tarjeta)=>{
    tarjeta.style.opacity = "0";
    tarjeta.style.transform = "translateY(50px)";
    observer.observe(tarjeta);
});


const seccionInfo = document.querySelector(".info-general");

const observerInfo = new IntersectionObserver((entradas)=>{

    entradas.forEach((entrada)=>{

        if(entrada.isIntersecting){
            seccionInfo.style.opacity = "1";
            seccionInfo.style.transform = "translateY(0px)";
        }

    });

}, { threshold: 0.3 });

observerInfo.observe(seccionInfo);
