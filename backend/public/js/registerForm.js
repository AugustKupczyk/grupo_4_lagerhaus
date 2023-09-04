const nombreInp = document.querySelector("#nombre");
const apellidoInp = document.querySelector("#apellido");
const emailInp = document.querySelector("#email");
const passwordInp = document.querySelector("#password");
const imageInp = document.querySelector("#img");
const errorsList = document.querySelector("#errors");
const submitBtn = document.querySelector("#enviar");

const checkErrors = () => {
    let errorsHTML = Array.from(document.querySelectorAll(".error"))
    let errors = [];

    errorsHTML.forEach(error => {
        if(error.innerHTML !== ""){
            errors.push(error.innerHTML);
        }
    });

    if(errors.length > 0){
        submitBtn.disabled = true;
    } else {
        submitBtn.disabled = false;
    }  
}

emailInp.oninput = (e) => {
    const value = e.target.value;
    const length = e.target.value.length;
    const isEmailCorrect = e.target.value.includes("@") && e.target.value.includes(".");

    if (length === 0){
        e.target.nextElementSibling.innerHTML = "El email es obligatorio<br>"
    } else {
        e.target.nextElementSibling.innerHTML = ""    
    }
    
    if (!isEmailCorrect){
        e.target.nextElementSibling.innerHTML += "El email es inválido<br>"
    } else {
        e.target.nextElementSibling.innerHTML = ""    
    }

    checkErrors();
}

nombreInp.oninput = (e) => {
    const length = e.target.value.length;
    
    if (length < 2){
        e.target.nextElementSibling.innerHTML = "El nombre debe contener al menos 2 caracteres<br>"
    } else {
        e.target.nextElementSibling.innerHTML = ""    
    }
    checkErrors();
}

apellidoInp.oninput = (e) => {
    const length = e.target.value.length;
    
    if (length < 2){
        e.target.nextElementSibling.innerHTML = "El apellido debe contener al menos 2 caracteres<br>"
    } else {
        e.target.nextElementSibling.innerHTML = ""    
    }
    checkErrors();
}

passwordInp.oninput = (e) => {
    const value = e.target.value;
    const length = e.target.value.length;

    if(length < 8) {
        e.target.nextElementSibling.innerHTML = "La contraseña debe contener al menos 8 caracteres<br>"
    } else {
        e.target.nextElementSibling.innerHTML = ""    
    }

    if (!/[A-Z]/.test(value)) {
        e.target.nextElementSibling.innerHTML += "La contraseña debe contener al menos una letra mayúscula<br>"
    }

    if (!/[a-z]/.test(value)) {
        e.target.nextElementSibling.innerHTML += "La contraseña debe contener al menos una letra minúscula<br>"
    }

    if (!/\d/.test(value)) {
        e.target.nextElementSibling.innerHTML += "La contraseña debe contener al menos un número<br>"
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/.test(value)) {
        e.target.nextElementSibling.innerHTML += "La contraseña debe contener al menos un carácter especial<br>"
    } 

    checkErrors();
}

imageInp.oninput = (e) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    const file = e.target.files[0];

    if (!file) {
        e.target.nextElementSibling.innerHTML = "Debe adjuntar una imagen";
        return;
    }

    if (!allowedExtensions.exec(file.name)) {
        e.target.nextElementSibling.innerHTML = "Los formatos permitidos son JPG, JPEG, PNG y GIF";
    } else {
        e.target.nextElementSibling.innerHTML = "";
    }

    checkErrors();
}
