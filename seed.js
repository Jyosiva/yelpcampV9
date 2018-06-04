var mongoose=require('mongoose');
var yelp= require('./models/yelp');
var comments=require('./models/comment');
//remove all campground


var data=[{Title:"Slopy ranges", image:"https://source.unsplash.com/WaNZvXEnYok",desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
{Title:"Mountain valleys", image:"https://source.unsplash.com/waZEHLRP98s",desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
{Title:"Mountain ranges", image:"https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d1156d3e4dfafbc71a9f293939f3243&auto=format&fit=crop&w=500&q=60",desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
{Title:"Slopy ranges", image:"https://source.unsplash.com/WaNZvXEnYok",desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
]; 


function seedDb(){
    yelp.remove({},function(err,camp){

        if(err)
        {
        console.log(err);
        }
        
      //  console.log("removed all campgrounds");

        data.forEach(function(seed){
            
            yelp.create(seed, function(err,camp){
    
                if(err)
                console.log(err);
    
                else
                //console.log("added campground");

                comments.create({comment:"hi there", author:"John"},function(err,comment){
                    
                    if(err)
                    console.log(err);
                    
                    else
                    {    console.log(comment);
                        camp.comments.push(comment);
                        camp.save(function(err,comment){
                           // console.log(camp);
                        });
                
                    }

                });
                
            });
    
        });
    
    });
  
    
    
}

module.exports=seedDb;
