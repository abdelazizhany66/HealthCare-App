const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const sanitize = require("mongo-sanitize");
const cors = require("cors");
const path = require("path");

const doctorsRoutes = require("./routes/doctorsRoutes");
const authRoutes = require("./routes/authRoutes");
const visitsRoutes = require("./routes/visitRoutes");
const financeRoutes = require("./routes/financeRoutes");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use((req, res, next) => {
    req.body = sanitize(req.body);
    req.params = sanitize(req.params);
    req.query = sanitize({ ...req.query });
    next();
});


app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: {
        status: 429,
        error: "Too many requests, please try again later.",
    },
    standardHeaders: true, 
    legacyHeaders: false,  
});

app.use(limiter);

app.use(cors(true));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/visits", visitsRoutes);
app.use("/api/finance", financeRoutes);

app.listen(PORT, () => console.log(`HTTPS Server running on port ${PORT} `));
