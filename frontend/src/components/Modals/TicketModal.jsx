import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";

/**
 * TicketModal Component
 * 
 * A modal dialog component for creating or editing a ticket.
 * It displays a form with fields for the ticket's name, description, and due date.
 * Handles form submission and provides callbacks for saving and closing the modal.
 * 
 * @param {boolean} open - Determines if the modal is open.
 * @param {function} onClose - Callback to close the modal.
 * @param {function} onSave - Callback to save the form data.
 * @param {object} initialData - Initial form data for the modal (used in edit mode).
 * @param {boolean} isEdit - Flag to indicate if the modal is in edit mode.
 */
const TicketModal = ({ open, onClose, onSave, initialData = {}, isEdit = false }) => {
  const [formData, setFormData] = useState(initialData);

  /**
   * Effect to reset form data whenever the modal opens or initialData changes.
   */
  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split("T")[0]
          : "",
      };
      setFormData(formattedData);
    } else {
      setFormData({});
    }
  }, [initialData, open]);

  /**
   * Handles input field changes and updates the formData state.
   * 
   * @param {object} e - Event object from the input field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles form submission by invoking the onSave callback
   * and closing the modal via onClose callback.
   */
  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        ".MuiDialog-paper": {
          margin: "0 auto",
          padding: 2,
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
          width: {
            xs: "90%", // Small screens
            sm: "80%", // Tablets
            md: "50%", // Desktop, central 6 columns
          },
          maxWidth: "none", // Disable max width constraint
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        {isEdit ? "Edit Ticket" : "Create New Ticket"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              value={formData.name || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.dueDate || ""}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end", // Align buttons to the right
          gap: 1, // Add spacing between buttons
          paddingRight: 2, // Optional: adjust padding for better spacing
        }}
      >
        <Button onClick={onClose} color="warning" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success" variant="contained">
          {isEdit ? "Save Changes" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketModal;