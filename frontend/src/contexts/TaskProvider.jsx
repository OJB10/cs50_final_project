import React, { createContext, useContext, useState, useEffect } from "react";
import useTasks from "../hooks/useTasks";

const TaskContext = createContext();

/**
 * TaskProvider Component
 * 
 * Provides task-related state and functionality to the entire application.
 * Centralizes task management to prevent duplicate API calls.
 */
export const TaskProvider = ({ children }) => {
  const { tasks, fetchTasks, saveTask, loading, error } = useTasks();
  const [currentTicket, setCurrentTicket] = useState(null);
  
  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        saveTask,
        currentTicket,
        setCurrentTicket,
        loading,
        error
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);