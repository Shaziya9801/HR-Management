"use client";
import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Container,
    Box,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import supabase from "../../../utils/supabase/client";

const Leave = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        employeeId: "",
        email: "",
        phoneNo: "",
        position: "",
        leaveStartDate: "",
        leaveEndDate: "",
        leaveType: "",
        comments: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [leaveRequests, setLeaveRequests] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.from("leaves").insert([
            {
                first_name: formData.firstName,
                last_name: formData.lastName,
                employee_id: formData.employeeId,
                mail: formData.email,
                phone_no: formData.phoneNo,
                position: formData.position,
                leave_start_date: formData.leaveStartDate,
                leave_end_date: formData.leaveEndDate,
                leave_type: formData.leaveType,
                comments: formData.comments,
            },
        ]);

        if (error) {
            console.error("Error inserting data:", error);
        } else {
            setSuccessMessage("Leave request submitted successfully!");
            setFormData({
                firstName: "",
                lastName: "",
                employeeId: "",
                email: "",
                phoneNo: "",
                position: "",
                leaveStartDate: "",
                leaveEndDate: "",
                leaveType: "",
                comments: "",
            });
        }
    };

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            const { data, error } = await supabase.from("leaves").select("*");
            if (error) {
                console.error("Error fetching leave requests:", error);
            } else {
                setLeaveRequests(data);
            }
        };

        fetchLeaveRequests();
    }, []);

    const LeaveRequestCard = ({ data }) => {
        return (
            <Card
                sx={{
                    marginTop: 2,
                    border: "2px solid #004d40", // Border color added
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                        borderColor: "#00796b", // Border color on hover
                    },
                }}
            >
                <CardContent>
                    <Typography variant="h6" sx={{ color: "#004d40", fontWeight: "bold" }}>
                        Leave Request
                    </Typography>
                    <Typography variant="body1">
                        <strong>Name:</strong> {data.first_name} {data.last_name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Position:</strong> {data.position}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Leave Type:</strong> {data.leave_type}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Leave Duration:</strong> {data.leave_start_date} to {data.leave_end_date}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Comments:</strong> {data.comments}
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    return (
        <Container maxWidth="sm">
            <Box my={15}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        margin: "20px",
                        fontFamily: "-apple-system",
                        fontWeight: "bold",
                        fontSize: "50px",
                        color: "#26a69a",
                    }}
                >
                    Leave Tracking
                </Typography>

                {/* Leave Tracking Form */}
                <Box
                    sx={{
                        padding: 3,
                        backgroundColor: " #00796b",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Typography
                            variant="h6"
                            sx={{
                                margin: "20px",
                                fontFamily: "-apple-system",
                                fontWeight: "bold",
                                fontSize: "30px",
                                color: "white",
                            }}
                        >
                            Employee Details
                        </Typography>

                        {[
                            { label: "First Name", name: "firstName" },
                            { label: "Last Name", name: "lastName" },
                            { label: "Employee ID", name: "employeeId" },
                            { label: "Email", name: "email" },
                            { label: "Phone No", name: "phoneNo" },
                            { label: "Position", name: "position" },
                        ].map((field) => (
                            <TextField
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{
                                    sx: { color: "white" },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "white" },
                                        "&:hover fieldset": { borderColor: "lightgray" },
                                        "&.Mui-focused fieldset": { borderColor: "white" },
                                    },
                                    input: { color: "white" },
                                }}
                            />
                        ))}

                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{
                            margin: "20px",
                            fontFamily: "-apple-system",
                            fontWeight: "bold",
                            width: "100px",
                            fontSize: "18px",
                            color: "white",
                            backgroundColor: ' #004d40',
                            '&:hover': {
                                backgroundColor: ' #00796b',
                                fontWeight: "bold",
                            },
                        }}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>

                {successMessage && (
                    <Typography color="green" mt={2}>
                        {successMessage}
                    </Typography>
                )}

                <Typography variant="h6" mt={4} sx={{
                    color: "#26a69a",
                    fontWeight: "bold",
                    fontSize: "30px",
                }}>
                    Submitted Leave Requests
                </Typography>

                {leaveRequests.length > 0 ? (
                    leaveRequests.map((request) => (
                        <LeaveRequestCard key={request.id} data={request} />
                    ))
                ) : (
                    <Typography>No leave requests submitted yet.</Typography>
                )}
            </Box>
        </Container>
    );
};

export default Leave;
