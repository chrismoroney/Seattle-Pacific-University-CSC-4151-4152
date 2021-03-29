var chats = document.getElementById('chatList');
var username = document.getElementById('username').innerText;
var url = 'https://lingojiveapi.herokuapp.com/chats';

url += "/" + username;
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
            let link = document.createElement("a");
            link.href = "/chats?chat=" + response[i]._id;
            let span = document.createElement("span");
            chats.appendChild(li);
            let text = document.createTextNode(response[i].Name);
            link.appendChild(text);
            li.appendChild(link);

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