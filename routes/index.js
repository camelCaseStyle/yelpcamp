var express = require("express"),
    passport = require("passport"),
    User = require("../models/user"),
    router = express.Router({mergeParams: true});


router.get("/", function(req, res){
    res.render("landing");
});
// AUTH ROUTES 

router.get("/register", function(req, res){
    res.render("register");
})

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(error, user){
       if(error){
           console.log(error);
           req.flash("error", error.message);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
        req.flash("success","Welcome to YelpCamp! Look at some camps below or add ones you like !");
           res.redirect("/campgrounds");
       });
        
    });
});

router.get("/login", function(req, res){
    res.render("login" );
});

router.post("/login", 
    passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    })
    ,function(req, res){
})

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success","You have been logged out! Visit us soon or we get lonely.");
    res.redirect("/");
});


module.exports = router;