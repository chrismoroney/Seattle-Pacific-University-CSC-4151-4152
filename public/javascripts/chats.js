var socket = io();

var chats = document.getElementById('chatList');
var messages = document.getElementById('messages');
var username = document.getElementById('username').innerText;
var url = 'https://lingojiveapi.herokuapp.com/chats';
// var url = 'http://localhost:3000/chats';
var chatID = 0;
var messageScroll = document.getElementById('messageScroll');

var form = document.getElementById('form');
var form2 = document.getElementById('form2');
var input = document.getElementById('chatMsg');
var input2 = document.getElementById('composeMsg');
var recipient;

url += "/" + username;
console.log("Username: " + username);
console.log("URL: " + url);
var xhttp = new XMLHttpRequest();

function readMessage(id){
    let xhttp = new XMLHttpRequest();
    let url = 'https://lingojiveapi.herokuapp.com/chats/'
    // let url = 'http://localhost:5000/chats/';

    // e.preventDefault();
    recipient = "";
    let params = 'ChatID='+chatID+'&Recipient='+recipient;
    xhttp.open("PATCH", url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(params);
}

function showMessages(id){
    var xhttp2 = new XMLHttpRequest();
    var url2 = 'https://lingojiveapi.herokuapp.com/directmessages/';
    // var url2 = 'http://localhost:3000/directmessages/';

    var lastSender = "";
    xhttp2.onreadystatechange = function() {
        console.log("Called");
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            messages.innerHTML = '';
            var response = JSON.parse(this.responseText);
            for(let i = 0; i < response.length; ++i){
                let li = document.createElement("li");
                let span = document.createElement("span");
                messages.appendChild(li).append(response[i].Message);
                if(response[i].Sender == username){
                    li.classList.add("thisUser");
                }
                else{
                    li.classList.add("otherUser");
                }
                if(lastSender != response[i].Sender){
                    li.classList.add("newSender");
                }
                lastSender = response[i].Sender;
            }
            messageScroll.scrollTop = messageScroll.scrollHeight;
        }
    };

    $('.activeChat').removeClass('activeChat');
    console.log("showMessages ID=" + id);
    document.getElementById(id).classList.add("activeChat");
    url2 += id;
    chatID = id;
    xhttp2.open("GET", url2, true);
    xhttp2.send();

    readMessage(id);
}

