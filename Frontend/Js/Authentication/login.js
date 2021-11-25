addEventListener("DOMContentLoaded", submitLogin);

function submitLogin(){
    const formObject = document.getElementById("login-form");
    formObject.addEventListener("submit", handleLoginSubmit);
}
async function handleLoginSubmit(event){
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;

    try{
            const formData =new FormData(form);
            await loginAction(url, formData);
    }
    catch(error){
        console.warn("Error in submitting login form:  "+error);
    }
}

(async function() {
    await fetchAdmin();
}())

async function loginAction(url, formData){
    const plainData = Object.fromEntries(formData.entries());
    const passwordField = document.getElementById("passwordField");

    let userFlag = false;
    let passFlag = true;

    const loginFail = document.getElementById("login-fail-div");
    if(loginFail !== null) {
        passwordField.parentNode.removeChild(loginFail);
    }

    adminList.forEach(admin => {

        if(admin.username === plainData.username){
            userFlag = true;
            if(admin.password === plainData.password){
                window.location.href = "Html/UI/frontpage.html?id="+admin.adminId+"&type=admin";
            }
            else{
                passFlag = false;
            }
        }

    })


    const span = document.createElement("span");
    const div = document.createElement("div");
    span.style.color = "red";

    div.id = "login-fail-div";

    div.appendChild(span);

    if(!userFlag){
        span.innerHTML = "*Username does not exist";
        passwordField.after(div);
    }
    if(!passFlag){
        span.innerHTML = "*Wrong password";
        passwordField.after(div);
    }

}
let adminList = [];
async function fetchAdmin(){
    const url = "http://localhost:7777/fetchAdmin"
    try{
        const promise = fetch(url).then(response => response.json());
        await promise.then(data => {
            data.forEach(admin => {
                adminList.push(admin);
            })
        })
    }
    catch(error){
        console.warn("Error Fetching Admin from Api: "+error);
    }
}

