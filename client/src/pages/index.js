import React, { useEffect, useState } from "react";
import RecipeList from "../components/RecipeList";
import Image from "next/image";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/random/recipes/random?limitLicense=true&number=8"
      );
      if (!response.ok) throw new Error("Failed to fetch recipes");
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
    <div className="min-h-screen bg-white-to-br text-green font-poppins">
      <main className="flex flex-col items-center justify-center text-center px-6 py-16">
      <div className="flex flex-col md:flex-row gap-32 items-center">
  <div className="col-span-3 md:flex-2">
    <h1 className="text-5xl md:text-5xl font-bold mb-6">
      Discover Culinary Magic
    </h1>
    <p className="text-lg md:text-xl font-light mb-8">
      Unleash your inner chef with recipes tailored to your ingredients.
    </p>
    <div className="flex justify-center space-x-4 mb-8">
      <a href="/aboutUs" className="bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-full text-white font-semibold transition-transform transform hover:scale-105 shadow-lg">
        About us
      </a>
      <a
        href="/auth/signup"
        className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full text-white font-semibold transition-transform transform hover:scale-105 shadow-lg"
      >
        Get Started
      </a>
    </div>
  </div>

  <div className="relative md:flex-1">
    <Image
      width={400}
      height={300}
      className="bg-cover rounded-lg shadow-lg"
      src={`https://www.healthbenefitstimes.com/glossary/wp-content/uploads/2020/08/Recipe.jpg`}
    />
  </div>
</div>


        {loading && <p>Loading recipes...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && recipes.length > 0 && (
          <div className="mt-16 w-full">
            <h2 className="text-3xl font-bold mb-6">Featured Recipes</h2>
            <div className="cyan-500">
              <RecipeList recipes={recipes} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
