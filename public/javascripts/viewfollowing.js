function CreateTable(users){
    let table = "";
    table =
        '<table class="table table-bordered table-hover"> \n' +
        '   <thead>\n' +
        '       <tr>\n' +
        '           <th scope="col">Username</th> \n'+
        '           <th scope="col">Profile</th> \n'+
        '       </tr>\n' +
        '   </thead>\n' +
        '   <tbody>\n';

    for (let user in users){
        let follows = users[user]["following"];
        for (let follow in follows){
            let href = "/otherprofile/" + follows[follow];
            if(follows[follow] != ""){
                table +=
                    '       <tr>\n' +
                    '           <td>' + follows[follow] +  '</td>\n' +
                    '           <td><a href=' + href + '><input type=button value=\'View Profile\'></a></td> \n'+
                    '       </tr>\n';
            }
        }
    }

    table +=
        '   </tbody>\n' +
        '</table>\n'
    return table;
}
// Still need to figure out

function loadFriends(){
    let url = "http://lingojiveapi.herokuapp.com/users/" + username;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("output").innerHTML =
                CreateTable(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

window.onload=loadFriends;
