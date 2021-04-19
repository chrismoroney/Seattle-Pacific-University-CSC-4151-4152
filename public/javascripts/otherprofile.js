var username = document.getElementById("head_username").innerText;
let url = "http://lingojiveapi.herokuapp.com/users/" + username;
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        let users = JSON.parse(this.responseText);
        for(let user in users){
            firstName = users[user]["firstname"];
            lastName = users[user]["lastname"];
            langLearn = users[user]["langLearn"];
            langExp = users[user]["langExp"];
            bio = users[user]["bio"];
        }

        document.getElementById("fullname").innerText = firstName + " " + lastName;
        document.getElementById("bio").innerText = bio;
        document.getElementById("langLearn").innerText = langLearn;
        document.getElementById("langExp").innerText = langExp;

    } else if (this.status == 404) {
        console.log("error");
    }
};
xhttp.open("GET", url, true);
xhttp.send();

