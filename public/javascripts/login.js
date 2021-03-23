// Works, but need to send to homepage now.
// document.getElementById("btnLogin").addEventListener("click", (event) =>{
//     document.getElementById("output").innerHTML = "Checking servers...";
//     let url = "http://lingojiveapi.herokuapp.com/users/" + document.getElementById("username").value;
//     let typedPassword = document.getElementById("password").value;
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function(){
//         var response = (JSON.parse(this.responseText))[0];
//         if (this.readyState == 4 && this.status == 200){
//             if (typedPassword == response.password){
//                 // session.loggedin = true;
//                 // session.name = response.name;
//                 window.location.pathname = "homepage";
//                 document.getElementById("output").innerHTML = "<pre>" + "Successfully Logged In! (redirect to homepage.html)" + "</pre>";
//             }
//         } else {
//             document.getElementById("output").innerHTML = "<pre>" + "Your username or password is incorrect. Please try again." + "</pre>";
//         }
//     };
//     xhttp.open("GET", url, true);
//     xhttp.send();
// });
// Could also add a "forgot password functionality