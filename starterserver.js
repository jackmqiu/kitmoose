var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: "AKIAJTCJ2FVMF2NGS3HA",
  awsSecret: "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",
  awsTag: "kitmoose-20"
});

var commentRoutes = require("./routes/comments"),
    kitRoutes = require("./routes/kits"),
    authRoutes = require("./routes/auth");



//REQUIRE MODELS
var Kit = require('./models/kit');
var User = require('./models/user');
var Comment = require('./models/comment');


//APP CONFIG
//mongoose.connect("mongodb://localhost/starterkits");
mongoose.connect("mongodb://kitmoose:sharedpass1@ds135912.mlab.com:35912/kitmoose")

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));

//seedDB(); //SEED DATABASE

//AUTHENTICATION

app.use(require("express-session")({
    secret: "batman",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//requiring routes
app.use(authRoutes);
app.use("/kits", kitRoutes);
app.use("/kits/:id/comments", commentRoutes);





// app.get('/search', function(req, res) {
//     var searchTerm = req.query.search;
//     res.render('search', {searchTerm:searchTerm});
// });

// app.get("/:category", function(req,res){
//     var category = req.params.category;
//     res.render("category.ejs",{thingVar: category})
// })

// app.get("/:category/:kit", function(req,res){
//     var kit = req.params.kit;
//     res.render("index", {kit: kit})
//     console.log(req.params);
// })




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Starterkits server is running")
})
