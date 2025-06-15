import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//register funciton

export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        //Check if user already exist


    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    //create token
    const token = jwt.sign(
        {userid: newUser._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )
    res.status(201).json({
        token: token,
        user: {
            name: newUser.name,
            email: newUser.email,
        },
});
        
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
            {userid: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
            
        )
        res.status(200).json({
            token: token,
            user: {
                name: user.name,
                email: user.email,
            }
        })


    } catch (err) {
        res.status(500).json({msg: err.message});
    }
};


