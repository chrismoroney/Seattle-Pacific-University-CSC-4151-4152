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
var recipient = document.getElementById('recipient');

url += "/" + username;
console.log("Username: " + username);
console.log("URL: " + url);
var xhttp = new XMLHttpRequest();


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
                //messages.appendChild(li).append(response[i].Sender);
                //messages.appendChild(span).append(response[i].Message);
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
}

xhttp.onreadystatechange = function() {
    console.log("Called");
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        // messages.innerHTML = '';
        var response = JSON.parse(this.responseText);
        for(let i = 0; i < response.length; ++i){
            let li = document.createElement("li");

            li.className = "linkClass list-group-item";
            li.id = response[i]._id;
            chats.appendChild(li);
            let text = document.createTextNode(response[i].Members[0]);
            if(response[i].Members[0] === username){
                text.nodeValue = response[i].Members[1];
            }
            //let text = document.createTextNode(response[i].Name);
            li.appendChild(text);
            let videoCall = document.createElement("button");
            videoCall.innerText = "call";
            videoCall.addEventListener("click", function(){
                socket.emit("send-call-invite", {invitee: text.nodeValue, inviter: username, roomId: roomId});
                // alert("hello");
                let url = "http://lingojive.herokuapp.com/videochat/" + roomId;
                let alertBox = document.getElementsByClassName("alertBox")[0];
                alertBox.style.display = "block";
                alertBox.innerHTML = 'Calling ' + text.nodeValue +
                '<a href="' + url + '">' + ' Join Room ' + '<\a>';
                ;
                // alert("inviting " + text.nodeValue + " to room " + url)
            })
            li.appendChild(videoCall);
            li.addEventListener("click", function(){
                showMessages(li.id);
            });

        }
        window.scrollTo(0,document.querySelector(".chatcol3").scrollHeight);
    }
};

xhttp.open("GET", url, true);
xhttp.send();

form.addEventListener('submit', function(e) {
    var xhttp3 = new XMLHttpRequest();
    var url3 = 'https://lingojiveapi.herokuapp.com/directmessages/';
    // var url3 = 'http://localhost:3000/directmessages/';


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
        // messages.appendChild(li).append(sender);
        // messages.appendChild(span).append(message);
        messages.appendChild(li).append(message);
        li.classList.add("thisUser");
        messageScroll.scrollTop = messageScroll.scrollHeight;

        socket.emit("direct message", {Sender: sender, Message: message, ChatID: chatID});
    }
});

form2.addEventListener('submit', function(e) {
    var xhttp4 = new XMLHttpRequest();
    var url4 = 'https://lingojiveapi.herokuapp.com/chats/';
    // var url4 = 'http://localhost:3000/chats/';


    e.preventDefault();
    //if (recipient.value && input2.value) {
    if (recipient.value) {
        // var members = [];
        var member1 = document.getElementById('username').innerText;
        var member2 = recipient.value;
        // members.push(member1);
        // members.push(member2);

        // var name = input2.value;
        //var firstMessage = input2.value;
        var name = "uniformchatname";
        // var params = 'Name='+name+'&Members='+members;
        var params = 'Name='+name+'&Member1='+member1+'&Member2='+member2;
        //input2.value = '';
        recipient.value = '';

        xhttp4.open("POST", url4,
            true);
        xhttp4.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp4.send(params);
    }
});

socket.on("direct message sent", data => {
    if(data.ChatID == chatID){
        let li = document.createElement("li");
        let span = document.createElement("span");
        messages.appendChild(li).append(data.Message);
        // if(messages.childNodes[messages.childNodes.length -1].classList.contains("thisUser")){
        //     li.classList.add("newSender");
        // }
        // alert("messages: " + messages + "\n");
        // alert("child nodes: " + messages.childNodes + "\n");
        // alert("child nodes length: " + messages.childNodes.length);
        // alert("last node: " + messages.childNodes[messages.childNodes.length - 1].innerText);
        // alert("class list: " + messages.childNodes[messages.childNodes.length -1].classList[0]);
        li.classList.add("otherUser");
        // messages.appendChild(span).append(data.Sender);
        messageScroll.scrollTop = messageScroll.scrollHeight;
    }
});

socket.on('call-invite', (data) => {
    if(data.invitee == username){
        console.log(data.invitee, data.inviter, data.roomId)
        let url = "http://lingojive.herokuapp.com/videochat/" + data.roomId;
        let alertBox = document.getElementsByClassName("alertBox")[0];
        alertBox.style.display = "block";
        alertBox.innerHTML = data.inviter + ' wants to chat with you: ' +
                             '<a href="' + url + '">' + 'Accept' + '<\a>';
        // alert(data.inviter + " is inviting you to chat in room " + url)
        // alert(data.invitee + " " + data.inviter + " " + data.roomId);
    }
})

