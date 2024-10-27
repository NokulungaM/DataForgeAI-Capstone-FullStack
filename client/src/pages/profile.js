import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Add editing state
  const [editedProfile, setEditedProfile] = useState({
    username: "",
    email: "",
    profilePicture: "",
    location: "",
    bio: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not authenticated");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/profile/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data); // Assuming the profile contains all necessary data
        setEditedProfile({
          username: response.data.username || "",
          email: response.data.email || "",
          profilePicture: response.data.profilePicture || "",
          location: response.data.location || "",
          bio: response.data.bio || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        "http://localhost:3001/profile/profile", // Assuming you have an update route
        editedProfile, // Send the updated profile data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the profile state with the edited data
      setProfile({ ...profile, ...editedProfile });
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };


  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;

  return (
    profile && (
      <div className="min-h-screen flex bg-gray-200 text-black">
        <aside className="w-1/4 bg-gray-300 p-6">
          <h2 className="text-xl font-bold mb-6">User Profile </h2>
          {/* Profile Picture Display and Upload */}
          <div className="mb-4">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-2"
            />
            {isEditing && (
              <input
                type="url"
                id="profilePicture"
                name="profilePicture"
                accept=".jpg" // Restrict to JPG files
                value = {editedProfile.profilePicture}
                onChange={handleChange}
              />
            )}
          </div>
          {/* Conditionally render email for display or editing */}
          {isEditing ? (
            <input
              type="email"
              id="email"
              name="email"
              value={editedProfile.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <p>
              <span className="text-md font-bold mb-2">My Email :</span>
              <br></br>
              {profile.email}
            </p>
          )}
          {/* Conditionally render username for display or editing */}
          {isEditing ? (
            <input
              type="text"
              id="username"
              name="username"
              value={editedProfile.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <p>
              <span className="text-md font-bold mb-2">My username :</span>
              <br></br>
              {profile.username}
            </p>
          )}
        </aside>
        <main className="flex-1 p-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            {/* Location Field */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 font-bold mb-2"
              >
                Location:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editedProfile.location}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p>{profile.location}</p>
              )}
            </div>

            {/* Bio Field */}
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block text-gray-700 font-bold mb-2"
              >
                Bio:
              </label>
              {isEditing ? (
                <textarea
                  id="bio"
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p>{profile.bio}</p>
              )}
            </div>

            {/* Edit/Save Buttons */}
            {isEditing ? (
              <button
                onClick={handleSaveClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Display Meal Plans (unchanged) */}
          {profile.mealPlans && profile.mealPlans.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl mb-4">Meal Plans</h2>
              {profile.mealPlans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-green-600 text-white shadow-md border border-gray-400 p-4 mb-4 rounded-md"
                >
                  <h3 className="text-xl font-semibold">
                    Meal Plan {index + 1}
                  </h3>
                  <p>
                    <strong>Time Frame:</strong> {plan.timeFrame}
                  </p>
                  <p>
                    <strong>Target Calories:</strong> {plan.targetCalories}
                  </p>
                  <p>
                    <strong>Diet:</strong> {plan.diet}
                  </p>
                  <div className="mt-2">
                    <h4 className="text-lg mb-2">Meals</h4>
                    {plan.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="mb-2">
                        <p>
                          <strong>{meal.title}</strong>
                        </p>
                        <p>
                          Ready in {meal.readyInMinutes} minutes, Servings:{" "}
                          {meal.servings}
                        </p>
                        <p>
                          <a
                            href={meal.sourceUrl}
                            className="text-green-900"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Recipe
                          </a>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    )
  );
};



export default Profile;