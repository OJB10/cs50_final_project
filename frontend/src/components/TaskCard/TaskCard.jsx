import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Button,
  Grid,
  Box,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TaskCard = ({ name, description, status, dueDate, onEdit, onDelete  }) => {
  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
        boxShadow: 2,
        height: "100%", // Consistent card height
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Align content vertically
      }}
    >
      <CardContent sx={{ paddingBottom: "8px !important" }}>
        {/* Chip in the top-right */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box /> {/* Spacer to align the Chip to the right */}
          <Chip
            label={
              <Box display="flex" alignItems="center">
                <CalendarTodayIcon fontSize="small" sx={{ marginRight: 0.5 }} />
                {status}
              </Box>
            }
            color="primary"
            sx={{ fontWeight: "bold" }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 1 }}
        >
          {name}
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      {/* Actions and Due Date */}
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 1,
        }}
      >
        {/* Edit and Delete Buttons */}
        <Box display="flex" gap={1}>
          <Button
            startIcon={<EditIcon />}
            size="small"
            variant="outlined"
            color="primary"
            onClick={onEdit} // Trigger edit action
          >
            Edit
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            size="small"
            variant="contained"
            color="error"
            onClick={onDelete} // Trigger delete action
          >
            Delete
          </Button>
        </Box>

        {/* Due Date */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <AccessTimeIcon fontSize="small" sx={{ marginRight: 0.5 }} />
          {dueDate}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default TaskCard;