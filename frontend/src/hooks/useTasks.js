import { useState, useEffect, useCallback, useRef } from "react";

const API_BASE_URL = 'http://127.0.0.1:5001/api';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchInProgressRef = useRef(false);

  // Fetch tasks from the API
  const fetchTasks = useCallback(async () => {
    // Prevent multiple simultaneous fetch calls
    if (fetchInProgressRef.current) {
      console.log("Fetch already in progress, skipping duplicate request");
      return;
    }

    try {
      fetchInProgressRef.current = true;
      setLoading(true);
      setError(null);

      // Get the user from localStorage for auth header fallback
      const storedUser = localStorage.getItem('dash_user');
      let authHeader = '';
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          // Simple "token" using user ID - in a real app, use a proper JWT
          authHeader = `Bearer user-${user.id}`;
        } catch (err) {
          console.error("Failed to parse stored user:", err);
        }
      }

      const response = await fetch(`${API_BASE_URL}/tickets`, {
        method: "GET",
        credentials: "include",
        headers: {
          ...(authHeader ? { 'Authorization': authHeader } : {})
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks. Status:", response.status);
        setError(`Failed to fetch tasks: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error fetching tasks. Please try again.");
    } finally {
      setLoading(false);
      fetchInProgressRef.current = false;
    }
  }, []);

  // Save a task (create or update)
  const saveTask = async (taskData) => {
    try {
      setLoading(true);

      const ticketPayload = {
        ...taskData,
        due_date: taskData.dueDate
          ? new Date(taskData.dueDate).toISOString().split("T")[0]
          : null,
      };

      const url = taskData.id
        ? `${API_BASE_URL}/tickets/${taskData.id}`
        : `${API_BASE_URL}/tickets`;

      // Get auth header
      const storedUser = localStorage.getItem('dash_user');
      let authHeader = '';
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          authHeader = `Bearer user-${user.id}`;
        } catch (err) {
          console.error("Failed to parse stored user:", err);
        }
      }

      const response = await fetch(url, {
        method: taskData.id ? "PUT" : "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(authHeader ? { 'Authorization': authHeader } : {})
        },
        credentials: "include",
        body: JSON.stringify(ticketPayload),
      });

      if (response.ok) {
        await fetchTasks(); // Refresh tasks after saving
        return true;
      } else {
        setError(`Error saving task: ${response.statusText}`);
        return false;
      }
    } catch (error) {
      console.error("Error saving task:", error);
      setError("Error saving task. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { 
    tasks, 
    fetchTasks, 
    saveTask,
    loading,
    error
  };
};

export default useTasks;