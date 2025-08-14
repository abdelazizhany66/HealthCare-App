import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ user }) => {
    const navigate = useNavigate();
    const { id: doctorId } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        bookingTime: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let res = await fetch("http://localhost:4000/api/visits", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                doctorId,
            }),
        });

        if (!res.ok) {
            console.error(`Request failed with status code ${res.status}`);
            return;
        }

        alert("Visit reserved successfully!");
        setFormData({
            name: "",
            bookingTime: "",
        });
        navigate("/patient_dashboard");
    };

    return (
        <form className="booking-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Book a Doctor</h2>

            {/* Patient Name */}
            <div className="form-group">
                <label htmlFor="name">Your Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Booking Time */}
            <div className="form-group">
                <label htmlFor="bookingTime">Booking Time:</label>
                <input
                    type="datetime-local"
                    id="bookingTime"
                    name="bookingTime"
                    value={formData.bookingTime}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
                Submit Booking
            </button>
        </form>
    );
};

export default BookingForm;
