
import React from "react";

const UserProfile = ({ user }) => {
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="w-full md:w-1/0.5 bg-white border border-gray-400 rounded-lg shadow-lg p-4 ml-4">
      {/* Header Image */}
      <div
        className="relative h-24 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            user.headerImage ||
            "https://www.shutterstock.com/image-photo/food-banner-fresh-ripe-red-260nw-2187409129.jpg"
          })`,
        }}
      >
        {/* Profile Image */}
        <img
          src={user.profilePicture || "https://via.placeholder.com/80"}
          alt="User profile"
          className="w-20 h-20 rounded-full border-4 border-white absolute left-4 bottom-[-25px] object-cover"
        />
      </div>

      {/* User Info */}
      <div className="p-6 pt-8">
        <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
        <p className="text-gray-500 text-sm">
          {user.location || "Location not provided"}
        </p>
        <p className="text-gray-600 mt-2">{user.bio || "No bio available"}</p>
      </div>
    </div>
  );
};

export default UserProfile;
