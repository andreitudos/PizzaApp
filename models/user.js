let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let bcrypt = require('bcrypt');


//mongoose.connect('mongodb://ds026558.mlab.com:26558/pizzaapp',{ useNewUrlParser: true });
//mongoose.connect('mongodb://localhost:27017/pizzaapp',{ useNewUrlParser: true });
//let db= mongoose.connection;

//User Schema

let UserSchema = mongoose.Schema({

    fname:{
        type: String,
    },
    lname:{
        type: String,
    },
    username:{
        type: String,
        unique: true
    },
    vat:{
        type:String,
        unique: true
    },
    email: {
        type: String,
        unique: true 
    },
    password:{
        type: String
    },
    phone:{
        type: String
    },
    country:{
        type: String
    }
});
UserSchema.plugin(uniqueValidator);

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

//GET USER BY USERNAME
module.exports.getUserByUsername = function(username, callback){
    let query = {username: username};
    User.findOne(query, callback);
}

//GET USER BY ID
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//PASSWORDS COMPARE
module.exports.comparePassword = function (candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch)
    });
}