var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");
    Campground      = require("./models/campground.js"),
        seedDB      = require("./seeds");

var app     = express();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

seedDB();

app.get("/",function (req, res) {

   res.render("landing");
});

// INDEX ROUTE
app.get("/campgrounds",function (req, res) {
    Campground.find({},function (err, allCampGrounds) {
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds/index",{campgrounds : allCampGrounds});
       }
    });
});
// CREATE ROUTE
app.post("/campgrounds",function (req, res) {
    var cg_name = req.body.name;
    var cg_img = req.body.image;
    var cg_description = req.body.description;
    Campground.create({
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
app.get("/campgrounds/new",function (req, res) {
   res.render("campgrounds/new");
});
// SHOW ROUTE
app.get("/campgrounds/:id",function (req, res) {
    var cg_id = req.params.id;
    Campground.findById(cg_id).populate("comments").exec(function (err, theCampGround) {
       if(err){
           console.log(err);
       }else {
           console.log(theCampGround);
           res.render("campgrounds/show",{campground : theCampGround});
       }
    });
});


//=============================================================
//COMMENTS ROUTE
//=============================================================

app.get("/campgrounds/:id/comments/new",function (req, res) {
    Campground.findById(req.params.id,function (err, campground) {
       if(err){
           console.log(err);
       }else {
           res.render("comments/new",{campground : campground});
       }
    });
});

app.listen(3000,function () {
   console.log("YelpCamp started on port 3000");
});