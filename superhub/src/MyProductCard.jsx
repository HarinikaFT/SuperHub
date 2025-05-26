
import api from "./api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditProductModal from "./EditProduct";

const MyProductCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [myproducts, setMyproducts] = useState([]);

  useEffect(() => {
    api
      .get("/my_products")
      .then((response) => {
        setMyproducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleUpdateProduct = (imageFile) => {
    // Create form data to send text fields + image
    const formData = new FormData();
    formData.append("pname", editProduct.pname);
    formData.append("price", editProduct.price);
    formData.append("description", editProduct.description);
    formData.append("category",editProduct.category);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    api
      .put(`/products/${editProduct.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const updated = myproducts.map((p) =>
          p.id === editProduct.id ? response.data : p
        );
        setMyproducts(updated);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
      });
  };

  const handleDeleteClick = (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    api
      .delete(`/products/${productId}`)
      .then(() => {
        const filtered = myproducts.filter((p) => p.id !== productId);
        setMyproducts(filtered);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      });
  };

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          {myproducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-100 bg-gray-700 shadow-md rounded-lg p-4 m-3
                transition-transform duration-300 ease-in-out
                hover:scale-105 hover:shadow-lg text-white"
            >
                 <Link to={`/product/${product.id}`}>
                      <div className='flex justify-center shadow-md rounded-md bg-bg h-52 w-full overflow-hidden mb-2'>
                        <img  src={product.image_url} alt={product.pname} className='overflow-hidden flex justify-centre' />
                      </div>
                       </Link>

              <div className="flex justify-between relative">
                <Link to={`/product/${product.id}`}>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg">{product.pname}</h3>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p className="truncate max-w-48 sm:max-w-60 md:max-w-64 lg:max-w-70">
                      {product.description}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{product.price}
                    </p>
                  </div>
                </Link>
              </div>

              <div className="flex mt-4">
                {/* Edit as button to open modal */}
                <button
                  onClick={() => handleEditClick(product)}
                  className="px-8 py-2 text-contrast1 bg-gradient-to-tr from-purple-400 via-purple-100 to-purple-400 rounded-md border border-gray-100 hover:border-contrast1 mr-6"
                >
                  Edit
                </button>

                {/* Delete button */}
                <button
                  onClick={() => handleDeleteClick(product.id)}
                  className="px-4 py-2 text-contrast1 bg-gradient-to-tr from-red-400 via-red-200 to-red-400 rounded-md border border-gray-100 hover:border-contrast1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <EditProductModal
            product={editProduct}
            setProduct={setEditProduct}
            onClose={() => setShowModal(false)}
            onUpdate={handleUpdateProduct}
          />
        )}
      </div>
    </>
  );
};

export default MyProductCard;
