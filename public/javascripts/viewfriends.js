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
        let friends = users[user]["friends"];
        for (let friend in friends){
            let href = "/otherprofile/" + friends[friend];
            table +=
                '       <tr>\n' +
                '           <td>' + friends[friend] +  '</td>\n' +
                '           <td><a href=' + href + '><input type=button value=\'View Profile\'></a></td> \n'+
                '       </tr>\n';
        }

    }

    table +=
        '   </tbody>\n' +
        '</table>\n'
    return table;
}
// Still need to figure out
document.getElementById("btnViewFriends").addEventListener("click", (event) =>{
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
});
