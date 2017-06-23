var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var passport = require("passport");
//================
//  AUTH ROUTES
//================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//HOME
router.get("/", function(req,res){
    res.redirect("kits");
});

//SECRET
router.get("/profile", function(req, res) {
    res.render("profile");
});
//NEW USER
router.get("/register", function(req, res) {
    res.render("register");
});

//REGISTER LOGIC
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/kits"); 
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
})

// LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/kits",
        failureRedirect: "/login"
    }), function(req, res){
});

//LOGOUT LOGIC
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/login");
});

module.exports = router;