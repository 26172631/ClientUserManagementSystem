const bcrypt = require("bcryptjs");
const Admin = require("../model/Admin");
const jwt = require('jsonwebtoken');

const adminSignup = async(req,res)=>{
    try{
        const admin = await Admin.findOne({email:req.body.email})
        if(admin){
            return res.json({success:false, message:"Admin already exists"})
        }
        req.body.password = bcrypt.hashSync(req.body.password)
        const newAdmin = await Admin.create(req.body)
        return res.json({success:true, message:"Admin created successfully", admin:newAdmin})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}
const checkToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.json({ success: false, message: "No token found" });
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decodedData; 
        next(); 
    } catch (err) {
        return res.status(403).json({ success: false, message: err.message });
    }
};
const adminLogin = async(req,res)=>{
    try{
        const  admin= await Admin.findOne({email:req.body.email})
        if(!admin){
            return res.json({success:false, message:"User not exists"})
        }
        const passCheck = bcrypt.compareSync(req.body.password, admin.password);
        if(!passCheck){
            return res.json({success:false, message:"Incorrect password"})
        }
        const token = jwt.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        return res.json({success:true, message:"Login successfully", token})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}
module.exports = {adminSignup,checkToken,adminLogin}
