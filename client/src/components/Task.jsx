<<<<<<< HEAD
import { useState, useEffect } from "react";
import axios from "axios";


function Task() {

    const [userName , setUserName]  =   useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await axios.get('/utils/getuserdetails');
                if (res.status === 200) {
                    sessionStorage.setItem('user', JSON.stringify(res.data));
                    setUserName(res.data.name);
                }
            } catch (error) {
                console.log(res);
                console.error(error.response?.data?.message || error.message);
            }
        };
        fetchUserDetails();
    }, []);

    return (
        <>
            <h1>Hi, {userName}</h1>
        </>
    )
};

export default Task;
=======
function TaskManager() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">🚧 Task Manager</h1>
                <p className="text-gray-600 text-base">
                    This section is under construction.
                </p>
            </div>
        </div>
    );
}

export default TaskManager;
>>>>>>> 04fbb17be4e0d8eb94b6578605de51386d779bec
