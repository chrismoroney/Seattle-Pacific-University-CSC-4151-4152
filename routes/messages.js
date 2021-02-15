let express = require('express');
let router = express.Router();
// For the Data Model
let Message = require('../models/Message.js');


function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.get('/', (req, res) => {
    Message.find({},(err, messages)=> {
        res.send(messages);
    })
})

router.post('/', (req, res) => {
    let message = new Message(req.body);
    message.save((err) =>{
        if(err)
            sendStatus(500);
        res.sendStatus(200);
    })
})

module.exports = router;