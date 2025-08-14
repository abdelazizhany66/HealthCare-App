const asyncHandler = require("express-async-handler");
const Visit = require("../models/visitModel");
const APIError = require("../utils/apiError");

exports.createVisit = asyncHandler(async (req, res) => {
    const { doctorId, bookingTime } = req.body;

    const visit = await Visit.create({
        patient: req.user._id,
        doctor: doctorId,
        date: bookingTime,
    });

    res.status(201).json({
        message:
            "The statement was created and the total was calculated successfully.",
        visit,
    });
});

exports.getVisit = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // visitId

    const visit = await Visit.findById(id).populate(["patient", "doctor"]);
    if (!visit) {
        return next(new APIError("Visit not found", 404));
    }

    res.json(visit);
});

exports.addTreatment = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // visitId
    const { name, price } = req.body;

    const visit = await Visit.findById(id);
    if (!visit) {
        return next(new APIError("Detection not available", 404));
    }

    visit.treatments.push({ name, price });
    await visit.save(); // calculate  auto totalPrice

    res.json({
        message: "add treatment",
        visit,
    });
});

exports.getVisits = asyncHandler(async (req, res) => {
    const user = req.user;
    const filter = {};

    if (user.userType === "patient") {
        filter.patient = user._id;
    } else if (user.userType === "doctor") {
        filter.doctor = user._id;
        console.log(filter);
    } else {
        return res.status(403).json({
            message: "invalid user type",
        });
    }

    let visits = await Visit.find(filter)
        .populate(["patient", "doctor"])
        .lean();
    visits = visits.map((v) => {
        v.totalPrice = v.treatments.reduce((sum, t) => sum + t.price, 0);
        return v;
    });

    console.log("visits", visits);

    res.json(visits);
});
