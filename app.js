var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
var campgrounds = [
    {
        name : "Villasol",
        image : "https://images.unsplash.com/photo-1482463084673-98272196658a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=457b7840cb35f335c04c8d37a7210a4d&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name : "Armanello",
        image : "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44296710cae68fa09464afdbe49e6be8&auto=format&fit=crop&w=634&q=80"
    },
    {
        name : "Arena Blanca",
        image : "https://images.unsplash.com/photo-1460458248189-2cb101df4e67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef0ed70802c5c63761e094167567d2fe&auto=format&fit=crop&w=1120&q=80"
    },
    {
        name : "Beach Caravan",
        image : "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-0.3.5&s=f28297699deca72c5ba51af973adaa5c&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name : "Villasol",
        image : "https://images.unsplash.com/photo-1482463084673-98272196658a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=457b7840cb35f335c04c8d37a7210a4d&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name : "Armanello",
        image : "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44296710cae68fa09464afdbe49e6be8&auto=format&fit=crop&w=634&q=80"
    },
    {
        name : "Arena Blanca",
        image : "https://images.unsplash.com/photo-1460458248189-2cb101df4e67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef0ed70802c5c63761e094167567d2fe&auto=format&fit=crop&w=1120&q=80"
    },
    {
        name : "Beach Caravan",
        image : "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-0.3.5&s=f28297699deca72c5ba51af973adaa5c&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name : "Villasol",
        image : "https://images.unsplash.com/photo-1482463084673-98272196658a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=457b7840cb35f335c04c8d37a7210a4d&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name : "Armanello",
        image : "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44296710cae68fa09464afdbe49e6be8&auto=format&fit=crop&w=634&q=80"
    },
    {
        name : "Arena Blanca",
        image : "https://images.unsplash.com/photo-1460458248189-2cb101df4e67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef0ed70802c5c63761e094167567d2fe&auto=format&fit=crop&w=1120&q=80"
    },
    {
        name : "Beach Caravan",
        image : "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-0.3.5&s=f28297699deca72c5ba51af973adaa5c&auto=format&fit=crop&w=1050&q=80"
    }
];

app.get("/",function (req, res) {
   res.render("landing");
});

app.get("/campgrounds",function (req, res) {

    res.render("campgrounds",{campgrounds : campgrounds});
});
app.post("/campgrounds",function (req, res) {
    var cg_name = req.body.name;
    var cg_img = req.body.image;
    campgrounds.push({
        name : cg_name,
        image : cg_img
    });
    res.redirect("/campgrounds");
});
app.get("/campgrounds/new",function (req, res) {
   res.render("new");
});
app.listen(3000,function () {
   console.log("YelpCamp started on port 3000");
});