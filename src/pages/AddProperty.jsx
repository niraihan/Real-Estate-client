import { useContext, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    priceMin: "",
    priceMax: "",
    image: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.title ||
      !formData.location ||
      !formData.priceMin ||
      !formData.priceMax ||
      !formData.image
    ) {
      return toast.error("All fields are required");
    }
    if (parseFloat(formData.priceMin) > parseFloat(formData.priceMax)) {
      return toast.error("Minimum price cannot be greater than maximum price");
    }

    setLoading(true);

    try {
      // Upload image to image hosting service (e.g., imgbb)
      const formImage = new FormData();
      formImage.append("image", formData.image);

      const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formImage
      );

      const imageUrl = imgRes.data.data.display_url;

      // Prepare property data
      const propertyData = {
        title: formData.title,
        location: formData.location,
        image: imageUrl,
        agentName: user.displayName,
        agentEmail: user.email,
        priceMin: parseFloat(formData.priceMin),
        priceMax: parseFloat(formData.priceMax),
        verificationStatus: "pending",
        createdAt: new Date(),
      };

      // Save property to backend
      // const res = await axios.post("http://localhost:5000/properties", propertyData);
      const res = await axios.post(
        "http://localhost:5000/properties",
        propertyData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.data.insertedId) {
        toast.success("Property added successfully and pending verification");
        navigate("/dashboard/my-added-properties");
      }
    } catch (error) {
      toast.error("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          className="input input-bordered w-full"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Property Location"
          className="input input-bordered w-full"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="priceMin"
            placeholder="Minimum Price"
            className="input input-bordered w-full"
            value={formData.priceMin}
            onChange={handleChange}
            required
            min={0}
          />
          <input
            type="number"
            name="priceMax"
            placeholder="Maximum Price"
            className="input input-bordered w-full"
            value={formData.priceMax}
            onChange={handleChange}
            required
            min={0}
          />
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="input input-bordered w-full cursor-not-allowed"
          placeholder="Agent Name"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full cursor-not-allowed"
          placeholder="Agent Email"
        />

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;