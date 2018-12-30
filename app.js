var express = require("express"),
    app     = express(),
    request = require("request"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    methodOverride = require("method-override"),
    Comment = require("./models/comment"),
    flash = require("connect-flash");

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

//seedDB();    
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

//PASSPORT CONFIG 
app.use(require("express-session")({
    secret: "james",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    next();
});
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




var PORT = "3000";
var IP = "127.0.0.1";

app.listen(PORT, IP, function(){
    console.log("The server is up!");
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id",commentRoutes);

