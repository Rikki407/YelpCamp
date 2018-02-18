var express = require("express");
var router  = express.Router({mergeParams : true});
var Campgrounds = require("../models/campground");
var Comments = require("../models/comment");


//New Route

router.get("/new",isLoggedIn,function (req, res) {
    Campgrounds.findById(req.params.id,function (err, campground) {
        if(err){
            console.log(err);
        }else {
            res.render("comments/new",{campground : campground});
        }
    });
});
//Create Route
router.post("/",isLoggedIn,function (req, res) {
    Campgrounds.findById(req.params.id,function (err, campground) {
        if(err){
            console.log(err);
        }else {
            Comments.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    })
});
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;