// "use client";
// import React, { useState, useEffect } from "react";
// import supabase from "../../../utils/supabase/client";
// import { Box, Button, Modal, TextField, Typography, Card, CardContent, CardActions, Grid } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const PostJobs = () => {
//     const [open, setOpen] = useState(false); // Modal state
//     const [jobs, setJobs] = useState([]); // State to store job data
//     const [formData, setFormData] = useState({
//         job_role: "",
//         company_name: "",
//         job_description: "",
//         location: "",
//         salary: "",
//     });

//     // Fetch Jobs from Supabase
//     const fetchJobs = async () => {
//         try {
//             const { data, error } = await supabase.from("Post_Job").select("*");
//             if (error) {
//                 console.error("Error fetching jobs:", error.message);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Error",
//                     text: "Error fetching jobs!",
//                 });
//             } else {
//                 setJobs(data);
//             }
//         } catch (err) {
//             console.error("Unexpected error fetching jobs:", err);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: "Unexpected error fetching jobs!",
//             });
//         }
//     };

//     // Add Job to Supabase
//     const addJob = async () => {
//         const { job_role, company_name, job_description, location, salary } = formData;

//         // Validate form data
//         if (!job_role || !company_name || !job_description || !location || !salary) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Missing Fields",
//                 text: "Please fill out all fields",
//             });
//             return;
//         }

//         try {
//             const { data, error } = await supabase.from("Post_Job").insert([
//                 {
//                     job_role,
//                     company_name,
//                     job_description,
//                     location,
//                     salary,
//                 },
//             ]);

//             if (error) {
//                 console.error("Error adding job:", error.message);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Error",
//                     text: `Error adding job: ${error.message}`,
//                 });
//             } else {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Job Added!",
//                     text: "Job added successfully!",
//                 });
//                 fetchJobs(); // Refresh the job list
//                 setOpen(false); // Close the modal
//                 setFormData({
//                     job_role: "",
//                     company_name: "",
//                     job_description: "",
//                     location: "",
//                     salary: "",
//                 });
//             }
//         } catch (err) {
//             console.error("Unexpected error adding job:", err);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: "Unexpected error adding job!",
//             });
//         }
//     };

//     const handleDelete = async (id) => {
//         const { data, error } = await supabase.from("Post_Job").delete().match({ id: id });
//         if (error) {
//             console.error("Error deleting leave request:", error);
//         } else {
//             Swal.fire({
//                 title: "Deleted!",
//                 text: "Jobs has been deleted successfully.",
//                 icon: "success",
//                 confirmButtonText: "OK",
//                 confirmButtonColor: "#00796b",
//             });

//             // Refresh the leave requests after deletion
//             fetchJobs();
//         }
//     };

//     // Fetch jobs when the component mounts
//     useEffect(() => {
//         fetchJobs();
//     }, []);

//     return (
//         <Box sx={{
//             padding: 4,
//             marginTop: "50px",
//         }}>
//             <Typography sx={{
//                 color: "white",
//                 fontSize: "40px",
//                 fontWeight: "bold",
//                 padding: "20px",
//                 marginBottom: "20px",
//                 paddingLeft: "300px",
//                 color:" #26a69a"
//             }} component="div">
//                 <marquee behavior="scroll" direction="left" scrollamount="10">
//                     All Jobs Are Here....Apply Now !!
//                 </marquee>
//             </Typography>
//             <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => setOpen(true)}
//                 sx={{
//                     marginBottom: 2,
//                     backgroundColor: ' #00796b ',
//                     color: "white",
//                     '&:hover': {
//                         backgroundColor: ' #004d40',
//                         fontWeight: "bold",
//                     },
//                 }}
//             >
//                 Post Job
//             </Button>

