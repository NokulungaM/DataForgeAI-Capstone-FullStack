const Search = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Search for Recipes</h1>
        <input type="text" placeholder="Search recipes" className="mb-4 p-2 border w-1/2" />
        <button className="bg-green-500 p-2 rounded">Search</button>
      </div>
    );
  };
  
  export default Search;
  