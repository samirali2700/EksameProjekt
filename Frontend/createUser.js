addEventListener("DOMContentLoaded", submitForm);

function submitForm(){
    const form = document.getElementById("createUserForm");
    form.addEventListener("submit", createUserSubmit);
}

async function createUserSubmit(event){
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try{
        await submitNewUser(formData);
    }catch(error){
        console.warn("Failed To submit form: (Create new User) "+error);
    }

}
async function submitNewUser(formData){
    const plainData = Object.fromEntries(formData.entries());
    const adminUrl = "http://localhost:7777/createAdmin";
    const companyUrl = "http://localhost:7777/createCompany";


    //Admin Object is defined
    const adminObj = {
        username: plainData.username,
        password: plainData.password,
        firstName: plainData.firstName,
        lastName: plainData.lastName,
        phone: plainData.phone,
        email: plainData.email
    }
    const adminToString = JSON.stringify(adminObj);
    const JSONAdminObj = {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: adminToString
    }
    let admin;
    let company;

            await fetch(adminUrl, JSONAdminObj).then(response => response.json())
                .then(a => admin = a)
                .catch(error => console.warn("Failed To Save Admin To DB: "+error));

                    const companyObj = {
                        companyName: plainData.companyName,
                        companyPhone: plainData.companyPhone,
                        employeeCount: 0,
                        admin: admin
                    }
                    const JSONCompanyObj = {
                        method: "POST",
                        headers:{
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(companyObj)
                    }

            await fetch(companyUrl,JSONCompanyObj).then(response => response.json())
                .then(c => company = c)
                .catch(error => console.warn("Failed To Save Company To DB: "+error));

                    console.log(admin);
                    const adminObjTemp = {
                        adminId: admin.adminId,
                        username: admin.username,
                        password: admin.password,
                        firstName: admin.firstName,
                        lastName: admin.lastName,
                        phone: admin.phone,
                        email: admin.email,
                        company: company,

                    }
                    const JSONAdmin = {
                        method: "POSt",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(adminObjTemp)
                    }
                    console.log(adminObjTemp);
                    console.log(admin);
            await fetch("http://localhost:7777/saveAdmin", JSONAdmin)
                    .catch(error => console.warn("Failed To Save admin With CompanyID: "+error));



}

function validateMatch(){
    const firstPass = document.getElementById("password");
    const secPass = document.getElementById("repassword");

    if(firstPass.value !== secPass.value){
        firstPass.style.border = "1px solid red";
        secPass.style.border = "1px solid red";
    }
    else{
        firstPass.style.border = "1px solid #000";
        secPass.style.border = "1px solid #000";
    }
}
async function validateUsername(value){
    const userBox = document.getElementById("username");

        const url = "http://localhost:7777/validateUsername/"+value;
        await fetch(url).then(response => response.json())
            .then(num => {
                const userBox = document.getElementById("username");
                if(num !== 0){
                    const span = document.createElement("span");
                    span.className = "notification";
                    span.innerHTML = "Username already exist";

                    userBox.classList.add('error');
                    setTimeout(function() {
                        userBox.classList.remove('error');
                    },300);

                    userBox.style.border = "1px solid red";
                    userBox.after(span);
                }
                else{
                    userBox.style.border = "1px solid #000";
                    const tempSpan = document.querySelector("span");
                    if(tempSpan !== null) {
                        userBox.parentNode.removeChild(tempSpan);
                    }

                }
            })
            .catch(error => console.warn("Fail In username validation: "+error));


}