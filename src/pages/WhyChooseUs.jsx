const WhyChooseUs = () => {
  const features = [
    {
      icon: "🏠",
      title: "Verified Listings",
      description: "We ensure all properties listed on UrbanNest are thoroughly verified for authenticity, giving you peace of mind."
    },
    {
      icon: "💬",
      title: "Real User Reviews",
      description: "Read genuine feedback from previous buyers and tenants to make informed decisions with confidence."
    },
    {
      icon: "🧾",
      title: "Secure Transactions",
      description: "All payments and transactions are processed securely using the latest encryption standards and trusted payment gateways."
    },
    {
      icon: "📈",
      title: "Agent Insights",
      description: "Get detailed agent performance stats, ratings, and history to choose the right professional for your needs."
    },
  ];

  return (
    <div className="my-16 max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-4 text-primary">Why Choose <span className="text-accent">UrbanNest?</span></h2>
      <p className="text-gray-600 mb-10 text-lg">
        Discover the UrbanNest advantage and explore a smarter, safer, and more transparent way to find your perfect property.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-base-100 shadow-md p-6 rounded-2xl hover:shadow-xl transition-all"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
