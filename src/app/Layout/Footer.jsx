"use client"
import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#00796b",
        color: "black",
        padding: "20px 10px",
        textAlign: "center",
        // mt: "500px",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Link
          href="#"
          underline="none"
          sx={{
            color: "black",
            fontSize: "14px",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          underline="none"
          sx={{
            color: "black",
            fontSize: "14px",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          underline="none"
          sx={{
            color: "black",
            fontSize: "14px",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Contact Us
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
