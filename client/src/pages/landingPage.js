import React from 'react';
import RecipeCard from '../components/RecipeCard';

const landingPage = () => {
   const recipes = [
    
      {
        title: 'Chicken Curry',
        description: 'A flavorful and spicy Indian chicken curry recipe.',
        youtubeUrl: 'https://www.youtube.com/embed/a03U45jFxOI',
        thumbnail: 'https://i.ytimg.com/vi/a03U45jFxOI/maxresdefault.jpg',
      },
      
];
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Discover Delicious Recipes</h1>
        <p className="mt-4 text-lg">Watch, learn, and cook your favorite dishes.</p>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Most Popular Recipes</h2>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            title={recipe.title}
            description={recipe.description}
            youtubeUrl={recipe.youtubeUrl}
            thumbnail={recipe.thumbnail}
          />
        ))}
      </main>
    </div>
  );
};

export default landingPage;
