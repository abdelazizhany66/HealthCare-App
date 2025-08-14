import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [doctor, setDoctor] = useState("");
    const [patient, setPatient] = useState("");
    const [appointmentId, setAppointmentId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({
            doctor: doctor.trim(),
            patient: patient.trim(),
            appointmentId: appointmentId.trim(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                placeholder="Search by Doctor"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search by Patient"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search by Appointment ID"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
