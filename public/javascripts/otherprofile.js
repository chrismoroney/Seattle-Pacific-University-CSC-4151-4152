var socket = io();

let url = "http://lingojiveapi.herokuapp.com/users/" + otherUsername;
let xhttp = new XMLHttpRequest();

let blockurl = "http://lingojiveapi.herokuapp.com/blockuser/" + otherUsername;
let xhttp2 = new XMLHttpRequest();
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
            $("#btnAddfollow").remove();
            $("#fullname").remove();
            $("#userInfo").hide().after("<h3>You cannot view this user's profile because you are blocked</h3>");
        }
        else{
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
    window.location.href = "http://lingojiveapi.herokuapp.com/blockeduser/" + username;
}

function blockUser() {

    xhttp2.open("GET", blockurl, true);
    xhttp2.send();
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
        let follows = users[user]["follows"];
        for (let follow in follows) {
            if (follows[follow] == otherUsername) {
                document.getElementById("btnAddfollow").innerText = "Remove follow";
            } else {
                document.getElementById("btnAddfollow").innerText = "Add follow";
            }
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
