// "use client";
// import React, { useState, useEffect } from "react";
// import {Box,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Modal,IconButton,TextField,
// Paper} from "@mui/material";
// import { Delete, Edit } from "@mui/icons-material";
// import supabase from "../../../utils/supabase/client";
// import { toast } from "react-toastify";

// const EmployeeDashboard = () => {
//   const [employees, setEmployees] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     email: "",
//     department: "",
//     phone_number: "",
//     date_of_joining: "",
//     id: null,
//   });
//   const [editMode, setEditMode] = useState(false);

//   // Fetch employees from Supabase
//   const fetchEmployees = async () => {
//     const { data, error } = await supabase.from("Employee").select("*");
//     if (error) console.error(error);
//     else setEmployees(data);
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // Handle form field change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Add or Edit Employee
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editMode) {
//         // Update existing employee
//         const { error } = await supabase
//           .from("Employee")
//           .update({
//             name: formData.name,
//             role: formData.role,
//             email: formData.email,
//             department: formData.department,
//             phone_number: formData.phone_number,
//             date_of_joining: formData.date_of_joining,
//           })
//           .eq("id", formData.id);

//         if (error) throw error;
//         toast.success("Employee updated successfully!");
//       } else {
//         // Insert new employee
//         const { error } = await supabase.from("Employee").insert([
//           {
//             name: formData.name,
//             role: formData.role,
//             email: formData.email,
//             department: formData.department,
//             phone_number: formData.phone_number,
//             date_of_joining: formData.date_of_joining,
//           },
//         ]);
//         if (error) throw error;
//         toast.success("Employee added successfully!");
//       }

//       fetchEmployees(); // Refresh the table
//       handleClose(); // Close the modal
//     } catch (error) {
//       console.error("Error:", error.message);
//       toast.error("Failed to submit employee data.");
//     }
//   };

//   // Delete Employee
//   const handleDelete = async (id) => {
//     try {
//       const { error } = await supabase.from("Employee").delete().eq("id", id);
//       if (error) throw error;
//       toast.success("Employee deleted successfully!");
//       fetchEmployees();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete employee.");
//     }
//   };

//   // Open modal for editing
//   const handleEdit = (employee) => {
//     setFormData({
//       name: employee.name,
//       role: employee.role,
//       email: employee.email,
//       department: employee.department,
//       phone_number: employee.phone_number,
//       date_of_joining: employee.date_of_joining,
//       id: employee.id,
//     });
//     setEditMode(true);
//     setOpen(true);
//   };

//   // Open modal for adding
//   const handleOpen = () => {
//     setFormData({
//       name: "",
//       role: "",
//       email: "",
//       department: "",
//       phone_number: "",
//       date_of_joining: "",
//       id: null,
//     });
//     setEditMode(false);
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   return (
//     <Box sx={{ padding: 10 }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{
//           color: "white",
//           paddingLeft: "400px",
//           fontWeight: "750",
//           fontSize: "40px",
//         }}
//       >
//         Employee Dashboard
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleOpen}
//         sx={{
//           backgroundColor: "#00796b",
//           fontWeight: "bold",
//           fontSize: "15px",
//           color: "white",
//           "&:hover": {
//             backgroundColor: " #004d40",
//             fontWeight: "bold",
//           },
//         }}
//       >
//         Add New Employee
//       </Button>

//       <TableContainer
//         component={Paper}
//         sx={{
//           marginTop: 4,
//           border: "5px solid #00796b",
//         }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Employee Name</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Date of Joining</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {employees.map((employee) => (
//               <TableRow key={employee.id}>
//                 <TableCell>{employee.name}</TableCell>
//                 <TableCell>{employee.role}</TableCell>
//                 <TableCell>{employee.email}</TableCell>
//                 <TableCell>{employee.department}</TableCell>
//                 <TableCell>{employee.phone_number}</TableCell>
//                 <TableCell>{employee.date_of_joining}</TableCell>
//                 <TableCell>
//                   <IconButton
//                     onClick={() => handleEdit(employee)}
//                     sx={{
//                       color: "black",
//                     }}
//                   >
//                     <Edit />
//                   </IconButton>
//                   <IconButton
//                     onClick={() => handleDelete(employee.id)}
//                     sx={{ color: "black" }}
//                   >
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Modal for Add/Edit */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             maxWidth: 500,
//             width: "90%",
//             maxHeight: "90vh",
//             overflowY: "auto",
//             margin: "auto",
//             marginTop: "1%",
//             padding: 3,
//             bgcolor: "background.paper",
//             borderRadius: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             {editMode ? "Edit Employee" : "Add Employee"}
//           </Typography>
//           <TextField
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Role"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Department"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Phone Number"
//             name="phone_number"
//             value={formData.phone_number}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Date of Joining"
//             name="date_of_joining"
//             type="date"
//             value={formData.date_of_joining}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />
//           <Box
//             sx={{
//               marginTop: 2,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               sx={{
//                 marginTop: 2,
//                 backgroundColor: " #004d40",
//                 color: "white",
//                 "&:hover": {
//                   backgroundColor: " #00796b",
//                   fontWeight: "bold",
//                 },
//               }}
//             >
//               Submit
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={handleClose}
//               sx={{
//                 marginTop: 2,
//                 backgroundColor: " #004d40",
//                 color: "white",
//                 "&:hover": {
//                   backgroundColor: " #00796b",
//                   fontWeight: "bold",
//                 },
//               }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default EmployeeDashboard;

"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Modal, IconButton, TextField, Paper } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import supabase from "../../../utils/supabase/client";
import { toast } from "react-toastify";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    department: "",
    phone_number: "",
    date_of_joining: "",
    id: null,
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch employees from Supabase with optional search query
  const fetchEmployees = async () => {
    let query = supabase.from("Employee").select("*");

    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`)
        .or(`role.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,department.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
    } else {
      setEmployees(data);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [searchQuery]); // Re-fetch data when the searchQuery changes

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Edit Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        // Update existing employee
        const { error } = await supabase
          .from("Employee")
          .update({
            name: formData.name,
            role: formData.role,
            email: formData.email,
            department: formData.department,
            phone_number: formData.phone_number,
            date_of_joining: formData.date_of_joining,
          })
          .eq("id", formData.id);

        if (error) throw error;
        toast.success("Employee updated successfully!");
      } else {
        // Insert new employee
        const { error } = await supabase.from("Employee").insert([
          {
            name: formData.name,
            role: formData.role,
            email: formData.email,
            department: formData.department,
            phone_number: formData.phone_number,
            date_of_joining: formData.date_of_joining,
          },
        ]);
        if (error) throw error;
        toast.success("Employee added successfully!");
      }

      fetchEmployees(); // Refresh the table
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to submit employee data.");
    }
  };

  // Delete Employee
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("Employee").delete().eq("id", id);
      if (error) throw error;
      toast.success("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete employee.");
    }
  };

  // Open modal for editing
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      role: employee.role,
      email: employee.email,
      department: employee.department,
      phone_number: employee.phone_number,
      date_of_joining: employee.date_of_joining,
      id: employee.id,
    });
    setEditMode(true);
    setOpen(true);
  };

  // Open modal for adding
  const handleOpen = () => {
    setFormData({
      name: "",
      role: "",
      email: "",
      department: "",
      phone_number: "",
      date_of_joining: "",
      id: null,
    });
    setEditMode(false);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{
      padding: 10,
    }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "white",
          paddingLeft: "400px",
          fontWeight: "750",
          fontSize: "40px",
          margin: "30px",
          color:"#26a69a"
        }}
      >
        Employee Dashboard
      </Typography>

      <TextField
        label="Search by Name, Role, Email..."
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{
          marginBottom: 4,
          width: "300px",
          "& .MuiInputBase-input": {
            color: " #004d40", // Text inside input field is white
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#004d40", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#004d40", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#004d40", // Border color when focused
            },
            paddingLeft: "10px", // Space for the label inside input
          },
          "& .MuiInputLabel-root": {
            color: "#004d40", // Default label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#004d40", // Label color when focused
          },
        }}
        InputProps={{
          sx: { color: "#004d40" },
        }}
        InputLabelProps={{
          shrink: true, // Ensures the label does not overlap
        }}
      />


      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          backgroundColor: "#00796b",
          fontWeight: "bold",
          fontSize: "15px",
          color: "white",
          display: "flex",
          "&:hover": {
            backgroundColor: " #004d40",
            fontWeight: "bold",
          },
        }}
      >
        Add New Employee
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          marginTop: 4,
          border: "5px solid #00796b",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Employee Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date of Joining</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.phone_number}</TableCell>
                <TableCell>{employee.date_of_joining}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(employee)}
                    sx={{
                      color: "black",
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(employee.id)}
                    sx={{ color: "black" }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Add/Edit */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: 500,
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            margin: "auto",
            marginTop: "1%",
            padding: 3,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editMode ? "Edit Employee" : "Add Employee"}
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Joining"
            name="date_of_joining"
            type="date"
            value={formData.date_of_joining}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                marginTop: 2,
                backgroundColor: " #004d40",
                color: "white",
                "&:hover": {
                  backgroundColor: " #00796b",
                  fontWeight: "bold",
                },
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                marginTop: 2,
                backgroundColor: " #004d40",
                color: "white",
                "&:hover": {
                  backgroundColor: " #00796b",
                  fontWeight: "bold",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EmployeeDashboard;
