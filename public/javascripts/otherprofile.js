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
            $("#btnAddFriend").remove();
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



var userFriendsData = "";
function makeFriendsList(users) {
    for (let user in users){
        let friends = users[user]["friends"];
        for (let friend in friends) {
            if(friends[friend] == otherUsername){
                userFriendsData += "";
            } else {
                userFriendsData += "friends=" + friends[friend] + "&";
            }
        }
    }
}

document.getElementById("btnAddFriend").addEventListener("click", (event) =>{
    let url = "http://lingojiveapi.herokuapp.com/users/" + username;
    let friendxhttp = new XMLHttpRequest();
    friendxhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("btnAddFriend").innerText = "Remove Friend";
            makeFriendsList(JSON.parse(this.responseText));
            friendsPartTwo();
        };
    };
    friendxhttp.open('GET', url,true);
    friendxhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    friendxhttp.send();
});

function friendsPartTwo(){
    let url = "http://lingojiveapi.herokuapp.com/users/" + username;
    userFriendsData += "friends=" + otherUsername + "&";

    let friendxhttp2 = new XMLHttpRequest();
    friendxhttp2.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){

        };
    };
    friendxhttp2.open('PATCH', url, true);
    friendxhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    friendxhttp2.send(userFriendsData);
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
    // var url4 = 'http://localhost:3000/chats/';

    let member1 = username;
    let member2 = otherUsername;

    let name = "uniformchatname";
    let params = 'Name=' + name + '&Member1=' + member1 + '&Member2=' + member2;

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(params);

    // window.location.href = "/chats"
    window.location.href = "/chats/" + otherUsername;
});
