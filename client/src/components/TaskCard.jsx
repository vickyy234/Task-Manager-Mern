import { useState } from 'react';
import { 
  FiEdit2, 
  FiTrash2, 
  FiShare2, 
  FiCheck, 
  FiX, 
  FiSave 
} from 'react-icons/fi';

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onDelete, 
  onUpdate, 
  onShare,
  isShared = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task._id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onToggleComplete(task._id, !task.completed);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border-l-4 ${
      task.completed 
        ? 'border-green-500 bg-green-50' 
        : 'border-blue-500'
    }`}>
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="2"
                placeholder="Task description"
              />
            </div>
          ) : (
            <div>
              <h3 className={`text-lg font-semibold mb-1 ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="ml-4 flex-shrink-0">
          {isShared && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-2">
              Shared
            </span>
          )}
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            task.completed 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {task.completed ? 'Completed' : 'Pending'}
          </div>
        </div>
      </div>

      {/* Task Meta Information */}
      {(task.createdBy || task.sharedBy) && (
        <div className="mb-3 text-xs text-gray-500">
          {isShared && task.sharedBy && (
            <p>Shared by: {task.sharedBy.name || task.sharedBy.email}</p>
          )}
          {task.createdAt && (
            <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          {/* Complete Toggle */}
          <button
            onClick={handleToggleComplete}
            className={`p-2 rounded-md transition-colors duration-200 ${
              task.completed
                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={task.completed ? 'Mark as pending' : 'Mark as completed'}
          >
            <FiCheck className="h-4 w-4" />
          </button>

          {/* Edit/Save/Cancel Buttons */}
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                title="Save changes"
              >
                <FiSave className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                title="Cancel edit"
              >
                <FiX className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
              title="Edit task"
            >
              <FiEdit2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Share Button */}
          {!isShared && (
            <button
              onClick={() => onShare(task)}
              className="p-2 rounded-md bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors duration-200"
              title="Share task"
            >
              <FiShare2 className="h-4 w-4" />
            </button>
          )}

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
            title="Delete task"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;