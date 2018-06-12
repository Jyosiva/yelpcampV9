var yelp=require('../models/yelp');
var comments=require('../models/comment');

var middlewareObj={};

middlewareObj.checkAuthorized=function(req,res,next){
    if(req.isAuthenticated()){
        yelp.findById(req.params.id,function(err,foundCamp){
         
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }
            else{

                if(foundCamp.author.id.equals(req.user._id))
                {
                    next();
                }
               else{
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
            }
           
        });
    }
    else
    {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


middlewareObj.checkAuthorizedComment=function (req,res,next){

    if(req.isAuthenticated()){
        comments.findById(req.params.comment_id,function(err,foundCom){
           
            if(err){
                req.flash("error","Campground not found !!");
                res.redirect("back");
            }
           else{
                if(foundCom.author.id.equals(req.user._id))
            {
                next();
            }
           else{
               req.flash("error","You need permission to do that !!");
               res.redirect("back");
           }
        }
        });
    }
    else
    {    req.flash("error","You need to be logged in to do that !!");
        res.redirect("back");
    }  
}
 


middlewareObj.isLoggedIn=function (req,res,next){

    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that !!");
   res.redirect('/login');
}
module.exports = middlewareObj;