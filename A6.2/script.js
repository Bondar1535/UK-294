const form = document.forms.form
const formdata = new FormData(form)
let form_email = form.elements.email
let form_password = form.elements.password
let form_password_confirm = form.elements.email

form.addEventListener("submit", event =>{
    event.preventDefault()
})

form_email.addEventListener("keydown", () =>{
    form_email = form.elements.email
    validateEmail()
})



function validateEmail(){
    email_value = form_email.value
    if(/[a-z]/.test){
        console.log("hello");
    }else{

    }
}

function validatePass(){

}

function validatePassConfirm(){

}