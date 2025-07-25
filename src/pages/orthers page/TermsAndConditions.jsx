import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Terms & Conditions</h1>
      <div className="space-y-5 text-justify text-base leading-relaxed">
        <p>
          Welcome to our Real Estate Platform. By accessing or using our
          services, you agree to be bound by the following terms and
          conditions.
        </p>

        <h2 className="text-xl font-semibold">1. User Responsibilities</h2>
        <p>
          Users must provide accurate information during registration and are
          responsible for maintaining the confidentiality of their login
          credentials.
        </p>

        <h2 className="text-xl font-semibold">2. Property Listings</h2>
        <p>
          Listings must be legitimate and follow our community guidelines. We
          reserve the right to remove any listing that violates policies.
        </p>

        <h2 className="text-xl font-semibold">3. Payments</h2>
        <p>
          All payments made through our platform are handled securely. Refund
          policies are applicable as per our payment provider’s terms.
        </p>

        <h2 className="text-xl font-semibold">4. Account Termination</h2>
        <p>
          We reserve the right to terminate any account found violating our
          terms, engaging in fraudulent behavior, or misusing the platform.
        </p>

        <h2 className="text-xl font-semibold">5. Modifications</h2>
        <p>
          We may update these terms from time to time. It is the user's
          responsibility to stay updated with any changes.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
