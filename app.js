var express= require('express');
var mongoose=require('mongoose');
var passport=require('passport');

var User=require('./models/user');

var app=express();
var bodyParser=require('body-parser');
var LocalStrategy=require('passport-local');
var passportLocalMongoose = require("passport-local-mongoose");

var yelp=require('./models/yelp');
var seedDB=require('./seed');
var comments=require('./models/comment');

var camproutes=require('./routes/campground');
var commentroutes=require('./routes/comment');
var indexroutes=require('./routes/index');

var methodOverride=require('method-override');


mongoose.connect('mongodb://localhost/yelpapp');



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

seedDB();

//===================
//passport config
//====================

app.use(require("express-session")({
    secret:"My rusty is my dog",
    resave: false,
    saveUninitialized:false

}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentuser=req.user;
    next();
});
app.use('/',indexroutes);
app.use('/campground',camproutes);
app.use('/campground/:id/comments',commentroutes);

app.use(methodOverride('_method'));


function isLoggedIn(req,res,next){

    if(req.isAuthenticated()){
        return next();
    }
   res.redirect('/login');
}

app.listen(8080,function(){
    console.log("server started !");
});