import { FaTasks, FaClipboardList } from 'react-icons/fa';
import { TbCircleDashedCheck } from 'react-icons/tb';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import {
  MdCheckCircle,
  MdPendingActions,
  MdOutlineWarningAmber,
} from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi2';

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
  return (
    <div className="mx-[5vw] flex min-h-[calc(100vh-64px)] w-[95vw] flex-col p-5 md:mx-[5vw] md:min-h-[calc(100vh-80px)]">
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-3 md:mx-20 md:items-start">
          <span className="text-3xl font-bold">Hey {user.username}👋</span>
          <span className="text-gray-700">
            Here's a quick look at your tasks for today.
          </span>
        </div>
        <div
          className="mr-20 cursor-pointer items-center justify-center rounded-lg bg-blue-200 p-3 text-blue-600 shadow transition duration-500 hover:scale-115 hover:bg-blue-300 hover:text-blue-700"
          title="Add Task"
        >
          <span className="font-bold">Add Task</span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-start gap-5 rounded-lg p-5">
        <div
          className="flex w-[200px] cursor-pointer items-center justify-center gap-5 rounded-lg bg-white p-5 shadow transition duration-300 hover:scale-110 hover:bg-gray-200"
          title="Total Tasks"
        >
          <div className="rounded-lg bg-blue-200 p-2">
            <FaTasks className="h-6 w-6 text-blue-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-700">Total Tasks</span>
            <span className="text-2xl font-bold">
              {tasks.summary.totalTasks}
            </span>
          </div>
        </div>
        <div
          className="flex w-[200px] cursor-pointer items-center justify-start gap-5 rounded-lg bg-white p-5 shadow transition duration-300 hover:scale-110 hover:bg-gray-200"
          title="Total ToDo"
        >
          <div className="rounded-lg bg-indigo-200 p-2">
            <TbCircleDashedCheck className="h-6 w-6 text-indigo-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-700">To Do</span>
            <span className="text-2xl font-bold">
              {tasks.summary.todoTasks}
            </span>
          </div>
        </div>
        <div
          className="flex w-[200px] cursor-pointer items-center justify-start gap-5 rounded-lg bg-white p-5 shadow transition duration-300 hover:scale-110 hover:bg-gray-200"
          title="Total Completed"
        >
          <div className="rounded-lg bg-green-200 p-2">
            <MdCheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-700">Completed</span>
            <span className="text-2xl font-bold">
              {tasks.summary.completedTasks}
            </span>
          </div>
        </div>
        <div
          className="flex w-[200px] cursor-pointer items-center justify-start gap-5 rounded-lg bg-white p-5 shadow transition duration-300 hover:scale-110 hover:bg-gray-200"
          title="Total InProgress"
        >
          <div className="rounded-lg bg-yellow-200 p-2">
            <MdPendingActions className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-700">In Progress</span>
            <span className="text-2xl font-bold">
              {tasks.summary.inProgressTasks}
            </span>
          </div>
        </div>
        <div
          className="flex w-[200px] cursor-pointer items-center justify-start gap-5 rounded-lg bg-white p-5 shadow transition duration-300 hover:scale-110 hover:bg-gray-200"
          title="Total OverDue"
        >
          <div className="rounded-lg bg-red-200 p-2">
            <BsExclamationTriangleFill className="h-6 w-6 text-red-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-700">Over Due</span>
            <span className="text-2xl font-bold">
              {tasks.summary.overdueTasks}
            </span>
          </div>
        </div>
        <div
          className="flex w-[200px] cursor-pointer items-center justify-start gap-5 rounded-lg bg-white p-5 shadow transition duration-300 hover:scale-110 hover:bg-gray-200"
          title="Total SharedTasks"
        >
          <div className="rounded-lg bg-violet-200 p-2">
            <HiUserGroup className="h-6 w-6 text-violet-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-700">Shared Tasks</span>
            <span className="text-2xl font-bold">
              {tasks.summary.sharedTasks}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-10">
        <div className="flex flex-col items-center justify-center p-5 shadow">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-200 p-2">
              <FaClipboardList className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-2xl font-semibold">My Tasks</span>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col items-center justify-center p-5 shadow">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-200 p-2">
              <MdOutlineWarningAmber className="h-6 w-6 text-red-500" />
            </div>
            <span className="text-2xl font-semibold">Overdue Tasks</span>
          </div>
          <div></div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center p-5 shadow">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-violet-200 p-2">
            <HiUserGroup className="h-6 w-6 text-violet-500" />
          </div>
          <span className="text-2xl font-semibold">Shared Tasks</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
