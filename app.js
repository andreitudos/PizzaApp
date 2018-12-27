let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let exphbs = require('express-handlebars');
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local'),Strategy;
let mongo = require('mongodb');
let mongoose = require('mongoose');
mongoose.connect('mongodb://root:abc1234@ds026558.mlab.com:26558/pizzaapp',{ useNewUrlParser: true });
//mongoose.connect('mongodb://localhost:27017/pizzaapp',{ useNewUrlParser: true });
let db = mongoose.connection;

let routes = require('./routes/index');
let users = require('./routes/users');

//Init
let app = express();

//View engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));


//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        let namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam +='[' + namespace.shift() + ']';
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Connect Flash
app.use(flash());

//Global vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

app.use('/', routes);
app.use('/users', users);

//Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'),function(){
    console.log('Server started on port ' + app.get('port'));
});
