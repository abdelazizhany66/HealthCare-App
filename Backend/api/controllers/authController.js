const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const APIError = require("../utils/apiError");

exports.signUp = asyncHandler(async (req, res) => {
    //1) Create a new User account
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, // not used bcrypt because used in mongoose middleware
        userType: req.body.userType,
    });
    //2) create jwt
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_SECRET,
    });
    //3)response to client request
    res.status(201).json({
        success: "success",
        token,
        data: user,
    });
});

exports.login = asyncHandler(async (req, res, next) => {
    //1) check user and password write in body {validator}
    //2)check email in db and check user password Equal password in body
    const user = await User.findOne({ email: req.body.email });
    //   console.log(req.body.password)
    //   console.log( user.password)
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new APIError(" Email or Password not exist", 401));
    }
    //# Create a Jwt
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_SECRET,
    });

    res.status(200).json({
        success: "success",
        token,
        data: user,
    });
});
