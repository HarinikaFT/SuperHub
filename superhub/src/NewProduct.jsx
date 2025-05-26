import React, { useState, useContext, useEffect } from "react";
import api from "./api/axios";
import Logo from "./assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";

const ProductForm = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsNewOpen } = useContext(ProductContext);

  const [pname, setPname] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isFormValid = () => {
    return (
      pname.trim() !== "" &&
      price.trim() !== "" &&
      category.trim() !== "" &&
      description.trim() !== "" &&
      image !== null
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pname", pname);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);

    try {
      if (!isLoggedIn) return;

      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product created successfully!");
      setIsNewOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Product creation failed:", error);
      alert("Product creation failed: " + (error.response?.data?.message || error.message));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-tr from-gray-300 via-gray-50 to-gray-400 text-black shadow-md rounded-2xl p-6 sm:p-10 w-full max-w-sm text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Please log in to post your product.</h2>
          <Link
            to="/signin"
            className="text-purple-500 hover:text-gray-900 transition duration-200 ease-in-out hover:font-semibold hover:scale-105 cursor-pointer block mb-2"
          >
            Go to Login 
          </Link>
          <p
            onClick={() => setIsNewOpen(false)}
            className="text-purple-500 hover:text-gray-900 transition duration-200 ease-in-out hover:font-semibold hover:scale-105 cursor-pointer block"
          >
              ← Back
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-tr from-gray-300 via-gray-50 to-gray-300 p-6 sm:p-8 rounded-md w-full sm:max-w-md lg:max-w-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-black text-xl font-bold"
          onClick={() => setIsNewOpen(false)}
        >
          &times;
        </button>

        <div className="flex flex-col items-center">
          <Link to="/" className="flex items-center mb-6">
            <img src={Logo} alt="Company Logo" className="h-10 w-auto mb-2" />
            <span className="font-bold text-xl text-contrast1">Super Hub</span>
          </Link>

          <div className="w-full space-y-6 bg-contrast2 p-6 sm:p-8 rounded-lg shadow-md border border-border">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-contrast1">Create Product</h2>
              <p className="mt-2 text-sm sm:text-base text-text">Add a new product to your store</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Product Name */}
              <div>
                <label htmlFor="pname" className="block text-sm font-medium text-text mb-1">
                  Product Name<span className="text-primary">*</span>
                </label>
                <input
                  id="pname"
                  type="text"
                  required
                  className="block w-full px-3 py-2 border border-border text-contrast1 rounded-md focus:outline-none"
                  placeholder="Enter product name"
                  value={pname}
                  onChange={(e) => setPname(e.target.value)}
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-text mb-1">
                  Price<span className="text-primary">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="block w-full px-3 py-2 border border-border text-contrast1 rounded-md focus:outline-none"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-text mb-1">
                  Category<span className="text-primary">*</span>
                </label>
                <select
                  id="category"
                  required
                  className="block w-full px-3 py-2 border border-border text-text rounded-md focus:outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="cars">Cars</option>
                  <option value="bikes">Bikes</option>
                  <option value="electronics">Electronics</option>
                  <option value="cycle">Cycles</option>
                  <option value="furnitures">Furnitures</option>
                  <option value="books">Books</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text mb-1">
                  Description<span className="text-primary">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  rows="3"
                  className="block w-full px-3 py-2 border border-border text-contrast1 rounded-md focus:outline-none"
                  placeholder="Describe your product"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Product Image<span className="text-primary">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setImage(e.target.files[0]);
                    }
                  }}
                  className="block w-full text-text"
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="mt-2 max-h-40 w-full object-contain rounded"
                  />
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid()}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium text-white transition duration-200 ${
                  isFormValid() ? "bg-primary hover:bg-contrast1" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
