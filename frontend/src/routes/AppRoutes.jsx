import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AsyncRoute from "../components/Routes/AsyncRoute";
import Profile from "../pages/Profile";
import { TaskList } from "../components/TaskCard";
import TicketModal from "../components/Modals/TicketModal";
import DeleteModal from "../components/Modals/DeleteModal";
import CreateButton from "../components/Buttons/CreateButton";
import Login from "../components/UserManagement/Login";
import { Box } from "@mui/material"; // Ensure Box is imported
import useTasks from "../hooks/useTasks"; // Use tasks directly
import { useTaskContext } from "../contexts/TaskProvider"; // Import Task Context
import { useModalContext } from "../contexts/ModalProvider"; // Import Modal Context

const AppRoutes = ({ user, setUser, toggleTheme, logout }) => {
  const { currentTicket, setCurrentTicket } = useTaskContext();
  const { tasks, fetchTasks, saveTask } = useTasks(); // Directly use the useTasks hook
  const { ticketModal, deleteModal } = useModalContext();

  const handleCreate = () => {
    setCurrentTicket(null);
    ticketModal.openModal();
  };

  const handleSaveTicket = async (ticketData) => {
    await saveTask(ticketData);
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

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/" />
          ) : (
            <Login
              onLogin={(userData) => {
                setUser(userData);
                fetchTasks();
              }}
            />
          )
        }
      />
      <Route
        path="/"
        element={
          <AsyncRoute>
            <Box>
                <Box sx={{ marginTop: "64px", padding: 2 }}>
                    {console.log("Tasks passed to AppRoutes:", tasks)}
                    {tasks.length > 0 ? (
                        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
                    ) : (
                        <div className="body-large">No tasks available.</div>
                    )}
                </Box>
              <TicketModal
                open={ticketModal.isOpen}
                onClose={ticketModal.closeModal}
                onSave={handleSaveTicket}
                initialData={currentTicket || {}}
                isEdit={!!currentTicket}
              />
              <DeleteModal
                open={deleteModal.isOpen}
                onClose={deleteModal.closeModal}
                onConfirm={confirmDelete}
              />
              <CreateButton onClick={handleCreate} />
            </Box>
          </AsyncRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AsyncRoute>
            <Box>
              <Profile user={user} onThemeToggle={toggleTheme} />
            </Box>
          </AsyncRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;