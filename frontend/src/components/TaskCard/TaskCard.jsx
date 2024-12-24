import React from "react";
import { Card, CardContent, Typography, Chip, CardActions, Button, Grid2 } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskCard = ({ name, description, status, dueDate }) => {
  return (
    <Card sx={{ padding: 2, borderRadius: 2, border: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
      <CardContent>
        {/* Grid Layout for Content */}
        <Grid2 container spacing={2}>
          {/* Status */}
          <Grid2 item xs={12} sm={2}>
            <Chip label={status} color="primary" sx={{ width: '100%' }} />
          </Grid2>

          {/* Task Title and Description */}
          <Grid2 item xs={12} sm={10}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Grid2>

          {/* Due Date */}
          <Grid2 item xs={12}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}
            >
              <CalendarTodayIcon fontSize="small" sx={{ marginRight: 1 }} />
              Due: {dueDate}
            </Typography>
          </Grid2>
        </Grid2>
      </CardContent>

      {/* Actions */}
      <CardActions>
        <Button startIcon={<EditIcon />} size="small" variant="outlined" color="primary">
          Edit
        </Button>
        <Button startIcon={<DeleteIcon />} size="small" variant="contained" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;