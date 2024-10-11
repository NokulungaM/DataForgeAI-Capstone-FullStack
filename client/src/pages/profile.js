import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    nationality: "",
    dob: "",
  });
  const [isEditing, setIsEditing] = useState({
    nationality: false,
    dob: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/profile", {
          credentials: "include",
        });
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (field) => {
    try {
      const updates = {};
      if (field === "nationality") {
        updates.nationality = user.nationality;
        setIsEditing({ ...isEditing, nationality: false });
      }
      if (field === "dob") {
        updates.dob = user.dob;
        setIsEditing({ ...isEditing, dob: false });
      }
      const response = await fetch(
        "http://localhost:3001/user/update-profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
          credentials: "include",
        }
      );
      const updatedUserData = await response.json();
      setUser(updatedUserData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">Profile settings</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="text-gray-400 hover:text-white">
            Account details
          </a>
        </nav>
        <button className="text-red-500 mt-6">Sign out</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl mb-6">Account details</h1>

        {/* Profile Info Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <img
              src="path_to_profile_picture.jpg" // Replace with actual path to the profile picture
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl">{user.username}</h2>
              <p className="text-gray-400">{user.nationality}</p>
              <p className="text-gray-400">{user.dob}</p>
            </div>
          </div>

          {/* Email (Non-Editable) */}
          <div className="flex justify-between">
            <p>Email: {user.email}</p>
            <span className="text-gray-500">Locked</span>
          </div>

          {/* Nationality (Editable) */}
          <div className="flex justify-between mt-4">
            <div>
              {isEditing.nationality ? (
                <input
                  type="text"
                  value={user.nationality}
                  onChange={(e) =>
                    setUser({ ...user, nationality: e.target.value })
                  }
                  className="bg-gray-700 text-white p-2 rounded"
                />
              ) : (
                <p>Nationality: {user.nationality}</p>
              )}
            </div>
            {isEditing.nationality ? (
              <button
                className="text-green-500"
                onClick={() => handleSave("nationality")}
              >
                Save
              </button>
            ) : (
              <a
                href="#"
                className="text-blue-500"
                onClick={() =>
                  setIsEditing({ ...isEditing, nationality: true })
                }
              >
                Edit
              </a>
            )}
          </div>

          {/* Date of Birth (Editable) */}
          <div className="flex justify-between mt-4">
            <div>
              {isEditing.dob ? (
                <input
                  type="date"
                  value={user.dob}
                  onChange={(e) => setUser({ ...user, dob: e.target.value })}
                  className="bg-gray-700 text-white p-2 rounded"
                />
              ) : (
                <p>Date of Birth: {user.dob}</p>
              )}
            </div>
            {isEditing.dob ? (
              <button
                className="text-green-500"
                onClick={() => handleSave("dob")}
              >
                Save
              </button>
            ) : (
              <a
                href="#"
                className="text-blue-500"
                onClick={() => setIsEditing({ ...isEditing, dob: true })}
              >
                Edit
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
