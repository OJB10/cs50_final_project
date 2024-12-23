import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";
import "./styles/colors.css";  // Global colors
import "./styles/typography.css"; // Global typography
import "./styles/grid.css"; // Global grid system

const App = () => {
  const [tasks, setTasks] = useState([]); // State for dynamic tasks

  // Fetch tickets from Flask API
  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/tickets");
            const data = await response.json();
            console.log("Fetched tasks:", data); // Debug log
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    fetchTasks();
}, []);

  return (
    <div>
      <Navbar />
      <div className="grid-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              name={task.name}
              description={task.description}
              status={task.status}
              dueDate={task.due_date}
            />
          ))
        ) : (
          <div className="body-large">No tasks found.</div>
        )}
      </div>
    </div>
  );
};

export default App;