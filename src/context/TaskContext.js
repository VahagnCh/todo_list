import { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now() }]);
  };

  // Edit an existing task
  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
