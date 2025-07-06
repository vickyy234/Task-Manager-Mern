import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';

const Auth = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      window.location.href = import.meta.env.VITE_API_BASE_URL + '/auth/google';
      setGoogleLoading(true);
    } catch (error) {
      console.error(
        'Google login failed:',
        error.response?.data?.message || error.message,
      );
    }
  };

  const handleGithubLogin = async () => {
    try {
      window.location.href = import.meta.env.VITE_API_BASE_URL + '/auth/github';
      setGithubLoading(true);
    } catch (error) {
      console.error(
        'Google login failed:',
        error.response?.data?.message || error.message,
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-2">
      <div className="flex w-full max-w-fit flex-col items-center justify-center gap-5 rounded-2xl bg-white p-10 shadow-xl md:w-[60%] md:flex-row">
        {/*Left side*/}
        <div className="flex flex-col items-center justify-center gap-4 md:w-[60%]">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <h1 className="text-xl font-semibold">
            Login to manage task efficiently
          </h1>
          <button
            className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl bg-blue-100 px-4 py-1 shadow-md transition duration-300 hover:scale-105 hover:bg-blue-300 hover:shadow-lg"
            title="Google"
            onClick={handleGoogleLogin}
            disabled={googleLoading || githubLoading}
          >
            <FcGoogle className="h-6 w-6" aria-hidden="true" />
            <span className="text-xl">
              {googleLoading ? 'Authorizing...' : 'Sign in with Google'}
            </span>
          </button>
          <button
            className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-200 px-4 py-1 shadow-md transition duration-300 hover:scale-105 hover:bg-gray-400 hover:shadow-lg"
            title="GitHub"
            onClick={handleGithubLogin}
            disabled={githubLoading || googleLoading}
          >
            <BsGithub className="h-6 w-6" aria-hidden="true" />
            <span className="text-xl">
              {githubLoading ? 'Authorizing...' : 'Sign in with GitHub'}
            </span>
          </button>
        </div>

        {/*Right side*/}
        <div className="cursor-pointer transition duration-300 hover:scale-105 md:w-[50%]">
          <img src="./pic.png" alt="Logo" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
