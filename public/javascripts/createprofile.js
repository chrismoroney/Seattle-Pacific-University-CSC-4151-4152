document.getElementById("btnAddProfile").addEventListener("click", (event) => {
    let url = "http://lingojiveapi.herokuapp.com/users"
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("output").innerHTML = "<pre>" + this.responseText + "</pre>" +
                "<pre>" + "Successfully created Profile!" + "</pre>";
        } else {
            document.getElementById("output").innerHTML = "<pre>" + "Error: Please fill in all fields and make sure passwords match." + "</pre>";
        }
    };
    let data = "firstname=" + document.getElementById("firstname").value + "&" +
        "lastname=" + document.getElementById("lastname").value  + "&" +
        "username="  + document.getElementById("username").value  + "&" +
        "password=" + document.getElementById("password").value  + "&" +
        "confirmpassword="  + document.getElementById("confirmpassword").value;
    xhttp.open('POST', url, true);
    // Just needed to place this line AFTER opening the object
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(data);
});