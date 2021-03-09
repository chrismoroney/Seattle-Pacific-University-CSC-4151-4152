var socket = io();
var messages = document.getElementById("messages");
var username = document.getElementById('username').innerText;

(function() {
    $("form").submit(function(e) {
        let li = document.createElement("li");
        e.preventDefault(); // prevents page reloading
        // socket.emit("chat message", $("#message").val());
        // username = document.getElementById('username').innerText;
        socket.emit("chat message", {msg: $("#message").val(), username: username});


        messages.appendChild(li).append($("#message").val());
        let span = document.createElement("span");
        // messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");
        messages.appendChild(span).append("by " + username + ": " + "just now");

        $("#message").val("");

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