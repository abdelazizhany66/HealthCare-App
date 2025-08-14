const express = require("express");
const doctorController = require("../controllers/doctorController");
const auth = require("../middleware/auth");

const router = express.Router();


router.get("/appointments", auth, doctorController.getVisitsDoctor);


router.get("/all-doctors", auth, doctorController.getAllDoctorsForPatient);

module.exports = router;
