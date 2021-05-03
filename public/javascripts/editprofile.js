let url = 'https://lingojiveapi.herokuapp.com/chats';
let xhttp = new XMLHttpRequest();
let numUnreadMessages = 0;


xhttp.onreadystatechange = function(){
    console.log("called");
    if(this.readyState == 4 && this.status == 200){
        console.log(this.responseText);
        var response = JSON.parse(this.responseText);
        for(let i = 0; i < response.length; ++i){
            if(response[i].UnreadBy){
                if(response[i].UnreadBy == username){
                    numUnreadMessages++;
                }
            }
        }
        if(numUnreadMessages > 0){
            document.getElementById("button_badge").innerText = numUnreadMessages.toString();
            document.getElementById("button_badge").style.display = "inline";
        }
    }
}

xhttp.open("GET", url, true);
xhttp.send();


function CreateTable(data){
    let table = "";
    table =
        '<table class="table table-bordered table-hover"> \n' +
        '   <thead>\n' +
        '       <tr>\n' +
        '           <th scope="col">username</th> \n'+
        '           <th scope="col">First Name</th> \n'+
        '           <th scope="col">Last Name</th> \n'+
        '           <th scope="col">Password</th> \n'+
        '       </tr>\n' +
        '   </thead>\n' +
        '   <tbody>\n';

    for (let user in data){
        table +=
            '       <tr>\n' +
            '           <td>' + data[user]["username"]+  '</td>\n' +
            '           <td>' + data[user]["firstname"]+  '</td>\n' +
            '           <td>' + data[user]["lastname"]+  '</td>\n' +
            '           <td>' + data[user]["password"]+  '</td>\n' +
            '           <td>' + data[user]["bio"]+  '</td>\n' +
            '       </tr>\n';
    }

    table +=
        '   </tbody>\n' +
        '</table>\n'
    return table;
}

var langExp = [];
var langLearn = [];

$('#langExp').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    if(isSelected) {
        langExp.push(e.target.options[clickedIndex].value);
        console.log("langexp: " + langExp);
    } else {
        let index = langExp.indexOf(e.target.options[clickedIndex].value);
        langExp.splice(index, 1);
        console.log("langexp: " + langExp);
    }
});

$('#langLearn').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    if(isSelected) {
        langLearn.push(e.target.options[clickedIndex].value);
        console.log("langlearn: " + langLearn);
    } else {
        let index = langLearn.indexOf(e.target.options[clickedIndex].value);
        langLearn.splice(index, 1);
        console.log("langlearn: " + langLearn);
    }
});

document.getElementById("btnUpdateUser").addEventListener("click", (event) =>{
    let username = document.getElementById("username").innerText;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let password = document.getElementById("password").value;
    let confirmpassword = document.getElementById("confirm_password").value;
    let bio = document.getElementById("bio").value;
    let langExpSend = "";
    let langLearnSend = "";
    let url = "https://lingojiveapi.herokuapp.com/users/" + username + "/";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){
            if (firstname === "" && lastname === "" && password === "" && confirmpassword === "" && bio === "" && langExp.length == 0 && langLearn.length == 0){
                document.getElementById("output2").innerHTML =
                    "<pre>" + "Please fill in at least one field above" + "</pre>";
            } else {
                let apiResponse = "[" + this.responseText + "]";
                document.getElementById("output2").innerHTML =
                    //CreateTable(JSON.parse(apiResponse)) + "<p></p>" +
                    "<pre>" + "Successfully saved new user info. " + "</pre>";
            }
        }
    };

    var userData;
    if (password === confirmpassword){
        if (firstname !== ""){
            if (lastname !== "" || password !== "" || confirmpassword !== "" || bio !== "" || langExp.length !== 0 || langLearn.length !== 0) {
                firstname = "firstname=" + document.getElementById("firstname").value + "&";
            } else {
                firstname = "firstname=" + document.getElementById("firstname").value;
            }
        }
        if (lastname !== ""){
            if (password !== "" || confirmpassword !== "" || bio !== "" || langExp.length !== 0 || langLearn.length !== 0) {
                lastname = "lastname=" + document.getElementById("lastname").value + "&";
            } else {
                lastname = "lastname=" + document.getElementById("lastname").value;
            }
        }
        if (password !== ""){
            if (confirmpassword !== "" || bio !== "" || langExp.length !== 0 || langLearn.length !== 0) {
                password = "password=" + document.getElementById("password").value + "&";
            } else {
                password = "password=" + document.getElementById("password").value;
            }
        }
        if (confirmpassword !== ""){
            if (bio !== "" || langExp.length !== 0 || langLearn.length !== 0){
                confirmpassword = "confirmpassword=" + document.getElementById("confirm_password").value + "&";
            } else {
                confirmpassword = "confirmpassword=" + document.getElementById("confirm_password").value;
            }
        }
        if(bio !== ""){
            if(langExp.length !== 0 || langLearn.length !== 0){
                bio = "bio=" + document.getElementById("bio").value + "&";
            } else {
                bio = "bio=" + document.getElementById("bio").value;
            }

        }
        for (var i = 0; i < langExp.length; i++){
            if(langLearn.length == 0){
                if(i !== langExp.length - 1){
                    langExpSend += "langExp=" + langExp[i] + "&";
                } else {
                    langExpSend += "langExp=" + langExp[i];
                }
            } else {
                langExpSend += "langExp=" + langExp[i] + "&";
            }

        }
        for (i = 0; i < langLearn.length; i++){
            if(i !== langLearn.length - 1){
                langLearnSend += "langLearn=" + langLearn[i] + "&";
            } else {
                langLearnSend += "langLearn=" + langLearn[i];
            }
        }
        userData = firstname + lastname + password + confirmpassword + bio + langExpSend + langLearnSend;
        xhttp.open('PATCH', url, true);
        // Just needed to place this line AFTER opening the object
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(userData);
    } else {
        document.getElementById("output2").innerHTML =
            "<pre>" + "Your passwords do not match. Please try again. " + "</pre>";
    }
});

document.getElementById("btnDiscardChanges").addEventListener("click", (event) =>{
    window.location.pathname = "myprofile";
});



