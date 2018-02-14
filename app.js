var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");
var app     = express();

mongoose.connect("mongodb://localhost/yelp_camp");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name : String,
    image : String
});

var Campground = mongoose.model("Campground",campgroundSchema);

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/",function (req, res) {

   res.render("landing");
});

app.get("/campgrounds",function (req, res) {
    Campground.find({},function (err, allCampGrounds) {
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds",{campgrounds : allCampGrounds});
       }
    });
});
app.post("/campgrounds",function (req, res) {
    var cg_name = req.body.name;
    var cg_img = req.body.image;
    Campground.create({
        name : cg_name,
        image : cg_img
    },function (err , ground) {
        if(err){
            console.log(err);
        }else {
            res.redirect("/campgrounds");
        }
    });
});
app.get("/campgrounds/new",function (req, res) {
   res.render("new");
});
app.listen(3000,function () {
   console.log("YelpCamp started on port 3000");
});