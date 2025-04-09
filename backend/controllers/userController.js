const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/userModel");
const logInAttemptModel = require('../models/loginAttempt');

const login = async (req, res) => {
    try{
        const {userEmail, password} = req.body;
        const User = await UserModel.findOne({userEmail});

        if(!User){
            return res.status(403)
                .json({message: 'user does not exist or credentials do not match', success: false})
        }

        const passwordMatch = await bcrypt.compare(password, User.password);

        if(!passwordMatch){
            return res.status(403)
                .json({message: 'wrong password', success: false})
        }

        
        // const jwtToken = jwt.sign(
        //     { userEmail: User.userEmail, _id: User._id },
        //     process.env.JWT_SECRET,
        //     { expiresIn: '24h' }
        // )

        //create successfull login attempt data
        let newlogin = await new logInAttemptModel({user: User._id, loginTime: new Date(), logOutTime: null});
        newlogin = await newlogin.populate("user", "userEmail");
        await newlogin.save();

        res.status(200)
            .json({message: 'login successfull', success: true});


    }catch(e){
        console.log(e);

        res.status(500)
        .json({
            message: "Internal server errror",
            success: false
        })
    }
}

const signUp = async (req, res) => {
    try{

        const {userEmail, password} = req.body;
        const user = await UserModel.findOne({userEmail});

        if(user){
            res.status(409)
                .json({message: 'user exists', success: false});
        }

        const newUser = new UserModel({userEmail, password});
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        res.status(201)
        .json({
            message: "signup successfull",
            success: true
        })

    }catch(e){
        console.log(e);
        res.status(500)
        .json({
            message: "Internal server errror",
            success: false
        })
    }
}

const signOut = async (req, res) => {
    try{

    }catch(e){
        console.log(e);
    }
}

module.exports = {signUp, login};