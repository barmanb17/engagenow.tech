import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//register funciton

export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        //Check if user already exist
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({msg: "User already exists"});
        }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    res.status(201).json({msg: "User registered successfully"});
    } catch (err){
        res.status(500).json({msg: err.message});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //1. find the user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }
        //2. compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({msg: "Invalid Credentials"});
        }

        //3.generate token
        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.status(200).json({
            token,
            user:{
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
};


