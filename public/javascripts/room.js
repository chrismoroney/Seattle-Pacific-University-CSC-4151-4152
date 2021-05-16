const socket = io('');

let peerUserName = ''
let peerId = ''
socket.emit('here-is-my-username', myusername)
socket.on('here-is-their-username', theirusername => {
    alert(theirusername)
    peerUserName = theirusername
})
//test
// socket.emit('join-room', ROOM_ID, 10);
// socket.on('user-connected', userId => {
//     console.log('user connected' + userId + "????");
// });
//test end

const videoGrid = document.getElementById('video-grid')
// const myPeer = new Peer(undefined, {
//     host: '/',
//     port: '3001'
// })

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
        alert('user connected')
        peerId = userId
        connectToNewUser(userId, stream)
        socket.emit('here-is-my-username', myusername)
        socket.on('here-is-their-username', theirusername => {
            alert(theirusername)
            peerUserName = theirusername
        })
    })
})

socket.on('user-disconnected', userId => {
    // alert('user disconnected')
    let rateUserBox = document.getElementsByClassName("rateUser")[0]
    rateUserBox.style.display = "block"
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
    window.location.href = "/"
})

document.getElementById("submitRating").addEventListener("click", function(){
    let userData = "overallFluency=" + document.getElementById("overallFluency").value
    // let xhttpGetUrl = 'http://localhost:5000/users/'
    // let xhttpGet = new XMLHttpRequest()
    // xhttpGet.onreadystatechange = function(){
    //     // let userGetResults
    //     if(this.readyState == 4 && this.status == 200){
    //         // alert(peerId)
    //         // userGetResults = this.response
    //         let response = JSON.parse(this.responseText)
    //         for(let i = 0; i < response.length; ++i){
    //             // alert(response[i]._id)
    //             if(response[i]._id == peerId){
    //                 peerUserName = response[i].username
    //                 alert("user found! " + peerUserName)
    //                 break;
    //             }
    //         }
    //     }
    // }
    // xhttpGet.open("GET", xhttpGetUrl, true)
    // xhttpGet.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhttpGet.send();
    alert(peerUserName)
    alert(userData)
    let rateUserUrl = 'http://localhost:5000/users/' + peerUserName
    // alert(document.getElementById("overallFluency").value)
    let xhttpRate = new XMLHttpRequest();
    xhttpRate.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert("User Rated!")
            window.location.href = "/"
        }
    }
    xhttpRate.open("PATCH", rateUserUrl, true)
    xhttpRate.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttpRate.send(userData);
})