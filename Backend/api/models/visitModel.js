const mongoose = require("mongoose");
const treatmentSchema = require("./treatmentModel");

const visitSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed"],
            default: "pending",
        },
        notes: { type: String, default: "" },
        treatments: { type: [treatmentSchema], default: [] },
    },
    {
        timestamps: true,
    },
);

// Middleware clculate totalPrice 
visitSchema.pre("save", function (next) {
    this.totalPrice = this.treatments.reduce((sum, t) => sum + t.price, 0);
    next();
});

module.exports = mongoose.model("Visit", visitSchema);
