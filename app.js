var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campgrounds     = require("./models/campground.js"),
    Comments        = require("./models/comment.js"),
    passport        = require("passport"),
    LocalStratergy  = require("passport-local"),
    Users           = require("./models/users.js"),
    seedDB          = require("./seeds");

var app     = express();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

seedDB();

//////////////////////////////////////////////////
//PASSPORT CONFIGURATION
//////////////////////////////////////////////////

app.use(require("express-session")({
    secret : "Rikki is the best",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(Users.authenticate()));

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
///////////////////////////////////////////////////

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

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

app.get("/campgrounds/:id/comments/new",isLoggedIn,function (req, res) {
    Campgrounds.findById(req.params.id,function (err, campground) {
       if(err){
           console.log(err);
       }else {
           res.render("comments/new",{campground : campground});
       }
    });
});
//Create Route
app.post("/campgrounds/:id/comments",isLoggedIn,function (req, res) {
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

//=============================================================
//AUTH ROUTE
//=============================================================
app.get("/register",function (req, res) {
   res.render("register");
});
app.post("/register",function (req, res) {
    var newUser = new Users({username : req.body.username});
    Users.register(newUser,req.body.password,function (err, user) {
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function () {
            res.redirect("/campgrounds");
        })
    });
});

app.get("/login",function (req, res) {
   res.render("login");
});

app.post("/login",passport.authenticate("local",
    {
        successRedirect : "/campgrounds",
        failureRedirect : "/login"
    })
    ,function (req, res) {
   res.send("You wish to login ?");
});

app.get("/logout",function (req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(3000,function () {
   console.log("YelpCamp started on port 3000");
});