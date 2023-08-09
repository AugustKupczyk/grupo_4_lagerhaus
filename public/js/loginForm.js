const emailInp = document.querySelector("#email");
const passwordInp = document.querySelector("#password");
const submitBtn = document.querySelector("#ingresar");

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

passwordInp.oninput = (e) => {
    const value = e.target.value;
    const length = e.target.value.length;

    if (length === 0){
        e.target.nextElementSibling.innerHTML = "La contraseña es obligatoria<br>"
    } else {
        e.target.nextElementSibling.innerHTML = ""    
    }

    checkErrors();
}
