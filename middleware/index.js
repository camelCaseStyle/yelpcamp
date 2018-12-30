// all middlware goes here 

var Campground = require("../models/campground"),
    Comment = require("../models/comment");
var middlewareObj = {
    checkCommentOwnership : function (req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(error, comment){
                if(error || !comment){
                    console.log(error);
                    res.redirect("/campgrounds");
                }else{
                    // Does user own this comment ?
                    console.log(comment);
                    if(comment.author.id.equals(req.user.id)){
                        console.log("anubhav");
                        return next();
                    }else{
                        req.flash("error", "Oops! Something went wrong. Please try again");
                        res.redirect("/campgrounds");
                    }
                    
                }
            })
        }else{
            req.flash("error", "Oops! You need to be logged in to do that.");
            res.redirect("/campgrounds");
        }
    },
    checkCampGroundOwnership: function (req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(error, campGround){
                if(error || !campGround){
                    console.log(error);
                    res.redirect("/campgrounds");
                }else{
                    // Does user own this campground ?
                    if(campGround.author.id.equals(req.user.id)){
                        return next();
                    } 
                    res.send("You are not authorised to edit this campground");
                    res.redirect("/campgrounds");
                }
            })
        }else{
            req.flash("error", "Oops! You need to be logged in to do that.");
        }
    },

    isLoggedIn : function (req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Oops! You need to be logged in to do that.");
        res.redirect("/login");
    },
};

module.exports = middlewareObj;