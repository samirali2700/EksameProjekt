let companyInstance;
let adminInstance;

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
function nextStep(){
    const parent = document.getElementById("body");
    const div = document.createElement("div");
    const parentDiv = document.createElement("div");
    div.className = "loader";
    parentDiv.className = "overlay";
    parentDiv.id = "loading";
    parentDiv.appendChild(div);

    parent.appendChild(parentDiv);

    const parentForm = document.getElementById("createUserForm");
    const submitBtn = document.getElementById("submit-btn");

    //Replacing inputs
    const inputQuery = document.querySelectorAll("input");
    const labelQuery = document.querySelectorAll("label");
    for(let i = 0; i < inputQuery.length; i++) {
        parentForm.removeChild(inputQuery.item(i));

    }
    for (let i = 0; i < labelQuery.length; i++){
        parentForm.removeChild(labelQuery.item(i));
    }

    document.getElementById("obs-mess").remove();


    const fNameLabel = document.createElement("label");
    fNameLabel.setAttribute('for', 'firstName');
    fNameLabel.innerHTML = "Fornavn";

    const fNameInput = document.createElement("input");
    fNameInput.setAttribute('type', 'text');
    fNameInput.setAttribute('id', 'firstName');
    fNameInput.setAttribute('name', 'firstName');


    parentForm.insertBefore(fNameInput,parentForm.firstChild);
    parentForm.insertBefore(fNameLabel, parentForm.firstChild);



    const lNameLabel = document.createElement("label");
    lNameLabel.setAttribute('for', 'lastName');
    lNameLabel.innerHTML = "Efternavn";

    const lNameInput = document.createElement("input");
    lNameInput.setAttribute('type', 'text');
    lNameInput.setAttribute('id', 'lastName');
    lNameInput.setAttribute('name', 'lastName');


    submitBtn.before(lNameLabel);
    submitBtn.before(lNameInput);


    const emailLabel = document.createElement("label");
    emailLabel.setAttribute('for', 'email');
    emailLabel.innerHTML = "E-mail";

    const emailInput = document.createElement("input");
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('id', 'email');
    emailInput.setAttribute('name', 'email');



    submitBtn.before(emailLabel);
    submitBtn.before(emailInput);


    const userLabel = document.createElement("label");
    userLabel.setAttribute('for', 'username');
    userLabel.innerHTML = "Brugernavn";

    const userInput = document.createElement("input");
    userInput.setAttribute('type', 'text');
    userInput.setAttribute('id', 'username');
    userInput.setAttribute('name', 'username');

    submitBtn.before(userLabel);
    submitBtn.before(userInput);


    const passLabel = document.createElement("label");
    passLabel.setAttribute('for', 'password');
    passLabel.innerHTML = "Adganskode";

    const passInput = document.createElement("input");
    passInput.setAttribute('type', 'password');
    passInput.setAttribute('id', 'password');
    passInput.setAttribute('name', 'password');

    submitBtn.before(passLabel);
    submitBtn.before(passInput);


    document.getElementById("submit-btn").innerHTML = "Opret Bruger";




    parent.removeChild(parentDiv);

}
async function submitNewUser(formData){
    const plainData = Object.fromEntries(formData.entries());
    const adminUrl = "http://localhost:7777/createAdmin";
    const companyUrl = "http://localhost:7777/createCompany";

   // console.log(plainData.companyName)
    //console.log(plainData.username)
    nextStep();

  /*  if(document.getElementById("sumbit-btn").innerHTML === 'Næste Trin'){
        //Savin company to db First, and receive company id when stored
        const companyObj = {
            companyName: plainData.companyName,
            companyPhone: plainData.companyPhone,
            employeeCount: 0,
        }

        const JSONCompanyObj = {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(companyObj)
        }

        await fetch(companyUrl,JSONCompanyObj)
            .then(response => response.json())
            .then(data => {
                companyInstance = data;

                }
            )
            .catch(error => {
                console.warn("Failed To Save Company To DB: "+error)
            });

    }
    else{
        console.log(plainData.username)

        //Admin Object is defined
        const adminObj = {
            username: plainData.username,
            password: plainData.password,
            firstName: plainData.firstName,
            lastName: plainData.lastName,
            phone: plainData.phone,
            email: plainData.email,
            company: companyInstance
        }
        const JSONAdminObj = {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(adminObj)
        }


        await fetch(adminUrl, JSONAdminObj).then(response => response.json())
            .then(data => {
                adminInstance = data
            })
            .catch(error => console.warn("Failed To Save Admin To DB: "+error));

        console.log(adminInstance.adminId);
       // await fetch("http://localhost:7777/setAdminId/"+adminInstance.adminId+"/"+companyInstance.companyId);

        //window.location.href = "../UI/frontpage.html?id="+admin.adminId+"&type=admin"

    }*/
   /*

        const adminToString = ;

        let admin;
        let company;



                        const JSONAdmin = {
                            method: "POSt",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(adminObjTemp)
                        }

                await fetch("http://localhost:7777/saveAdmin", JSONAdmin)
                    .then(() => {

                    })
                        .catch(error => console.warn("Failed To Save admin With CompanyID: "+error));
    */



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