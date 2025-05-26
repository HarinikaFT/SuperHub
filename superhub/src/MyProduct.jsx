import React, { useState, useEffect } from "react";
import Navbar from "./Nav";
import Footer from "./FooterSec";

import MyProductCard from "./MyProductCard";
import { useNavigate } from "react-router-dom";

const MyProduct = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate,token]);

  if (!isLoggedIn) return null; // Optionally show a loader or blank while redirecting

  return (
    <> {isLoggedIn ?  ( <> 
     
      {/* Navbar fixed to top with proper z-index */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto">
          <MyProductCard />
        </main>
      

      <Footer />
    </>):(<>
      <Background />
  <div className="text-center mt-24">
    <h2 className="text-2xl text-gray-600">Please log in to view your requests.</h2>
    <Link to="/signin" className="text-blue-500 underline mt-2 inline-block">
      Go to Login
    </Link>
     <Link to="/" className="text-gray-500 underline mt-2 inline-block">
          {"||  Go Home "}
        </Link>
  </div> </>
)}
    </>
  );
};

export default MyProduct;
