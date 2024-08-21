const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type: String,
        required: true
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client'
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const User = new mongoose.model("User",userSchema)
module.exports = User