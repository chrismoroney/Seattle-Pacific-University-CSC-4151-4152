const socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

var url = 'https://lingojiveapi.herokuapp.com/posts';
// var url = 'http://localhost:5000/posts';

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        messages.innerHTML = '';
        var response = JSON.parse(this.responseText);
        for(let i = 0; i < response.length; ++i){
            var item = document.createElement('li');
            item.textContent = response[i].Body;
            // messages.appendChild(item);
            messages.prepend(item);
            var user = document.createElement('div');
            user.textContent = response[i].Name;
            item.prepend(user);
            const button = document.createElement('button')
            button.style="float: right";
            button.textContent= 'Reply';
            item.prepend(button);
        }
    }
};

xhttp.open("GET", url,
    true);
xhttp.send();



socket.on('post', function(postContent) {
    xhttp.open("GET", url,
        true);
    xhttp.send();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        var body = input.value;
        var name = document.getElementById('label1').innerText;
        var params = 'Name='+name+'&Body='+body;
        input.value = '';
        socket.emit('post', input.value);

        xhttp.open("POST", url,
            true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(params);
    }
});

var url2 = 'https://lingojiveapi.herokuapp.com/chats';
// var url2 = 'http://localhost:5000/chats';
var xhttp2 = new XMLHttpRequest();
var numUnreadMessages = 0;


xhttp2.onreadystatechange = function(){
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

xhttp2.open("GET", url2, true);
xhttp2.send();
