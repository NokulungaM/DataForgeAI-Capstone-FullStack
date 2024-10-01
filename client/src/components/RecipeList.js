import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

const RecipeList = ({ recipes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const openModal = (recipe) => {
    setLoading(true);
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
    setLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  if (!recipes || recipes.length === 0) {
    return <p>No recipes available. Try searching for specific ingredients.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id || index}
            className="bg-white text-black rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
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
                  ? `${recipe.instructions.substring(0, 100)}...`
                  : 'No instructions available.'}
              </p>
              <button
                className="mt-4 text-blue-500 font-semibold hover:underline"
                onClick={() => openModal(recipe)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative z-10 shadow-lg">
          <button onClick={closeModal} className="absolute top-2 right-2 text-black hover:text-gray-500">
            Close
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : (
            selectedRecipe && (
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
            )
          )}
        </div>
      </Dialog>
    </>
  );
};

export default RecipeList;
