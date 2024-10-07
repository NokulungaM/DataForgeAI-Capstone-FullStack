import { useState } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';

// Button component
const Button = ({ children, onClick, className, disabled }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-blue-500 text-white rounded ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!timeFrame || !targetCalories || !diet) {
      setError('Please fill in all fields');
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
      });

      setMealPlan(response.data);
    } catch (err) {
      console.error('Error fetching meal plan:', err);
      setError('Error fetching meal plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Generate Your Meal Plan</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Time Frame input */}
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

          {/* Target Calories input */}
          <div>
            <label className="block text-gray-700">Target Calories:</label>
            <input
              type="number"
              value={targetCalories}
              onChange={(e) => setTargetCalories(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

        {/* Diet input */}
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


          {/* Submit button */}
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

      {/* Meal Plan display */}
      {mealPlan && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {mealPlan.meals.map((meal, index) => (
            <Card key={index} onClick={() => openModal(meal)}>
              <img src={meal.image} alt={meal.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-bold">{meal.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Meal Type:</strong> {index === 0 ? 'Breakfast' : index === 1 ? 'Lunch' : 'Dinner'}
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for showing detailed meal information */}
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
                src={selectedMeal.image || 'default-image-url.jpg'}
                alt={selectedMeal.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <h3 className="text-2xl font-bold mt-4">{selectedMeal.title}</h3>
              <p className="mt-2 text-gray-700">
                <strong>Meal Type:</strong> {selectedMeal.type || 'N/A'}
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
