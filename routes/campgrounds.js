var express = require("express"),
    Campground = require("../models/campground"),
    router = express.Router({mergeParams: true}),
    middleware = require("../middleware/index.js");


router.get("/", function(req, res){
    Campground.find({}, function(error, campGrounds){
        if(error){
            console.log(error);
        }else{
            res.render("campgrounds/index", {campGrounds: campGrounds});
        }
    });
    
});

//Create Route 
router.post("/", middleware.isLoggedIn,function(req, res){
    var name = req.body.name;
    var author = {
        username: req.user.username,
        id: req.user._id
    }
    var imageURL = req.body.imageURL;
    var desc = req.body.description;
    var price = req.body.price;
    console.log(name +" "+ imageURL);
    Campground.create({name: name, image: imageURL, description: desc , author : author, price: price}, function(error, camp){
        if(error){
            console.log(error);
            req.flash("error","Oops! Something went wrong !");
            res.redirect("/campgrounds");
        }else{
            console.log(camp);
            req.flash("success", camp.name + " successfully added !");
            res.redirect("/campgrounds");
        }
    });
    
});

//Show the form which will show the data to send to this form 
router.get("/new", middleware.isLoggedIn, function(req, res){
        res.render("campgrounds/new", );
});

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Error");
        }else{
            res.render("campgrounds/show",{campGround :foundCampground}, );
        }
    });
});


//EDIT 
router.get("/:id/edit", middleware.checkCampGroundOwnership, function(req, res){    
    Campground.findById(req.params.id, function(error, campGround){
        if(error){
            console.log(error);
            req.flash("error","Oops! Something went wrong !");
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit", {campGround: campGround});

        }
    });
});

//UPDATE
router.put("/:id", middleware.isLoggedIn, middleware.checkCampGroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campGround, function(error, campGround){
        if(error){
            res.redirect("/campgrounds");
        }else{
            req.flash("success",campGround.name + " successfully updated !");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//DESTROY 
router.delete("/:id",  middleware.isLoggedIn, middleware.checkCampGroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(error, campGround){
        if(error){
            console.log(error);
            req.flash("error","Oops! Something went wrong !");
        }else{
            req.flash("info",campGround.name + " successfully deleted !");
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;