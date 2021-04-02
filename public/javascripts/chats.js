var socket = io();

var chats = document.getElementById('chatList');
var messages = document.getElementById('messages');
var username = document.getElementById('username').innerText;
// var url = 'https://lingojiveapi.herokuapp.com/chats';
var url = 'http://localhost:5000/chats';
var chatID = 0;

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
    // var url2 = 'https://lingojiveapi.herokuapp.com/directmessages/';
    var url2 = 'http://localhost:5000/directmessages/';

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
                messages.appendChild(span).append(response[i].Sender);
            }
            window.scrollTo(0, document.body.scrollHeight);
        }
    };

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

            li.className = "linkClass";
            li.id = response[i]._id;
            chats.appendChild(li);
            let text = document.createTextNode(response[i].Name);
            li.appendChild(text);
            li.addEventListener("click", function(){
                showMessages(li.id);
            });

        }
        window.scrollTo(0, document.body.scrollHeight);
    }
};

xhttp.open("GET", url, true);
xhttp.send();

form.addEventListener('submit', function(e) {
    var xhttp3 = new XMLHttpRequest();
    // var url3 = 'https://lingojiveapi.herokuapp.com/directmessages/';
    var url3 = 'http://localhost:5000/directmessages/';


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
        messages.appendChild(span).append(sender);

        socket.emit("direct message", {Sender: sender, Message: message, ChatID: chatID});
    }
});

form2.addEventListener('submit', function(e) {
    var xhttp4 = new XMLHttpRequest();
    // var url4 = 'https://lingojiveapi.herokuapp.com/chats/';
    var url4 = 'http://localhost:5000/chats/';

    e.preventDefault();
    if (recipient.value && input2.value) {
        var members = [];
        var member2 = recipient.value;
        var member1 = document.getElementById('username').innerText;
        members.push(member1);
        members.push(member2);
        var name = input2.value;
        var params = 'Name='+name+'&Members='+members;
        input2.value = '';
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
        messages.appendChild(span).append(data.Sender);
    }
});
