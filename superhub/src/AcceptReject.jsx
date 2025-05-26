import { useContext, useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import Navbar from "./Nav";
import Footer from "./FooterSec";
import { Link } from "react-router-dom";
import api from "./api/axios.js";

const AcceptReject = () => {
  const { isLoggedIn } = useContext(ProductContext);
  const [acceptreject, setAcceptreject] = useState([]);
 


  useEffect(() => {
    if (!isLoggedIn) return;
   
    api.get("/requested_products")
      .then((res) => {
        setAcceptreject(res.data.filter(r => r.status !== "pending"));
       
      })
      .catch(() => {
        console.error("Failed to load received requests.");
  
      });
  }, [isLoggedIn]);

  return (
    <>
      <Navbar />
  <main className="p-4 md:p-6 max-w-7xl mb-6 sm:mb-8 md:mb-12   mx-auto mt-20">

        {isLoggedIn ? (
          <>
            <h2 className="text-2xl font-bold text-contrast1 mb-6">Updated Requests</h2>

            {acceptreject.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {acceptreject.map((request) => {
                  if (!request || !request.product || request.status === "pending") return null;
                  const product = request.product;
                  return (
                    <div
                      key={request.id}
                      className="bg-gray-700 text-white p-4 sm:p-5 md:p-6 shadow-md rounded-lg hover:shadow-lg transition-transform hover:scale-105"
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
                      <div >
                        <h3  className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{product.pname}</h3>
                        <p className="text-lg text-gray-100   flex justify-center "><strong>Price:</strong> ₹{product.price}</p>
                        <p className="text-lg text-gray-100   flex justify-center" ><strong>Status:</strong> {request.status}</p>
                        <p className="text-lg text-gray-100   flex justify-center">
                          <strong>{request.status} Price:</strong> ₹{request.requested_price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h1 className="italic text-center text-gray-700 text-base sm:text-lg mb-12">
                No Updated requests received yet.
              </h1>
            )}
          </>
        ) : (
          <h1 className="text-center text-red-600 font-medium text-lg">
            Please login to view requests.
          </h1>
        )}
      </main>
        <Footer />
    </>
  );
};

export default AcceptReject;
