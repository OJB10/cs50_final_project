import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import TaskCard from "./components/TaskCard/TaskCard";
import TicketModal from "./components/Modals/TicketModal";
import DeleteModal from "./components/Modals/DeleteModal";
import CreateButton from "./components/Buttons/CreateButton";
import { ThemeProvider } from "@mui/material/styles";
import { Grid, Box, CssBaseline } from "@mui/material";
import theme from "./theme"; // Dynamic theme function

const App = () => {
  /**
   * Main App component that manages the overall layout, theme, and functionality
   * of the application, including task fetching, creation, editing, and deletion.
   */
  const [tasks, setTasks] = useState([]); // State for dynamic tasks
  const [mode, setMode] = useState("light"); // Switch between 'light' and 'dark'
  const [ticketModalOpen, setTicketModalOpen] = useState(false); // Control for ticket modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Control for delete modal
  const [currentTicket, setCurrentTicket] = useState(null); // Stores current ticket for edit or delete

  /**
   * Fetch tasks from the Flask API and update the tasks state.
   * Logs an error message if the fetch fails.
   */
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

  /**
   * Effect hook to fetch tasks when the component mounts.
   */
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Toggle the application theme between light and dark modes.
   */
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

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
    setCurrentTicket(formattedTicket); // Pass the formatted ticket
    setTicketModalOpen(true); // Open the ticket modal
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

      if (ticketData.id) {
        await fetch(`http://127.0.0.1:5000/api/tickets/${ticketData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ticketPayload),
        });
      } else {
        await fetch("http://127.0.0.1:5000/api/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ticketPayload),
        });
      }
      fetchTasks();
      setTicketModalOpen(false);
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
        });
        fetchTasks(); // Refresh tasks
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <ThemeProvider theme={theme(mode)}>
      {/* ThemeProvider to enable dynamic light/dark mode */}
      <CssBaseline /> {/* Ensures consistent global styles */}
      {/* Layout wrapper */}
      <Box>
        {/* Fixed Navbar */}
        <Navbar />

        {/* Main Content Area */}
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
                    onEdit={() => handleEdit(task)} // Pass the edit function
                    onDelete={() => handleDelete(task)} // Pass the delete function
                  />
                </Grid>
              ))
            ) : (
              <div className="body-large">No tasks found.</div>
            )}
          </Grid>
        </Box>

        {/* Ticket Modals */}
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

        {/* Floating Create Button */}
        <CreateButton onClick={handleCreate} />
      </Box>
    </ThemeProvider>
  );
};

export default App;