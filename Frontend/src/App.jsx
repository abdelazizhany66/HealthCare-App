import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import PatientProfile from "./pages/PatientProfile";
import Finance from "./pages/Finance";
import Patient from "./pages/PatientDashboard";
import BookingForm from "./component/BookingForm";
import DoctorDashboard from "./pages/DoctorDashboard";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <Routes>
            <Route path="/" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route
                path="/doctor_dashboard"
                element={<DoctorDashboard user={user} />}
            />
            {/* Dynamic route with patientId */}
            <Route
                path="/patient_profile/:patientId"
                element={<PatientProfile />}
            />
            <Route path="/finance" element={<Finance />} />
            <Route
                path="/patient_dashboard"
                element={<Patient user={user} />}
            />
            <Route path="/booking/:id" element={<BookingForm user={user} />} />
        </Routes>
    );
}

export default App;
