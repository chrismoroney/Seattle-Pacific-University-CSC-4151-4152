var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>
{
    req.session.destroy((err)=>{});
    res.redirect('/');
});

module.exports = router;