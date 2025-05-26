import React from 'react';
import Logo from './assets/logo1.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 text-white px-6 py-10 border-t border-border ">
      
      {/* Top Section: Logo & Newsletter */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 mb-10">
        
        {/* Left: Branding & Description */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center mb-4">
            <img 
              src={Logo} 
              alt="Company Logo" 
              className="h-9 w-auto mr-3"
            />
            <span className="font-bold text-2xl text-white">Super Hub</span>
          </div>
          <p className="text-white font-semibold">The new home for your deals & discoveries</p>
        </div>

        {/* Right: Newsletter Subscription */}
        <div className="w-full lg:w-1/2 flex flex-col ">
          <h3 className="text-xl font-bold mb-2 text-white">Join our mailing list</h3>
          <p className="text-white  mb-4">Be the first to know when new listings go live</p>
          <div className="flex  sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full sm:w-auto px-4 py-2 rounded-md border border-border text-white"
            />
            <button className="bg-purple-200 hover:bg-primary/90 text-contrast1 px-6 py-2 rounded-md">
              Subscribe
            </button>
          </div>
          
        </div>
      </div>

      {/* Navigation Links */}
      <div className=" flex justify-evenly max-w-xl gap-4  mb-10 ">
        <div className='flex flex-col  items-start justify-start ml-3  mr-4  '>
          <h4 className="font-semibold mb-2 text-white">SuperHub</h4> 
          <ul className="space-y-1 text-white">
            <li><a  className='hover:text-contrast1' href="/requests">Requests</a></li>
            <li><a   className='hover:text-contrast1 pr-5' href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className='flex flex-col  items-start justify-start  mr-4 '>
          <h4 className="font-bold mb-2 text-white">Account</h4>
          <ul className=" text-white">
          
            <li><a  className='text-white 
                    hover:font-semibold 
                    hover:text-gray-200 
                    transition duration-200 ease-in-out 
                    hover:scale-105 
                    cursor-pointer mr-6' href="/signin">Sign In</a></li>
            <li><p  className='text-white 
                    hover:font-semibold 
                    hover:text-gray-200 
                    transition duration-200 ease-in-out 
                    hover:scale-105 
                    cursor-pointer mr-6'>Reset Password</p></li>
          </ul>
        </div>
        <div className="sm:col-span-2 md:col-span-2 text-center sm:text-left">
          <h4 className="font-semibold mb-2 text-white">About</h4>
          <p className="text-white">SuperHub is a platform to discover, sell, and explore amazing deals.</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-around text-sm text-white border-t border-border pt-6">
        <p>Created by Harinika</p>
        <p>Powered by SuperHubAuth</p>
        <p>© 2025 SuperHub</p>
      </div>
    </footer>
  );
};

export default Footer;
