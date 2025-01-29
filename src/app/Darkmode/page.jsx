"use client";
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline, Switch, Typography, Box } from "@mui/material";
import supabase from "../../../utils/supabase/client"; // Ensure Supabase client is set up

const DarkModeToggle = () => {
  const [themeMode, setThemeMode] = useState("light"); // Default theme mode
  const [userId, setUserId] = useState(null); // Replace with actual user ID from authentication

  // Fetch user's theme preference from Supabase
  const fetchThemePreference = async () => {
    const { data, error } = await supabase
      .from("dark_mode")
      .select("theme")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching theme:", error.message);
    } else {
      setThemeMode(data?.theme || "light");
    }
  };

  // Update user's theme preference in Supabase
  const updateThemePreference = async (theme) => {
    const { error } = await supabase
      .from("dark_mode")
      .update({ theme })
      .eq("id", userId);

    if (error) {
      console.error("Error updating theme:", error.message);
    }
  };

  // Toggle theme and update preference
  const handleToggle = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    updateThemePreference(newTheme);
  };

  // Fetch theme on component mount
  useEffect(() => {
    // Set user ID here (from auth context or Supabase session)
    setUserId("user_id"); // Replace with actual user ID
    fetchThemePreference();
  }, [userId]);

  // Create MUI theme dynamically
  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === "dark"
        ? {
            background: {
              default: "#121212",
              paper: "#1d1d1d",
            },
            text: {
              primary: "#ffffff",
            },
          }
        : {
            background: {
              default: "#ffffff",
              paper: "#f5f5f5",
            },
            text: {
              primary: "#000000",
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {themeMode === "dark" ? "Dark Mode" : "Light Mode"}
        </Typography>
        <Switch
          checked={themeMode === "dark"}
          onChange={handleToggle}
          color="primary"
        />
      </Box>
    </ThemeProvider>
  );
};

export default DarkModeToggle;
