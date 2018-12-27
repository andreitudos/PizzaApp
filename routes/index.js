let express = require('express');
let router = express.Router();

//Homepage
router.get('/', ensureAuthenticated, function (req, res) {
    res.render('index');
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