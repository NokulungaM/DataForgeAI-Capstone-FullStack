import React, { useState } from 'react';
// import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [recipe, setRecipe] = useState(null); 

  const handleInputChange = (event) => {
    setCurrentIngredient(event.target.value);
  };

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== '') {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerateRecipe = async () => {
    try {
      // 1. Join ingredients into a  string
      const ingredientsString = ingredients.join("&");

      // 2. Construct the API endpoint with query parameters
      const apiEndpoint = `http://localhost:3001/api/recipes?ingredients=${ingredientsString}`;

      // 3. Make the API request using Fetch
      const response = await fetch(apiEndpoint, {
        method: "GET", // Or 'GET' depending on your API
        headers: {
          "Content-Type": "application/json", // Adjust if needed
        },
        // You might need a body if using 'POST'
        // body: JSON.stringify({ /* any additional data */ }),
      });

      // 4. Handle the API response
      if (response.ok) {
        const data = await response.json();
        setRecipe(data.instructions); // Assuming the API returns a "instructions" field
      } else {
        console.error("Error generating recipe:", response.status);
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Whats cooking ?</h1>

      {/* Input and Add Button Container */}
      <div className="relative w-1/2 flex">
        <input
          type="text"
          placeholder="Enter ingredient"
          value={currentIngredient}
          onChange={handleInputChange}
          className="text-gray-900 text-lg mb-4 p-2 border w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAddIngredient}
          className="bg-green-500 px-4 py-2 rounded-md text-white ml-2 h-full"
        >
          Add
        </button>
      </div>

      {/* Ingredients List */}
      {ingredients.length > 0 && (
        <div className="mb-4 flex flex-wrap">
          <h2 className="text-lg font-medium mr-2">Ingredients:</h2>
          <ul className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="relative">
                <button className="bg-gray-200 px-2 py-1 rounded-md text-sm text-gray-700">
                  {ingredient}
                </button>
                <button
                  onClick={() => handleRemoveIngredient(index)}
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full px-2 text-xs"
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button 
        onClick={handleGenerateRecipe} 
        className="bg-green-500 p-2 rounded"
      >
        Generate Recipe
      </button>

      {/* Display the generated recipe */}
      {recipe && (
        <div className="mt-4 p-4 border rounded-md">
          <h2 className="text-gray-600 text-lg font-medium mb-2">Generated Recipe:</h2>
          <p>{recipe}</p> 
        </div>
      )}
    </div>
  );
};

export default Search;
