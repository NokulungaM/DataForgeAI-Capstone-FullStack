const WhatWeDo = () => {
  return (
    <section className="py-24 mt-16 bg-gray-50">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-12">
        {/* Left Column: What We Do */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-green-700 mb-4">What we do</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Compartment 1 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border border-green-700 shadow-md">
                <img
                  src="/mogodu2.jpg"
                  alt="Mogodu"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-green-700 mt-2">Mogodu</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-green-700">
                  Explore recipes from around the world.
                </p>
              </div>
            </div>

            {/* Compartment 2 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/appetizer-bowl-delicious-1640772.jpg"
                  alt="Appetizer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-green-700 mt-2">Appetizer</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-green-700">
                  Find meal ideas based on your ingredients.
                </p>
              </div>
            </div>

            {/* Compartment 3 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/cooking-cuisine-delicious-958545.jpg"
                  alt="Cuisine"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-green-700 mt-2">Cuisine</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-green-700">
                  Save your favorite recipes for future use.
                </p>
              </div>
            </div>

            {/* Compartment 4 */}
            <div className="text-center mt-6">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/vegetableShredder.jpeg"
                  alt="Shredder"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-green-700 mt-2">Vegetable Shredder</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-green-600">
                  Try something new. We got your back vegans.
                </p>
              </div>
            </div>

            {/* Compartment 5 */}
            <div className="text-center mt-6">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/vegroll.jpg"
                  alt="Roll"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-green-700 mt-2">Vege Roll</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-green-700">
                  You can make delicious, but healthy food.
                </p>
              </div>
            </div>

            {/* Compartment 6 */}
            <div className="text-center mt-6">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/pizza.jpg"
                  alt="Pizza"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-green-700 mt-2">Pizza</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-green-700">
                  Need I say more? We have tons of flavors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recipe List in Green Box */}
        <div className="lg:w-1/2 flex flex-col justify-center bg-gradient-to-r from-green-300 to-green-500 h-96 overflow-hidden p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-4">
            Because Good Mood is Good Food
          </h3>
          <p className="text-base text-white mb-4">
            Discover a variety of traditional South African and international recipes.
          </p>
          <p className="text-base text-white mb-4">
            We also cater to cake lovers with recipes for cookies, muffins, and birthday cakes.
          </p>
          <p className="text-base text-white mb-4">
            Vegetarian or meat lover, we have you covered!
          </p>
          <p className="text-xs font-semibold text-green-700">
            Perfect for everyone.
          </p>
          <div className="italic text-white text-xl mt-6">Savory</div> 
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
