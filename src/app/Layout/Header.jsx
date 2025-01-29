"use client";
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemButton } from "@mui/material";
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
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src={logo}
            alt="Logo"
            height={100}
            width={230}
            style={{ marginRight: isMobile ? "0px" : "500px" }}
          />
        </Box>

        {/* Dark Mode Toggle */}
        <IconButton
          onClick={toggleDarkMode}
          sx={{ color: darkMode ? "white" : " #004d40" }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* Mobile Menu Toggle */}
        {isMobile ? (
          <IconButton
            onClick={() => setMobileMenuOpen(true)}
            sx={{ color: darkMode ? "white" : "#004d40" }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
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
        )}

        {/* Logout Button */}
        {!isMobile && (
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
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <List sx={{ width: 250, backgroundColor: darkMode ? "#212121" : "white", height: "100%" }}>
          {["Dashboard", "PostJob", "Leaves", "Recruitment"].map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton onClick={() => {
                router.push(`/${item}`);
                setMobileMenuOpen(false);
              }}>
                {item}
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>Logout</ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
