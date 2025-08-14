import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PatientDashboard = ({ user }) => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState();
    const [visits, setVisits] = useState();

    const handleReserveClick = (doctor) => {
        navigate(`/booking/${doctor._id}`);
    };

    useEffect(() => {
        fetch("http://localhost:4000/api/doctors/all-doctors", {
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then((res) => {
                if (!res.ok) {
                    console.error(
                        `Request failed with status code ${res.status}`,
                    );
                    return;
                }
                return res.json();
            })
            .then((res) => {
                setDoctors(res);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:4000/api/visits", {
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then((res) => {
                if (!res.ok) {
                    console.error(
                        `Request failed with status code ${res.status}`,
                    );
                    return;
                }
                return res.json();
            })
            .then((res) => {
                setVisits(res);
            });
    }, []);

    return (
        <div>
            <h2 className="dashboard-title">Patient Dashboard</h2>

            {/* Available Doctors */}
            <h3 className="section-title">Available Doctors</h3>
            <ul className="doctor-list">
                {doctors?.map((doctor) => (
                    <li className="doctor-card" key={doctor._id}>
                        <h4 className="doctor-name">{doctor.name}</h4>
                        <p className="doctor-status">Status: {doctor.status}</p>
                        <button
                            className="reserve-button"
                            onClick={() => handleReserveClick(doctor)}
                        >
                            Reserve Visit
                        </button>
                    </li>
                ))}
            </ul>

            {/* My Visits */}
            <h3 className="section-title my-visits-title">My Visits</h3>
            <ul className="visit-list">
                {visits?.map((visit) => (
                    <li className="visit-card">
                        <p className="visit-id">Visit ID: {visit._id}</p>
                        <p>Doctor: {visit.doctor.name}</p>
                        <div className="visit-details">
                            <p>
                                Notes:{" "}
                                {visit.notes == ""
                                    ? "No notes added yet!"
                                    : visit.notes}
                            </p>
                            <p>
                                Booking Time:{" "}
                                {new Date(visit.date).toLocaleString()}
                            </p>
                            <p className="visit-amount">
                                Total Price: {visit.totalPrice}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientDashboard;
