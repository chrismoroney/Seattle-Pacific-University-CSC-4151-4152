var express = require('express');
var router = express.Router();
const { v4: uuidV4 } = require('uuid');

function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.get('/', function(req, res, next) {
    if(!req.session.username){
        res.redirect('/');
    }
    console.log('called');
    let roomId = uuidV4();
    res.render('chats.html', {root: 'views', username: req.session.username, roomId: roomId, targetName: "", blocking: JSON.stringify(req.session.blocking), blockedBy: JSON.stringify(req.session.blockedBy)})
});

router.get('/:targetName', function(req, res, next) {
    if(!req.session.username){
        res.redirect('/');
    }
    var targetName = req.params.targetName;
    console.log(targetName);

    let roomId = uuidV4();
    res.render('chats.html', {root: 'views', username: req.session.username, targetName: targetName, roomId: roomId, blocking: req.session.blocking, blockedBy: req.session.blockedBy})
});
module.exports = router;