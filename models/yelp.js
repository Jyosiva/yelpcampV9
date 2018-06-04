var mongoose=require('mongoose');



var yelpSchema=new mongoose.Schema({
    Title: String,
    image: String,
    desc: String,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
             ref: 'User'
           } ,
         username: String
     },
    comments:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }]
});

module.exports=mongoose.model('yelp',yelpSchema);