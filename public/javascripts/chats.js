var chats = document.getElementById('chat');
var username = document.getElementById('username').innerText;
var url = 'https://lingojiveapi.herokuapp.com/chats';

url += "/" + username;

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
            link.href = "https://lingojive.herokuapp.com/" + response[i].ChatID;
            let span = document.createElement("span");
            chats.appendChild(li).append(response[i].Message);
            li.appendChild(link)
            chats.appendChild(span).append(response[i].Name);

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

xhttp.open("GET", url,
    true);
xhttp.send();