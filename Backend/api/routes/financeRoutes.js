const express = require("express");
const router = express.Router();

const financeController = require("../controllers/financeController");
const auth = require("../middleware/auth");
const protect = require("../middleware/protect");

router.get("/search", auth, financeController.searchVisits);
router.get(
    "/all-visits",
    auth,
    protect("finance"),
    financeController.getAllVisitsForFinance,
);

module.exports = router;
