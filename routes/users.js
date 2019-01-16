let express = require("express");
let router = express.Router();
let apputils = require("./apputils");

let User = require("../models/user");

//MY ACCOUNT PAGE
router.get("/myaccount",apputils.ensureAuthenticated, function(req, res) {
  res.render("myaccount");
});

//LOGIN PAGE
router.get("/login", function(req, res) {
    res.render("login");
  });

//REGISTER PAGE
router.get("/register", function(req, res) {
    res.render("register");
});

//REGISTER NEW USER
router.post("/register", function(req, res) {
  let fname = req.body.fnameTxt;
  let lname = req.body.lnameTxt;
  let username = req.body.userNameTxt;
  let vatnumber = req.body.vatTxt;
  let email = req.body.emailTxt;
  let password = req.body.pwdTxt;
  let password2 = req.body.repwdTxt;
  let phone = req.body.phoneTxt;
  let country = req.body.countrySelect;

  //Validations
  req.checkBody("fnameTxt").notEmpty().withMessage("First name is required")
                .isLength({ min: 2 }).withMessage("First name requir min 2 chars")
                .isAlpha().withMessage("First name is alpha onley");

  req.checkBody("lnameTxt", "Last name is required").notEmpty()
                .isLength({ min: 3 }).withMessage("Last name requir min 2 chars")
                .isAlpha().withMessage("Last name is alpha onley");

  req.checkBody("userNameTxt", "Username is required").notEmpty();
 // req.checkBody("vatTxt", "VAT number is required").notEmpty();
  req.checkBody("emailTxt", "Email is required").notEmpty();
  req.checkBody("emailTxt", "Email is not valid").isEmail();
  req.checkBody("pwdTxt", "Password is required").notEmpty();
  req.checkBody("pwdTxt").matches(/[a-zA-Z]+/g,"i").withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long'),
 // req.checkBody("pwdTxt", "Password min 8 alphanumeric required").isLength({ min: 8});
  req.checkBody("repwdTxt", "Password do not match").equals(req.body.pwdTxt);
  req.checkBody("phoneTxt", "Phone is required").notEmpty();
  req.checkBody("countrySelect", "Country is required").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.render("register", {
      errors: errors
    });
  } else {
    let newUser = new User({
      fname: fname,
      lname: lname,
      username: username,
      vat: vatnumber,
      email: email,
      password: password,
      phone: phone,
      country: country
    });

    User.createUser(newUser, function(err, user) {
      if (err) throw err;
      console.log(user);
    });
    req.flash("success_msg", "You are registered and can now login");

    res.redirect("/users/login");
  }
});

let passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknown User" });
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password" });
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
  }),
  function(req, res) {
    res.redirect("/register");
  }
);

router.get("/logout", function(req, res) {
    res.clearCookie('connect.sid');
    req.logout();
    req.session.destroy();
 // req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
