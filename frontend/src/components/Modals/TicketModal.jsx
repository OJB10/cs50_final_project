import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

/**
 * TicketModal Component
 * 
 * A modal dialog component for creating or editing a ticket.
 * It displays a form with fields for the ticket's name, description, status, and due date.
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

  // Status options for the dropdown
  const statusOptions = ["Pending", "In Progress", "Completed", "Blocked"];

  /**
   * Effect to reset form data whenever the modal opens or initialData changes.
   */
  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        status: initialData.status || "Pending",
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split("T")[0]
          : "",
      };
      setFormData(formattedData);
    } else {
      setFormData({ status: "Pending" });
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
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: "modal-container",
        sx: {
          width: {
            xs: "90%", // Small screens
            sm: "80%", // Tablets
            md: "550px", // Desktop - fixed width for consistency
          },
          maxWidth: "none",
        }
      }}
    >
      <DialogTitle 
        className="h4 text-center"
        sx={{ 
          paddingBottom: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {isEdit ? "Edit Ticket" : "Create New Ticket"}
      </DialogTitle>
      
      <DialogContent sx={{ paddingY: 3 }}>
        <Box component="form" className="mt-2">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                required
                variant="outlined"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Enter task name"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formData.status || "Pending"}
                  onChange={handleChange}
                  label="Status"
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
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
            
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Enter task description"
              />
            </Grid>
          </Grid>
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
          onClick={handleSubmit} 
          variant="contained"
          className="btn"
          color="primary"
        >
          {isEdit ? "Save Changes" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketModal;