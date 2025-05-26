import React, { useContext, useState, useEffect } from "react";
import Logo from "./assets/logo1.png";
import { Link } from "react-router-dom";
import NewProduct from "./NewProduct.jsx";
import { ProductContext } from "./ProductContext.jsx";




const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { handleLogout, isLoggedIn,toggleNewProduct,isNewOpen } = useContext(ProductContext);


  return (
    <div>


      {/* Main Navbar */}
      <div className="fixed z-50 top-0 flex items-center justify-between border border-b-grey-200 p-4 w-full bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 shadow-sm border-b border-border">
        <Link
          to="/"
          className="flex items-center justify-strat mr-8 transition-transform duration-300 ease-in-out  hover:scale-105 hover:shadow-lg"
        >
          <img src={Logo} alt="Company Logo" className="h-9 w-auto mr-3" />
          <span className="font-bold text-3xl mr-8 text-white ">Super Hub</span>
        </Link>


        <div className="flex justify-end items-center max-lg:hidden">
          <Link
            to="/"
            className="text-white text-lg 
                    hover:font-semibold 
                    hover:text-gray-200 
                    transition duration-200 ease-in-out 
                    hover:scale-105 
                    cursor-pointer mr-6"
          >
            Home
          </Link>

          {isLoggedIn && (   <Link
            to="/accept_reject"
            className="text-white text-lg 
                    hover:font-semibold 
                    hover:text-gray-200 
                    transition duration-200 ease-in-out 
                    hover:scale-105 
                    cursor-pointer mr-6"
          >
            Updated Request
          </Link>
             )}

          <Link
            to="/requests"
            className="text-white text-lg 
                    hover:font-semibold 
                    hover:text-gray-200 
                    transition duration-200 ease-in-out 
                    hover:scale-105 
                    cursor-pointer mr-6"
          >
            Requests
          </Link>



          <button
            className="text-white text-lg 
                    hover:font-semibold 
                    hover:text-gray-200 
                    transition duration-200 ease-in-out 
                    hover:scale-105 
                    cursor-pointer mr-6"
            onClick={toggleNewProduct}
          >
            Post your Ad
          </button>


          {isLoggedIn && (
            
            <Link  to= "/myproduct"
              className="px-4 py-2 
                  bg-white text-contrast1
                  border border-gray-200
                  rounded-md 
                  hover:bg-gray-700 
                  hover:text-white 
                  hover:font-semibold 
                  hover:scale-105 
                  transition duration-200 ease-in-out 
                  shadow 
                  hover:shadow-xl 
                  mr-6"
            >
              My Products
            </Link>
            
            
          )}



          {!isLoggedIn ? (
            <Link
              to="/signin"
              className="px-4 py-2 text-white rounded-md border border-gray-300 
               hover:border-white hover:bg-white hover:text-contrast1
               hover:semi-bold   hover:scale-110
               hover:shadow-md transition duration-200 ease-in-out mr-6"
            >
              Sign In
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white rounded-md border border-gray-300  hover:scale-110
               hover:border-white hover:bg-white hover:text-contrast1 hover:semi-bold
               hover:shadow-md transition duration-200 ease-in-out mr-6"
            >
              Log Out
            </button>
          )}
        </div>



        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-contrast1 focus:outline-none"
          >
            <i
              className={`fas ${isMenuOpen ? "fa-times text-lg" : "fa-bars"}  text-white font-semibold text-xl`}
            ></i>
          </button>
        </div>
      </div>



      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute w-full bg-gradient-to-tr from-gray-200 via-gray-50 to-gray-200 border-b border-border shadow-md z-10">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/"
              className="text-contrast1 hover:text-text cursor-pointer py-2"
            >
              Home
            </Link>

            {isLoggedIn && (    <Link
              to="/accept_reject"
              className="text-contrast1 hover:text-text cursor-pointer py-2"
            >
               Updated Requests
            </Link> )}

            <Link
              to="/requests"
              className="text-contrast1 hover:text-text cursor-pointer py-2"
            >
              Requests
            </Link>
            <button
              onClick={toggleNewProduct}
              className="text-contrast1 hover:text-text  flex justify-start cursor-pointer py-2"
            >
              Post your Ad
           
            </button>
            

            {!isLoggedIn ? (
              <Link
                to="/signin"
                className="px-4 py-2 text-contrast1 rounded-md border border-grey-50 hover:border hover:border-contrast1"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-contrast1 text-contrast2 rounded-md hover:bg-text text-left"
              >
                Log Out
              </button>
            )}


            {isLoggedIn && (
              <Link
                to="/myproduct"
                className="px-4 py-2 text-contrast1 rounded-md border border-grey-50 hover:border hover:border-contrast1 text-left"
              >
                Profile
              </Link>
              
            )}
          </div>
        </div>
      )}
            {isNewOpen && <NewProduct />} 

    </div>

  );
};

export default Navbar;
