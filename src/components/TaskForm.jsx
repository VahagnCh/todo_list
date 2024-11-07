import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTasks } from "../context/TaskContext";

export default function TaskForm({ onComplete, initialData }) {
  const { addTask } = useTasks();
  const { data: session } = useSession();
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [priority, setPriority] = useState(initialData?.priority || 'Medium');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!session) {
      alert("You must be logged in to add a task.");
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      userId: session.user.id, // Link the task to the logged-in user
    };

    addTask(newTask);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border rounded px-4 py-2"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-4 py-2"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border rounded px-4 py-2"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData ? 'Edit Task' : 'Add Task'}
      </button>
    </form>
  );
}
