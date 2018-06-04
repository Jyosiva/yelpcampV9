var express=require('express');
var router=express.Router({mergeParams:true});

var yelp=require('../models/yelp');
var comments=require('../models/comment');

//==============================================
//COMMENTS ROUTES
//===============================================

router.get('/new',isLoggedIn,function(req,res){

    yelp.findById(req.params.id,function(err,selectedcamp){
    
        if(err)
        console.log(err);
    
        else
        res.render('comments/new',{selectedcamp:selectedcamp});
    
    });
     });
    
     router.post('/',isLoggedIn,function(req,res){
         
    
        yelp.findById(req.params.id,function(err,camp){
            
            comments.create(req.body.comments,function(err,comment){
               
                if(err)
                {
                  console.log(err);
                  res.redirect('/campground');
                }
                else
                {
                  comment.author.id=req.user._id;
                  comment.author.username=req.user.username;
                  comment.save();
                  camp.comments.push(comment);
                  camp.save();
                  res.redirect('/campground/'+camp._id);
                }
            });
        });
    
     });
     function isLoggedIn(req,res,next){

        if(req.isAuthenticated()){
            return next();
        }
       res.redirect('/login');
    }
    
     module.exports=router;
    