import React from 'react';

const FeaturedCities = () => {
  const cities = [
    {
      name: "Dhaka",
      image: "https://i.ibb.co/B21SMVVt/download.jpg",
      description: "The bustling capital with vibrant urban living and top real estate opportunities.",
    },
    {
      name: "Chittagong",
      image: "https://i.ibb.co/4Z0TxchN/licensed-image.jpg",
      description: "A scenic port city known for hills, beaches, and growing property markets.",
    },
    {
      name: "Sylhet",
      image: "https://i.ibb.co/pBs8680d/unnamed.jpg",
      description: "Lush tea gardens and serene landscapes attract both locals and expats.",
    },
    {
      name: "Rajshahi",
      image: "https://i.ibb.co/7dn1gmxK/licensed-image-1.jpg",
      description: "A quiet city by the Padma river with expanding housing and business zones.",
    },
  ];

  return (
    <section className="my-16 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-primary dark:text-primary-focus transition-colors duration-300">
        Explore Cities <span className="text-accent">🗺️</span>
      </h2>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-12 text-lg max-w-3xl mx-auto transition-colors duration-300">
        Discover your dream home in one of Bangladesh's most vibrant and sought-after cities.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {cities.map((city) => (
          <div
            key={city.name}
            className="bg-base-100 dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-48 sm:h-40 md:h-48 object-cover"
              loading="lazy"
            />
            <div className="p-5 flex flex-col flex-grow text-center">
              <h3 className="text-2xl font-semibold mb-3 text-base-content dark:text-neutral-100 transition-colors duration-300">
                {city.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow transition-colors duration-300">
                {city.description}
              </p>
              {/* <button
                className="btn btn-outline btn-primary mx-auto px-6 py-2 text-sm font-medium rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary-focus transition-colors duration-300"
                aria-label={`See Properties in ${city.name}`}
              >
                See Properties in {city.name}
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCities;
