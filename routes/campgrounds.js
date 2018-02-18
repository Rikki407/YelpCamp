var express = require("express");
var router  = express.Router();
var Campgrounds = require("../models/campground");
// INDEX ROUTE
router.get("/",function (req, res) {
    Campgrounds.find({},function (err, allCampGrounds) {
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds : allCampGrounds});
        }
    });
});
// CREATE ROUTE
router.post("/",function (req, res) {
    var cg_name = req.body.name;
    var cg_img = req.body.image;
    var cg_description = req.body.description;
    Campgrounds.create({
        name : cg_name,
        image : cg_img,
        description : cg_description
    },function (err , ground) {
        if(err){
            console.log(err);
        }else {
            res.redirect("/campgrounds");
        }
    });
});
// NEW ROUTE
router.get("/new",function (req, res) {
    res.render("campgrounds/new");
});
// SHOW ROUTE
router.get("/:id",function (req, res) {
    var cg_id = req.params.id;
    Campgrounds.findById(cg_id).populate("comments").exec(function (err, theCampGround) {
        if(err){
            console.log(err);
        }else {
            console.log(theCampGround);
            res.render("campgrounds/show",{campground : theCampGround});
        }
    });
});

module.exports = router;