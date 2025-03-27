import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

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
      PaperProps={{
        className: "modal-container",
        sx: {
          width: {
            xs: "90%", // Small screens
            sm: "80%", // Tablets 
            md: "450px", // Desktop - fixed width for consistency
          },
          maxWidth: "none",
        }
      }}
    >
      <DialogTitle 
        className="h4 text-center"
        sx={{ 
          paddingBottom: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <WarningIcon color="error" />
        Are you sure?
      </DialogTitle>
      
      <DialogContent sx={{ paddingY: 3 }}>
        <Alert severity="warning" sx={{ marginBottom: 2 }}>
          This action cannot be undone.
        </Alert>
        
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" className="body">
            You are about to delete this ticket. Once it has gone, you won't be
            able to recover it.
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions
        sx={{
          padding: 2,
          paddingTop: 0,
          justifyContent: "flex-end",
          gap: 1,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button 
          onClick={onClose} 
          variant="outlined"
          className="btn"
          color="primary"
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained"
          className="btn"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;