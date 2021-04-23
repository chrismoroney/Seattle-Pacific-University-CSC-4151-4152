var express = require('express');
var router = express.Router();
const { v4: uuidV4 } = require('uuid');

function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.get('/', function(req, res, next) {
    console.log('called');
    let roomId = uuidV4();
    res.render('chats.html', {root: 'views', username: req.session.username, roomId: roomId,
                                targetName: ""})
});

router.get('/:targetName', function(req, res, next) {
    var targetName = req.params.targetName;
    console.log(targetName);

    let roomId = uuidV4();
    res.render('chats.html', {root: 'views', username: req.session.username, targetName: targetName,
                                        roomId: roomId})
});
module.exports = router;