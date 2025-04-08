const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const User = await UserModel.findOne({email});

        if(!User){
            return res.status(403).json({message: 'user does not exist or credentials do not match', success: false})
        }

        const passwordMatch = await bcrypt.compare(password, User.password);

        if(!passwordMatch){
            return res.status(403)
                .json({message: 'wrong password', success: false})
        }


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

        const {email, password} = req.body;
        const user = await UserModel.findOne(email);

        if(user){
            res.status(409)
                .json({message: 'user exists', success: false});
        }

        const newUser = new UserModel({email, password});
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        res.status(201)
        .json({
            message: "signup successfull",
            success: true
        })

    }catch(e){
        console.log(e);
    }
}

module.exports = {signUp, login};