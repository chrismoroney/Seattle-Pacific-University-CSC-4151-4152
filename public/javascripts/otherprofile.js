var socket = io();

let url = "http://lingojiveapi.herokuapp.com/users/" + otherUsername;
let xhttp = new XMLHttpRequest();

//let blockurl = "http://lingojiveapi.herokuapp.com/blockuser/" + otherUsername;
let blockurl = "http://localhost:5000/blockuser/" + otherUsername;
let xhttp2 = new XMLHttpRequest();
let xhttp3 = new XMLHttpRequest();
//let unblockurl = "http://lingojiveapi.herokuapp.com/unblockuser/" + otherUsername;
let unblockurl = "http://localhost:5000/unblockuser/" + otherUsername;
xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        let users = JSON.parse(this.responseText);
        console.log(users);
        for(let user in users){
            firstName = users[user]["firstname"];
            lastName = users[user]["lastname"];
            langLearn = users[user]["langLearn"];
            langExp = users[user]["langExp"];
            bio = users[user]["bio"];
        }


        if(users[0]["blocking"].indexOf(username) > -1){

            if(users[0]["blockedBy"].indexOf(username) > -1) {
                $("#btnBlockUser").hide();
                $("#btnUnblockUser").show();
            }
            $("#btnAddfollow").remove();
            $("#messageButton").remove();
            $("#fullname").remove();
            $("#userInfo").hide().after("<h3 class='blockWarning'>You cannot view this user's profile because you are blocked</h3>");
        }
        else{
            if(users[0]["blockedBy"].indexOf(username) > -1){
                $("#btnBlockUser").hide();
                $("#btnUnblockUser").show();
                $("#btnAddfollow").hide();
                $("#messageButton").hide();
                $("#fullname").hide();
                $("#userInfo").hide().after("<h3 class='blockWarning'>You cannot view this user's profile because you have blocked them</h3>");
            }
            document.getElementById("fullname").innerText = firstName + " " + lastName;
            document.getElementById("bio").innerText = bio;
            document.getElementById("langLearn").innerText = langLearn;
            document.getElementById("langExp").innerText = langExp;
            document.getElementById("btnBlockUser").onclick = blockUser;
        }
        
    } else if (this.status == 404) {
        console.log("error");
    }
};
xhttp.open("GET", url, true);
xhttp.send();

xhttp2.onreadystatechange = function (){
    if (this.readyState == 4 && this.status == 200){
        $("#btnBlockUser").hide();
        $("#btnUnblockUser").show();
        $("#btnAddfollow").hide();
        $("#messageButton").hide();
        $("#fullname").hide();
        $("#userInfo").hide().after("<h3 class='blockWarning'>You cannot view this user's profile because you have blocked them</h3>");
    }
    else if(this.status == 404){
        alert("There was an error, please try again later");
    }
}
xhttp3.onreadystatechange = function (){
    if (this.readyState == 4 && this.status == 200){
        $("#btnBlockUser").show();
        $("#btnUnblockUser").hide();
        $("#btnAddfollow").show();
        $("#messageButton").show();
        $("#fullname").show();
        $("#userInfo").show();
        $(".blockWarming").hide();
    }
    else{
        alert("There was an error, please try again later");
    }
}

function blockUser() {

    xhttp2.open("Patch", blockurl, true);
    xhttp2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp2.send("blockedUser=" + otherUsername);
}
function unblockUser(){


    xhttp3.open("Patch", unblockurl, true);
    xhttp3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp3.send("blockedUser=" + otherUsername);
}
function check() {
    let url = "http://lingojiveapi.herokuapp.com/users/" + username;
    let initialfollow = new XMLHttpRequest();
    initialfollow.onload = function (){
        if (this.readyState == 4 && this.status == 200){
            checkInitialfollow(JSON.parse(this.responseText))
        };
    };
    initialfollow.open('GET', url,true);
    initialfollow.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    initialfollow.send();
}

function checkInitialfollow(users){
    for (let user in users) {
        let follows = users[user]["following"];
        if(follows.includes(otherUsername)){
            document.getElementById("btnAddFollow").innerText = "Unfollow";
        } else {
            document.getElementById("btnAddFollow").innerText = "Follow";
        }
    }
}

var userFollowingData;
var follows;
var addOther;
function makefollowsList(users) {
    userFollowingData = "";
    addOther = true;
    for (let user in users){
        follows = users[user]["following"];
        for (let follow in follows) {
            if(follows[follow] == otherUsername){
                userFollowingData += "";
                addOther = false;
            } else {
                userFollowingData += "following=" + follows[follow] + "&";
            }
        }
        if(addOther){
            userFollowingData += "following=" + otherUsername;
        }
    }
}

document.getElementById("btnAddFollow").addEventListener("click", (event) =>{
    let url = "http://lingojiveapi.herokuapp.com/users/" + username;
    let followxhttp = new XMLHttpRequest();
    followxhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){
            if(document.getElementById("btnAddFollow").innerText == "Unfollow"){
                document.getElementById("btnAddFollow").innerText = "Follow";
            } else {
                document.getElementById("btnAddFollow").innerText = "Unfollow";
            }
            makefollowsList(JSON.parse(this.responseText));
            followsPartTwo(userFollowingData);
        };
    };
    followxhttp.open('GET', url,true);
    followxhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    followxhttp.send();
});

function followsPartTwo(userFollowingData){
    let url = "http://lingojiveapi.herokuapp.com/users/" + username;
    let followxhttp2 = new XMLHttpRequest();
    followxhttp2.open('PATCH', url, true);
    followxhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(follows.length == 1 && !addOther){
        userFollowingData = "following=";
    }
    followxhttp2.send(userFollowingData);
}

document.getElementById("chatButton").addEventListener("click", function(){
        socket.emit("send-call-invite", {invitee: otherUsername, inviter: username, roomId: roomId});
        let url = "http://lingojive.herokuapp.com/videochat/" + roomId;
        let alertBox = document.getElementsByClassName("alertBox")[0];
        alertBox.style.display = "block";
        alertBox.innerHTML = 'Calling ' + otherUsername +
            '<a href="' + url + '">' + ' Join Room ' + '<\a>';
});

document.getElementById("messageButton").addEventListener("click", function() {
    let xhttp = new XMLHttpRequest();
    let url = 'https://lingojiveapi.herokuapp.com/chats/';
    // var url = 'http://localhost:5000/chats/';
    let member1 = username;
    let member2 = otherUsername;

    let name = "uniformchatname";
    let params = 'Name=' + name + '&Member1=' + member1 + '&Member2=' + member2;

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(params);

    window.location.href = "/chats"
    // window.location.href = "/chats/" + otherUsername;
})

window.onload=check;
