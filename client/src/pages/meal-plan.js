import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';

// Stable placeholder image URLs
const placeholders = {
  breakfast: 'https://via.placeholder.com/400x300.png?text=Breakfast',
  lunch: 'https://via.placeholder.com/400x300.png?text=Lunch',
  supper: 'https://via.placeholder.com/400x300.png?text=Supper',
};

// Button component
const Button = ({ children, onClick, className, disabled, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 bg-green-500 text-white rounded ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={disabled}
  >
    {children}
  </button>
);

// Card component
const Card = ({ children, className, onClick }) => (
  <div className={`border rounded-lg p-4 shadow-sm cursor-pointer ${className}`} onClick={onClick}>
    {children}
  </div>
);

// MealPlan component
export default function MealPlan() {
  const [timeFrame, setTimeFrame] = useState('day');
  const [targetCalories, setTargetCalories] = useState('');
  const [diet, setDiet] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Token from localStorage:', storedToken);
    setToken(storedToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!timeFrame || !targetCalories || !diet) {
      setError('Please fill in all fields');
      return;
    }

    if (!token) {
      setError('User is not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`http://localhost:3001/meal-plan/meal-plan`, {
        params: {
          timeFrame,
          targetCalories,
          diet,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMealPlan(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.error('Token expired or invalid. Please log in again.');
        setError('Session expired. Please log in again.');
      } else {
        setError('Error fetching meal plan. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const openModal = (meal, mealType) => {
    setSelectedMeal({ ...meal, type: mealType });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-2 text-green-700 text-center">Generate Your Meal Plan</h1>
        <hr className="border-b-2 border-green-700 mb-6" /> {/* Horizontal line */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Time Frame:</label>
              <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Target Calories:</label>
              <input
                type="number"
                value={targetCalories}
                onChange={(e) => setTargetCalories(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700">Diet:</label>
              <input
                type="text"
                list="dietOptions"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                placeholder="Enter your diet preference or select an option"
                className="w-full p-2 border rounded"
              />
              <datalist id="dietOptions">
                <option value="Vegetarian" />
                <option value="Vegan" />
                <option value="Paleo" />
              </datalist>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <span className="animate-spin mr-2">🔄</span>
                  Generating Meal Plan
                </>
              ) : (
                'Generate Meal Plan'
              )}
            </Button>
          </form>
        </Card>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {mealPlan && mealPlan.mealPlan && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {mealPlan.mealPlan.map((meal, index) => {
              const mealType = index === 0 ? 'breakfast' : index === 1 ? 'lunch' : 'supper';
              const imageSrc = placeholders[mealType] || placeholders.supper;

              return (
                <Card key={index} onClick={() => openModal(meal, mealType)}>
                  <img
                    src={imageSrc}
                    alt={meal.title || `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Image`}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <hr className="border-b-2 border-gray-300 my-2" /> {/* Horizontal line after image */}
                  <h3 className="text-lg font-bold">{meal.title || mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col bg-gradient-to-b from-green-300 to-green-500 p-6 rounded-lg shadow-lg h-full">
        {/* Suggested Meals Section */}
        <h2 className="text-xl font-bold mb-4 text-green-700">Suggested Meals</h2>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="flex flex-col items-center relative">
            <h3 className="absolute top-0 text-lg font-bold text-white mt-12 bg-black bg-opacity-50 px-2 rounded">Muesli for Breakfast</h3>
            <img
              src="/flakes.jpg" 
              alt="Flakes"
              className="w-40 h-40 rounded-full mb-1 object-cover"
            />
          </div>
          <div className="flex flex-col items-center relative">
            <h3 className="absolute top-0 text-lg font-bold text-white mt-12 bg-black bg-opacity-50 px-2 rounded">Cheesy Salad for Lunch</h3>
            <img
              src="/lunch.jpeg" 
              alt="Salad"
              className="w-40 h-40 rounded-full mb-1 object-cover"
            />
          </div>
          <div className="flex flex-col items-center relative">
            <h3 className="absolute top-0 text-lg font-bold text-white mt-12 bg-black bg-opacity-50 px-2 rounded">Fish and Salad for Dinner</h3>
            <img
              src="/dinner.jpg" 
              alt="Fish and salad"
              className="w-40 h-40 rounded-full mb-1 object-cover"
            />
          </div>
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative z-10 shadow-lg">
          <button onClick={closeModal} className="absolute top-2 right-2 text-black hover:text-gray-500">
            Close
          </button>
          {selectedMeal && (
            <>
              <img
                src={placeholders[selectedMeal.type]}
                alt={selectedMeal.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <h3 className="text-2xl font-bold mt-4">{selectedMeal.title}</h3>
              <p className="mt-2 text-gray-700">
                <strong>Meal Type:</strong> {selectedMeal.type}
              </p>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                <strong>Cooking Instructions:</strong> {selectedMeal.instructions || 'No instructions available.'}
              </p>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
}
