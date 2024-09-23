import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#E0E0E0] font-sans">
      <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover new recipes with your ingredients!
        </h1>
        <p className="text-lg mb-8">Find recipes matching your ingredients, powered by DataForgeAI.</p>
        <div className="flex space-x-4">
          <button className="bg-[#2979FF] px-6 py-3 rounded-full text-white font-semibold">Explore</button>
          <button className="bg-[#2979FF] px-6 py-3 rounded-full text-white font-semibold">Get Started</button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-16">
          <div className="bg-[#76FF03] p-6 rounded-lg text-[#1E1E1E] w-48 text-center">
            <h2 className="text-lg font-bold">Recipe Enthusiast</h2>
            <p className="text-xl mt-2">10K+</p>
          </div>
          <div className="bg-[#76FF03] p-6 rounded-lg text-[#1E1E1E] w-48 text-center">
            <h2 className="text-lg font-bold">Recipes Available</h2>
            <p className="text-xl mt-2">1M+</p>
          </div>
          <div className="bg-[#76FF03] p-6 rounded-lg text-[#1E1E1E] w-48 text-center">
            <h2 className="text-lg font-bold">Recipes Viewed</h2>
            <p className="text-xl mt-2">500K+</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;