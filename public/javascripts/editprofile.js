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
            '           <td>' + data[user]["bio"]+  '</td>\n' +
            '       </tr>\n';
    }

    table +=
        '   </tbody>\n' +
        '</table>\n'
    return table;
}

document.getElementById("btnUpdateUser").addEventListener("click", (event) =>{
    let username = document.getElementById("username").innerText;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let password = document.getElementById("password").value;
    let confirmpassword = document.getElementById("confirm_password").value;
    let bio = document.getElementById("bio").value;
    let url = "https://lingojiveapi.herokuapp.com/users/" + username + "/";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){
            if (firstname === "" && lastname === "" && password === "" && confirmpassword === "" && bio === ""){
                document.getElementById("output2").innerHTML =
                    "<pre>" + "Please fill in at least one field above" + "</pre>";
            } else if (username === ""){
                document.getElementById("output2").innerHTML =
                    "<pre>" + "Input a valid username above first (use the search button to find a valid username)" + "</pre>";
            } else {
                let apiResponse = "[" + this.responseText + "]";
                document.getElementById("output2").innerHTML =
                    //CreateTable(JSON.parse(apiResponse)) + "<p></p>" +
                    "<pre>" + "Successfully saved new user info. " + "</pre>";
            }
        }
    };
    var userData;
    if (password === confirmpassword){
        if (firstname !== ""){
            if (lastname !== "" || password !== "" || confirmpassword !== "" || bio !== "") {
                firstname = "firstname=" + document.getElementById("firstname").value + "&";
            } else {
                firstname = "firstname=" + document.getElementById("firstname").value;
            }
        }
        if (lastname !== ""){
            if (password !== "" || confirmpassword !== "" || bio !== "") {
                lastname = "lastname=" + document.getElementById("lastname").value + "&";
            } else {
                lastname = "lastname=" + document.getElementById("lastname").value;
            }
        }
        if (password !== ""){
            if (confirmpassword !== "" || bio !== "") {
                password = "password=" + document.getElementById("password").value + "&";
            } else {
                password = "password=" + document.getElementById("password").value;
            }
        }
        if (confirmpassword !== ""){
            if (bio !== ""){
                confirmpassword = "confirmpassword=" + document.getElementById("confirm_password").value + "&";
            } else {
                confirmpassword = "confirmpassword=" + document.getElementById("confirm_password").value;
            }
        }
        if(bio !== ""){
            bio = "bio=" + document.getElementById("bio").value;
        }
        userData = firstname + lastname + password + confirmpassword + bio;
        xhttp.open('PATCH', url, true);
        // Just needed to place this line AFTER opening the object
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(userData);
    } else {
        document.getElementById("output2").innerHTML =
            "<pre>" + "Your passwords do not match. Please try again. " + "</pre>";
    }
});

document.getElementById("btnDiscardChanges").addEventListener("click", (event) =>{
    window.location.pathname = "myprofile";
});