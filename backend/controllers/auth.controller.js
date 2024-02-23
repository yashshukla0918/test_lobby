import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
export const signup = async(req, res) => {
    try{
        const {fullName,userName,password,confirmPassword,gender} = req.body;

        if(password!=confirmPassword){
            return res.status(400).json({ success: false, message: "Passwords do not match"});

        }
        const user = await User.findOne({username: userName});
        if(user){
            return res.status(400).json({ success: false, message: "User already exists"});
        }
        // Hash Password Here
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        // https://avatar.iran.liara.run/
        const boyProfilePic = "https://avatar.iran.liara.run/public/boy?username=${username}";
        const girlProfilePic = "https://avatar.iran.liara.run/public/girl?username=${username}";

        const newUser = new User({
            userName: userName,
            fullName: fullName,
            password: hashedPassword,
            gender: gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic
        });
        await newUser.save();
        return res.status(201).json({ 
            _id:newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            gender: newUser.gender,
            profilePic: newUser.profilePic
        });
    }
    catch (error){
        console.log("Error in signup controller.", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const login = (req, res) => {
    console.log("Login User");
}

export const logout = (req, res) => {
    console.log("Logout User");
}
