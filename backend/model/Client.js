const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    industry:{
        type:String,
        required:true
    },
    contactInfo:{
        type: String,
        required: true
    },
    detail:{
        type:String,
        required:true
    }
},{timestamps:true})

const Client = new mongoose.model("Client",clientSchema)
module.exports = Client