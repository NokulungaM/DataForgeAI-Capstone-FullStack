import { useState } from 'react';

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null); // Track expanded card

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/recipes?ingredients=${query}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index); // Toggle expanded state
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header Section */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-4">Whats cooking?</h1> {/* New Header */}
        
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
            className="p-3 bg-green-500 rounded-r text-black hover:bg-green-400"
          >
            Find
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8">
        {recipes.length > 0 && (
          <h2 className="text-xl text-center mb-4">
            Search results for "{query}"
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-lg text-center"
              onClick={() => toggleExpand(index)} // Toggle expanded state on click
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{recipe.title}</h3>
              
              {/* Show brief instructions if not expanded */}
              {expandedIndex === index ? (
                <p className="text-sm text-gray-400">
                  {recipe.instructions}
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  {recipe.instructions.slice(0, 100)}...
                </p>
              )}
              
              <button className="mt-4 text-blue-500">
                {expandedIndex === index ? "Show Less" : "Show More"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
