import React from "react";

const TrendingRecipes = ({ recipes }) => {
  return (
    <div className="w-full md:w-1/0.5 bg-white border border-gray-400 rounded-lg shadow-lg p-4 ml-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Trending Recipes</h2>
      {/* Container with max height and scrolling */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <p className="text-gray-800 font-semibold text-sm">
                {recipe.title || "Untitled Recipe"}
              </p>
              <p className="text-xs text-gray-500">{recipe.likes} likes</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No trending recipes.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingRecipes;
