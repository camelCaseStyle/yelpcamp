var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
var data = [
    {   name : "Cloud's rest", 
        image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg",
        description: "Cloud's rest campground is one of the best camp grounds in the world. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {   name : "Cloud's rest", 
        image: "https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png",
        description: "Cloud's rest campground is one of the best camp grounds in the world.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]
function seedDB(){
    // remove all campgrounds
    Comment.remove({});
    
    Campground.remove({}, function(err){
        if(err){
            console.log(error);
        }
        console.log("Removed campgrounds");
        // add a few campgrounds
        // data.forEach(function(element){
        //     Campground.create(element, function(err, ret){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log(ret);
        //         }
        //     });
        // });
    });

    
    
}    
module.exports = seedDB;


