var express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
var router = express.Router();

router.get('/',(req,res)=>
{
    req.session.destroy((err)=>{});
    res.redirect('/');
});

module.exports = router;