//             {/* Modal for posting a job */}
//             <Modal
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                 }}
//             >
//                 <Box
//                     sx={{
//                         maxWidth: 500,
//                         width: "90%",
//                         maxHeight: "90vh",
//                         overflowY: "auto",
//                         backgroundColor: "white",
//                         padding: 4,
//                         borderRadius: 2,
//                     }}
//                 >
//                     <Typography variant="h6" marginBottom={2} sx={{
//                         color: " #26a69a",
//                         fontWeight: "bold",
//                         fontSize: "30px",
//                         }}>
//                         Post a Job
//                     </Typography>
//                     <TextField
//                         label="Job Role"
//                         fullWidth
//                         margin="normal"
//                         value={formData.job_role}
//                         onChange={(e) =>
//                             setFormData({ ...formData, job_role: e.target.value })
//                         }
//                     />
//                     <TextField
//                         label="Company Name"
//                         fullWidth
//                         margin="normal"
//                         value={formData.company_name}
//                         onChange={(e) =>
//                             setFormData({ ...formData, company_name: e.target.value })
//                         }
//                     />
//                     <TextField
//                         label="Job Description"
//                         fullWidth
//                         margin="normal"
//                         multiline
//                         rows={4}
//                         value={formData.job_description}
//                         onChange={(e) =>
//                             setFormData({ ...formData, job_description: e.target.value })
//                         }
//                     />
//                     <TextField
//                         label="Location"
//                         fullWidth
//                         margin="normal"
//                         value={formData.location}
//                         onChange={(e) =>
//                             setFormData({ ...formData, location: e.target.value })
//                         }
//                     />
//                     <TextField
//                         label="Salary"
//                         fullWidth
//                         margin="normal"
//                         value={formData.salary}
//                         onChange={(e) =>
//                             setFormData({ ...formData, salary: e.target.value })
//                         }
//                     />
//                     <Box
//                         sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
//                     >
//                         <Button variant="outlined" onClick={() => setOpen(false)} sx={{
//                             marginTop: 2,
//                             padding: 1,
//                             backgroundColor: ' #004d40',
//                             color: "white",
//                             '&:hover': {
//                                 backgroundColor: ' #00796b',
//                                 fontWeight: "bold",
//                             },
//                         }}>
//                             Cancel
//                         </Button>
//                         <Button variant="contained" onClick={addJob} sx={{
//                             marginTop: 2,
//                             padding: 1,
//                             backgroundColor: ' #004d40',
//                             color: "white",
//                             '&:hover': {
//                                 backgroundColor: ' #00796b',
//                                 fontWeight: "bold",
//                             },
//                         }}>
//                             Post Job
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>

//             {/* Display job cards */}
//             <Grid container spacing={2}>
//                 {jobs.map((job) => (
//                     <Grid item xs={12} sm={6} md={4} key={job.id}>
//                         <Card sx={{
//                             border: "3px solid #00796b",
//                             "&:hover": {
//                                 boxShadow: 6,
//                                 transform: "scale(1.02)",
//                                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                                 border: "2px solid #00796b"
//                             },
//                         }}>
//                             <CardContent>
//                                 <Typography variant="h6" sx={{ fontWeight: "bold" }}>{job.job_role}</Typography>
//                                 <Typography variant="body2" sx={{ fontWeight: "650" }} color="black">
//                                     Company Name: {job.company_name}
//                                 </Typography>
//                                 <Typography variant="body1" marginTop={1} sx={{ color: "black", fontWeight:"bold" }}>
//                                     Job Description: {job.job_description}
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary" marginTop={1}
//                                     sx={{ fontWeight: "bold", color: "black" }}
//                                 >
//                                     Location: {job.location}
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary"
//                                     sx={{ fontWeight: "bold", color: "black" }}
//                                 >
//                                     Salary: {job.salary}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button variant="contained" color="error"
//                                 onClick={() => handleDelete(job.id)}
//                                  sx={{
//                                     marginTop: 2,
//                                     padding: 1,
//                                     // backgroundColor: ' #004d40',
//                                     color: "white",
//                                     '&:hover': {
//                                         // backgroundColor: ' #00796b',
//                                         fontWeight: "bold",
//                                     },
//                                 }}>Delete</Button>
//                             </CardActions>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// };

// export default PostJobs;



