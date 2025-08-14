const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Visit = require("../models/visitModel");
const APIError = require("../utils/apiError");

exports.searchVisits = asyncHandler(async (req, res, next) => {
    if (req.user.userType !== "finance") {
        return next(new APIError("You are not allowed to access", 403));
    }

    const { visitId, doctorName, patientName } = req.query;

    
    if (!visitId && !doctorName && !patientName) {
        return next(
            new APIError("Please enter at least one search criteria.", 400),
        );
    }

    let match = {};

    if (visitId) {
        match._id = new mongoose.Types.ObjectId(visitId);
    }

    const pipeline = [
        {
            $lookup: {
                from: "users",
                localField: "doctor",
                foreignField: "_id",
                as: "doctor",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "patient",
                foreignField: "_id",
                as: "patient",
            },
        },
        { $unwind: "$doctor" },
        { $unwind: "$patient" },
        {
            $match: {
                ...match,
                ...(doctorName && {
                    "doctor.name": { $regex: doctorName, $options: "i" },
                }),
                ...(patientName && {
                    "patient.name": { $regex: patientName, $options: "i" },
                }),
            },
        },
        {
            $project: {
                _id: 1,
                date: 1,
                notes: 1,
                status: 1,
                createdAt: 1,
                doctor: { _id: 1, name: 1 },
                patient: { _id: 1, name: 1 },
            },
        },
    ];

    const visits = await Visit.aggregate(pipeline);
    res.json(visits);
});


exports.getAllVisitsForFinance = asyncHandler(async (req, res) => {
    
    if (req.user.userType !== "finance") {
        return next(new APIError("You are not allowed to access", 403));
    }

    
    const visits = await Visit.find()
        .populate("doctor", "name status ")
        .populate("patient", "name email")
        .sort({ createdAt: -1 }); 

    res.json(visits);
});
