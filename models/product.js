let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

//Product Schema
let ProductSchema = mongoose.Schema({

    productname:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    sku:{
        type: String,
        unique: true,
        require: true
    },
    price: {
        type: Number,
    },
    iamge:{ type: String} 
});

let Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.createProduct = function (newProduct, callback){
    bcrypt.genSalt(10, function(err, salt){
        newProduct.save(callback);
    });
}

//GET PRODUCT BY NAME
module.exports.getProductByName = function(productname, callback){
    let query = {productname: productname};
    Product.findOne(query, callback);
}

//GET PRODUCT BY SKU
module.exports.getProductBySKU = function(sku, callback){
    Product.findBySKU(sku, callback);
}