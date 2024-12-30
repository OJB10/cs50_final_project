import React, { createContext, useContext, useState, useEffect } from "react";
import useTasks from "../hooks/useTasks";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { tasks, fetchTasks, saveTask } = useTasks(); // Hook for task operations
  const [currentTicket, setCurrentTicket] = useState(null); // Selected ticket for edit/delete

  useEffect(() => {
    console.log("Tasks state in TaskProvider:", tasks);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        saveTask,
        currentTicket,
        setCurrentTicket,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);