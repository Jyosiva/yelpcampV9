var yelp=require('../models/yelp');
var comments=require('../models/comment');

var middlewareObj={};

middlewareObj.checkAuthorized=function(req,res,next){
    if(req.isAuthenticated()){
        yelp.findById(req.params.id,function(err,foundCamp){
         
            if(foundCamp.author.id.equals(req.user._id))
            {
                next();
            }
           else{
               res.redirect("back");
           }
        });
    }
    else
    {
        res.redirect("back");
    }
}


middlewareObj.checkAuthorizedComment=function (req,res,next){

    if(req.isAuthenticated()){
        comments.findById(req.params.comment_id,function(err,foundCom){
         
            if(foundCom.author.id.equals(req.user._id))
            {
                next();
            }
           else{
               res.redirect("back");
           }
        });
    }
    else
    {
        res.redirect("back");
    }  
}
 


middlewareObj.isLoggedIn=function (req,res,next){

    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first !!");
   res.redirect('/login');
}
module.exports = middlewareObj;