import { useState } from 'react';
import { Dialog } from '@headlessui/react';

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return; // Avoid empty queries

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/recipes?ingredients=${query}`);
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-blue-700 text-white p-6">
      {/* Header Section */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">What's cooking?</h1>
        <div className="w-full flex items-center justify-center mb-6">
          <input
            type="text"
            placeholder="Enter ingredients"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-l bg-gray-800 text-white border-none outline-none"
          />
          <button
            onClick={handleSearch}
            className="p-3 bg-teal-500 hover:bg-teal-600 rounded-r text-black font-semibold transition-transform transform hover:scale-105"
          >
            Find
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8">
        {loading && <p>Loading recipes...</p>}
        {recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <div
                key={recipe.id || index}
                className="bg-white text-black rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => openModal(recipe)}
              >
                <img
                  src={recipe.image || 'default-image-url.jpg'}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{recipe.title}</h3>
                  <p className="mt-2 text-sm text-gray-700">
                    {recipe.instructions
                      ? `${recipe.instructions.slice(0, 100)}...`
                      : 'No instructions available.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Modal */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative z-10 shadow-lg">
          <button onClick={closeModal} className="absolute top-2 right-2 text-black hover:text-gray-500">
            Close
          </button>
          {selectedRecipe && (
            <>
              <img
                src={selectedRecipe.image || 'default-image-url.jpg'}
                alt={selectedRecipe.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <h3 className="text-2xl font-bold mt-4">{selectedRecipe.title}</h3>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                {selectedRecipe.instructions || 'No instructions available.'}
              </p>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Search;
