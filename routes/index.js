
var express=require('express');
var router=express.Router();
var passport=require('passport');
var User=require('../models/user');


router.get('/',function(req,res){
    res.render('landing');
});


//Authenticate routes

router.get('/register',function(req,res){
    res.render('register');
});


router.post('/register',function(req,res){

  //  console.log(req.body);
var newuser=new User({username:req.body.username});

User.register(newuser,req.body.password,function(err,user){
    if(err)

    {
        console.log(err);
        return res.render('register');
    }   
    //console.log("inside post register");
    passport.authenticate("local")(req,res,function(){
        //console.log("inside passport authenticate");
        res.redirect('/campground');
    });


});

});



router.get('/login',function(req,res){

    res.render('login');
});

router.post('/login',passport.authenticate("local",{successRedirect:'/campground',failureRedirect:'/login'}),
function(req,res){

});

router.get('/logout',function(req,res){

    req.logout();
    res.redirect('/campground');
});

function isLoggedIn(req,res,next){

    if(req.isAuthenticated()){
        return next();
    }
   res.redirect('/login');
}

module.exports=router;
