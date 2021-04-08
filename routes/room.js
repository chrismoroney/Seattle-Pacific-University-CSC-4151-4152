const express = require('express')
var router = express.Router();
const { v4: uuidV4 } = require('uuid')

function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.get('/', (req, res) => {
    res.redirect('/videochat' +`/${uuidV4()}`)
})

router.get('/:room', (req, res) => {
    res.render('room.html', { root: 'views', roomId: req.params.room })
})

module.exports = router;