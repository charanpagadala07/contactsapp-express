const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc register user
//@route post /api/users/register
//@access public

const RegisterUser = asyncHandler( async (req, res)=>{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("all fields as mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("email is already taken");
    }

    //Hash Password
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedpassword);
    const user = await User.create({
        username, 
        email,
        password:hashedpassword
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id:user.id, email:user.email});
    } else {
        res.status(400)
        throw new Error("user data is not valid")
    }

    res.json({message:"register for the user"})
});

//@desc login user
//@route post /api/users/login
//@access public

const LoginUser = asyncHandler( async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const user = await User.findOne({email});
    //compare password with hasedpassword
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "15m"}
        )
        res.status(200).json({accessToken})
    } else {
        res.status(401)
        throw new Error("email or password is not valid");
    }
    res.json({message:"login for the user"})
});

//@desc current user info
//@route GET /api/users/current
//@access private

const CurrentUser = asyncHandler( async (req, res)=>{
    res.json(req.user)
});

module.exports = {RegisterUser, CurrentUser, LoginUser};