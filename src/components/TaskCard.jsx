export default function TaskCard({ task, onEdit, onDelete }) {
  return (
      <div className="border p-4 rounded-lg shadow-md mb-4 w-full md:w-1/2 lg:w-1/3">
        <h3 className="font-bold text-lg mb-2">{task.title}</h3>
        <p className="text-gray-700 mb-1">{task.description}</p>
        {task.dueDate && (
          <p className="text-sm text-gray-500 mb-1">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
        )}
        <p className="text-sm text-gray-500 mb-1">Priority: {task.priority}</p>
        <div className="flex space-x-4 mt-2">
          <button
            onClick={() => onEdit(task)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Edit
          </button>
          <button
            onClick={() => {
                console.log('Task object:', task);
                console.log('Task ID:', task._id);
                onDelete(task._id);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
            aria-label={`Delete ${task.title}`}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }