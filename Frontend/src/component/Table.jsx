import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyTable = ({ data }) => {
    const navigate = useNavigate();

    const handleNavigate = (patientId) => {
        navigate(`/patient_profile/${patientId}`);
    };

    return (
        <TableContainer
            component={Paper}
            sx={{ borderRadius: 3, boxShadow: 3 }}
        >
            <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
                Active Visits
            </Typography>
            <Table>
                <TableHead sx={{ backgroundColor: "#1976d2" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            Name
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            Email
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            Date
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            Show Patient Profile
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((visit, index) => (
                            <TableRow
                                key={visit._id}
                                sx={{
                                    backgroundColor:
                                        index % 2 === 0 ? "#f5f5f5" : "#fff",
                                    "&:hover": { backgroundColor: "#e0f7fa" },
                                }}
                            >
                                <TableCell>
                                    {visit.patient?.name || "N/A"}
                                </TableCell>
                                <TableCell>
                                    {visit.patient?.email || "N/A"}
                                </TableCell>
                                <TableCell>
                                    {visit.date
                                        ? new Date(visit.date).toLocaleString()
                                        : "N/A"}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            handleNavigate(visit.patient?._id)
                                        }
                                    >
                                        View Profile
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No appointments found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyTable;
