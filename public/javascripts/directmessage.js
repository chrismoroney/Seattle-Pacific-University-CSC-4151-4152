var messages = document.getElementById('messages');
var chatID = document.getElementById('chatID').innerText;
var url = 'https://lingojiveapi.herokuapp.com/directmessages';

url += "/" + chatID;
console.log("URL: " + url);
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    console.log("Called");
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
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

xhttp.open("GET", url, true);
xhttp.send();