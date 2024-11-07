import { useState } from "react";
import AuthButton from "../components/AuthButton";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import ProtectedRoute from "../components/ProtectedRoute";

export default function HomePage() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Task Manager</h1>
        
        {/* Authentication Button */}
        <AuthButton />

        {/* Toggle Task Form Visibility */}
        <button
          onClick={() => setShowTaskForm(!showTaskForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showTaskForm ? 'Close Task Form' : 'Add New Task'}
        </button>

        {/* Show TaskForm if toggled */}
        {showTaskForm && <TaskForm onComplete={() => setShowTaskForm(false)} />}

        {/* Task List to Display Existing Tasks */}
        <TaskList />
      </div>
    </ProtectedRoute>
  );
}
