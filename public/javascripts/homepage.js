var url = 'https://lingojiveapi.herokuapp.com/chats';
var xhttp = new XMLHttpRequest();
alert(username);

xhttp.onreadystatechange = function(){
    console.log("called");
    if(this.readyState == 4 && this.status == 200){
        console.log(this.responseText);
        var response = JSON.parse(this.responseText);
        for(let i = 0; i < response.length; ++i){
            if(response[i].UnreadBy){
                if(response[i].UnreadBy == username){
                    alert("unread messages!");
                }
            }
        }
    }
}

xhttp.open("GET", url, true);
xhttp.send();