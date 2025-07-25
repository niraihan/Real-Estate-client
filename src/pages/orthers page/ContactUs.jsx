import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="bg-base-100 text-base-content px-4 py-12 md:px-8 lg:px-16 min-h-[80vh]">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-primary uppercase">Contact Us</h2>
        <p className="mt-2 text-base md:text-lg max-w-xl mx-auto">
          Have questions or need help? Reach out to us anytime — we're here for you.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
        {/* Contact Info */}
        <div className="md:w-1/2 space-y-6 bg-black bg-opacity-90 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold text-gold-400 border-b pb-2 border-gold-400">Get In Touch</h3>
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-xl text-gold-400 mt-1" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-gray-300">+8801976988819</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-xl text-gold-400 mt-1" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-gray-300">raihan14un@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-xl text-gold-400 mt-1" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-sm text-gray-300">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="md:w-1/2 bg-white dark:bg-base-200 p-6 rounded-2xl shadow-lg space-y-5">
          <h3 className="text-2xl font-semibold text-primary">Send a Message</h3>
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full focus:outline-gold-400"
              required
            />
          </div>
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full focus:outline-gold-400"
              required
            />
          </div>
          <div>
            <label className="label font-medium">Message</label>
            <textarea
              rows="5"
              placeholder="Your Message"
              className="textarea textarea-bordered w-full focus:outline-gold-400"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn bg-gold-400 hover:bg-gold-500 text-white w-full text-lg">
            <MdOutlineMessage className="mr-2 text-xl" />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
