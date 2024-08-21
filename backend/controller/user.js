const User = require("../model/User")

const createUser = async(req,res)=>{
    try{
        let email = await User.findOne({email:req.body.email})
        if(email){
            return res.json({success:false,message:"Email Already Exist"})
        }
        let phoneNumber = await User.findOne({phoneNumber:req.body.phoneNumber})
        if(phoneNumber){
            return res.json({success:false,message:"Phone no. Already Exist"})
        }
        const newUser = await User.create(req.body)
        return res.json({success:true,message:"User Created Successfully",newUser})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const getAllUser = async(req,res)=>{
    try{
        let {clientId} = req.query;
        let filter = {}
        if(clientId){
            filter.client = clientId
        }
        const users = await User.find(filter).populate("client")
        return res.json({success:true,message:"User Fetched Successfully",users})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const getSingleUser = async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.params.id})
        return res.json({success:true,message:"User Fetched Successfully",user})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const updateUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate({_id:req.params.id},req.body)
        return res.json({success:true,message:"User Updated Successfully",user})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const deleteUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete({_id:req.params.id})
        return res.json({success:true,message:"User Deleted Successfully",user})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

module.exports = {createUser,getAllUser,getSingleUser,updateUser,deleteUser}
