var url = 'https://lingojiveapi.herokuapp.com/chats';
var xhttp = new XMLHttpRequest();
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

xhttp.open("GET", url, true);
xhttp.send();

function checkProfilePic(){
    let url = "https://lingojiveapi.herokuapp.com/users/" + username;
    let xml = new XMLHttpRequest();
    xml.onload = function (){
        if (this.readyState == 4 && this.status == 200){
            checkImage(JSON.parse(this.responseText))
        };
    };
    xml.open('GET', url,true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xml.send();
}

function checkImage(users){
    for (let user in users) {
        let img = users[user]["profileImage"];
        if(img != ""){
            document.getElementById("photo").src = "http://lingojiveapi.herokuapp.com/" + img;
        } else {
            document.getElementById("photo").src = "../Picture/profilephoto.png";
        }
    }
}
window.onload=checkProfilePic;