var socket = io();
var messages = document.getElementById("messages");
var username = document.getElementById('username').innerText;


var url = 'https://lingojiveapi.herokuapp.com/messages';
// var url = 'http://localhost:5000/posts';

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        // messages.innerHTML = '';
        var response = JSON.parse(this.responseText);
        for(let i = 0; i < response.length; ++i){
            let li = document.createElement("li");
            let span = document.createElement("span");
            messages.appendChild(li).append(response[i].Message);
            messages.appendChild(span).append(response[i].Name);

            // var item = document.createElement('li');
            // item.textContent = response[i].Body;
            // // messages.appendChild(item);
            // messages.prepend(item);
            // var user = document.createElement('div');
            // user.textContent = response[i].Name;
            // item.prepend(user);
        }
    }
};

xhttp.open("GET", url,
    true);
xhttp.send();


(function() {
    $("form").submit(function(e) {
        let li = document.createElement("li");
        var message = document.getElementById('message').innerText;
        // var message = $("#message").val();
        e.preventDefault(); // prevents page reloading
        // socket.emit("chat message", $("#message").val());
        // username = document.getElementById('username').innerText;

        socket.emit("chat message", {msg: $("#message").val(), username: username});
        // socket.emit("chat message", {msg: message, username: username});


        messages.appendChild(li).append($("#message").val());
        // messages.appendChild(li).append(message);

        let span = document.createElement("span");
        // messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");
        messages.appendChild(span).append("by " + username + ": " + "just now");

        var params = 'Name='+ username + '&Message=' + $("#message").val();
        // var params = 'Name='+ username + '&Message=' + message;

        var url = 'https://lingojiveapi.herokuapp.com/messages';
        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", url,
            true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(params);

        document.getElementById('message').value = '';

        return false;
    });

    socket.on("received", data => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(data.message);
        // messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");
        messages.appendChild(span).append("by " + data.username + ": " + "just now");
        console.log("Hello bingo!");
    });
})();

// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//         let li = document.createElement("li");
//         var message = document.getElementById('message').innerText;
//         // var message = $("#message").val();
//
//         e.preventDefault(); // prevents page reloading
//         // socket.emit("chat message", $("#message").val());
//         // username = document.getElementById('username').innerText;
//
//         // socket.emit("chat message", {msg: $("#message").val(), username: username});
//         socket.emit("chat message", {msg: message, username: username});
//
//
//         // messages.appendChild(li).append($("#message").val());
//         messages.appendChild(li).append(message);
//
//         let span = document.createElement("span");
//         // messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");
//         messages.appendChild(span).append("by " + username + ": " + "just now");
//
//         // var params = 'Name='+ username + '&Message=' + $("#message").val();
//         var params = 'Name='+ username + '&Message=' + message;
//
//         var url = 'https://lingojiveapi.herokuapp.com/messages';
//         var xhttp = new XMLHttpRequest();
//
//         xhttp.open("POST", url,
//             true);
//         xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//         xhttp.send(params);
//
//         return false;
// });

// socket.on("received", data => {
//     let li = document.createElement("li");
//     let span = document.createElement("span");
//     var messages = document.getElementById("messages");
//     messages.appendChild(li).append(data.message);
//     // messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");
//     messages.appendChild(span).append("by " + data.username + ": " + "just now");
//     console.log("Hello bingo!");
// });

let messageInput = document.getElementById("message");
let typing = document.getElementById("typing");

//isTyping event
messageInput.addEventListener("keypress", () => {
    socket.emit("typing", { username: username, message: "is typing..." });
});

socket.on("notifyTyping", data => {
    typing.innerText = data.username + " " + data.message;
    console.log(data.username + data.message);
});

//stop typing
messageInput.addEventListener("keyup", () => {
    socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
    typing.innerText = "";
});