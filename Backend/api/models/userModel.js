const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ["patient", "doctor", "finance"],
    },
    status: {
        type: String,
        default: null, 
    },
    profilePicture: String,
});

userSchema.pre("save", async function (next) {
    // Hash password
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }

   
    if (
        this.isModified("userType") &&
        this.userType === "doctor" &&
        !this.status
    ) {
        this.status = "Available";
    }

    next();
});

module.exports = mongoose.model("User", userSchema);
