let express = require('express');
let router = express.Router();

let Order = require('../models/order');

//ORDERS PAGE
router.get('/', ensureAuthenticated, function (req, res) {
    res.render('order');
});


function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        req.user.username = res.user;
        return next();
    }else{
       // req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}


module.exports = router;