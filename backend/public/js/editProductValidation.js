const titleInp = document.querySelector("#titulo-producto");
const descriptionInp = document.querySelector("#descripcion-producto");
const imgInp = document.querySelector("#imagen-producto");
const enviarBtn = document.querySelector("#enviar");

const checkErrors = () => {
    let errorsHTML = Array.from(document.querySelectorAll(".error"))
    let errors = [];

    errorsHTML.forEach(error => {
        if(error.innerHTML !== ""){
            errors.push(error.innerHTML);
        }
    });

    if(errors.length > 0){
        enviarBtn.disabled = true;
    } else {
        enviarBtn.disabled = false;
    }
}

titleInp.oninput = (e) => {
    const value = e.target.value;
    const length = e.target.value.length;

    if (length === 0) {
        e.target.nextElementSibling.innerHTML = "El nombre del producto es obligatorio.";

    } else if (titleInp.value.length > 0 && titleInp.value.length < 5) {
        e.target.nextElementSibling.innerHTML = "El nombre del producto debe tener al menos 5 caracteres.";

    } else {
        e.target.nextElementSibling.innerHTML = ""    
    }

    checkErrors();
}

descriptionInp.oninput = (e) => {
    const value = e.target.value;
    const length = e.target.value.length;

    if (length < 10) {
        e.target.nextElementSibling.innerHTML = "La descripción del producto debe tener al menos 10 caracteres.";
    } else {
        e.target.nextElementSibling.innerHTML = ""    
    }

    checkErrors();
}

// imgInp.change = (e) => {
//     const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
//     const value = e.target.value;

//     if (!allowedExtensions.exec(value)) {
//         e.target.nextElementSibling.innerHTML = "La imagen debe tener una extensión válida: JPG, JPEG, PNG o GIF.";
//     }

//     checkErrors();
// }