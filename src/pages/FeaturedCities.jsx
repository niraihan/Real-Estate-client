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
    <div className="my-16 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-4 text-center text-primary">
        Explore Cities <span className="text-accent">🗺️</span>
      </h2>
      <p className="text-center text-gray-600 mb-10 text-lg">
        Discover your dream home in one of Bangladesh's most vibrant and sought-after cities.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {cities.map((city) => (
          <div
            key={city.name}
            className="bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center flex-grow">
              <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{city.description}</p>
              <button className="mt-auto btn btn-sm btn-outline btn-primary">
                See Properties in {city.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCities;
