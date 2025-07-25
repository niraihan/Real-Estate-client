import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    priceMin: "",
    priceMax: "",
    imageUrl: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);

  // Fetch property data on mount
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`https://real-estate-server-gamma.vercel.app/properties/${id}`);
        const prop = res.data;

        // Only allow update if status is pending or verified
        if (prop.verificationStatus === "rejected") {
          toast.error("This property cannot be updated as it is rejected");
          navigate("/dashboard/my-added-properties");
          return;
        }

        setFormData({
          title: prop.title,
          location: prop.location,
          priceMin: prop.priceMin,
          priceMax: prop.priceMax,
          imageUrl: prop.image,
          imageFile: null,
        });
      } catch (error) {
        toast.error("Failed to load property data");
      }
    };

    fetchProperty();
  }, [id, navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.location ||
      !formData.priceMin ||
      !formData.priceMax
    ) {
      return toast.error("All fields are required");
    }

    if (parseFloat(formData.priceMin) > parseFloat(formData.priceMax)) {
      return toast.error("Minimum price cannot be greater than maximum price");
    }

    setLoading(true);

    try {
      let updatedImageUrl = formData.imageUrl;

      // If new image selected, upload it
      if (formData.imageFile) {
        const formImage = new FormData();
        formImage.append("image", formData.imageFile);

        const imgbbApiKey = "YOUR_IMGBB_API_KEY";
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formImage
        );

        updatedImageUrl = imgRes.data.data.display_url;
      }

      // Prepare updated property data
      const updatedProperty = {
        title: formData.title,
        location: formData.location,
        image: updatedImageUrl,
        priceMin: parseFloat(formData.priceMin),
        priceMax: parseFloat(formData.priceMax),
      };

      // await axios.put(`https://real-estate-server-gamma.vercel.app/properties/${id}`, updatedProperty);
      await axios.put(
        `https://real-estate-server-gamma.vercel.app/properties/${id}`,
        updatedProperty,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      toast.success("Property updated successfully");
      navigate("/dashboard/my-added-properties");
    } catch (error) {
      toast.error("Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Property</h2>
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

        <div>
          <p className="mb-1 font-semibold">Current Image:</p>
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Current Property"
              className="w-full max-h-64 object-cover rounded"
            />
          )}
        </div>

        <input
          type="file"
          name="imageFile"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleChange}
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
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;