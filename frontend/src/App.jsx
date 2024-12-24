import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import TaskCard from "./components/TaskCard/TaskCard";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button'; // Missing Button import
import theme from './theme'; // Dynamic theme function

const App = () => {
  const [tasks, setTasks] = useState([]); // State for dynamic tasks
  const [mode, setMode] = useState('light'); // Switch between 'light' and 'dark'

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
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme(mode)}> {/* Pass dynamic mode to theme */}
      <CssBaseline /> {/* Ensures consistent global styles */}
      <div>
        <Navbar />
        <div className="grid-container">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                name={task.name}
                description={task.description}
                status={task.status}
                dueDate={task.due_date}
              />
            ))
          ) : (
            <div className="body-large">No tasks found.</div>
          )}
        </div>

        {/* Test Material-UI connection */}
        <div>
          <h1>Welcome to Material-UI</h1>
          <Button variant="contained" color="primary" onClick={toggleMode}>
            Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;