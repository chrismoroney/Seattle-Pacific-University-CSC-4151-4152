var url = 'https://lingojiveapi.herokuapp.com/chats';
var xhttp = new XMLHttpRequest();
var numUnreadMessages = 0;

xhttp.onreadystatechange = function(){
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

xhttp.open("GET", url, true);
xhttp.send();