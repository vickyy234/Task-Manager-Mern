import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, 
  FiSearch, 
  FiCheckSquare, 
  FiSquare, 
  FiUsers, 
  FiList 
} from 'react-icons/fi';
import Navbar from './Navbar';
import TaskCard from './TaskCard';
import ShareModal from './ShareModal';
import { api } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // State management
  const [user, setUser] = useState(null);
  const [myTasks, setMyTasks] = useState([]);
  const [sharedTasks, setSharedTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('my-tasks');
  const [isLoading, setIsLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [shareModal, setShareModal] = useState({ isOpen: false, task: null });

  // Load initial data
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch user details and tasks in parallel
      const [userResponse, tasksResponse] = await Promise.all([
        api.getUserDetails(),
        api.getAllTasks()
      ]);
      
      setUser(userResponse.user || userResponse);
      setMyTasks(tasksResponse.myTasks || []);
      setSharedTasks(tasksResponse.sharedTasks || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // If unauthorized, redirect to login
      if (error.message.includes('unauthorized') || error.message.includes('401')) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Task operations
  const handleAddTask = async (e) => {
    e.preventDefault();
    
    if (!newTaskTitle.trim()) return;
    
    try {
      setIsAddingTask(true);
      const newTask = await api.addNewTask({
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim()
      });
      
      setMyTasks(prev => [newTask.task || newTask, ...prev]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
      alert(error.message);
    } finally {
      setIsAddingTask(false);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await api.updateTask(taskId, { completed });
      
      // Update the task in the appropriate list
      const updateTasks = (tasks) => 
        tasks.map(task => 
          task._id === taskId 
            ? { ...task, completed } 
            : task
        );
      
      setMyTasks(prev => updateTasks(prev));
      setSharedTasks(prev => updateTasks(prev));
    } catch (error) {
      console.error('Error updating task:', error);
      alert(error.message);
    }
  };

  const handleUpdateTask = async (taskId, updateData) => {
    try {
      await api.updateTask(taskId, updateData);
      
      // Update the task in the appropriate list
      const updateTasks = (tasks) => 
        tasks.map(task => 
          task._id === taskId 
            ? { ...task, ...updateData } 
            : task
        );
      
      setMyTasks(prev => updateTasks(prev));
      setSharedTasks(prev => updateTasks(prev));
    } catch (error) {
      console.error('Error updating task:', error);
      alert(error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await api.deleteTask(taskId);
      
      // Remove the task from both lists
      setMyTasks(prev => prev.filter(task => task._id !== taskId));
      setSharedTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert(error.message);
    }
  };

  const handleShareTask = async (taskId, email) => {
    try {
      await api.shareTask(taskId, email);
      // Optionally refresh tasks to show updated sharing status
      await loadDashboardData();
    } catch (error) {
      console.error('Error sharing task:', error);
      throw error; // Re-throw to be handled by ShareModal
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      // Force redirect even if logout fails
      window.location.href = '/';
    }
  };

  // Filter tasks based on search term
  const filterTasks = (tasks) => {
    if (!searchTerm.trim()) return tasks;
    
    const term = searchTerm.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(term) ||
      task.description?.toLowerCase().includes(term)
    );
  };

  const filteredMyTasks = filterTasks(myTasks);
  const filteredSharedTasks = filterTasks(sharedTasks);

  // Calculate statistics
  const totalTasks = myTasks.length;
  const completedTasks = myTasks.filter(task => task.completed).length;
  const sharedTasksCount = sharedTasks.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Task Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your tasks and collaborate with others
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <FiList className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <FiCheckSquare className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <FiUsers className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Shared Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{sharedTasksCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Task */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h2>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Task title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Task description (optional)..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isAddingTask || !newTaskTitle.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200"
            >
              {isAddingTask ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <FiPlus className="h-4 w-4" />
              )}
              <span>{isAddingTask ? 'Adding...' : 'Add Task'}</span>
            </button>
          </form>
        </div>

        {/* Search and Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('my-tasks')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'my-tasks'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Tasks ({filteredMyTasks.length})
            </button>
            <button
              onClick={() => setActiveTab('shared-tasks')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'shared-tasks'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Shared Tasks ({filteredSharedTasks.length})
            </button>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'my-tasks' ? (
            filteredMyTasks.length > 0 ? (
              filteredMyTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                  onShare={(task) => setShareModal({ isOpen: true, task })}
                  isShared={false}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FiSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'No tasks match your search' : 'No tasks yet'}
                </p>
                {!searchTerm && (
                  <p className="text-gray-400 mt-2">
                    Create your first task above to get started!
                  </p>
                )}
              </div>
            )
          ) : (
            filteredSharedTasks.length > 0 ? (
              filteredSharedTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                  onShare={() => {}} // Shared tasks can't be shared again
                  isShared={true}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FiUsers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'No shared tasks match your search' : 'No shared tasks yet'}
                </p>
                {!searchTerm && (
                  <p className="text-gray-400 mt-2">
                    Shared tasks from other users will appear here
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModal.isOpen}
        task={shareModal.task}
        onClose={() => setShareModal({ isOpen: false, task: null })}
        onShare={handleShareTask}
      />
    </div>
  );
};

export default Dashboard;
