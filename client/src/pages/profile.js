import { useState } from "react";

const Profile = () => {
  // State variables for profile fields (excluding email)
  const [isEditingNationality, setIsEditingNationality] = useState(false);
  const [isEditingDOB, setIsEditingDOB] = useState(false);

  // Profile field values
  const [email] = useState("john.doe@example.com"); // Email is not editable
  const [nationality, setNationality] = useState("American");
  const [dob, setDOB] = useState("01/01/1990");

  // Function to handle saving the changes
  const handleSave = (field) => {
    if (field === "nationality") setIsEditingNationality(false);
    if (field === "dob") setIsEditingDOB(false);

    // Optionally, add logic to persist these changes (e.g., API call)
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
              <h2 className="text-2xl">John Doe</h2>
              <p className="text-gray-400">New York, USA</p>
            </div>
          </div>

          {/* Email (Non-Editable) */}
          <div className="flex justify-between">
            <p>Email: {email}</p>
            <span className="text-gray-500">Locked</span> {/* No Edit Option */}
          </div>

          {/* Nationality (Editable) */}
          <div className="flex justify-between mt-4">
            <div>
              {isEditingNationality ? (
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="bg-gray-700 text-white p-2 rounded"
                />
              ) : (
                <p>Nationality: {nationality}</p>
              )}
            </div>
            {isEditingNationality ? (
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
                onClick={() => setIsEditingNationality(true)}
              >
                Edit
              </a>
            )}
          </div>

          {/* Date of Birth (Editable) */}
          <div className="flex justify-between mt-4">
            <div>
              {isEditingDOB ? (
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  className="bg-gray-700 text-white p-2 rounded"
                />
              ) : (
                <p>Date of Birth: {dob}</p>
              )}
            </div>
            {isEditingDOB ? (
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
                onClick={() => setIsEditingDOB(true)}
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
