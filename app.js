var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campgrounds     = require("./models/campground.js"),
    Comments        = require("./models/comment.js"),
        seedDB      = require("./seeds");

var app     = express();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

seedDB();

app.get("/",function (req, res) {

   res.render("landing");
});

// INDEX ROUTE
app.get("/campgrounds",function (req, res) {
    Campgrounds.find({},function (err, allCampGrounds) {
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
app.get("/campgrounds/new",function (req, res) {
   res.render("campgrounds/new");
});
// SHOW ROUTE
app.get("/campgrounds/:id",function (req, res) {
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


//=============================================================
//COMMENTS ROUTE
//=============================================================


//New Route

app.get("/campgrounds/:id/comments/new",function (req, res) {
    Campgrounds.findById(req.params.id,function (err, campground) {
       if(err){
           console.log(err);
       }else {
           res.render("comments/new",{campground : campground});
       }
    });
});
//Create Route
app.post("/campgrounds/:id/comments",function (req, res) {
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

app.listen(3000,function () {
   console.log("YelpCamp started on port 3000");
});