const express = require("express");
const router = express.Router();
const visitController = require("../controllers/visitController");
const auth = require("../middleware/auth");
const protect = require("../middleware/protect");

router.post(
    "/",
    auth,
    protect("patient", "finance"),
    visitController.createVisit,
);

router.patch(
    "/:id/add-treatment",
    auth,
    protect("doctor", "finance"),
    visitController.addTreatment,
);

router.get("/", auth, visitController.getVisits);


module.exports = router;
