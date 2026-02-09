document.querySelector("#dblclick").addEventListener("dblclick", () => {
    const box = document.querySelector("#dblclick");
    box.style.background = "orange";
    box.style.transform = "rotate(10deg)";
    box.textContent = "Ya hiciste doble click";
});

document.querySelector("#click").addEventListener("click", () => {
    const box = document.querySelector("#click");
    box.style.background = "blue";
        box.style.transform = "scale(1.2)";
    box.textContent = "Ya hiciste click";
});

window.addEventListener("load", () => {
    const box = document.querySelector("#onload");
    box.style.background = "green";
    box.textContent = "La página ya cargó";
});

document.querySelector("#move").addEventListener("mousemove", () => {
    const box = document.querySelector("#move");
    box.style.background = "red";
    box.textContent = "Haz hecho Hover";
});


window.addEventListener("scroll", () => {
    const box = document.querySelector("#scroll");
    box.style.background = "purple";
    box.textContent = "Ya hiciste scroll";
});
