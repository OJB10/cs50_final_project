import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

/**
 * TaskCard Component
 * 
 * This component displays a card representing a task, including its name, description,
 * status, due date, and action buttons for editing and deleting the task.
 * 
 * Props:
 * @param {string} name - The name of the task.
 * @param {string} description - A short description of the task.
 * @param {string} status - The current status of the task (e.g., "In Progress").
 * @param {string} dueDate - The due date of the task, stored in ISO format (YYYY-MM-DD).
 * @param {function} onEdit - Callback function triggered when the "Edit" button is clicked.
 * @param {function} onDelete - Callback function triggered when the "Delete" button is clicked.
 * 
 * @returns {JSX.Element} The rendered task card.
 */
const TaskCard = ({ name, description, status, dueDate, onEdit, onDelete }) => {
  // Format the due date using the user's locale settings
  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "No due date";

  // Map status to appropriate color
  const getStatusColor = (status) => {
    const statusMap = {
      "Completed": "success",
      "In Progress": "info",
      "Pending": "warning",
      "Blocked": "error",
    };
    return statusMap[status] || "primary";
  };

  return (
    <Card
      className="card"
      sx={{
        height: "100%", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 0, // Reset padding as it's handled by CardContent
      }}
    >
      <CardContent sx={{ paddingBottom: "8px !important", flexGrow: 1 }}>
        {/* Status Chip displayed at the top-right corner */}
        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
          <Chip
            label={
              <Box display="flex" alignItems="center">
                <CalendarTodayIcon fontSize="small" sx={{ marginRight: 0.5 }} />
                {status}
              </Box>
            }
            color={getStatusColor(status)}
            sx={{ fontWeight: "var(--font-weight-medium)" }}
          />
        </Box>

        {/* Task Title */}
        <Typography
          variant="h6"
          component="div"
          className="h6"
          sx={{ marginBottom: 1 }}
        >
          {name}
        </Typography>

        {/* Task Description */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          className="body-small"
        >
          {description}
        </Typography>
      </CardContent>

      {/* Footer: Action Buttons and Due Date */}
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 1,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Action Buttons: Edit and Delete */}
        <Box display="flex" gap={1}>
          <Button
            startIcon={<EditIcon />}
            size="small"
            variant="outlined"
            color="primary"
            className="btn"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            size="small"
            variant="contained"
            color="error"
            className="btn"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>

        {/* Due Date Display */}
        <Typography
          variant="caption"
          color="text.secondary"
          className="caption"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <AccessTimeIcon fontSize="small" sx={{ marginRight: 0.5 }} />
          {formattedDueDate}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default TaskCard;