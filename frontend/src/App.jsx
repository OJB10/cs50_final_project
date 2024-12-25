import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import TaskCard from "./components/TaskCard/TaskCard";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button"; // Missing Button import
import theme from "./theme"; // Dynamic theme function
import { Grid, Box, CssBaseline } from "@mui/material";

const App = () => {
  const [tasks, setTasks] = useState([]); // State for dynamic tasks
  const [mode, setMode] = useState("light"); // Switch between 'light' and 'dark'

  // Fetch tickets from Flask API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/tickets");
        const data = await response.json();
        console.log("Fetched tasks:", data); // Debug log
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Toggle between light and dark modes
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme(mode)}> {/* Pass dynamic mode to theme */}
      <CssBaseline /> {/* Ensures consistent global styles */}
      {/* Layout wrapper */}
      <Box>
        {/* Fixed Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <Box sx={{ marginTop: "64px", padding: 2 }}>
          <Grid
            container
            spacing={2}
            justifyContent="center" // Centres the grid
          >
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
                  <TaskCard
                    name={task.name}
                    description={task.description}
                    status={task.status}
                    dueDate={task.due_date}
                  />
                </Grid>
              ))
            ) : (
              <div className="body-large">No tasks found.</div>
            )}
          </Grid>

          {/* Test Material-UI connection */}
          <div>
            <h1>Welcome to Material-UI</h1>
            <Button variant="contained" color="primary" onClick={toggleMode}>
              Toggle {mode === "light" ? "Dark" : "Light"} Mode
            </Button>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;