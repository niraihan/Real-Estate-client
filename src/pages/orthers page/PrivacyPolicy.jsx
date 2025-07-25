import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <div className="space-y-5 text-justify text-base leading-relaxed">
        <p>
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your personal data on our Real Estate Platform.
        </p>

        <h2 className="text-xl font-semibold">1. Information Collection</h2>
        <p>
          We collect personal details such as name, email, and location during
          registration. Property-related details are collected for listing
          purposes.
        </p>

        <h2 className="text-xl font-semibold">2. Use of Information</h2>
        <p>
          Information is used to provide better service, communicate with users,
          and ensure secure transactions.
        </p>

        <h2 className="text-xl font-semibold">3. Data Sharing</h2>
        <p>
          We do not sell or rent user data. Data may be shared with partners
          only for operational or legal purposes.
        </p>

        <h2 className="text-xl font-semibold">4. Security</h2>
        <p>
          We implement strong measures to protect your data, including
          encryption, authentication, and secure servers.
        </p>

        <h2 className="text-xl font-semibold">5. Cookies</h2>
        <p>
          We use cookies to improve user experience. You can manage cookie
          preferences via your browser settings.
        </p>

        <h2 className="text-xl font-semibold">6. Updates</h2>
        <p>
          This policy may change in the future. Please check this page regularly
          for updates.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
