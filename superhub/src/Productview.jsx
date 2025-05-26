import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api/axios";
import { ProductContext } from "./ProductContext.jsx";
import Productcard from "./ProductCard.jsx";
import NotFound from "./assets/notfound.jpg";
import Navbar from "./Nav.jsx";
import Footer from "./FooterSec.jsx";

const ProductView = () => {
  const { id } = useParams();
  const { filteredProducts, isLoggedIn } = useContext(ProductContext);

  const [showModal, setShowModal] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const product = filteredProducts.find((p) => String(p.id) === id);

  let filtered = [];
  if (product && (product.category !== "" || product.pname !== " ")) {
    filtered = filteredProducts.filter(
      (p) =>
        (p.pname.toLowerCase().includes(product.pname.toLowerCase()) ||
          p.category.toLowerCase().includes(product.category.toLowerCase())) &&
        p.id !== product.id
    );
  }

  const handlePriceRequest = async () => {
    try {
      setSubmitting(true);
      const response = await api.post(`/products/${product.id}/requests`, {
        requested_price: Number(rangeValue),
      });

      alert("Price request submitted successfully!");
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to submit price request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) {
    return (
      <>
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 text-center pt-28">
          <h2 className="text-xl font-bold text-contrast1 mb-4">
            Product Not Found
          </h2>
          <img
            src={NotFound}
            alt="Not Found"
            className="max-w-full h-auto object-contain rounded-lg bg-purple-200 shadow-md"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 p-4 md:mt-6 max-w-6xl mx-auto z-10">
        <div className="flex flex-col md:flex-row gap-6 ">
           <img
            src={product.image_url}
            alt={product.pname}
            className="w-full max-w-md md:max-w-lg  object-center rounded-lg shadow-md mx-auto"
          />

          <div className="flex-1">
            <section className="max-w-lg">
              <div className="bg-gradient-to-br from-gray-500 via-gray-300 to-gray-500 p-6 md:p-8 rounded-lg mb-6 border border-border">
                <h3 className="text-3xl font-extrabold text-black ">
                  {product.pname}
                </h3>
                <p className="text-white text-lg mt-2">
                  Made by Super Hub
                  <br />
                  INR {product.price}
                </p>
                {isLoggedIn && (
                  <div className="flex justify-center">
                  
                    <button
                      onClick={() => setShowModal(true)}
                      className="mt-6 px-6 py-3 text-contrast1 bg-white rounded-md border border-grey-50 hover:border hover:border-contrast1 transition-colors"
                    >
                      Request Price
                    </button>
                  </div>
                )}
              </div>
            </section>

            <section className="mt-8">
              <h4 className="text-sm font-medium text-text">Product Details</h4>
              <h5 className="text-lg font-semibold text-contrast1 mt-1">
                {product.pname}
              </h5>
              <div className="mt-4">
                <h6 className="font-medium text-contrast1 mb-2">Description</h6>
                <p className="text-text leading-relaxed">
                  {product.description}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Modal for Price Request */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-contrast1 mb-4">
              Request a Price
            </h2>

            <label
              htmlFor="priceRange"
              className="block text-sm font-medium text-text mb-2"
            >
              Select your desired price range: ₹{rangeValue}
            </label>
            <input
              id="priceRange"
              type="range"
              min="0"
              max={product.price + 1000}
              value={rangeValue}
              onChange={(e) => setRangeValue(Number(e.target.value))}
              className="w-full accent-contrast1"
            />

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-contrast1 border border-contrast1 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handlePriceRequest}
                disabled={submitting}
                className="px-4 py-2 bg-contrast1 text-white rounded-md"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="p-6">
        {filtered.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-contrast1 mb-4 px-2">
              People may also like...
            </h3>

            <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-auto rounded-md gap-4 px-2">
              {filtered.map((item) => (
                <Productcard key={item.id} product={item} />
              ))}
            </div>
          </>
        )}
      </footer>

      <Footer />
    </>
  );
};

export default ProductView;
