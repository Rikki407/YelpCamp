var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campgrounds     = require("./models/campground.js"),
    Comments        = require("./models/comment.js"),
    passport        = require("passport"),
    LocalStratergy  = require("passport-local"),
    Users           = require("./models/users.js"),
    seedDB          = require("./seeds");

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes       = require("./routes/index");

var app     = express();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

//seedDB();

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

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(3000,function () {
   console.log("YelpCamp started on port 3000");
});