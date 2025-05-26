import { useContext, useEffect, useState } from "react";
import Image from "./ImageSilder.jsx";
import { ProductContext } from "./ProductContext.jsx";
import Nav from "./Nav.jsx";


function HeroSection() {
  const {
    setCategory,
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    
    userName,setAll,all
   
  } = useContext(ProductContext);
  console.log("searchTerm:",searchTerm);
 

  return (
    <>
      <Nav />
      <div className="border border-b-grey-200 justify-evenly px-4 sm:px-7 pb-25 shadow-sm bg-bg flex flex-col lg:flex-row items-start max-w-full pt-28">
        <div className="w-full lg:w-1/2">
          <div className="text-contrast1 flex-wrap    break-words text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mr-6 mb-4 ml-2 mt-2 lg:max-w-5xl max-w-full">
            <ul>
              <li>
                Welcome to Super Hub{" "}
                {userName && (
                  <span className="text-purple-400">{userName}!!</span>
                )}
              </li>
              <li>Your Marketplace for Everything</li>
            </ul>
          </div>

          <div className="text-text lg:max-w-2xl max-w-full break-words text-base sm:text-lg md:text-xl lg:text-2xl font-bold mr-6 mb-4 ml-2 mt-2">
            Buy, sell, or discover great deals on gadgets, furniture, rentals,
            jobs, and more all in one trusted community.
          </div>

          <div className="mt-4 ml-2 mr-6 relative w-full max-w-md">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-text text-lg"></i>

            <input
              type="text"
              placeholder="Search mobiles, bikes, jobs, houses..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md text-base focus:outline-none hover:border-contrast1 transition-colors duration-150"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <nav className="flex flex-wrap items-center justify-start ml-2 mb-4 mr-6 mt-2 gap-2">
            <ul className="flex flex-wrap gap-2">
              <li>
                <button
                  className={`text-text text-sm sm:text-base px-4 py-2 hover:text-contrast1  ${all && 'bg-gray-700 text-white font-semibold rounded-full transition-all ' } transition-all duration-150`}
                  onClick={() => {
                    setCategory("All");
                    setAll(true);
                 
                      }}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className="text-text text-sm sm:text-base px-4 py-2 hover:text-contrast1 focus:bg-gray-700 focus:text-white focus:font-semibold focus:rounded-full transition-all duration-150"
                  onClick={() => {
                    setCategory("cars");
                    setAll(false);
                     
                  }}

                >
                  Cars
                </button>
              </li>
              <li>
                <button
                  className="text-text text-sm sm:text-base px-4 py-2 hover:text-contrast1 focus:bg-gray-700 focus:text-white focus:font-semibold focus:rounded-full transition-all duration-150"
                  onClick={() => {
                    setCategory("bikes");
                      setAll(false);
                  }}
                >
                  Bikes
                </button>
              </li>
              <li>
                <button
                  className="text-text text-sm sm:text-base px-4 py-2 hover:text-contrast1 focus:bg-gray-700 focus:text-white focus:font-semibold focus:rounded-full transition-all duration-150"
                  onClick={() => {
                  setCategory("furnitures");
                      setAll(false);
                  }}
                >
                  Furnitures
                </button>
              </li>
              <li>
                <button
                  className="text-text text-sm sm:text-base px-4 py-2 hover:text-contrast1 focus:bg-gray-700 focus:text-white focus:font-semibold  focus:rounded-full transition-all duration-150"
                  onClick={() => {
                    setCategory("cycle");
                      setAll(false);
                  }}
                >
                  Cycle
                </button>
              </li>
              <li>
                <button
                  className="text-text text-sm sm:text-base px-4 py-2 hover:text-contrast1 focus:bg-gray-700 focus:text-white focus:font-semibold focus:rounded-full transition-all duration-150"
                  onClick={() => {
                    setCategory("electronics");
                      setAll(false);
                  }}
                >
                  Electronics
                </button>
              </li>
              <li>
                <select
                  onChange={(e) => setPriceRange(e.target.value)}
                  value={priceRange}
                  className="px-4 py-2 text-text rounded-md border border-gray-300 hover:border-contrast1 focus:font-semibold focus:outline-none shadow-sm"
                >
                 <option className="text-sm text-gray-700 font-medium" value="All">All Prices</option>
                  <option className="text-sm text-gray-700 font-medium"  value="99-999">₹99- ₹999</option>
                  <option className="text-sm text-gray-700 font-medium"  value="1000-9999">₹1,000 - ₹9,999</option>
                  <option  className="text-sm text-gray-700 font-medium"  value="10000-99999">₹10,000 - ₹99,999</option>
                   <option  className="text-sm text-gray-700 font-medium"  value="100000-999999">₹1,00,000 - ₹99,999</option>
           
                  <option className="text-sm text-gray-700 font-medium"  value="1000000+">₹10,00,000+</option>
                </select>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex justify-center w-full lg:w-1/2 mt-4 lg:mt-0 max-lg:hidden">
          <Image />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
