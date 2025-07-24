import useTitle from "../hooks/useTitle";



const AboutUs = () => {
  useTitle("About Us");

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">About Us</h2>
        <p className="mt-2 text-base-content">
          Learn more about who we are and what we do
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-secondary">Our Mission</h3>
          <p className="text-base-content">
            We aim to build a user-friendly platform that simplifies the real estate experience for buyers, sellers, agents, and administrators. We are committed to providing a seamless, secure, and feature-rich environment.
          </p>

          <h3 className="text-2xl font-semibold text-secondary">Our Vision</h3>
          <p className="text-base-content">
            To become the most trusted and innovative real estate platform in the digital world by connecting people and properties efficiently and transparently.
          </p>
        </div>

        <div>
          <img
            src="./urban.jpg"
            alt="About Us"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
