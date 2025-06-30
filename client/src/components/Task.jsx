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