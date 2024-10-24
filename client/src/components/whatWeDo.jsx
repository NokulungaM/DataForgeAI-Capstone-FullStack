


const WhatWeDo = () => {
  return (
    <section className="py-24 mt-16 bg-gray-50">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-12">
        {/* Left Column: What We Do */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What we do</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Compartment 1 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/mogodu2.jpg"
                  alt="Mogodu"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-gray-700 mt-2">Mogodu</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-gray-600">
                  Explore recipes from around the world.
                </p>
              </div>
            </div>

            {/* Compartment 2 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/appetizer-bowl-delicious-1640772.jpg"
                  alt="Appetizer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-gray-700 mt-2">Appetizer</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-gray-600">
                  Find meal ideas based on your ingredients.
                </p>
              </div>
            </div>

            {/* Compartment 3 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/cooking-cuisine-delicious-958545.jpg"
                  alt="Cuisine"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-gray-700 mt-2">Cuisine</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-gray-600">
                  Save your favorite recipes for future use.
                </p>
              </div>
            </div>

            {/* Compartment 4 */}
            <div className="text-center mt-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/mogodu2.jpg"
                  alt="Mogodu"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-gray-700 mt-2">Mogodu</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-gray-600">
                  Explore recipes from around the world.
                </p>
              </div>
            </div>

            {/* Compartment 5 */}
            <div className="text-center mt-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/appetizer-bowl-delicious-1640772.jpg"
                  alt="Appetizer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-gray-700 mt-2">Appetizer</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-gray-600">
                  Find meal ideas based on your ingredients.
                </p>
              </div>
            </div>

            {/* Compartment 6 */}
            <div className="text-center mt-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/cooking-cuisine-delicious-958545.jpg"
                  alt="Cuisine"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-gray-700 mt-2">Cuisine</p>
              <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                <p className="text-xs text-gray-600">
                  Save your favorite recipes for future use.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Text Info */}
        <div className="lg:w-1/2 flex flex-col justify-center bg-green-300 h-400 overflow-hidden p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Because Good Mood is Good Food
          </h3>
          <p className="text-base text-gray-600 mb-4">
            We have a range of recipe options for our members. From our wide range of traditional food from all South African cultures, to International dishes.
          </p>
          <p className="text-base text-gray-600 mb-4">
            Not only do we have food recipes, we also cater for the cake lovers. There's a wide range of all different cakes. From your granny's favorite cookies, to muffins and birthday cakes.
          </p>
          <p className="text-base text-gray-600 mb-4">
            We have different ways of cooking fish too!
          </p>
          <p className="text-base text-gray-600 mb-4">
            We will show you how to make a kota or even cook the famous amasonja!
          </p>
          <p className="text-base text-gray-600 mb-4">
            We have dietary food as well for those who are looking to slim
          </p>
          <p className="text-base text-gray-600 mb-4">
            You love meat, we got you!
          </p>
          <p className="text-base text-gray-600 mb-4">
            You are a vegetarian? You are not left out! We have tons of recipes catered specifically for vegetarians.
            You can have your meat balls in vegetable, or your chicken the way you want it to be!
          </p>
          <p className="text-xs font-semibold text-gray-800">
            Perfect for people of all sizes, gender and color.
          </p>
          <div className="font-bold text-gray-700 mt-6">Savory</div>
        </div>
        
      </div>
    </section>
  );
};

export default WhatWeDo;
