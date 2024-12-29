
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TaskCard from "./components/TaskCard/TaskCard";
import TicketModal from "./components/Modals/TicketModal";
import DeleteModal from "./components/Modals/DeleteModal";
import CreateButton from "./components/Buttons/CreateButton";
import Login from "./components/UserManagement/Login"; // Import the Login page
import { ThemeProvider } from "@mui/material/styles";
import { Button, Grid, Box, CssBaseline } from "@mui/material";
import theme from "./theme";

/**
 * The main App component that manages routing, authentication, and the overall UI.
 * Handles protected routes, dynamic theming, task management, and integration
 * with the backend Flask API.
 */
const App = () => {
  const [tasks, setTasks] = useState([]); // Stores task data fetched from the API
  const [mode, setMode] = useState("light"); // Tracks the current theme (light/dark)
  const [ticketModalOpen, setTicketModalOpen] = useState(false); // Controls the ticket modal visibility
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Controls the delete modal visibility
  const [currentTicket, setCurrentTicket] = useState(null); // Stores the currently selected ticket for editing/deletion
  const [user, setUser] = useState(null); // Tracks the currently logged-in user for authentication

// In App.jsx, update the handleLogin function:
const handleLogin = async (credentials) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/users/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login response:", data); // Debug log
      
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        await fetchTasks(); // Fetch tasks after successful login
        return true; // Indicate successful login
      }
    }
    return false; // Indicate failed login
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
};

const handleLogout = async () => {
  try {
    // Call the backend logout route
    const response = await fetch("http://127.0.0.1:5000/api/users/logout", {
      method: "POST",
      credentials: "include", // Include session cookies
    });

    if (response.ok) {
      // Clear user data from localStorage
      localStorage.removeItem("user");
      setUser(null); // Clear user state
      window.location.href = "/login"; // Redirect to login
      console.log("Logout successful");
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error logging out:", error);
    // Force redirect in case of failure
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  }
};
// Pass handleLogout to Navbar as onLogout
<Navbar user={user} onLogout={handleLogout} />

/**
 * A component to protect routes and redirect unauthenticated users to the login page.
 *
 * @param {Object} props - The component props.
 * @param {React.Component} props.children - The child components to render if authenticated.
 * @returns {React.Component} - The protected component or a redirect to the login page.
 */
const ProtectedRoute = ({ children }) => {
  if (!user) {
    // Redirect to login if no user
    console.log("ProtectedRoute: User not found, redirecting to login");
    return <Navigate to="/login" />;
  }

  console.log("ProtectedRoute: User found", user); // Debug log
  return children;
};

/**
 * Toggle the application theme between light and dark modes.
 */
const toggleMode = () => {
  setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
};

/**
 * Fetch tasks from the Flask API and update the tasks state.
 * Logs an error message if the fetch fails.
 */
const fetchTasks = async () => {
  try {
    console.log('Fetching tasks...');
    console.log('Current cookies:', document.cookie);
    
    const response = await fetch("http://127.0.0.1:5000/api/tickets", {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched tasks:", data);
      setTasks(data);
    } else {
      const errorData = await response.json();
      console.error("Failed to fetch tasks:", errorData);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

/**
 * Effect hook to fetch tasks when the user is authenticated.
 */
useEffect(() => {
  if (user) {
    fetchTasks();

    fetch('http://127.0.0.1:5000/api/test-cors', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => console.log('CORS Test:', data));
  }
}, [user]);

/**
 * Open the modal to create a new ticket.
 * Resets the current ticket state to null.
 */
const handleCreate = () => {
  setCurrentTicket(null);
  setTicketModalOpen(true);
};

/**
 * Open the modal to edit an existing ticket.
 * Formats the ticket's due date for display in the form.
 * @param {Object} ticket - The ticket object to edit.
 */
const handleEdit = (ticket) => {
  const formattedTicket = {
    ...ticket,
    dueDate: ticket.due_date
      ? new Date(ticket.due_date).toISOString().split("T")[0]
      : "",
  };
  setCurrentTicket(formattedTicket);
  setTicketModalOpen(true);
};


/**
 * Open the modal to confirm the deletion of a ticket.
 * @param {Object} ticket - The ticket object to delete.
 */
const handleDelete = (ticket) => {
  setCurrentTicket(ticket);
  setDeleteModalOpen(true);
};

/**
 * Save or update a ticket by sending the appropriate request
 * to the Flask API. Closes the modal and refreshes the task list.
 * @param {Object} ticketData - The ticket data to save or update.
 */
const saveTicket = async (ticketData) => {
  try {
    const ticketPayload = {
      ...ticketData,
      due_date: ticketData.dueDate
        ? new Date(ticketData.dueDate).toISOString().split("T")[0]
        : null,
    };

    const url = ticketData.id
      ? `http://127.0.0.1:5000/api/tickets/${ticketData.id}`
      : "http://127.0.0.1:5000/api/tickets";

    const response = await fetch(url, {
      method: ticketData.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Include session cookies
      body: JSON.stringify(ticketPayload),
    });

    if (response.ok) {
      console.log("Ticket saved successfully");
      fetchTasks();
      setTicketModalOpen(false);
    } else {
      console.error("Error saving ticket:", response.statusText);
    }
  } catch (error) {
    console.error("Error saving ticket:", error);
  }
};

/**
 * Confirm the deletion of a ticket by sending a delete request
 * to the Flask API. Closes the modal and refreshes the task list.
 */
const confirmDelete = async () => {
  try {
    if (currentTicket?.id) {
      await fetch(`http://127.0.0.1:5000/api/tickets/${currentTicket.id}`, {
        method: "DELETE",
        credentials: "include", // Include session cookies
      });
      fetchTasks();
      setDeleteModalOpen(false);
    }
  } catch (error) {
    console.error("Error deleting ticket:", error);
  }
};

return (
  <ThemeProvider theme={theme(mode)}>
    <CssBaseline />
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login onLogin={(user) => setUser(user)} />} /> // Updates user state in App.jsx

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Box>
                <Navbar user={user} onLogout={handleLogout} />
                <Box sx={{ marginTop: "64px", padding: 2 }}>
                  <Grid container spacing={2} justifyContent="center">
                    {tasks.length > 0 ? (
                      tasks.map((task) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
                          <TaskCard
                            name={task.name}
                            description={task.description}
                            status={task.status}
                            dueDate={task.due_date}
                            onEdit={() => handleEdit(task)}
                            onDelete={() => handleDelete(task)}
                          />
                        </Grid>
                      ))
                    ) : (
                      <div className="body-large">No tasks found.</div>
                    )}
                  </Grid>
                  
                  {/* Logout Button */}
                  <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                    <Button
                      onClick={handleLogout}
                      variant="contained"
                      color="secondary"
                      sx={{ width: "200px" }}
                    >
                      Logout
                    </Button>
                  </Box>
                </Box>

                {/* Modals */}
                <TicketModal
                  open={ticketModalOpen}
                  onClose={() => setTicketModalOpen(false)}
                  onSave={saveTicket}
                  initialData={currentTicket || {}}
                  isEdit={!!currentTicket}
                />
                <DeleteModal
                  open={deleteModalOpen}
                  onClose={() => setDeleteModalOpen(false)}
                  onConfirm={confirmDelete}
                />
                <CreateButton onClick={handleCreate} />
              </Box>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </ThemeProvider>
);
};

export default App;
