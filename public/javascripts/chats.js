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
                let text = document.createTextNode(response[i].Members[0]);
                span.appendChild(text);
                if(response[i].Members[0] === username){
                    text.nodeValue = response[i].Members[1];
                }
                // if(text.nodeValue == targetName){
                //     displayedMessageId = li.id;
                // }
                // li.appendChild(text);
                li.appendChild(span);
                let videoCall = document.createElement("button");
                // videoCall.innerText = "call";
                videoCall.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-fill" viewBox="0 0 16 16">' +
                            '<path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>' +
                    '</svg>'
                videoCall.classList.add("btn-primary");
                videoCall.id = "chatButton";
                videoCall.addEventListener("click", function(){
                    socket.emit("send-call-invite", {invitee: text.nodeValue, inviter: username, roomId: roomId});
                    // let url = "http://lingojive.herokuapp.com/videochat/" + roomId;
                    let url = "http://localhost:3000/videochat/" + roomId;
                    let alertBox = document.getElementsByClassName("alertBox")[0];
                    alertBox.style.display = "block";
                    alertBox.innerHTML = 'Calling ' + text.nodeValue +
                        '<a href="' + url + '">' + ' Join Room ' + '<\a>';
                    ;
                })
                li.appendChild(videoCall);
                li.addEventListener("click", function(){
                    showMessages(li.id);
                });
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
        // let url = "http://lingojive.herokuapp.com/videochat/" + data.roomId;
        let url = "http://localhost:3000/videochat/" + data.roomId;
        let alertBox = document.getElementsByClassName("alertBox")[0];
        alertBox.style.display = "block";
        alertBox.innerHTML = data.inviter + ' wants to chat with you: ' +
                             '<a href="' + url + '">' + 'Accept' + '<\a>';
    }
})

