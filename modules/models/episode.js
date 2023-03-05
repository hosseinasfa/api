const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
    course : { type : Schema.Types.ObjectId , ref : 'Course'},
    title : { type : String , required : true} ,
    body : { type : String , required : true} ,
    videoUrl : { type : String , required : true} ,
    number : { type : String , required : true} ,    
    viewCount : { type : Number  , default : 0 },
    commentCount : { type : Number , default : 0 }
} , { timestamps : true });

module.exports = mongoose.model('Episode' , EpisodeSchema);