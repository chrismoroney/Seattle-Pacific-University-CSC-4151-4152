var messages = document.getElementById('messages');
var chatID = document.getElementById('chatID').innerText;
var username = document.getElementById('username').innerText;
//var url = 'https://lingojiveapi.herokuapp.com/directmessages';
var url = 'https://localhost:5000/directmessages';

url += "/" + chatID;
console.log("Username: " + username);
console.log("URL: " + url);
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    console.log("Called");
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        // messages.innerHTML = '';
        var response = JSON.parse(this.responseText);
        for(let i = 0; i < response.length; ++i){
            let li = document.createElement("li");
            let span = document.createElement("span");
            messages.appendChild(li).append(response[i].Message);
            messages.appendChild(span).append(response[i].Sender);

            // var item = document.createElement('li');
            // item.textContent = response[i].Body;
            // // messages.appendChild(item);
            // messages.prepend(item);
            // var user = document.createElement('div');
            // user.textContent = response[i].Name;
            // item.prepend(user);
        }
        window.scrollTo(0, document.body.scrollHeight);
    }
};

xhttp.open("GET", url, true);
xhttp.send();