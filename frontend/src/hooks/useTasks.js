import { useState, useEffect } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks...");
      const response = await fetch("http://127.0.0.1:5000/api/tickets", {
        method: "GET",
        credentials: "include",
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched tasks:", data);
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const saveTask = async (taskData) => {
    try {
      const ticketPayload = {
        ...taskData,
        due_date: taskData.dueDate
          ? new Date(taskData.dueDate).toISOString().split("T")[0]
          : null,
      };

      const url = taskData.id
        ? `http://127.0.0.1:5000/api/tickets/${taskData.id}`
        : "http://127.0.0.1:5000/api/tickets";

      const response = await fetch(url, {
        method: taskData.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(ticketPayload),
      });

      if (response.ok) {
        console.log("Task saved successfully");
        fetchTasks(); // Refresh tasks after saving
     //   setTicketModalOpen(false);
     // } else {
     //   console.error("Error saving ticket:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Fetch tasks on mount

  return { tasks, fetchTasks, saveTask };
};

export default useTasks;