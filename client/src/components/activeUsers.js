import React from "react";

const ActiveUsers = ({ users }) => {
  return (
    <div className="w-full md:w-1/4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 ml-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Active Users</h2>
      {/* Container with max height and scrolling */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="flex items-center space-x-4">
              <img
                src={
                  user.profilePicture ||
                  "https://png.pngitem.com/pimgs/s/524-5246388_anonymous-user-hd-png-download.png"
                }
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">{user.username}</p>
                <p className="text-xs text-green-500">Active</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No active users.</p>
        )}
      </div>
    </div>
  );
};

export default ActiveUsers;
