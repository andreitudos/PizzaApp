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
    category:{
        type: String,
        require: true
    },
    price: {
        type: Number,
    },
    image:{ type: String} 
});

let Product = module.exports = mongoose.model('Product', ProductSchema);

//POST NEW PRODUCT
module.exports.createProduct = function (newProduct, callback){
        newProduct.save(callback);
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

//GET PRODUCT BY CATEGORY
module.exports.getProductByCategory = function(category, callback){
 //  Product.findByCategory(category, callback);


 Product.find('category',callback);


   // Product.findOne(category, ProductSchema);
}

