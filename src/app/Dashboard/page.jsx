// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Typography, Modal, IconButton, TextField, Paper
// } from "@mui/material";
// import { Delete, Edit } from "@mui/icons-material";
// import supabase from "../../../utils/supabase/client";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const EmployeeDashboard = () => {
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]); // Stores search results
//   const [searchQuery, setSearchQuery] = useState(""); // Search input state
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

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // Fetch all employees from Supabase
//   const fetchEmployees = async () => {
//     const { data, error } = await supabase.from("Employee").select("*");

//     if (error) {
//       console.error("Error fetching employees:", error);
//     } else {
//       setEmployees(data);
//       setFilteredEmployees(data); // Initialize filtered list with all employees
//     }
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchQuery(value);

//     // Filter employees based on name, role, email, department, phone_number, date_of_joining
//     const filtered = employees.filter((emp) =>
//       Object.values(emp).some((field) =>
//         String(field || "").toLowerCase().includes(value)
//       )
//     );

//     setFilteredEmployees(filtered);
//   };

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
//         Swal.fire("Success", "Employee updated successfully!", "success");
//       } else {
//         // Insert new employee
//         const { error } = await supabase.from("Employee").insert([{
//           name: formData.name,
//           role: formData.role,
//           email: formData.email,
//           department: formData.department,
//           phone_number: formData.phone_number,
//           date_of_joining: formData.date_of_joining,
//         }]);

//         if (error) throw error;
//         Swal.fire("Success", "Employee added successfully!", "success");
//       }

//       fetchEmployees(); // Refresh the table
//       handleClose(); // Close the modal
//     } catch (error) {
//       console.error("Error:", error.message);
//       Swal.fire("Error", "Failed to submit employee data.", "error");
//     }
//   };

//   // Delete Employee
//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const { error } = await supabase.from("Employee").delete().eq("id", id);
//           if (error) throw error;
//           Swal.fire("Deleted!", "Employee deleted successfully.", "success");
//           fetchEmployees(); // Refresh the table
//         } catch (error) {
//           console.error(error);
//           Swal.fire("Error", "Failed to delete employee.", "error");
//         }
//       }
//     });
//   };

//   // Open modal for editing
//   const handleEdit = (employee) => {
//     console.log("Editing employee: ", employee); // Check if the employee data is being passed correctly

//     setFormData({
//       name: employee.name,
//       role: employee.role,
//       email: employee.email,
//       department: employee.department,
//       phone_number: employee.phone_number,
//       date_of_joining: employee.date_of_joining,
//       id: employee.id,
//     });
//     setEditMode(true);  // Set edit mode to true
//     setOpen(true);  // Open modal
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
//     setEditMode(false);  // Set edit mode to false for creating new employee
//     setOpen(true);  // Open modal
//   };

//   const handleClose = () => setOpen(false);

//   return (
//     <Box sx={{ padding: 10 }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{
//           color: "#26a69a",
//           paddingLeft: "400px",
//           fontWeight: "750",
//           fontSize: "40px",
//           margin: "30px",
//         }}
//       >
//         Employee Dashboard
//       </Typography>

//       {/* Search Field */}
//       <TextField
//         label="Search by Name, Role, Email, Department, Phone Number, Date of Joining"
//         variant="outlined"
//         value={searchQuery}
//         onChange={handleSearchChange}
//         fullWidth
//         sx={{
//           marginBottom: 4,
//           width: "300px",
//           "& .MuiInputBase-input": { color: "#26a69a" },
//           "& .MuiOutlinedInput-root": {
//             "& fieldset": { borderColor: "#26a69a" },
//             "&:hover fieldset": { borderColor: "#26a69a" },
//             "&.Mui-focused fieldset": { borderColor: "#26a69a" },
//             paddingLeft: "10px",
//           },
//           "& .MuiInputLabel-root": { color: "#26a69a" },
//           "& .MuiInputLabel-root.Mui-focused": { color: "#26a69a" },
//         }}
//         InputProps={{ sx: { color: "#004d40" } }}
//         InputLabelProps={{ shrink: true }}
//       />

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleOpen}
//         sx={{
//           backgroundColor: "#00796b",
//           fontWeight: "bold",
//           fontSize: "15px",
//           marginBottom: 3,
//           display:"flex"
//         }}
//       >
//         Add New Employee
//       </Button>

//       {/* Modal for Edit or Add */}
//       <Modal open={open} onClose={handleClose}>
//         <Box sx={{
//           position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//           backgroundColor: 'white', padding: 4, borderRadius: 1, boxShadow: 24, width: '400px'
//         }}>
//           <Typography variant="h6" sx={{
//             fontWeight: "bold",
//             padding: "10px",
//             fontSize: "30px",
//             color: " #26a69a",
//             textAlign: "center",
//             borderBottom: "1px solid #ccc",
//           }}>{editMode ? "Edit Employee" : "Add New Employee"}</Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               fullWidth
//               sx={{ marginBottom: 2 }}
//             />
//             <TextField
//               label="Role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               fullWidth
//               sx={{ marginBottom: 2 }}
//             />
//             <TextField
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               fullWidth
//               sx={{ marginBottom: 2 }}
//             />
//             <TextField
//               label="Department"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               fullWidth
//               sx={{ marginBottom: 2 }}
//             />
//             <TextField
//               label="Phone Number"
//               name="phone_number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               fullWidth
//               sx={{ marginBottom: 2 }}
//             />
//             <TextField
//               label="Date of Joining"
//               name="date_of_joining"
//               type="date"
//               value={formData.date_of_joining}
//               onChange={handleChange}
//               fullWidth
//               sx={{ 
//                 marginBottom: 2 
//               }}
//               InputLabelProps={{
//                 shrink: true, // Ensures the label doesn't overlap with the selected date
//               }}
//             />
//             <Button type="submit" variant="contained" color="primary" fullWidth sx={{
//               backgroundColor: "#00796b",
//               fontWeight: "bold",
//               fontSize: "15px",
//               marginBottom: 3,
//             }}>
//               {editMode ? "Update Employee" : "Add Employee"}
//             </Button>
//           </form>
//         </Box>
//       </Modal>

