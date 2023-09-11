const titleInp = document.querySelector("#nombre-producto");
const descriptionInp = document.querySelector("#descripcion-producto");
const imgInp = document.querySelector("#img");
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
    console.log("Input event on descriptionInp");
    
    const value = e.target.value;
    const length = e.target.value.length;

    if (length === 0) {
        console.log("Description is empty");
        e.target.nextElementSibling.innerHTML = "La descripción del producto es obligatoria.";
    } else if (length < 20) {
        console.log("Description is too short");
        e.target.nextElementSibling.innerHTML = "La descripción del producto debe tener al menos 20 caracteres.";
    } else {
        console.log("Description is valid");
        e.target.nextElementSibling.innerHTML = "";
    }

    checkErrors();
}