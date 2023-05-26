const jwt = require("jsonwebtoken");
const userModel = require("../models/user.js");
const bcrypt = require("bcrypt");
const SECRET_KEY = "IamTheBoss";

const signup =  async (req,res)=>{
    
    const {username , email , password}  = req.body;
    try{
        const existingUser = await userModel.findOne({email : email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const existingUsername = await userModel.findOne({username : username})
        if(existingUsername){
            return res.status(400).json({message:"Username Already Taken Choose Different Username"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({
            email : email, 
            password: hashedPassword,
            username : username
        });

        const token = jwt.sign({
            email: result.email,
            id: result._id
        },SECRET_KEY);

        res.status(201).json({user: result , token: token})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong" });

    }
    }
const signin =  async (req,res)=>{

    const {email , password}  = req.body;
    try{
        const existingUser = await userModel.findOne({email : email})
        if(!existingUser)
        {
            return res.status(404).json({message:"Wrong email address"});
        }

        const matchPassword = bcrypt.compare(password , existingUser.password);

        if(!matchPassword)
        {
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        },SECRET_KEY);

        res.status(201).json({username : existingUser.username , token: token});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"something went wrong" });
    }
};
module.exports = {signup , signin}

