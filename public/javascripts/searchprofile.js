var xhttp = new XMLHttpRequest();
var url = 'https://lingojiveapi.herokuapp.com/chats';
var numUnreadMessages = 0;

xhttp.onreadystatechange = function(){
    numUnreadMessages = 0;
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

function CreateTable(users){
    let table = "";
    table =
        '<table class="table table-bordered table-hover"> \n' +
        '   <thead>\n' +
        '       <tr>\n' +
        '           <th scope="col">Username</th> \n'+
        '           <th scope="col">Name</th> \n'+
        '           <th scope="col">Native Language(s)</th> \n'+
        '           <th scope="col">Learning Language(s)</th> \n'+
        '           <th scope="col">Profile</th> \n'+
        '       </tr>\n' +
        '   </thead>\n' +
        '   <tbody>\n';

    for (let user in users){
        console.log(users[user]);
        let href = "/otherprofile/" + users[user]["username"];
        if(users[user]["blocking"].indexOf(username) == -1){

            table +=
                '       <tr>\n' +
                '           <td>' + users[user]["username"]+  '</td>\n' +
                '           <td>' + users[user]["firstname"] + " " + users[user]["lastname"] + '</td>\n' +
                '           <td>' + users[user]["langExp"]+  '</td>\n' +
                '           <td>' + users[user]["langLearn"]+  '</td>\n' +
                //'           <td><button onclick="window.location.href=\'/otherprofile\'" id="gotoprofile">View Profile</button></td> \n'+
                '           <td><a href=' + href + '><input type=button value=\'View Profile\'></a></td> \n'+
                '       </tr>\n';
        }
    }

    table +=
        '   </tbody>\n' +
        '</table>\n'
    return table;
}
// Need to figure something out for username or name CONTAINING input
document.getElementById("btnLoadUsersByName").addEventListener("click", (event) =>{
    document.getElementById("output").innerHTML = "";
    let url = "http://lingojiveapi.herokuapp.com/users/?firstname=" + document.getElementById("firstname").value;
    //figure something out for last name
    //let url2 = "http://lingojiveapi.herokuapp.com/users/?lastname=" + document.getElementById("lastname").value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("output").innerHTML =
                CreateTable(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
});

document.getElementById("btnLoadUsersByUsername").addEventListener("click", (event) =>{
    document.getElementById("output").innerHTML = "";
    let url = "http://lingojiveapi.herokuapp.com/users/" + document.getElementById("Username").value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("output").innerHTML =
                CreateTable(JSON.parse(this.responseText));
        } else if (this.status == 404) {
            document.getElementById("output").innerHTML =
                "<pre>" + this.responseText + "</pre>" + "<p></p>" +"<pre>" +
                "Please enter in a valid Username" + "</pre>";
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
});

xhttp.open("GET", url, true);
xhttp.send();
/*
document.getElementById("gotoprofile").addEventListener("click", (event) =>{
    let url = "lingojiveapi.herokuapp.com/users/" + users[user]["username"]
});
*/

document.getElementById("btnLoadUsersByLanguage").addEventListener("click", (event) =>{
    let languageSpoken = document.getElementById("languageSpoken").value;
    let languageLearning = document.getElementById("languageLearning").value;
    console.log("Language spoken: " + languageSpoken);
    console.log("Language learning: " + languageLearning);
    let query = "?"
    if(languageLearning !=""){
        query = query + "languageLearning=" + languageLearning;
    }
    if(languageSpoken != ""){
        if(languageLearning !=""){
            query = query + "&";
        }
        query = query + "languageSpoken=" + languageSpoken;
    }
    let languageUrl = 'https://lingojiveapi.herokuapp.com/users/';
    if(query != "?"){
        languageUrl = languageUrl + query;
    }
    console.log(languageUrl);
    let languageXhttp = new XMLHttpRequest();
    languageXhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("output").innerHTML =
                CreateTable(JSON.parse(this.responseText));
        }
    };
    languageXhttp.open("GET", languageUrl, true);
    languageXhttp.send();

})

