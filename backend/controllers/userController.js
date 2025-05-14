const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const useragent = require('useragent')
const UserModel = require("../models/userModel");
const logInAttemptModel = require('../models/loginAttempt');

//generates token for new user
const generatetoken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET) ;
}

function getuserfromToken(token){
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    return UserModel.findById(userInfo.id);
}

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
                .json({message: 'wrong password', success: false});
        }

        
        const jwtToken = generatetoken({ _id: User._id });

        res.cookie('token', jwtToken, {
            httpOnly: true,
            // maxAge: 3600000 // 1 hour
          });

        //create successfull login attempt data
        let newlogin = await new logInAttemptModel({user: User._id, loginTime: new Date(), logOutTime: null});
        newlogin = await newlogin.populate("user", "userEmail");
        await newlogin.save();

        // const agent = useragent.parse(req.headers['user-agent']);
        // const deviceInfo = {
        //   browser: agent.toAgent(),
        //   os: agent.os.toString(),
        //   platform: agent.device.toString(),
        // };

        // console.log(deviceInfo)

        res.status(200)
            .json({
                message: 'login successfull', 
                success: true,
                token: jwtToken,
                result: User
                // device: deviceInfo
            });


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

        const {userEmail, passWord} = req.body;
        const user = await UserModel.findOne({userEmail});

        if(user){
            return res.status(409)
            .json({message: 'user exists', success: false});
        }

        const newUser = new UserModel({userEmail, passWord});
        newUser.password = await bcrypt.hash(passWord, 10);
        await newUser.save();

        return res.status(201)
        .json({
            message: "signup successfull",
            success: true
        })

    }catch(e){
        console.log(e);
        return res.status(500)
        .json({
            message: "Internal server errror",
            success: false
        })
    }
}

const signOut = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({
            message: "Signed out successfully",
            success: true
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getLoggedIn = async (req,res) => {
    try{
        const token = req.cookies.token;

        if(!token) {
            return res.json(false);
        }

        getuserfromToken(token);
        res.json({status: true, data: token})
    } catch(err) {
        res.json(false)
    }
}

module.exports = {signUp, login, signOut, getLoggedIn};