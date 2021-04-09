var express = require('express');
var router = express.Router();

function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    console.log('called');
    // let chat = req.query['chat'];
    // if(chat){
    //     res.render('directmessage.html', {root: 'views', username: req.session.username, chatID: req.params.ChatID})
    // }
    // else {
        res.render('chats.html', {root: 'views', username: req.session.username})
    // }
});

router.get('/:ChatID', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    var chatID = req.params.ChatID;
    console.log(chatID);
    if(req.params.ChatID){
        console.log(req.params.ChatID);
        res.render('directmessage.html', {root: 'views', username: req.session.username, ChatID: req.params.ChatID})
    }
});
module.exports = router;