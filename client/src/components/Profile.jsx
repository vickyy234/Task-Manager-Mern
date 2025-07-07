import { TbUserEdit } from 'react-icons/tb';
import { CiUser, CiLogout } from 'react-icons/ci';
import { HiOutlineIdentification } from 'react-icons/hi2';
import { MdOutlineEmail } from 'react-icons/md';
import { HiOutlineCalendarDays, HiOutlineGlobeAlt } from 'react-icons/hi2';

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-gray-200 md:min-h-[calc(100vh-80px)]">
      <div>
        <div>
          <h1 className="text-3xl font-bold md:text-6xl">Profile Settings</h1>
          <span className="text-md font-semibold text-gray-700 md:text-lg">
            Edit Account Preferences
          </span>
        </div>
        <div className="mt-4 max-w-[300px] rounded-lg bg-white p-5 shadow md:min-w-[400px]">
          <div className="mb-3 flex justify-between">
            <h1 className="text-xl">Profile Information</h1>
            <div className="flex cursor-pointer items-center gap-2 text-blue-500 transition duration-300 hover:scale-110 hover:text-blue-700">
              <TbUserEdit />
              <h1>Edit</h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="cursor-pointer">
              {user?.image ? (
                <img
                  src={user?.image}
                  alt="User Image"
                  className="h-[100px] w-[100px] rounded-full transition duration-300 hover:scale-105"
                />
              ) : (
                <CiUser />
              )}
            </div>
            <div className="ml-5 max-w-[100px] md:max-w-[180px]">
              <h1
                className="cursor-pointer font-semibold"
                title={user.username}
              >
                {user.username}
              </h1>
              <h1
                className="cursor-pointer truncate text-gray-600"
                title={user.email}
              >
                {user.email}
              </h1>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-gray-700">
            <p className="flex items-center gap-3" title={user.profileId}>
              <HiOutlineIdentification className="h-6 w-6" />
              <span className="max-w-[230px] truncate font-medium md:max-w-[380px]">
                Profile ID : {user.profileId}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <MdOutlineEmail className="h-6 w-6" />
              <span className="max-w-[230px] truncate font-medium md:max-w-[380px]">
                Email : {user.email}
              </span>{' '}
            </p>
            <p className="flex items-center gap-3">
              <HiOutlineCalendarDays className="h-6 w-6" />
              <span className="max-w-[230px] truncate font-medium md:max-w-[380px]">
                Joined : {new Date(user.createdAt).toLocaleDateString('en-GB')}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <HiOutlineGlobeAlt className="h-6 w-6" />
              <span className="max-w-[230px] truncate font-medium md:max-w-[380px]">
                Auth Provider : {user.authProvider}
              </span>{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