"use client";
import React, { useState, useEffect } from "react";
import supabase from "../../../utils/supabase/client";
import { Box, Button, Modal, TextField, Typography, Card, CardContent, CardActions, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2"; // Import SweetAlert2

const PostJobs = () => {
    const [open, setOpen] = useState(false); // Modal state
    const [jobs, setJobs] = useState([]); // State to store job data
    const [formData, setFormData] = useState({
        job_role: "",
        company_name: "",
        job_description: "",
        location: "",
        salary: "",
    });

    // Fetch Jobs from Supabase
    const fetchJobs = async () => {
        try {
            const { data, error } = await supabase.from("Post_Job").select("*");
            if (error) {
                console.error("Error fetching jobs:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error fetching jobs!",
                });
            } else {
                setJobs(data);
            }
        } catch (err) {
            console.error("Unexpected error fetching jobs:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unexpected error fetching jobs!",
            });
        }
    };

    // Add Job to Supabase with spinner loader using SweetAlert2
    const addJob = async () => {
        const { job_role, company_name, job_description, location, salary } = formData;

        // Validate form data
        if (!job_role || !company_name || !job_description || !location || !salary) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill out all fields",
            });
            return;
        }

        // Show spinner loader
        Swal.fire({
            title: "Posting Job...",
            text: "Please wait while your job is being posted.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Wait a short moment to ensure the loader is displayed
        await new Promise((resolve) => setTimeout(resolve, 100));

        try {
            const { data, error } = await supabase.from("Post_Job").insert([
                {
                    job_role,
                    company_name,
                    job_description,
                    location,
                    salary,
                },
            ]);

            // Close the loader
            Swal.close();

            if (error) {
                console.error("Error adding job:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Error adding job: ${error.message}`,
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Job Added!",
                    text: "Job added successfully!",
                });
                fetchJobs(); // Refresh the job list
                setOpen(false); // Close the modal
                setFormData({
                    job_role: "",
                    company_name: "",
                    job_description: "",
                    location: "",
                    salary: "",
                });
            }
        } catch (err) {
            console.error("Unexpected error adding job:", err);
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unexpected error adding job!",
            });
        }
    };

    const handleDelete = async (id) => {
        const { data, error } = await supabase.from("Post_Job").delete().match({ id: id });
        if (error) {
            console.error("Error deleting leave request:", error);
        } else {
            Swal.fire({
                title: "Deleted!",
                text: "Jobs has been deleted successfully.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#00796b",
            });
            // Refresh the job list after deletion
            fetchJobs();
        }
    };

    // Fetch jobs when the component mounts
    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <Box sx={{
            padding: 4,
            marginTop: "50px",
        }}>
            <Typography sx={{
                color: "white",
                fontSize: "40px",
                fontWeight: "bold",
                padding: "20px",
                marginBottom: "20px",
                paddingLeft: "300px",
                color: " #26a69a"
            }} component="div">
                <marquee behavior="scroll" direction="left" scrollamount="10">
                    All Jobs Are Here....Apply Now !!
                </marquee>
            </Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
                sx={{
                    marginBottom: 2,
                    backgroundColor: ' #00796b ',
                    color: "white",
                    '&:hover': {
                        backgroundColor: ' #004d40',
                        fontWeight: "bold",
                    },
                }}
            >
                Post Job
            </Button>

            {/* Modal for posting a job */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        maxWidth: 500,
                        width: "90%",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        backgroundColor: "white",
                        padding: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" marginBottom={2} sx={{
                        color: " #26a69a",
                        fontWeight: "bold",
                        fontSize: "30px",
                    }}>
                        Post a Job
                    </Typography>
                    <TextField
                        label="Job Role"
                        fullWidth
                        margin="normal"
                        value={formData.job_role}
                        onChange={(e) =>
                            setFormData({ ...formData, job_role: e.target.value })
                        }
                    />
                    <TextField
                        label="Company Name"
                        fullWidth
                        margin="normal"
                        value={formData.company_name}
                        onChange={(e) =>
                            setFormData({ ...formData, company_name: e.target.value })
                        }
                    />
                    <TextField
                        label="Job Description"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={formData.job_description}
                        onChange={(e) =>
                            setFormData({ ...formData, job_description: e.target.value })
                        }
                    />
                    <TextField
                        label="Location"
                        fullWidth
                        margin="normal"
                        value={formData.location}
                        onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                        }
                    />
                    <TextField
                        label="Salary"
                        fullWidth
                        margin="normal"
                        value={formData.salary}
                        onChange={(e) =>
                            setFormData({ ...formData, salary: e.target.value })
                        }
                    />
                    <Box
                        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
                    >
                        <Button variant="outlined" onClick={() => setOpen(false)} sx={{
                            marginTop: 2,
                            padding: 1,
                            backgroundColor: ' #004d40',
                            color: "white",
                            '&:hover': {
                                backgroundColor: ' #00796b',
                                fontWeight: "bold",
                            },
                        }}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={addJob} sx={{
                            marginTop: 2,
                            padding: 1,
                            backgroundColor: ' #004d40',
                            color: "white",
                            '&:hover': {
                                backgroundColor: ' #00796b',
                                fontWeight: "bold",
                            },
                        }}>
                            Post Job
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Display job cards */}
            <Grid container spacing={2}>
                {jobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job.id}>
                        <Card sx={{
                            border: "3px solid #00796b",
                            "&:hover": {
                                boxShadow: 6,
                                transform: "scale(1.02)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                border: "2px solid #00796b"
                            },
                        }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{job.job_role}</Typography>
                                <Typography variant="body2" sx={{ fontWeight: "650" }} color="black">
                                    Company Name: {job.company_name}
                                </Typography>
                                <Typography variant="body1" marginTop={1} sx={{ color: "black", fontWeight:"bold" }}>
                                    Job Description: {job.job_description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" marginTop={1}
                                    sx={{ fontWeight: "bold", color: "black" }}
                                >
                                    Location: {job.location}
                                </Typography>
                                <Typography variant="body2" color="textSecondary"
                                    sx={{ fontWeight: "bold", color: "black" }}
                                >
                                    Salary: {job.salary}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="error"
                                    onClick={() => handleDelete(job.id)}
                                    sx={{
                                        marginTop: 2,
                                        padding: 1,
                                        color: "white",
                                        '&:hover': {
                                            fontWeight: "bold",
                                        },
                                    }}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PostJobs;
