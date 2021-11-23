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

async function loginAction(url, formData){
    const plainData = Object.fromEntries(formData.entries());

    await fetchAdmin();
    adminList.forEach(admin => {
        console.log(admin);
        if(admin.username === plainData.username){
            if(admin.password === plainData.password){
                window.location.href = "../UI/frontpage.html?id="+admin.adminId+"&type=admin";
            }
        }
    })

}
let adminList = [];
async function fetchAdmin(){
    const url = "http://localhost:7777/fetchAdmin"
    try{
        const promise = fetch(url).then(response => response.json());
        await promise.then(data => {
            data.forEach(admin => {
                adminList.push(admin);
                console.log(admin);
            })
        })
    }
    catch(error){
        console.warn("Error Fetching Admin from Api: "+error);
    }
}
