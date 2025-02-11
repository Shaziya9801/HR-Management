"use client";
import React, { useState, useEffect } from "react";
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Typography, Card, CardContent, Grid, Box } from "@mui/material";
import supabase from "../../../utils/supabase/client";
import Swal from "sweetalert2"; // Import SweetAlert2

const Recruitment = () => {
  const [formData, setFormData] = useState({
    job_title: "",
    job_description: "",
    experience: "",
    salary: "",
    location: "",
  });

  const [jobs, setJobs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePostJob = async () => {
    // Validate form data
    if (!formData.job_title || !formData.job_description || !formData.experience || !formData.salary || !formData.location) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill out all fields",
      });
      return;
    }

    // Show SweetAlert2 loader spinner
    Swal.fire({
      title: "Posting Job...",
      text: "Please wait while we post your job.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const { data, error } = await supabase.from("recruitment").insert([formData]);
      if (error) throw error;

      // Close the loader and show success alert
      Swal.fire({
        title: "Success!",
        text: "Job posted successfully!",
        icon: "success",
        confirmButtonText: "OK",
        // background: ' #004d40',
        color: 'black' 
      });

      fetchJobs();
    } catch (error) {
      console.error("Error posting job:", error.message);
      // Close the loader and show error alert
      Swal.fire({
        title: "Error",
        text: "There was an error posting the job.",
        icon: "error",
        confirmButtonText: "Try Again",
        background: ' #d32f2f', 
        color: ' #ffffff'  
      });
    }
  };

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase.from("recruitment").select("*");
      if (error) throw error;
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase.from("recruitment").delete().match({ id: id });
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
      fetchJobs();
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom sx={{
        color: "#26a69a",
        paddingLeft: "400px",
        fontWeight: "750",
        fontSize: "32px",
        marginTop: "80px",
        marginRight: "450px"
      }}>
        Upcoming Recruitments
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: " #00796b",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <TextField
          label="Job Title"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            style: { color: "white", borderColor: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
            },
          }}
        />
        <TextField
          label="Job Description"
          name="job_description"
          value={formData.job_description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          InputProps={{
            style: { color: "white", borderColor: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
            },
          }}
        />
        <Typography variant="body1" gutterBottom sx={{ color: "white" }}>
          Experience
        </Typography>
        <RadioGroup
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="0-1 years"
            control={<Radio sx={{ color: "white" }} />}
            label="0-1 years"
            sx={{ color: "white" }}
          />
          <FormControlLabel
            value="2-5 years"
            control={<Radio sx={{ color: "white" }} />}
            label="2-5 years"
            sx={{ color: "white" }}
          />
          <FormControlLabel
            value="5+ years"
            control={<Radio sx={{ color: "white" }} />}
            label="5+ years"
            sx={{ color: "white" }}
          />
        </RadioGroup>
        <TextField
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            style: { color: "white", borderColor: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
            },
          }}
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            style: { color: "white", borderColor: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePostJob}
          sx={{
            mt: 2,
            backgroundColor: " #004d40",
            color: "white",
            "&:hover": {
              backgroundColor: ' #00796b',
              fontWeight: "bold",
            }
          }}
        >
          Post Job
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom sx={{
        mt: 4,
        color: "#26a69a",
        fontWeight: "750",
        fontSize: "35px",
        margin: "30px",
      }}>
        Posted Jobs
      </Typography>
      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card
              sx={{
                border: "2px solid #00796b",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.02)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  border: "2px solid #00796b"
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  Job Title: {job.job_title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{
                  fontWeight: "bold",
                  color: "black"
                }}>
                  Job Description: {job.job_description}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{
                  fontWeight: "bold",
                  color: "black"
                }}>
                  Experience: {job.experience}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{
                  fontWeight: "bold",
                  color: "black"
                }}>
                  Salary: {job.salary}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{
                  fontWeight: "bold",
                  color: "black"
                }}>
                  Location: {job.location}
                </Typography>
                <Button variant="contained" color="error"
                  onClick={() => handleDelete(job.id)}
                  sx={{
                    marginTop: 2,
                    padding: 1,
                    color: "white",
                    '&:hover': {
                      fontWeight: "bold",
                    },
                  }}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Recruitment;
