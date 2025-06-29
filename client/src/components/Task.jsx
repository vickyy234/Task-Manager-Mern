import { useEffect, useState } from 'react';
import axios from 'axios';

function TaskManager() {
    const [myTasks, setMyTasks] = useState([]);
    const [sharedTasks, setSharedTasks] = useState([]);
    const [shareEmail, setShareEmail] = useState('');
    const [newTask, setNewTask] = useState('');
    const [newDescription, setNewDescription] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('/task/getAllTasks', { withCredentials: true });
                setMyTasks(res.data.myTasks);
                setSharedTasks(res.data.sharedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error.response?.data?.message || error.message);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/task/${id}`, { withCredentials: true });
            setMyTasks(myTasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleShare = async (id) => {
        if (!shareEmail) return alert('Please enter an email to share.');
        try {
            await axios.post(`/task/share/${id}`, { email: shareEmail }, { withCredentials: true });
            alert('Task shared successfully.');
        } catch (error) {
            console.error('Failed to share task:', error);
        }
    };

    const handleAddTask = async () => {
        if (!newTask || !newDescription) return alert('Please fill in both fields.');
        try {
            const res = await axios.post('/task', { task: newTask, description: newDescription }, { withCredentials: true });
            setMyTasks([...myTasks, res.data]);
            setNewTask('');
            setNewDescription('');
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFD1B0] p-6">
            <div className="max-w-6xl mx-auto bg-[#FEDCC6] rounded-2xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Task Dashboard</h1>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Task</h2>
                    <div className="mb-6 grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Task title"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="border px-4 py-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="border px-4 py-2 rounded"
                        />
                        <button
                            onClick={handleAddTask}
                            className="bg-indigo-600 text-white px-4 py-2 rounded col-span-full hover:bg-indigo-700"
                        >
                            Add Task
                        </button>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Tasks</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {myTasks.map(task => (
                            <div key={task._id} className="bg-white p-4 rounded-xl shadow-md hover:scale-[1.01] transition-transform">
                                <h3 className="text-xl font-semibold text-gray-800">{task.task}</h3>
                                <p className="text-gray-600">{task.description}</p>
                                <p className="text-sm text-gray-500">Status: {task.status}</p>
                                <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                                <p className="text-sm text-gray-500">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
                                <div className="flex gap-2 mt-4">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Update</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(task._id)}>Delete</button>
                                </div>
                                <div className="mt-4">
                                    <input
                                        type="email"
                                        placeholder="Share with email"
                                        value={shareEmail}
                                        onChange={(e) => setShareEmail(e.target.value)}
                                        className="border px-2 py-1 rounded w-full mb-2"
                                    />
                                    <button
                                        onClick={() => handleShare(task._id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full"
                                    >
                                        Share Task
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shared With Me</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {sharedTasks.map(task => (
                            <div key={task._id} className="bg-white p-4 rounded-xl shadow-md hover:scale-[1.01] transition-transform">
                                <h3 className="text-xl font-semibold text-gray-800">{task.task}</h3>
                                <p className="text-gray-600">{task.description}</p>
                                <p className="text-sm text-gray-500">Owner: {task.user?.name || 'Unknown'}</p>
                                <p className="text-sm text-gray-500">Status: {task.status}</p>
                                <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                                <p className="text-sm text-gray-500">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TaskManager;
