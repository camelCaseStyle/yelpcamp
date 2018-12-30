//COMMENTS ROUTES
var express = require("express"),
    Comment = require("../models/comment"),
    Campground = require("../models/campground"),
    router = express.Router({mergeParams: true}),
    middleware = require("../middleware/index.js");


router.get("/comments/new", middleware.isLoggedIn,function(req, res){
    // find campground by id 
    Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error);
        }else{
            res.render("comments/new", {campground:campground}, );
        }
    });
   
});

router.post("/", middleware.isLoggedIn,function(req,res){
    // lookup campground using id
    Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error);
            res.redirect("/campgrounds");
        }else{
            // create new comment 
            Comment.create(req.body.comment, function(error, comment){
                if(error){
                    console.log(err)
                }else{
                    // add username and id to comment to db 
                    console.log(req.user);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save(function(){
                        req.flash("success", "Your comment has been posted")
                        res.redirect("/campgrounds/"+campground._id);  
                    });
                    
                }
           });
        }
    }); 
    
    
    // connect new comment to campground 
    // redirect to show page 
});


router.get("/comments/:comment_id/edit", middleware.checkCommentOwnership, middleware.isLoggedIn, function(req, res){
    console.log("anubhav");
    Campground.findById(req.params.id, function(error, campGround){
        if(error){
            console.log(error);
        }else{
            console.log("Got this far");
            Comment.findById(req.params.comment_id, function(error, comment){
                if(error){
                    console.log(error);
                }else{
                    res.render("comments/edit", {campGround: campGround, comment: comment});  
                }
                
            })
            
        }
    });
});

router.put("/comments/:comment_id", middleware.checkCommentOwnership, middleware.isLoggedIn, function(req, res){
    console.log(req);
    Comment.findByIdAndUpdate(req.params.comment_id, {
        text: req.body.comment.text
    }, function(error, comment){
        if(error){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

router.delete("/comments/:comment_id", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
    console.log(req);
    Comment.findByIdAndRemove(req.params.comment_id, function(error){
        if(error){
            console.log(error);
            req.flash("danger", "Oops! We are unable to delete your comment. Please try again.")
        }else{
            req.flash("info", "Your comment has been deleted.")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});
module.exports = router;