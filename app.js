var express= require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var flash=require('connect-flash');
var passport=require('passport');
var LocalStrategy=require('passport-local');
var methodOverride= require('method-override');
var yelp=require('./models/yelp');
var comments=require('./models/comment');
var User=require('./models/user');
var seedDB=require('./seed');
var camproutes=require('./routes/campground');
var commentroutes=require('./routes/comment');
var indexroutes=require('./routes/index');

//var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect('mongodb://localhost/yelpapp');

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride('_method'));
app.use(flash());
//seedDB();

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

app.use(function(req,res,next){
    res.locals.currentuser=req.user;
    req.locals.error=req.flash("error");
    req.locals.success=req.flash("success");
    next();
});
app.use('/',indexroutes);
app.use('/campground',camproutes);
app.use('/campground/:id/comments',commentroutes);


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


function isLoggedIn(req,res,next){

    if(req.isAuthenticated()){
        return next();
    }
   res.redirect('/login');
}

app.listen(8080,function(){
    console.log("server started !");
});