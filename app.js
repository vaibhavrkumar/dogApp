var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/dogApp", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

//Schema
var dogSchema = new mongoose.Schema({
    name: String,
    image: String
});

var dogModel = mongoose.model("dogModel", dogSchema);


// dogModel.create({
//     name: "English Cocker Spaniel",
//     image: "https://www.dogbreedinfo.com/images19/EnglishCockerSpanielsAJLeftTommieLacono.JPG",
//     description: "Well behaved dog."
//     }, function(err, newlyAddedDog){
//         if(err){
//             console.log(err);            
//         }
//         else{
//             console.log("New dog added: ");
//             console.log(newlyAddedDog);
//         }
//     });

var dogsListed = [
    {name: "Rotweiler", image:"https://www.dogbreedslist.info/uploads/allimg/dog-pictures/Rottweiler-2.jpg"},
    {name: "Jack Terrier", image:"https://www.insidedogsworld.com/wp-content/uploads/2018/12/Jack-Russell-Terrier.jpg"},
    {name: "Beagle", image:"https://www.purina.com.au/-/media/Project/Purina/Main/Breeds/Dog/Mobile/Dog_Beagle_Mobile.jpg?h=300&la=en&w=375&hash=1788E511DBC3FA47182CB96D95B4F538"}
]

//RESTFUL ROUTES

app.get("/", function(req,res){
    res.render("landing");
});

//Index Route
app.get("/dogs", function(req,res){
    //retrieve from db
    dogModel.find({}, function(err, allDogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("dogs",{dogs:allDogs});
        }
    });
});

//Create Route
app.post("/dogs", function(req,res){
    //getting info from post form
    var name = req.body.name;
    var image = req.body.image;
    var newDog = {name:name, image:image}

    //Saving new dogs to db
    dogModel.create(newDog, function(err,newlyAddedDog){
        if(err){
            console.log(err);
        }
        else{
            console.log("Dog Added");
            res.redirect("/dogs");
        }
    });
});

//New Route
app.get("/dogs/new", function(req,res){
    res.render("new");
});

// Show Route 
app.get("/dogs/:id", function(req,res){
    dogModel.findById(req.params.id, function(err, foundDog){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {dog:foundDog});
        }
    });
});

//EDIT Route
app.get("/dogs/:id/edit", function(req,res){
    dogModel.findById(req.params.id, function(err,foundDog){
        if(err){
            console.log(err);
        }
        else{
            res.render("edit", {dog:foundDog});
        }
    });
});


//Update Route



app.listen(8080, function(){
    console.log("Serving on port 8080");
    
});