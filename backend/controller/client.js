const Client = require("../model/Client")
const User = require("../model/User")
const { default: mongoose } = require("mongoose");

const createClient = async(req,res)=>{
    try{
        let email = await Client.findOne({email:req.body.email})
        if(email){
            return res.json({success:false,message:"Email Already Exist"})
        }
        let contactInfo = await Client.findOne({contactInfo:req.body.contactInfo})
        if(contactInfo){
            return res.json({success:false,message:"Phone no. Already Exist"})
        }
        const newClient = await Client.create(req.body)
        return res.json({success:true,message:"Client Created Successfully",newClient})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const getAllClient = async(req,res)=>{
    try{
        const clients = await Client.find()
        return res.json({success:true,message:"Client Fetched Successfully",clients})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const getSingleClient = async(req,res)=>{
    try{
        const client = await Client.findOne({_id:req.params.id})
        if(!client){
            return res.json({success:false,message:"User not found using this ID"})
        }
        return res.json({success:true,message:"Client Fetched Successfully",client})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const updateClient = async(req,res)=>{
    try{
        const client = await Client.findByIdAndUpdate({_id:req.params.id},req.body)
        return res.json({success:true,message:"Client Updated Successfully",client})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const deleteClient = async(req,res)=>{
    try{
        const client = await Client.findById({_id:req.params.id})
        if(!client){
            return res.json({success:false,message:"No client found"})
        }
        const newClient = await Client.aggregate([
            { $match: { _id: { $ne: new mongoose.Types.ObjectId(req.params.id) } } },
            { $lookup: { from: "users", localField: "_id", foreignField: "client", as: "users" } },
            { $addFields: { userCount: { $size: "$users" } } },
            { $sort: { userCount: 1, createdAt: 1 } },
            { $limit: 1 }
          ]);
        if(!newClient.length){
            return res.json({success:false,message:"No other client found"})
        }
        await User.updateMany({client:req.params.id},{client:newClient[0]._id})
        await Client.findByIdAndDelete({_id:req.params.id})
        return res.json({success:true,message:"Client Deleted Successfully",client})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

module.exports = {createClient,getAllClient,getSingleClient,updateClient,deleteClient}
