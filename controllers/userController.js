
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route Post /api/users/register
//@access public

const registerUser = asyncHandler( 
    async (req,res) => {

        const {username, email, password} = req.body;

        if(!username || !email || !password)
        {
            res.status(400);
            throw new Error("All Fields are mandatory");
        }

        const userAvailable = await User.findOne({email});

        if(userAvailable)
        {
            res.status(400);
            throw new Error("User is already available");
        }

        // HashPassword to hide password in database
        const hashPassword = await bcrypt.hash(password, 10);
        console.log("hashPassword ", hashPassword);

        const user = await User.create({
            username,
            email,
            password: hashPassword
        });

        console.log("User is created: ", user);

        if(user)
        {
            res.status(201).json({_id : user.id, email: user.email});
        }
        else
        {
            res.status(400).json("User data is not valid");
        }
    }
);

//@desc login user
//@route Post /api/users/login
//@access public

const loginUser = asyncHandler( 
    async (req,res) => {

        const {email, password} = req.body;

        if(!email || !password)
        {
            res.status(400);
            throw new Error("All feilds are mandatory");
        }

        const userAvailable = await User.findOne({email});

        if(!userAvailable)
        {
            res.status(400);
            throw new Error("User is not available, please create a user account");
        }

        // compare password with our mangodb hashed password
        if(userAvailable && (await bcrypt.compare(password, userAvailable.password)))
        {
            const accessToken = jwt.sign(
                {
                    user : {
                        username : userAvailable.username,
                        email : userAvailable.email,
                        id :  userAvailable.id,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : "15m"}
            );

            res.status(200).json({accessToken});
        }
        else 
        {
            res.status(401);
            throw new Error("Email or Password is Invalid");
        }
    }
);

//@desc current user information
//@route Post /api/users/current
//@access private

const currentUser = asyncHandler( 
    async (req,res) => {
        res.json(req.user);
    }
);

module.exports = { registerUser, loginUser, currentUser };