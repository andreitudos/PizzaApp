let express = require('express');
let router = express.Router();
let apputils = require('./apputils')

//Homepage
router.get('/', apputils.ensureAuthenticated, function (req, res) {
    res.render('index');
});

module.exports = router;