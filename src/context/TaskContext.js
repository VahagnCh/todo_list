import { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { data: session } = useSession();

  // Fetch tasks from API for the logged-in user
  useEffect(() => {
    if (session) {
      const fetchTasks = async () => {
        try {
          const res = await fetch("/api/tasks");
          const data = await res.json();
          const userTasks = data.filter((task) => task.userId === session.user.id);
          setTasks(userTasks);
        } catch (error) {
          console.error("Failed to load tasks:", error);
        }
      };
      fetchTasks();
    }
  }, [session]);

  // Add a new task
  const addTask = async (task) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const newTask = await res.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = async (taskId) => {
    try {
      console.log('Deleting task with ID:', taskId);
      
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Delete response status:', res.status);

      if (res.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } else {
        const errorData = await res.json();
        console.error('Failed to delete task:', errorData);
      }
    } catch (error) {
      console.error('Error in deleteTask:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
