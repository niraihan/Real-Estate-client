import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const Faq = () => {
    const faqList = [
        {
            question: "How does this Real Estate platform work?",
            answer:
                "Our platform allows users to browse properties, make offers, leave reviews, and securely manage transactions through a role-based dashboard system.",
        },
        {
            question: "How can I make an offer on a property?",
            answer:
                "Click the 'Make Offer' button on a property detail page, enter your offer amount, and submit. The offer will be sent to the agent or property owner for review.",
        },
        {
            question: "How can I leave a review on a property?",
            answer:
                "Once you purchase a property, go to your dashboard and navigate to 'My Reviews' to submit a review for that property.",
        },
        {
            question: "How do I update my profile information?",
            answer:
                "Go to the 'My Profile' section inside your dashboard, click the edit icon, update your information, and save the changes.",
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-primary flex justify-center items-center gap-2">
                    <FaQuestionCircle className="text-secondary" /> Frequently Asked Questions
                </h2>
                <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
                    Find answers to the most common questions about how our platform works and how to get the most out of it.
                </p>
            </div>

            <div className="space-y-4">
                {faqList.map((faq, idx) => (
                    <div
                        key={idx}
                        className="collapse collapse-plus bg-base-200 shadow-md rounded-box"
                    >
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-semibold text-primary">
                            {faq.question}
                        </div>
                        <div className="collapse-content text-gray-600 dark:text-gray-300">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
