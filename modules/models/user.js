const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');

const UserSchema = new Schema({
    name : { type : String , required : true} ,
    email : { type : String , required : true , unique : true} ,
    password : { type : String , required : true} ,
    courses : [{ type : Schema.Types.ObjectId , ref : 'Course'}]
} , { timestamps : true });

UserSchema.methods.hashPassword = function(password) {

    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(password , salt);

    return hash;
}

module.exports = mongoose.model('User' , UserSchema);