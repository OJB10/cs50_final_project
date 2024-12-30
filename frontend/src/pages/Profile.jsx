import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button, Switch } from "@mui/material";
import Navbar from "../components/Navbar/Navbar"; // Adjust the path based on your folder structure.

const Profile = ({ user, onThemeToggle }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    password: "",
    theme: user.theme || "light",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleTheme = async () => {
    const newTheme = formData.theme === "light" ? "dark" : "light";
    setFormData({ ...formData, theme: newTheme });
    onThemeToggle(newTheme);
    try {
      await fetch("http://127.0.0.1:5000/api/users/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (error) {
      console.error("Error updating theme preference:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box sx={{ margin: "2rem auto", maxWidth: "800px", padding: "1rem" }}>
        <Typography variant="h4" gutterBottom>
          Profile Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Theme Preference</Typography>
            <Switch
              checked={formData.theme === "dark"}
              onChange={handleToggleTheme}
            />
            <Typography>{formData.theme === "dark" ? "Dark Mode" : "Light Mode"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;