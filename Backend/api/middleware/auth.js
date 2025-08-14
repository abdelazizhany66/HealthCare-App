const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

module.exports = asyncHandler(async (req, res, next) => {
    //1) check if token exist , if exist get
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const currentUser = await User.findById(decoded.userId);

    if (!currentUser) {
        return res.status(401).json({ message: "No token" });
    }

    req.user = currentUser;
    next();
});
