let mongoose = require('mongoose');
//Order Schema
let OrderSchema = mongoose.Schema({

    oder:{
        type: String,
        unique: true 
    },
    userID:{
        type: String
    },
    quantity: {
        type: Number,
        unique: true 
    },
    price:{
        type: Number
    }
});

let Order = module.exports = mongoose.model('Order', OrderSchema);

module.exports.createUser = function (newOrder, callback){
  
        newOrder.save(callback);
   
}

module.exports.getOrderByUserID = function(id, callback){
    Order.findById(id, callback);
}