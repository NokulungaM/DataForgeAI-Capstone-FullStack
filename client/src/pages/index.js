import React, { useEffect, useState } from 'react';
import RecipeList from '../components/RecipeList';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/random/recipes/random?limitLicense=true&number=6');
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-blue-700 text-white font-poppins">
      <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover Culinary Magic
        </h1>
        <p className="text-lg md:text-xl font-light mb-8">
          Unleash your inner chef with recipes tailored to your ingredients.
        </p>
        <div className="flex space-x-4 mb-8">
          <button className="bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-full text-white font-semibold transition-transform transform hover:scale-105 shadow-lg">
            Explore Recipes
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full text-white font-semibold transition-transform transform hover:scale-105 shadow-lg">
            Get Started
          </button>
        </div>

        {loading && <p>Loading recipes...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && recipes.length > 0 && (
          <div className="mt-16 w-full">
            <h2 className="text-3xl font-bold mb-6">Featured Recipes</h2>
            <RecipeList recipes={recipes} />
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
