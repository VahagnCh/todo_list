import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import { useState } from "react";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const { tasks, deleteTask } = useTasks();
  const [editTask, setEditTask] = useState(null);

  return (
    <div className="flex flex-col items-center mt-8 w-full">
      {editTask && (
        <TaskForm
          initialData={editTask}
          onComplete={() => setEditTask(null)}
        />
      )}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={(task) => setEditTask(task)}
            onDelete={deleteTask}
          />
        ))
      ) : (
        <p className="text-center mt-4 text-gray-500">No tasks available. Add one!</p>
      )}
    </div>
  );
}
