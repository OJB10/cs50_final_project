import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Alert, 
  Paper, 
  Snackbar,
  Fade,
  Button,
  Chip
} from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskProvider';
import { useAuth } from '../contexts/AuthProvider';
import Profile from '../pages/Profile';
import { TaskList } from '../components/TaskCard';
import TicketModal from '../components/Modals/TicketModal';
import DeleteModal from '../components/Modals/DeleteModal';
import CreateButton from '../components/Buttons/CreateButton';
import { useModalContext } from '../contexts/ModalProvider';
import { useTheme } from '../contexts/ThemeProvider';
import LoadingState from '../components/LoadingState';
import RefreshIcon from '@mui/icons-material/Refresh';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

/**
 * ProtectedContent Component
 * 
 * Main layout for authenticated content with the navbar and routes.
 * Handles task management operations and routing between authenticated views.
 */
const ProtectedContent = () => {
  const { fetchTasks, tasks, saveTask, loading, error } = useTaskContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();
  const { ticketModal, deleteModal } = useModalContext();
  const [currentTicket, setCurrentTicket] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch tasks on initial load
  useEffect(() => {
    if (user && !loading && !error) {
      fetchTasks();
    }
  }, []);

  // Handle user logout
  const handleLogout = () => {
    logout();
  };

  // Handle ticket creation
  const handleCreate = () => {
    setCurrentTicket(null);
    ticketModal.openModal();
  };

  // Handle ticket saving
  const handleSaveTicket = async (ticketData) => {
    try {
      await saveTask(ticketData);
      ticketModal.closeModal();
      showNotification(
        `Task ${ticketData.id ? "updated" : "created"} successfully`, 
        "success"
      );
    } catch (error) {
      showNotification(`Error: ${error.message || "Failed to save task"}`, "error");
    }
  };

  // Handle ticket editing
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

  // Handle ticket deletion
  const handleDelete = (ticket) => {
    setCurrentTicket(ticket);
    deleteModal.openModal();
  };

  // Confirm and execute ticket deletion
  const confirmDelete = async () => {
    try {
      if (currentTicket?.id) {
        await fetch(`http://127.0.0.1:5000/api/tickets/${currentTicket.id}`, {
          method: "DELETE",
          credentials: "include",
        });
        fetchTasks();
        deleteModal.closeModal();
        showNotification("Task deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      showNotification("Failed to delete task", "error");
    }
  };

  // Retry fetching tasks
  const handleRetry = () => {
    fetchTasks();
  };

  // Display notifications
  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Render content based on loading and error states
  const renderTaskListContent = () => {
    if (loading) {
      return <LoadingState message="Loading your tasks..." />;
    }

    if (error) {
      return (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          minHeight="calc(100vh - 200px)"
          padding={3}
        >
          <Alert 
            severity="error" 
            sx={{ 
              marginBottom: 3,
              width: '100%',
              maxWidth: 600
            }}
          >
            Error loading tasks: {error}
          </Alert>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleRetry}
            startIcon={<RefreshIcon />}
            className="btn"
          >
            Retry
          </Button>
        </Box>
      );
    }

    if (tasks.length === 0) {
      return (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          minHeight="calc(100vh - 200px)"
          padding={3}
        >
          <Paper 
            className="card" 
            sx={{ 
              padding: 4, 
              textAlign: 'center',
              maxWidth: 600,
              width: '100%'
            }}
          >
            <NoteAddIcon 
              sx={{ 
                fontSize: 64, 
                color: 'primary.main',
                marginBottom: 2
              }} 
            />
            <Typography variant="h5" className="h5" gutterBottom>
              No Tasks Yet
            </Typography>
            <Typography variant="body1" className="body" sx={{ marginBottom: 3 }}>
              Get started by creating your first task using the button below.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCreate}
              size="large"
              className="btn"
            >
              Create First Task
            </Button>
          </Paper>
        </Box>
      );
    }

    return (
      <Fade in={!loading} timeout={500}>
        <Box>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 3
            }}
          >
            <Typography variant="h4" className="h4">
              Your Tasks
            </Typography>
            <Box>
              <Chip 
                label={`${tasks.length} ${tasks.length === 1 ? 'Task' : 'Tasks'}`} 
                color="primary" 
                size="small"
                sx={{ marginRight: 1 }}
              />
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={<RefreshIcon />}
                onClick={handleRetry}
                className="btn"
              >
                Refresh
              </Button>
            </Box>
          </Box>
          <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
        </Box>
      </Fade>
    );
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <Box sx={{ 
        marginTop: { xs: "56px", sm: "64px" }, 
        backgroundColor: "background.default",
        minHeight: "calc(100vh - 64px)"
      }}>
        <Routes>
          <Route
            path="/"
            element={
              <Container maxWidth="xl" sx={{ paddingY: 4 }}>
                {renderTaskListContent()}
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
              </Container>
            }
          />
          <Route
            path="/profile"
            element={
              <Profile user={user} onThemeToggle={toggleTheme} />
            }
          />
        </Routes>
      </Box>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProtectedContent;