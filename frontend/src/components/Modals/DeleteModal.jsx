import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

/**
 * A modal component to confirm the deletion of a ticket.
 *
 * @param {boolean} open - Controls whether the modal is visible.
 * @param {function} onClose - Function to handle the action of closing the modal.
 * @param {function} onConfirm - Function to handle the confirmation action.
 * @returns {JSX.Element} The rendered DeleteModal component.
 */
const DeleteModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        ".MuiDialog-paper": {
          margin: "0 auto",
          padding: 2,
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Are you sure?
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center", marginBottom: 2 }}>
          <Typography variant="body1">
            You are about to delete this ticket. Once it has gone, you won’t be
            able to recover it.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end", // Align buttons to the right
          gap: 1, // Add spacing between buttons
          paddingRight: 2, // Adjust padding for better alignment
        }}
      >
        <Button onClick={onClose} color="warning" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;