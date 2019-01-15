let express = require('express');
let router = express.Router();
let apputils = require('./apputils')
//let passport = require('passport');
//let LocalStrategy = require('passport-local').Strategy;

let Product = require('../models/product');

//CREATE PRODUCT
router.get('/',apputils.ensureAuthenticated , function (req, res) {
    res.render('product');
});

//ADD NEW PRODUCT
router.get('/newproduct', function (req, res) {
    res.render('newproduct');
});
router.post('/newproduct', function (req, res) {
    let productname = req.body.pNameTxt;
    let description = req.body.pDescriptionTxt;
    let sku = req.body.pSkuTxt;
    let category = req.body.pCategoryTxt;
    let image = req.body.pImageTxt;

    //Validations
    req.checkBody('pNameTxt', 'Product name is required').notEmpty();
    req.checkBody('pDescriptionTxt', 'Description is required').notEmpty();
    req.checkBody('pSkuTxt', 'SKU is required').notEmpty();
    req.checkBody('pCategoryTxt', 'Category is required').notEmpty();
    req.checkBody('pImageTxt', 'Image is required').notEmpty();
    

    let errors = req.validationErrors();

    if(errors){
        res.render('newproduct',{
            errors:errors
        });
    }else{
        let newProduct = new Product({
            productname: productname,
            description: description,
            sku: sku,
            category: category,
            image: image
        });

        Product.createProduct(newProduct, function (err, product) {
            if(err) throw err;
            console.log(product);
        });
        req.flash('success_msg', 'New product successfully added');

        res.redirect('/products/newproduct');
    }
});

module.exports = router;