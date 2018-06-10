
var express=require('express');
var router=express.Router();

var yelp=require('../models/yelp');
var middleware=require('../middleware');

//Campground routes


router.get('/',function(req,res){
yelp.find({},function(err,allcamp){

    res.render('campground/index',{camps:allcamp});
});

});

router.get('/new',middleware.isLoggedIn,function(req,res){

    res.render('campground/new');

});

router.post('/',middleware.isLoggedIn,function(req,res){

    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.desc;
    var author={
               id:req.user._id,
               username:req.user.username
    };
    yelp.create({Title:name, image:image,desc:desc,author:author},function(err,newone){
    if(err)
    console.log(err);

    else{
   //        console.log("Added new camp");
     //   console.log(newone);
     res.redirect('/campground');
    }
});


    
});



router.get('/:id',function(req,res){

    yelp.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if(err)
        res.redirect('/campground');
        else
        res.render('campground/show',{campFound:foundCamp});
    });

});



//Edit Campground

router.get('/:id/edit',middleware.checkAuthorized,function(req,res){

    yelp.findById(req.params.id,function(err,camp){

         if(err)
          res.redirect('/campground');

          else
          res.render('campground/edit',{campground:camp});

    });
});

//Update campground

router.put('/:id',middleware.checkAuthorized,function(req,res){

  console.log('inside update route');
    yelp.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcamp){
        //console.log(req.body.campground);
        if(err){
            res.redirect('/campground');

        }

        else{
        res.redirect('/campground/' + req.params.id);
        }


    });
});


//Destroy campground

router.delete('/:id',middleware.checkAuthorized,function(req,res){

    yelp.findByIdAndRemove(req.params.id,function(err,deletedcamp){
     
        if(err)
        res.redirect('/campground');

        else
        res.redirect('/campground');
    });
});







module.exports=router;