var mongoose=require('mongoose');



var commentSchema=new mongoose.Schema({
    comment: String,
    author: {
       id:{
           type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
          } ,
        username: String
    }
    
});


var comments=mongoose.model('comments',commentSchema);
module.exports=comments;