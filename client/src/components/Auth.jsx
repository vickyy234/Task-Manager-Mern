import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Auth() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get('/auth/verify', { withCredentials: true });
                if (res) {
                    console.log('User is logged in');
                    navigate('/home');
                }
            } catch (error) {
                console.error(error.response?.data?.message || error.message);
            }
        };

        checkLoginStatus();
    }, []);

    const handleGoogleLogin = async () => {
        try {
            window.location.href = import.meta.env.VITE_API_BASE_URL + '/auth/google';
        } catch (error) {
            console.error('Google login failed:', error.response?.data?.message || error.message);
        }
    }
    
    const handleGithubLogin = async () => {
        try {
            window.location.href = import.meta.env.VITE_API_BASE_URL + '/auth/github';
        } catch (error) {
            console.error('Google login failed:', error.response?.data?.message || error.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFD1B0] px-4">
            <div className="w-full max-w-fit flex flex-col md:flex-row rounded-2xl p-6 bg-[#FEDCC6] shadow-lg overflow-hidden">

                {/* Left Side */}
                <div className="w-full md:w-[60%] flex flex-col justify-center items-center p-8 space-y-6">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>

                    <button className="flex items-center bg-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition duration-300 cursor-pointer" onClick={handleGoogleLogin}>
                        <img src="./google.png" alt="Google logo" className="w-6 h-6 mr-3 cursor-pointer" />
                        <span className="text-gray-700 font-medium">Sign in with Google</span>
                    </button>

                    <button className="flex items-center bg-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition duration-300 cursor-pointer" onClick={handleGithubLogin}>
                        <img src="./github.png" alt="GitHub logo" className="w-6 h-6 mr-3" />
                        <span className="text-gray-700 font-medium">Sign in with GitHub</span>
                    </button>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-[40%] flex items-center justify-center cursor-pointer">
                    <img
                        src="./pic.png"
                        alt="Thumbnail"
                        className="w-full max-w-sm object-contain transform hover:scale-110 transition duration-500"
                    />
                </div>
            </div>
        </div>
    );
}

export default Auth;
