const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const APIError = require("../utils/apiError");
const Visit = require("../models/visitModel");

exports.getVisitsDoctor = asyncHandler(async (req, res, next) => {
    if (req.user.userType !== "doctor")
        return next(new APIError("Access denied", 403));

    const doctorId = req.user.id;
    const now = new Date();

    const appointments = await Visit.find({
        doctor: doctorId,
        date: { $gte: now },
    })
        .populate("patient", "name email _id date") 
        .sort({ date: 1 });

    res.json(appointments);
});

exports.getAllDoctorsForPatient = asyncHandler(async (req, res) => {
    const doctors = await User.find(
        { userType: "doctor" },
        "name status email _id",
    );

    res.status(200).json(doctors);
});
