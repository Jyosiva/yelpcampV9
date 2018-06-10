var express=require('express');
var router=express.Router({mergeParams:true});

var yelp=require('../models/yelp');
var comments=require('../models/comment');
var middleware=require('../middleware');

//==============================================
//COMMENTS ROUTES
//===============================================

router.get('/new',middleware.isLoggedIn,function(req,res){

    yelp.findById(req.params.id,function(err,selectedcamp){
    
        if(err)
        console.log(err);
    
        else
        res.render('comments/new',{selectedcamp:selectedcamp});
    
    });
     });
    
     router.post('/',middleware.isLoggedIn,function(req,res){
         
    
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

     //Comments edit route

    router.get('/:comment_id/edit',middleware.checkAuthorizedComment,function(req,res){

        comments.findById(req.params.comment_id,function(err,foundcom){
            if(err){
                res.redirect("back");
    
                }
    
            else
            {
               // res.send("hi");
               res.render('comments/edit',{campground_id:req.params.id,comment:foundcom});
            }    
        });
        
    });


    //comments update route

    router.put('/:comment_id',middleware.checkAuthorizedComment,function(req,res){

        comments.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcom){

            if(err)
            res.redirect("back");

            else{
                res.redirect('/campground/'+ req.params.id);
            }



        });



    });

    router.delete("/:comment_id",middleware.checkAuthorizedComment,function(req,res){

        comments.findByIdAndRemove(req.params.comment_id,function(err,deletedcomm){

            if(err)
            res.redirect("back");

            else
            res.redirect("/campground/"+ req.params.id);

        });
    });

    
     

     module.exports=router;
    