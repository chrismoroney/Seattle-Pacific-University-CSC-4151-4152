var img;
function sendToDatabase(){
    let username = document.getElementById("username").innerHTML;
    let imageName = document.getElementById("picName").innerText;
    let url = "https://lingojiveapi.herokuapp.com/users/" + username;
    let sendImage = new XMLHttpRequest();
    img = imageName.replace(/[^\w.]+/g, "");
    sendImage.open('PATCH', url, true);
    sendImage.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    sendImage.send("profileImage=" + img);
}
window.onload = sendToDatabase;