//       {/* Employee Table */}
//       <TableContainer component={Paper} sx={{ border: "5px solid #00796b" }}>
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
//             {filteredEmployees.map((employee) => (
//               <TableRow key={employee.id}>
//                 <TableCell>{employee.name}</TableCell>
//                 <TableCell>{employee.role}</TableCell>
//                 <TableCell>{employee.email}</TableCell>
//                 <TableCell>{employee.department}</TableCell>
//                 <TableCell>{employee.phone_number}</TableCell>
//                 <TableCell>{employee.date_of_joining}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEdit(employee)} sx={{ 
//                     color: "black",
//                     }}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(employee.id)} sx={{ color: "black" }}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default EmployeeDashboard;



"use client";
import React, { useState, useEffect } from "react";
import {
  Box, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Modal, IconButton, TextField, Paper
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import supabase from "../../../utils/supabase/client";
import Swal from "sweetalert2"; // Import SweetAlert2

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Stores search results
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
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

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch all employees from Supabase
  const fetchEmployees = async () => {
    const { data, error } = await supabase.from("Employee").select("*");

    if (error) {
      console.error("Error fetching employees:", error);
    } else {
      setEmployees(data);
      setFilteredEmployees(data); // Initialize filtered list with all employees
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    // Filter employees based on name, role, email, department, phone_number, date_of_joining
    const filtered = employees.filter((emp) =>
      Object.values(emp).some((field) =>
        String(field || "").toLowerCase().includes(value)
      )
    );

    setFilteredEmployees(filtered);
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Edit Employee with spinner loader using SweetAlert2
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show spinner loader using SweetAlert2
    Swal.fire({
      title: "Submitting...",
      text: "Please wait while your request is being submitted.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

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

        Swal.close();

        if (error) throw error;
        Swal.fire("Success", "Employee updated successfully!", "success");
      } else {
        // Insert new employee
        const { error } = await supabase.from("Employee").insert([{
          name: formData.name,
          role: formData.role,
          email: formData.email,
          department: formData.department,
          phone_number: formData.phone_number,
          date_of_joining: formData.date_of_joining,
        }]);

        Swal.close();

        if (error) throw error;
        Swal.fire("Success", "Employee added successfully!", "success");
      }

      fetchEmployees(); // Refresh the table
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error:", error.message);
      Swal.close();
      Swal.fire("Error", "Failed to submit employee data.", "error");
    }
  };

  // Delete Employee
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { error } = await supabase.from("Employee").delete().eq("id", id);
          if (error) throw error;
          Swal.fire("Deleted!", "Employee deleted successfully.", "success");
          fetchEmployees(); // Refresh the table
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete employee.", "error");
        }
      }
    });
  };

  // Open modal for editing
  const handleEdit = (employee) => {
    console.log("Editing employee: ", employee); // Check if the employee data is being passed correctly

    setFormData({
      name: employee.name,
      role: employee.role,
      email: employee.email,
      department: employee.department,
      phone_number: employee.phone_number,
      date_of_joining: employee.date_of_joining,
      id: employee.id,
    });
    setEditMode(true);  // Set edit mode to true
    setOpen(true);  // Open modal
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
    setEditMode(false);  // Set edit mode to false for creating new employee
    setOpen(true);  // Open modal
  };

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ padding: 10 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#26a69a",
          paddingLeft: "400px",
          fontWeight: "750",
          fontSize: "40px",
          margin: "30px",
        }}
      >
        Employee Dashboard
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search by Name, Role, Email, Department, Phone Number, Date of Joining"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        sx={{
          marginBottom: 4,
          width: "300px",
          "& .MuiInputBase-input": { color: "#26a69a" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#26a69a" },
            "&:hover fieldset": { borderColor: "#26a69a" },
            "&.Mui-focused fieldset": { borderColor: "#26a69a" },
            paddingLeft: "10px",
          },
          "& .MuiInputLabel-root": { color: "#26a69a" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#26a69a" },
        }}
        InputProps={{ sx: { color: "#004d40" } }}
        InputLabelProps={{ shrink: true }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          backgroundColor: "#00796b",
          fontWeight: "bold",
          fontSize: "15px",
          marginBottom: 3,
          display: "flex",
        }}
      >
        Add New Employee
      </Button>

      {/* Modal for Edit or Add */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 1,
            boxShadow: 24,
            width: '400px',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              padding: "10px",
              fontSize: "30px",
              color: " #26a69a",
              textAlign: "center",
              borderBottom: "1px solid #ccc",
            }}
          >
            {editMode ? "Edit Employee" : "Add New Employee"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Date of Joining"
              name="date_of_joining"
              type="date"
              value={formData.date_of_joining}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: "#00796b",
                fontWeight: "bold",
                fontSize: "15px",
                marginBottom: 3,
              }}
            >
              {editMode ? "Update Employee" : "Add Employee"}
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Employee Table */}
      <TableContainer component={Paper} sx={{ border: "5px solid #00796b" }}>
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
            {filteredEmployees.map((employee) => (
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
                    sx={{ color: "black" }}
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
    </Box>
  );
};

export default EmployeeDashboard;
