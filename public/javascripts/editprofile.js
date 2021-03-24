function CreateTable(data){
    let table = "";
    table =
        '<table class="table table-bordered table-hover"> \n' +
        '   <thead>\n' +
        '       <tr>\n' +
        '           <th scope="col">username</th> \n'+
        '           <th scope="col">First Name</th> \n'+
        '           <th scope="col">Last Name</th> \n'+
        '           <th scope="col">Password</th> \n'+
        '       </tr>\n' +
        '   </thead>\n' +
        '   <tbody>\n';

    for (let user in data){
        table +=
            '       <tr>\n' +
            '           <td>' + data[user]["username"]+  '</td>\n' +
            '           <td>' + data[user]["firstname"]+  '</td>\n' +
            '           <td>' + data[user]["lastname"]+  '</td>\n' +
            '           <td>' + data[user]["password"]+  '</td>\n' +
            '       </tr>\n';
    }

    table +=
        '   </tbody>\n' +
        '</table>\n'
    return table;
}
document.getElementById("btnFindUser").addEventListener("click", (event) =>{
    let url = "https://lingojiveapi.herokuapp.com/users/" + document.getElementById("username").value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            if (this.responseText == "[]"){
                document.getElementById("output1").innerHTML =
                    "<pre>" + "Please enter in a valid username" + "</pre>";
            } else {
                document.getElementById("output1").innerHTML =
                    CreateTable(JSON.parse(this.responseText));
            }
        } else if (this.status == 404) {
            document.getElementById("output1").innerHTML =
                "<pre>" + this.responseText + "</pre>" + "<p></p>" +"<pre>" +
                "Please enter in a valid username" + "</pre>";
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
    this.responseText = "";
});
document.getElementById("btnUpdateUser").addEventListener("click", (event) =>{
    let username = document.getElementById("username").value;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let password = document.getElementById("password").value;
    let confirmpassword = document.getElementById("confirm_password").value;
    let url = "https://lingojiveapi.herokuapp.com/users/" + username;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){
            if (name === "" && lastname === "" && password === ""){
                document.getElementById("output2").innerHTML =
                    "<pre>" + "Please fill in at least one field above" + "</pre>";
            } else {
                document.getElementById("output2").innerHTML =
                    CreateTable(JSON.parse(this.response)) + "<p></p>" +
                    "<pre>" + "Successfully updated user to the catalog!" + "</pre>";
            }
        }
    };
    if (password == confirmpassword){
        if (firstname !== ""){
            if (lastname !== "" || password !== "" || confirmpassword !== "") {
                firstname = "firstname=" + document.getElementById("firstname").value + "&";
            } else {
                firstname = "firstname=" + document.getElementById("firstname").value;
            }
        }
        if (lastname !== ""){
            if (password !== "" || confirmpassword !== "") {
                lastname = "lastname=" + document.getElementById("lastname").value + "&";
            } else {
                lastname = "lastname=" + document.getElementById("lastname").value;
            }
        }
        if (password !== ""){
            if (confirmpassword !== "") {
                password = "password=" + document.getElementById("password").value + "&";
            } else {
                password = "password=" + document.getElementById("password").value;
            }
        }
        if (confirmpassword !== ""){
            confirmpassword = "confirmpassword=" + document.getElementById("confirmpassword").value + "&";
        }
    } else {

    }
    let userData = firstname + lastname + password + confirmpassword;
    xhttp.open('PATCH', url, true);
    // Just needed to place this line AFTER opening the object
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(userData);
});