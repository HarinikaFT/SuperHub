import React, { useEffect, useState, useContext } from "react";
import api from "./api/axios.js";
import { Link } from "react-router-dom";
import Footer from "./FooterSec.jsx";
import Navbar from "./Nav.jsx";
import { ProductContext } from "./ProductContext.jsx";
import Background from "./Background.jsx";

const RequestPage = () => {
  const {isLoggedIn} = useContext(ProductContext);
  const [myRequests, setMyRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState({ my: true, received: true });
  const [error, setError] = useState({ my: null, received: null });

  const [editRequest, setEditRequest] = useState(null);
  const [editRequestedPrice, setEditRequestedPrice] = useState("");
  const [deleteRequest, setDeleteRequest] = useState(null);

  useEffect(() => {
     if (!isLoggedIn) return;
    api
      .get("/my_requests")
      .then((res) => {
        setMyRequests(res.data || []);
        setLoading((prev) => ({ ...prev, my: false }));
      })
      .catch(() => {
        setError((prev) => ({ ...prev, my: "Failed to load your requests." }));
        setLoading((prev) => ({ ...prev, my: false }));
      });
  }, [setMyRequests,isLoggedIn]);

  
  useEffect(() => {
      if (!isLoggedIn) return;
    setLoading(true);
    api.get("/requested_products")  // Make sure this endpoint returns the data as JSON
      .then((res) => {
          
        setReceivedRequests(res.data.filter(r => r.status === "pending"));
        setLoading(false);
      
      })
      .catch(() => {
        setError("Failed to load received requests.");
        setLoading(false);
      });
  }, [isLoggedIn]);

  const handleAccept = (productId, requestId) => {
    api
      .patch(`/products/${productId}/requests/${requestId}/accept`)
      .then(() => {
        const updated = receivedRequests.map((r) =>
          r.id === requestId ? { ...r, status: "accepted" } : r
        );
        setReceivedRequests(updated);
      })
      .catch((err) => console.error("Accept failed:", err));
  };

  const handleReject = (productId, requestId) => {
    api
      .patch(`/products/${productId}/requests/${requestId}/reject`)
      .then(() => {
        const updated = receivedRequests.map((r) =>
          r.id === requestId ? { ...r, status: "rejected" } : r
        );
        setReceivedRequests(updated);
      })
      .catch((err) => console.error("Reject failed:", err));
  };
const openEditPopup = (request) => {
  setEditRequest(request);
  setEditRequestedPrice(Number(request.requested_price));
};
const handleUpdate = () => {
  if (!editRequest) return;

  
   api.patch(`/requests/${editRequest.id}`, { request: { requested_price: Number(editRequestedPrice)
} })

    .then((res) => {
      const updatedRequests = myRequests.map((r) =>
        r.id === editRequest.id ? res.data : r
      );
      setMyRequests(updatedRequests);
      setEditRequest(null);

    })
    .catch((err) => {
      alert("Failed to update request.");
      console.error(err);
    });
};


  const openDeletePopup = (request) => {
    setDeleteRequest(request);
  };

  const handleDelete = () => {
    if (!deleteRequest) return;

    api
      .delete(`/requests/${deleteRequest.id}`)
      .then(() => {
        const filtered = myRequests.filter((r) => r.id !== deleteRequest.id);
        setMyRequests(filtered);
        setDeleteRequest(null);
      })
      .catch((err) => {
        alert("Failed to delete request.");
        console.error(err);
      });
  };
 
  return (
    <>  {isLoggedIn ?   ( <>
      <Navbar />
      <main className="p-4 md:p-6 max-w-7xl mx-auto mt-20">
        <h2 className="text-2xl font-bold text-contrast1 mb-6">My Requests</h2>

        {loading.my ? (
          <p>Loading your requests...</p>
        ) : error.my ? (
          <p className="text-red-500">{error.my}</p>
        ) : myRequests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {myRequests.map((request) => {
              if (!request || !request.product) return null;
              const product = request.product;
              return (
                <div
                  key={request.id}
                  className=" bg-gray-700 text-white p-4  shadow-md rounded-lg hover:shadow-lg transition-transform hover:scale-105"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="h-52 w-full overflow-hidden bg-bg rounded-md mb-2">
                      <img
                        src={product.image_url}
                        alt={product.pname}
                        className="object-center h-full w-full"
                      />
                    </div>
                  </Link>
                  <div>
                    <h3 className="text-lg font-semibold">{product.pname}</h3>
                  
                    <p><strong>Price:</strong> ₹{product.price}</p>
                    <p><strong>Your Requested Price:</strong> ₹{request.requested_price}</p>
              
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => openEditPopup(request)}
                      className="px-8 py-2 text-contrast1 bg-gradient-to-tr from-purple-400 via-purple-100 to-purple-400 rounded-md border border-gray-100 hover:border-contrast1 mr-6"
                >
                      Update Price
                    </button>
                    <button
                      onClick={() => openDeletePopup(request)}
                      className="px-4 py-2 text-contrast1 bg-gradient-to-tr from-red-400 via-red-200 to-red-400 rounded-md border border-gray-100 hover:border-contrast1"
                >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="italic text-center text-text mb-12">
            You have not made any requests.
          </p>
        )}

        <h2 className="text-2xl font-bold text-contrast1 mb-6">
          Received Requests
        </h2>

        {loading.received ? (
          <p>Loading received requests...</p>
        ) : error.received ? (
          <p className="text-red-500">{error.received}</p>
        ) : receivedRequests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-10">
            {receivedRequests.map((request) => {
              if (!request || !request.product || request.status !== "pending") return null;
              const product = request.product;
              return (
                <div
                  key={request.id}
                  className=" bg-gray-700 text-white p-4   ml- 4 shadow-md rounded-lg hover:shadow-lg transition-transform hover:scale-105"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="h-52 w-full overflow-hidden bg-bg rounded-md mb-2">
                      <img
                        src={product.image_url}
                        alt={product.pname}
                        className="object-none h-full w-full"
                      />
                    </div>
                  </Link>
                  <div>
                    <h3 className="text-lg font-semibold">{product.pname}</h3>
                   
                    <p><strong>Price:</strong> ₹{product.price}</p>
                    <p><strong>Status:</strong> {request.status}</p>
                   
                    <p><strong>Requested Price:</strong> ₹{request.requested_price}</p>
                    
                  </div>
                  <div className="flex gap-4 mt-4">
                   
                    <button 
                      onClick={() => handleAccept(product.id, request.id)}
                      disabled={request.status === "accepted" || request.status ==="rejected"}
                      className=" px-4 py-2  text-contrast1 bg-gradient-to-tr from-green-400 via-green-100 to-green-400 rounded-md border border-gray-100  hover:border-contrast1 disabled:opacity-50"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(product.id, request.id)}
                      disabled={request.status === "rejected" || request.status === "accepted" }
                      className="px-4 py-2  text-contrast1 bg-gradient-to-tr from-red-400 via-red-200 to-red-400 rounded-md border border-gray-100  hover:border-contrast1   hover:border-constrat1 disabled:opacity-50"
                    >
                      Reject
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1 className="italic text-center text-black">No Pending  requests received yet.</h1>
        )}

        {/* Edit Popup */}
      {editRequest && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h3 className="text-xl font-semibold mb-4">Edit Requested Price</h3>
      <input
        type="number"
        className="w-full border p-2 rounded mb-4"
        value={editRequestedPrice}
        onChange={(e) => setEditRequestedPrice(e.target.value)}
        min="0"
      />
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setEditRequest(null)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}

        {/* Delete Popup */}
        {deleteRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
              <h3 className="text-xl font-semibold mb-4">Delete Request?</h3>
              <p className="mb-6">
                Are you sure you want to delete your request for{" "}
                <strong>{deleteRequest.product?.pname}</strong>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteRequest(null)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />  </> ) : (<>
      <Background />
  <div className="text-center mt-24">
    <h2 className="text-2xl text-gray-600">Please log in to view your requests.</h2>
    <Link to="/signin" className="text-blue-500 underline mt-2 inline-block">
      Go to Login
    </Link>
     <Link to="/" className="text-blue-500 underline mt-2 inline-block">
          {"||  Go Home "}
        </Link>
  </div> </>
)}
    </>
    
  );
};

export default RequestPage;
