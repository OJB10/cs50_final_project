import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import useModal from "./hooks/useModal";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Grid, Box, CssBaseline, CircularProgress } from "@mui/material";
import theme from "./theme";
import { useTheme } from "./contexts/ThemeProvider";


import useAuth from './hooks/useAuth'; // Import the custom useAuth hook
import useTasks from './hooks/useTasks'; // Import the custom useTasks hook
import AppRoutes from "./routes/AppRoutes"; // Import the AppRoutes component
import { TaskProvider } from "./contexts/TaskProvider"; // Import the TaskProvider
import { ModalProvider } from "./contexts/ModalProvider"; // Import the ModalProvider


const App = () => {
  const { mode, toggleTheme } = useTheme(); // Tracks the current theme (light/dark)
  const ticketModal = useModal(); // Handles TicketModal state
  const deleteModal = useModal(); // Handles DeleteModal state
  const [currentTicket, setCurrentTicket] = useState(null); // Stores the currently selected ticket for editing/deletion
  const { user, setUser, loading, login, logout } = useAuth(); // Destructure the user, login, and logout functions
  const { tasks, fetchTasks, saveTask } = useTasks(); // Use the hook to fetch tasks
  const [appLoading, setAppLoading] = useState(true); // Add this state

  // Effect to fetch tasks when user changes
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleCreate = () => {
    setCurrentTicket(null);
    ticketModal.openModal();
  };
  
  const handleSaveTicket = async (ticketData) => {
    await saveTask(ticketData); // Use saveTask from the hook
    ticketModal.closeModal();
  };
  
  const handleEdit = (ticket) => {
    const formattedTicket = {
      ...ticket,
      dueDate: ticket.due_date
        ? new Date(ticket.due_date).toISOString().split("T")[0]
        : "",
    };
    setCurrentTicket(formattedTicket);
    ticketModal.openModal();
  };
  
  const handleDelete = (ticket) => {
    setCurrentTicket(ticket);
    deleteModal.openModal();
  };
  
  const confirmDelete = async () => {
    try {
      if (currentTicket?.id) {
        await fetch(`http://127.0.0.1:5000/api/tickets/${currentTicket.id}`, {
          method: "DELETE",
          credentials: "include", // Include session cookies
        });
        fetchTasks();
        deleteModal.closeModal();
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  if (loading) {
    // Render a loading indicator while session validation is in progress
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  console.log("Rendering App. User state:", user);

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <TaskProvider>
        <ModalProvider>
          <Router>
            {user && <Navbar />} {/* Only render Navbar when user is logged in */}
            <AppRoutes
              user={user}
              setUser={setUser}
              toggleTheme={toggleTheme}
              logout={logout}
              fetchTasks={fetchTasks}
              saveTask={saveTask}
            />
          </Router>
        </ModalProvider>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
