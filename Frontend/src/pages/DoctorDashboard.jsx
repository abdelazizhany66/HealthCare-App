import { useEffect, useState } from "react";
import MyTable from "../component/Table";

const DoctorDashboard = ({ user }) => {
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/api/visits`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch visits");
                }
                return response.json();
            })
            .then((data) => {
                setVisits(data || []);
            })
            .catch((error) => {
                console.error("Error fetching visits:", error);
            });
    }, []);

    return (
        <div className="doctor_dashboard">
            <div className="table_dashboard">
                {/* Pass patients data to MyTable */}
                <MyTable data={visits} />
            </div>
        </div>
    );
};

export default DoctorDashboard;
