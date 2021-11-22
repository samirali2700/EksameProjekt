
let id;
let type;
let userObj;




getParams();

(async function() {
    await fetchUserById();
    setFrontpage();
}())


function getParams(){
    const urlParams = new URLSearchParams(window.location.search);
    id =  urlParams.get('id');
    type = urlParams.get('type');

}

async function fetchUserById(){
    let url;
    if(type === "admin"){
        url = "http://localhost:7777/fetchAdmin/"+id;
    }
    else
    {
        url = "http://localhost:7777/fetchUser/"+id;
    }

    await fetch(url).then(response => response.json())
        .then(data => {
            userObj = data;
        }).catch(error => console.warn("Error in Fetching from APi: "+error))


    const userInfo = document.getElementById("userInfo");
    const p = document.createElement("p");
    p.innerHTML = "Bruger: "+userObj.username;
    userInfo.appendChild(p);
}


function setFrontpage(){
    const weekNum = document.getElementById("weekNum");
    const weekInfo = document.getElementById("weekInfo");
    const forside = document.getElementById("forside");

    forside.href = "frontpage.html?id="+id+"&type="+type;

    let currentDate = new Date();
    let oneJan = new Date(currentDate.getFullYear(),0,1);

    let numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
    let result = Math.ceil(( currentDate.getDay() + 1 + numberOfDays) / 7);

    weekNum.innerHTML = "Uge "+result;
    let dag;
    switch(currentDate.getDay()){
        case 1: dag = "Mandag";
        break;
        case 2: dag = "Tirsdag";
        break;
        case 3: dag = "Onsdag";
        break;
        case 4: dag = "Torsdag";
        break;
        case 5: dag = "Fredag";
        break;
        case 6: dag = "Lørdag";
        break;
        case 7: dag = "Søndag";
        break;
    }

    weekInfo.innerHTML = ""+dag.bold()+" "+currentDate.toLocaleDateString();

    //console.log(`The week number of the current date (${currentDate}) is ${result}.`);

}