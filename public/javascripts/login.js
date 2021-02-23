// Works, but need to send to homepage now.
document.getElementById("btnLogin").addEventListener("click", (event) =>{
    document.getElementById("output").innerHTML = "";
    let url = "http://lingojiveapi.herokuapp.com/users/" + document.getElementById("username").value;
    let typedPassword = document.getElementById("password").value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        let response = JSON.parse(this.responseText);
        if (this.readyState == 4 && this.status == 200){
            if (typedPassword == response.password){
                document.getElementById("output").innerHTML = "<pre>" + "Successfully Logged In! (redirect to homepage.html)" + "</pre>";
            }
        } else {
            document.getElementById("output").innerHTML = "<pre>" + "The information entered is incorrect. Please try again." + "</pre>";
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
});
// Could also add a "forgot password functionality