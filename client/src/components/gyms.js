

const GymsWePartnerWith = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Gyms We Partner With</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-center">
          {/* Square Compartments for each gym */}
          {[
            { src: '/fitnessClub.jpg', name: 'Fitness Club', link: 'https://www.planetfitness.co.za/' },
            { src: '/virgin.jpg', name: 'Virgin Gym', link: 'https://www.virginactive.co.za/' },
            { src: '/gymconcepts.jpg', name: 'Vintage Gym', link: 'https://www.gymconcepts.com/'},
            { src: '/vectorGym.jpg', name: 'Vector Gym' },
            { src: '/gymcompany.jpg', name: 'Gym Company' },
            { src: '/sultangym.jpg', name: 'Sultan Gym' },
            { src: '/thegym.jpg', name: 'The Gym' },
            { src: '/fitnessSportgym.jpg', name: 'Fitness Sport Gym' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden border border-gray-200 shadow-md">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.src}
                      alt={`Fitness Club ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </a>
                ) : (
                  <img
                    src={item.src}
                    alt={`Fitness Club ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <p className="mt-2 text-base text-gray-700">{item.name}</p>
            </div>
          ))}
        </div>
        <p className="text-base text-gray-600 mt-6">
          We are proud to partner with some of the best fitness clubs around. Whether you're a fitness enthusiast or a beginner, our partners provide the perfect environment to help you achieve your health goals.
        </p>
      </div>
    </section>
  );
};

export default GymsWePartnerWith;