xhttp.onreadystatechange = function() {
    console.log("Called");
    console.log(blocking);
    console.log(blockedBy);
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        var displayedMessageId = response[response.length-1]._id;
        for(let i = response.length - 1; i >= 0; --i){
            if(blockedBy.indexOf(response[i].Members[0]) == -1 && blockedBy.indexOf(response[i].Members[1]) == -1 && blocking.indexOf(response[i].Members[0]) == -1 && blocking.indexOf(response[i].Members[1]) == -1){

                let li = document.createElement("li");

                li.className = "linkClass list-group-item";
                li.id = response[i]._id;
                chats.appendChild(li);
                let span = document.createElement("span");
                span.id = response[i]._id + "span";
                let thisMember = '';
                let text = document.createTextNode(response[i].Members[0]);
                thisMember = response[i].Members[0];
                span.appendChild(text);
                if(response[i].Members[0] === username){
                    text.nodeValue = response[i].Members[1];
                    thisMember = response[i].Members[1];
                }
                let dropdown = document.createElement('div');
                dropdown.className = 'dropdown';
                dropdown.innerHTML = '<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink' + thisMember + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                        'Actions'+
                    '</a>';
                let menu =document.createElement('div');
                menu.className = "dropdown-menu";
                menu.setAttribute("aria-labelledby", 'dropdownMenuLink' + thisMember);
                menu.innerHTML = '<a class="dropdown-item" href="/otherprofile/' + thisMember +'">View user profile</a>';
                let videoLink = document.createElement('div');
                videoLink.innerHTML = '<a class="dropdown-item" href="#">Video chat</a>';
                let blockLink = document.createElement('div');
                blockLink.innerHTML = '<a class="dropdown-item" href="#" >Block this user</a>';
                blockLink.addEventListener("click", function(){
                    blockUser(username, thisMember);
                    let thisChat = this.parentElement.parentElement.parentElement;
                    console.log("this id=" + thisChat.id);
                    if(thisChat.parentElement.children.length > 1 && thisChat.nextElementSibling != null){
                        let nextId = thisChat.nextElementSibling.id;
                        console.log("next id=" + nextId);
                        showMessages(nextId);
                    }
                    else if(thisChat.parentElement.children.length > 1){
                        let prevId = thisChat.previousElementSibling.id;
                        showMessages(prevId);
                    }
                    else{
                        while (document.getElementById("chatCol2").lastChild){
                            document.getElementById("chatCol2").removeChild(document.getElementById("chatCol2").lastChild);

                        }
                    }
                    thisChat.remove();
                });
                menu.appendChild(blockLink);
                videoLink.addEventListener("click", function(){
                    socket.emit("send-call-invite", {invitee: text.nodeValue, inviter: username, roomId: roomId});
                    //let url = "http://lingojive.herokuapp.com/videochat/" + roomId;
                     let url = "http://localhost:3000/videochat/" + roomId;
                    let alertBox = document.getElementsByClassName("alertBox")[0];
                    alertBox.style.display = "block";
                    alertBox.innerHTML = 'Calling ' + text.nodeValue +
                        '<a href="' + url + '">' + ' Join Room ' + '<\a>';
                    ;
                })
                menu.appendChild(videoLink);
                // if(text.nodeValue == targetName){
                //     displayedMessageId = li.id;
                // }
                // li.appendChild(text);
                li.appendChild(span);
                dropdown.appendChild(menu);
                li.appendChild(dropdown);
                let videoCall = document.createElement("button");
                // videoCall.innerText = "call";
                videoCall.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-fill" viewBox="0 0 16 16">' +
                            '<path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>' +
                    '</svg>'
                videoCall.classList.add("btn-primary");
                videoCall.id = "chatButton";
                videoCall.addEventListener("click", function(){
                    socket.emit("send-call-invite", {invitee: text.nodeValue, inviter: username, roomId: roomId});
                    let url = "http://lingojive.herokuapp.com/videochat/" + roomId;
                    // let url = "http://localhost:3000/videochat/" + roomId;
                    let alertBox = document.getElementsByClassName("alertBox")[0];
                    alertBox.style.display = "block";
                    alertBox.innerHTML = 'Calling ' + text.nodeValue + '<a href="' + url + '">' + ' Join Room ' + '<\a>';
                    ;
                })
                //li.appendChild(videoCall);
                li.addEventListener("click", function(){
                    showMessages(li.id);
                });
            }
            else if( displayedMessageId == response[i]._id){
                displayedMessageId = response[i-1]._id;
            }
        }
        // if(targetName != ""){
        //     showMessages(displayedMessageId);
        // }
        showMessages(displayedMessageId);
        window.scrollTo(0,document.querySelector(".chatcol3").scrollHeight);
    }
};

xhttp.open("GET", url, true);
xhttp.send();

form.addEventListener('submit', function(e) {
    var xhttp3 = new XMLHttpRequest();
    var url3 = 'https://lingojiveapi.herokuapp.com/directmessages/';
    // var url3 = 'http://localhost:3000/directmessages/';
    var xhttp4 = new XMLHttpRequest();
    var url4 = 'https://lingojiveapi.herokuapp.com/chats/'
    // var url4 = 'http://localhost:5000/chats/';

    e.preventDefault();
    if (input.value) {
        var message = input.value;
        var sender = document.getElementById('username').innerText;
        var params = 'Sender='+sender+'&Message='+message+'&ChatID='+chatID;
        input.value = '';

        xhttp3.open("POST", url3,
            true);
        xhttp3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp3.send(params);

        let li = document.createElement("li");
        let span = document.createElement("span");
        messages.appendChild(li).append(message);
        li.classList.add("thisUser");
        messageScroll.scrollTop = messageScroll.scrollHeight;

        socket.emit("direct message", {Sender: sender, Message: message, ChatID: chatID});

        recipient = document.getElementById(chatID + "span").innerText;
        var params2 = 'ChatID='+chatID+'&Recipient='+recipient;
        xhttp4.open("PATCH", url4, true);
        xhttp4.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp4.send(params2);
    }
});

