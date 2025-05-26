import React, { useState, useEffect } from "react";

const EditProductModal = ({ product, setProduct, onClose, onUpdate }) => {
  if (!product) return null;

  const [previewUrl, setPreviewUrl] = useState(product.image_url);
  const [imageFile, setImageFile] = useState(null);

  // When product changes (modal opens with new product), reset preview and file
  useEffect(() => {
    setPreviewUrl(product.image_url);
    setImageFile(null);
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Show preview URL
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Modify onUpdate to send image file as well
  // So you might want to pass imageFile to onUpdate or handle inside here

  // We'll assume onUpdate handles sending the image file along with other data

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>



        <input
          type="text"
          value={product.pname}
          onChange={e => setProduct({ ...product, pname: e.target.value })}
          className="w-full border p-2 rounded mb-2"
          placeholder="Product Name"
        />
          <select
              id="category"
              required
              className="block w-full px-3 py-2 mb-2 border border-border text-text rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={product.category}
              onChange={(e) => setProduct({...product,category: e.target.value})}
            >
              <option value="">Select category</option>
              <option value="cars">Cars</option>
              <option value="bikes">Bikes</option>
              <option value="electronics">Electronics</option>
              <option value="bookshelfs">Book Shelfs</option>
               <option value="cycle">Cycles</option>
                <option value="furnitures">Furnitures </option>
                 <option value="Books">Books </option>
              <option value="custom">Custom</option>
            </select>
        
        <input
          type="number"
          value={product.price}
          onChange={e => setProduct({ ...product, price: e.target.value })}
          className="w-full border p-2 rounded mb-2"
          placeholder="Price"
          min="0"
        />

        <textarea
          value={product.description}
          onChange={e => setProduct({ ...product, description: e.target.value })}
          className="w-full border p-2 rounded mb-4"
          placeholder="Description"
          rows={4}
        />
          {/* File input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
        {/* Image preview */}
        <div className="mb-4 flex justify-center">
          {previewUrl ? (
            <img
            src={previewUrl}
            alt="Product Preview"
            className="w-48 h-48 object-cover rounded-md border"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center border rounded-md bg-gray-100 text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => onUpdate(imageFile)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
