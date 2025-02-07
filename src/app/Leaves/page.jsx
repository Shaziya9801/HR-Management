"use client";
import { useState, useEffect } from "react";
import { TextField, Button, Container, Box, Typography, Card, CardContent, MenuItem, Grid } from "@mui/material";
import supabase from "../../../utils/supabase/client";
import Swal from "sweetalert2";  // Import SweetAlert2

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

    const [leaveRequests, setLeaveRequests] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Show spinner loader using SweetAlert2
        Swal.fire({
            title: "Submitting...",
            text: "Please wait while your leave request is being submitted.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
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
                throw error;
            }

            Swal.fire({
                title: "Success!",
                text: "Leave request submitted successfully!",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#00796b",
            });

            // Reset form data after successful submission
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

            // Refresh the leave requests after inserting a new one
            fetchLeaveRequests();
        } catch (error) {
            console.error("Error inserting data:", error.message);
            Swal.fire({
                title: "Error",
                text: "There was an error submitting your leave request.",
                icon: "error",
                confirmButtonText: "Try Again",
                confirmButtonColor: "#d32f2f",
            });
        }
    };

    const fetchLeaveRequests = async () => {
        const { data, error } = await supabase.from("leaves").select("*");
        if (error) {
            console.error("Error fetching leave requests:", error.message);
        } else {
            setLeaveRequests(data);  // Update state with fetched data
        }
    };

    const handleDelete = async (id) => {
        const { data, error } = await supabase.from("leaves").delete().match({ id: id });
        if (error) {
            console.error("Error deleting leave request:", error);
        } else {
            Swal.fire({
                title: "Deleted!",
                text: "Leave request has been deleted successfully.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#00796b",
            });

            // Refresh the leave requests after deletion
            fetchLeaveRequests();
        }
    };

    useEffect(() => {
        fetchLeaveRequests(); // Fetch leave requests when the component mounts
    }, []);

    const LeaveRequestCard = ({ data }) => {
        return (
            <Box>
                <Card
                    sx={{
                        marginTop: 2,
                        border: "2px solid #004d40",
                        borderRadius: "10px",
                        display: "flex",
                        width: "300px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                            borderColor: "#00796b",
                        },
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" sx={{ color: "#004d40", fontWeight: "bold" }}>
                            Leave Request
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#004d40" }}>
                            <strong>Name:</strong> {data.first_name} {data.last_name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#004d40" }}>
                            <strong>Position:</strong> {data.position}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#004d40" }}>
                            <strong>Leave Type:</strong> {data.leave_type}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#004d40" }}>
                            <strong>Leave Duration:</strong> {data.leave_start_date} to {data.leave_end_date}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#004d40" }}>
                            <strong>Comments:</strong> {data.comments}
                        </Typography>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(data.id)}
                            sx={{
                                marginTop: 2,
                                fontWeight: "bold",
                                backgroundColor: "#d32f2f",
                                '&:hover': { backgroundColor: "#e57373" }
                            }}
                        >
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        );
    };

    return (
        <Box my={15} sx={{ width: "100%" }}>
            <Typography variant="h4" align="center" sx={{
                margin: "20px",
                fontWeight: "bold",
                fontSize: "50px",
                color: "#26a69a"
            }}>
                Leave Record
            </Typography>

            <Box sx={{
                padding: 3,
                backgroundColor: "#00796b",
                borderRadius: "10px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                width: "500px",
                marginLeft: "400px"
            }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" sx={{ margin: "20px", fontWeight: "bold", fontSize: "30px", color: "white" }}>
                        Employee Details
                    </Typography>

                    {["firstName", "lastName", "employeeId", "email", "phoneNo", "position"].map((field) => (
                        <TextField
                            key={field}
                            label={field.replace(/([A-Z])/g, " $1").trim()}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{ sx: { color: "white" } }}
                            sx={{
                                "& .MuiOutlinedInput-root fieldset": { borderColor: "white" },
                                input: { color: "white" }
                            }}
                        />
                    ))}

                    <TextField
                        label="Leave Start Date"
                        type="date"
                        name="leaveStartDate"
                        value={formData.leaveStartDate}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        InputLabelProps={{ shrink: true, sx: { color: "white" } }}
                        sx={{ input: { color: "white" } }}
                    />

                    <TextField
                        label="Leave End Date"
                        type="date"
                        name="leaveEndDate"
                        value={formData.leaveEndDate}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        InputLabelProps={{ shrink: true, sx: { color: "white" } }}
                        sx={{ input: { color: "white" } }}
                    />

                    <TextField
                        select
                        label="Leave Type"
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{
                            "& .MuiOutlinedInput-root fieldset": { borderColor: "white" },
                            input: { color: "white" }
                        }}
                    >
                        {["Sick Leave", "Casual Leave", "Emergency Leave"].map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        margin="normal"
                        InputLabelProps={{ sx: { color: "white" } }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "white" }
                            },
                            input: { color: "white" },
                            textarea: { color: "white" }
                        }}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ margin: "20px", fontWeight: "bold", width: "100px", fontSize: "18px", backgroundColor: "#004d40", '&:hover': { backgroundColor: "#00796b" } }}>
                        Submit
                    </Button>
                </form>
            </Box>

            <Box mt={4}>
                <Grid container spacing={2}>
                    {leaveRequests.map((request, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <LeaveRequestCard data={request} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Leave;
