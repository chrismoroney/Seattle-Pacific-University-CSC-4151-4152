let seconds = 300;
const socket = io('');
let peerUserName = ''
let peerId = ''
socket.on('here-is-their-username', theirusername => {
    peerUserName = theirusername
    socket.emit('here-is-my-username', myusername)
})

function intervalFunc() {
    if(seconds > 0){
        console.log(seconds);
        if(seconds % 60 >= 10){
            console.log(seconds / 60);
            document.getElementById("timer").innerText =
                '0' + (Math.floor(seconds / 60)).toFixed(0) + ' : ' + seconds % 60;
        }else{
            document.getElementById("timer").innerText =
                '0' + (Math.floor(seconds / 60)).toFixed(0) + ' : 0' + seconds % 60;
        }
        seconds--;
    }else{
        seconds = 300;
        alert("Time to Switch Languages!");
    }
}

setInterval(intervalFunc, 1000);

const videoGrid = document.getElementById('video-grid')

const myPeer = new Peer();

const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        seconds = 300;
        peerId = userId
        connectToNewUser(userId, stream)
        socket.emit('here-is-my-username', myusername)
    })
})

socket.on('user-disconnected', userId => {
    let rateUserBox = document.getElementsByClassName("rateUser")[0]
    rateUserBox.style.display = "block"
    let rateUserTop = document.getElementById('rateUserTop');
    rateUserTop.innerText = "Rate " + peerUserName + "!";
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})


function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

document.getElementById("hangUpButton").addEventListener("click", function(){
    let rateUserBox = document.getElementsByClassName("rateUser")[0]
    let rateUserTop = document.getElementById('rateUserTop');
    rateUserTop.innerText = "Rate " + peerUserName + "!";
    rateUserBox.style.display = "block"
})

document.getElementById("submitRating").addEventListener("click", function(){
    let userData = "overallFluency=" + document.getElementById("overallFluency").value
    userData += "&pronunciation=" + document.getElementById("pronunciation").value
    userData += "&conversationalAbility=" + document.getElementById("conversationalAbility").value
    userData += "&listening=" + document.getElementById("listening").value
    userData += "&speaking=" + document.getElementById("speaking").value

    let rateUserUrl = 'http://lingojiveapi.herokuapp.com/users/' + peerUserName
    let xhttpRate = new XMLHttpRequest();
    xhttpRate.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // alert("User Rated!")
            window.location.href = "/"
        }
    }
    xhttpRate.open("PATCH", rateUserUrl, true)
    xhttpRate.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttpRate.send(userData);
})