import React from "react";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/**
 * CreateButton Component
 * 
 * A floating action button (FAB) for creating new tickets/tasks.
 * Appears in the bottom right corner of the screen.
 * 
 * @param {function} onClick - Callback function for when the button is clicked
 */
const CreateButton = ({ onClick }) => {
  return (
    <Tooltip title="Create New Task" placement="left" arrow>
      <Fab
        color="primary"
        aria-label="create new task"
        className="btn"
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 20, md: 24 },
          right: { xs: 16, sm: 20, md: 24 },
          zIndex: 10,
          boxShadow: 'var(--shadow-medium)',
          '&:hover': {
            boxShadow: 'var(--shadow-heavy)',
          }
        }}
        onClick={onClick}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default CreateButton;