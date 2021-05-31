var express = require('express')
var router = express.Router();
const { v4: uuidV4 } = require('uuid')

function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.get('/', (req, res) => {
    if(!req.session.username){
        res.redirect('/');
    }
    res.redirect('/videochat' +`/${uuidV4()}`)
})

router.get('/:room', (req, res) => {
    if(!req.session.username){
        res.redirect('/');
    }
    res.render('room.html', { root: 'views', roomId: req.params.room, myusername: req.session.username })
    // res.sendFile('room.html', {root: 'views'})
})

module.exports = router;