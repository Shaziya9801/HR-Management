"use client";
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/WbSunny";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import logo from '../../../public/Assest/hr.png'

// Supabase setup
const supabase = createClient(
  "https://your-project-url.supabase.co",
  "your-anon-key"
);

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      const { data, error } = await supabase
        .from("dark_mode")
        .select("dark_mode")
        .single();
      if (data) {
        setDarkMode(data.dark_mode);
        document.body.style.backgroundColor = data.dark_mode ? " #121212" : " #ffffff";
      }
    };
    fetchTheme();
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.style.backgroundColor = newMode ? "#121212" : "#ffffff";

    await supabase
      .from("dark_mode")
      .update({ dark_mode: newMode })
      .eq("id", 1);
  };

  if (path === "/") {
    return null;
  }

  const handleLogout = () => {
    alert("Logged out!");
    router.push("/Signin");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        backgroundColor: darkMode ? "#212121" : "white",
        color: darkMode ? "white" : "black",
        // boxShadow: "0px 2px 2px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
        }}>
          <Image src={logo} alt="Logo"
            height={100}
            width={230} 
            style={{
              marginRight:"500px"
            }}
         />

        </Box>
          {/* Dark Mode Toggle */}
          <IconButton onClick={toggleDarkMode} sx={{ 
            color: darkMode ? "white" : " #004d40",
            }}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            edge="start"
            sx={{ color: darkMode ? "white" : "#004d40" }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Navigation Links */}
        <Box
          sx={{
            display: mobileMenuOpen || !isMobile ? "flex" : "none",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: 2,
            position: isMobile ? "absolute" : "static",
            top: isMobile ? "64px" : "auto",
            left: 0,
            backgroundColor: isMobile ? (darkMode ? "#212121" : "white") : "inherit",
            width: isMobile ? "100%" : "auto",
            zIndex: isMobile ? 1300 : "inherit",
            padding: isMobile ? 2 : 0,
          }}
        >
          {["Dashboard", "PostJob", "Leaves", "Recruitment"].map((item) => (
            <Button
              key={item}
              onClick={() => router.push(`/${item}`)}
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "12px",
                backgroundColor: " #004d40",
                "&:hover": { backgroundColor: " #00796b" },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>     

        {/* Logout Button */}
        <Button
          variant="outlined"
          sx={{
            borderColor: "black",
            color: "white",
            fontWeight: "bold",
            backgroundColor: "#004d40",
            "&:hover": { backgroundColor: "#00796b", borderColor: "black" },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