// form2.addEventListener('submit', function(e) {
//     var xhttp4 = new XMLHttpRequest();
//     var url4 = 'https://lingojiveapi.herokuapp.com/chats/';
//     // var url4 = 'http://localhost:3000/chats/';
//
//     e.preventDefault();
//     if (recipient.value) {
//         var member1 = document.getElementById('username').innerText;
//         var member2 = recipient.value;
//
//         var name = "uniformchatname";
//         var params = 'Name='+name+'&Member1='+member1+'&Member2='+member2;
//         recipient.value = '';
//
//         xhttp4.open("POST", url4,
//             true);
//         xhttp4.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//         xhttp4.send(params);
//     }
// });

socket.on("direct message sent", data => {
    if(data.ChatID == chatID){
        let li = document.createElement("li");
        let span = document.createElement("span");
        messages.appendChild(li).append(data.Message);
        li.classList.add("otherUser");
        messageScroll.scrollTop = messageScroll.scrollHeight;
    }
});

socket.on('call-invite', (data) => {
    if(data.invitee == username){
        console.log(data.invitee, data.inviter, data.roomId)
        let url = "http://lingojive.herokuapp.com/videochat/" + data.roomId;
        // let url = "http://localhost:3000/videochat/" + data.roomId;
        let alertBox = document.getElementsByClassName("alertBox")[0];
        alertBox.style.display = "block";
        alertBox.innerHTML = data.inviter + ' wants to chat with you: ' +
                             '<a href="' + url + '">' + 'Accept' + '<\a>';
    }
})


//blocking stuff
function blockUser(thisUser, otherUser) {
    block(thisUser, otherUser, true);
    block(otherUser, thisUser, true);
}
function block(thisUsername, otherUsername, unfollow){
    let url =  "http://lingojiveapi.herokuapp.com/users/" + thisUsername;
    let blockxhttp = new XMLHttpRequest();
    blockxhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){
            makeblockList(JSON.parse(this.responseText), unfollow, thisUsername, otherUsername);
            patchBlock(thisUsername, userBlockingData);
        };
    };
    blockxhttp.open('GET', url,true);
    blockxhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    blockxhttp.send();
}


var userBlockingData;
var blocklist;
var field;
var addOther;

function makeblockList(users, unfollow, thisUser, notThisUser) {
    userBlockingData = "";
    addOther = true;
    for (let user in users){
        field = "";
        if(users[user]["username"] == username){
            field = "blocking";
        }
        else{
            field = "blockedBy";
        }
        console.log("field:" + field);
        if(field != ""){
            blocklist = users[user][field];
            for (let blocker in blocklist) {
                if(blocklist[blocker] == notThisUser){
                    userBlockingData += "";
                    addOther = false;
                } else {
                    userBlockingData += field + "=" + blocklist[blocker] + "&";
                }
            }
            if(addOther){
                userBlockingData += field + "=" + notThisUser;
            }
            if(unfollow){
                follows = users[user]["following"];
                for (let follow in follows) {
                    if(follows[follow] != notThisUser){
                        userBlockingData += "&following=" + follows[follow];
                    }
                }
            }
        }
    }
    if(blocklist.length == 1 && !addOther){
        userBlockingData = field + "=";
    }
}

function patchBlock(thisUser, userBlockingData){
    console.log("thisUser:" + thisUser);
    console.log("userFollowing " + userBlockingData)
    let url = "http://lingojiveapi.herokuapp.com/users/" + thisUser;
    let blockxhttp2 = new XMLHttpRequest();
    blockxhttp2.open('PATCH', url, true);
    blockxhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    blockxhttp2.send(userBlockingData);
}
