const mongoose = require('mongoose');


const LogoutSchema = mongoose.Schema({
    token: String,
    
  

},{
    versionKey : false
})

let LogoutModel = mongoose.model("Logout",LogoutSchema)

module.exports = {LogoutModel}