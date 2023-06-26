const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isVerified:{type:Boolean,default:false}
  

},{
    versionKey : false
})

let userModel = mongoose.model("user",userSchema)

module.exports = {userModel}