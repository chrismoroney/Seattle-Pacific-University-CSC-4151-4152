var socket = io();

var url = 'https://lingojiveapi.herokuapp.com/chats';
var xhttp = new XMLHttpRequest();
var numUnreadMessages = 0;

xhttp.onreadystatechange = function(){
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

xhttp.open("GET", url, true);
xhttp.send();

socket.on('call-invite', (data) => {
    if(data.invitee == username){
        console.log(data.invitee, data.inviter, data.roomId)
        let url = "http://lingojive.herokuapp.com/videochat/" + data.roomId;
        // let url = "http://localhost:3000/videochat/" + data.roomId;
        let alertBoxReceive = document.getElementsByClassName("alertBoxReceive")[0];
        alertBoxReceive.style.display = "block";
        let alertBoxReceiveInner = document.getElementsByClassName("alertBoxReceiveInner")[0];
        alertBoxReceiveInner.innerHTML = data.inviter + ' wants to chat with you! '
        // '<a href="' + url + '">' + 'Accept' + '<\a>';
        let alertBoxReceiveDecline = document.getElementsByClassName("alertBoxReceiveDecline")[0];
        alertBoxReceiveDecline.addEventListener('click', function(){
            alertBoxReceive.style.display = "none";
        })
        let alertBoxReceiveAccept = document.getElementsByClassName("alertBoxReceiveAccept")[0];
        alertBoxReceiveAccept.addEventListener('click', function(){
            window.location.href = url;
        })
    }
})

