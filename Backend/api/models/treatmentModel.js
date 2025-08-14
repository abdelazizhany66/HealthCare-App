const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
});

module.exports = treatmentSchema;
