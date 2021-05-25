function blockUser(thisUser, otherUser) {
    block(thisUser, otherUser, true);
    block(otherUser, thisUser, true);
}
function block(thisUsername, otherUsername, unfollow){
    let url =  "http://lingojiveapi.herokuapp.com/users/" + thisUsername;
    let blockxhttp = new XMLHttpRequest();
    blockxhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){
            if(document.getElementById("btnAddFollow").innerText == "Unfollow"){
                document.getElementById("btnAddFollow").innerText = "Follow";
            } else {
                document.getElementById("btnAddFollow").innerText = "Unfollow";
            }
            console.log("users:");
            console.log(JSON.parse(this.responseText));
            makeblockList(JSON.parse(this.responseText), unfollow, thisUsername, otherUsername);
            patchBlock(thisUsername, userBlockingData);
        };
    };
    blockxhttp.open('GET', url,true);
    blockxhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    blockxhttp.send();
}


var userBlockingData;
var blocklist;
var field;
var addOther;

function makeblockList(users, unfollow, thisUser, notThisUser) {
    userBlockingData = "";
    addOther = true;
    for (let user in users){
        field = "";
        if(users[user]["username"] == username){
            field = "blocking";
        }
        else{
            field = "blockedBy";
        }
        console.log("field:" + field);
        if(field != ""){
            blocklist = users[user][field];
            for (let blocker in blocklist) {
                if(blocklist[blocker] == notThisUser){
                    userBlockingData += "";
                    addOther = false;
                } else {
                    userBlockingData += field + "=" + blocklist[blocker] + "&";
                }
            }
            if(addOther){
                if(field == "blocking"){
                    userBlockingData += field + "=" + otherUsername;

                }
                else if(field == "blockedBy"){
                    userBlockingData += field + "=" + username;
                }
            }
            if(unfollow){
                follows = users[user]["following"];
                for (let follow in follows) {
                    if(follows[follow] != notThisUser){
                        userBlockingData += "&following=" + follows[follow];
                    }
                }
            }
        }
    }
    if(blocklist.length == 1 && !addOther){
        userBlockingData = field + "=";
    }
}

function patchBlock(thisUser, userBlockingData){
    console.log("thisUser:" + thisUser);
    console.log("userFollowing " + userBlockingData)
    let url = "http://lingojiveapi.herokuapp.com/users/" + thisUser;
    let blockxhttp2 = new XMLHttpRequest();
    blockxhttp2.open('PATCH', url, true);
    blockxhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    blockxhttp2.send(userBlockingData);
}