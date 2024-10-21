import React, { useState } from "react";
import axios from "axios";

const CreateRecipe = ({ token, onRecipeCreated }) => {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Handle file input change
  const handleImageChange = (e) => {
    setRecipeImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !instructions || !ingredients) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append(
      "ingredients",
      ingredients.split(",").map((ingredient) => ingredient.trim())
    );

    if (recipeImage) {
      formData.append("recipeImage", recipeImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/user/user-recipes",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTitle("");
      setInstructions("");
      setIngredients("");
      setRecipeImage(null);
      setIsCreating(false); // Close the form after successful submission

      onRecipeCreated(response.data);
    } catch (error) {
      setError("Failed to post the recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseForm = () => {
    setIsCreating(false);
    setTitle("");
    setInstructions("");
    setIngredients("");
    setRecipeImage(null);
    setError(null); // Clear any errors when closing
  };

  return (
    <div className="bg-white p-6 mb-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create a Recipe</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!isCreating && (
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => setIsCreating(true)}
        >
          Create Recipe
        </button>
      )}

      {isCreating && (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            {" "}
            {/* Changed to flex items-center */}
            <div className="w-full mr-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter recipe title"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleCloseForm}
                className="bg-red-200 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="instructions"
              className="block text-gray-700 font-semibold mb-2"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Enter the recipe instructions"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="ingredients"
              className="block text-gray-700 font-semibold mb-2"
            >
              Ingredients (separate by commas)
            </label>
            <input
              type="text"
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Sugar, Flour, Butter"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="recipeImage"
              className="block text-gray-700 font-semibold mb-2"
            >
              Recipe Image
            </label>
            <input
              type="file"
              id="recipeImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {loading ? "Posting..." : "Post Recipe"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateRecipe;
