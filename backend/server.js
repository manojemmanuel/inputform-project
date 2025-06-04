const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/formsdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.error("MongoDB connection error:",err));

const UserSchema = new mongoose.Schema({
    email: {type: String, required:true, unique:true},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    password: {type:String, required:true}
});

const User = mongoose.model("User", UserSchema);

app.post("/register",async(req,res) => {
    const {email, firstName, lastName, password} = req.body;

    if(!email || !firstName || !lastName || !password){
        return res.status(400).json({error: "All fields are required"});
    }

    try {
        const existingOne = await User.findOne({email});
        // console.log(existingOne);
        if(existingOne){
            return res.status(409).json({message:"Email is already registered one"})
        }
        const newUser = new User({email,firstName, lastName, password});
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    } catch (err){
        res.status(500).json({error:"Failed to register user"});
    }
    
});


app.post("/login", async(req,res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({error:"All fields are required"})
    }

    try {
        const existingOne = await User.findOne({email});
        if(!existingOne || password !== existingOne.password){
            return res.status(401).json({message:"Invalid email or password"});
        }
        return res.status(200).json({message:"successfully Logged In"});


    } catch(err){
        res.status(500).send({error:"Internal server error",details:err.message})
    }

});

app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
});