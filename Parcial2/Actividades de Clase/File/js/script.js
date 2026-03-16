/* function LeerArchivo(event){
    const archivo = event.target.files[0];
    if(archivo){
        if(archivo.type === "image/jpeg" || archivo.type === "image/png" || archivo.type === "image/webp"){
            const lectorArchivo = new FileReader();

            lectorArchivo.onload = function (elemento){
                const url_imagen = elemento.target.result;
                const imagen = document.querySelector("#imagen-seleccionada")
                imagen.src = url_imagen;
            }

            lectorArchivo.readAsDataURL(event.target.files[0]);
        }
        else{
            console.log("Tipo de archivo inválido")
        }

    }
    else{
        console.log("No se leyó el archivo");
    }
} */

document.querySelector("#input-imagen").addEventListener('change',(event)=>{
    const url = LeerArchivo(event.target.files[0]);
    url.then((dato) => {
              const imagen = document.querySelector("#imagen-seleccionada")
                imagen.src = dato;
    }).catch(() => {
            console.log("algo saló mal")

    }
    )
        
})
function LeerArchivo(archivo){
    return new Promise((resolve, reject)=>{
        if(archivo){
            if(archivo.type === "image/jpeg" || archivo.type === "image/png" || archivo.type === "image/webp"){
                const lectorArchivo = new FileReader();

                lectorArchivo.onload = (elemento) => {
                    const url_imagen = elemento.target.result;
                    resolve(url_imagen);
                }

                lectorArchivo.readAsDataURL(archivo);
            }
            else{
                reject();
            }
        }
        else{
            reject();
        }
    });
}

