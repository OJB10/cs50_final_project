import React from "react";
import { Grid } from "@mui/material";
import TaskCard from "./TaskCard"; // Relative import from the same folder

const TaskList = ({ tasks, onEdit, onDelete }) => {
  console.log("Tasks in TaskList:", tasks);

  if (!tasks || tasks.length === 0) {
    return <div className="body-large">No tasks available.</div>;
  }

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item key={task.id} xs={12} sm={6} md={4}>
          <TaskCard
            name={task.name}
            description={task.description}
            status={task.status}
            dueDate={task.due_date}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;