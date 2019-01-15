let express = require('express');
let router = express.Router();
let apputils = require('./apputils')
let Order = require('../models/order');

//ORDERS PAGE
router.get('/', apputils.ensureAuthenticated, function (req, res) {
    res.render('order');
});

module.exports = router;