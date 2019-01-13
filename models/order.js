let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

//mongoose.connect('mongodb://ds026558.mlab.com:26558/pizzaapp',{ useNewUrlParser: true });
//mongoose.connect('mongodb://localhost:27017/pizzaapp',{ useNewUrlParser: true });
//let db= mongoose.connection;

//User Schema

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