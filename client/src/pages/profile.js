import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('User not authenticated');
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/profile/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data); // Assuming the profile contains all necessary data
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;

  return (
    profile && (
      <div className="min-h-screen flex bg-gray-900 text-white">
        <aside className="w-1/4 bg-gray-800 p-6">
          <h2 className="text-xl font-bold mb-6">Profile settings</h2>
          <p>{profile.email}</p>
          <p>{profile.username}</p>
        </aside>
        <main className="flex-1 p-8">
          <h1 className="text-3xl mb-6">Profile</h1>
          <div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
          </div>

          {/* Display Meal Plans */}
          {profile.mealPlans && profile.mealPlans.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl mb-4">Meal Plans</h2>
              {profile.mealPlans.map((plan, index) => (
                <div key={index} className="bg-gray-800 p-4 mb-4 rounded-md">
                  <h3 className="text-xl font-semibold">Meal Plan {index + 1}</h3>
                  <p><strong>Time Frame:</strong> {plan.timeFrame}</p>
                  <p><strong>Target Calories:</strong> {plan.targetCalories}</p>
                  <p><strong>Diet:</strong> {plan.diet}</p>
                  <div className="mt-2">
                    <h4 className="text-lg mb-2">Meals</h4>
                    {plan.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="mb-2">
                        <p><strong>{meal.title}</strong></p>
                        <p>Ready in {meal.readyInMinutes} minutes, Servings: {meal.servings}</p>
                        <p><a href={meal.sourceUrl} className="text-blue-400" target="_blank" rel="noopener noreferrer">View Recipe</a></p>
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
