const socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
//
// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (input.value) {
//         socket.emit('chat message', input.value);
//         input.value = '';
//     }
// });



var url = 'https://lingojiveapi.herokuapp.com/posts';
// var url = 'http://localhost:5000/posts';

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // document.getElementById("ecShowTable").innerHTML = CreateTable(JSON.parse(this.responseText));
        // var item = document.createElement('li');
        console.log(this.responseText);
        // while (messages.hasChildNodes()) {
        //     messages.removeChild(messages.firstChild);
        // }
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
        }
        // item.textContent = JSON.parse(this.responseText)[0].Body;
        // messages.appendChild(item);
        // window.scrollTo(0, document.body.scrollHeight);
    }
};

xhttp.open("GET", url,
    true);
xhttp.send();

// socket.on('chat message', function(msg) {
//     // var item = document.createElement('li');
//     // item.textContent = msg;
//     // messages.appendChild(item);
//     // window.scrollTo(0, document.body.scrollHeight);
//     xhttp.open("GET", url,
//         true);
//     xhttp.send();
// });

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
        // socket.emit('chat message', input.value);
        // input.value = '';
        // let post = new Post(req.body);
        // post.save((err) =>{
        //     if(err)
        //         sendStatus(500);
        //         res.sendStatus(200);
        // })
        // socket.emit('chat message', input.value);
        socket.emit('post', input.value);

        xhttp.open("POST", url,
            true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(params);
    }
});