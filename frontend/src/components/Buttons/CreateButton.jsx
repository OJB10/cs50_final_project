import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CreateButton = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      aria-label="create"
      sx={{
        position: "fixed",
        bottom: { xs: 16, md: 24 },
        right: { xs: 16, md: 24 },
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
};

export default CreateButton;