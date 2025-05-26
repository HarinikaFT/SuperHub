import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './ProductContext';

const Productcard = ({ product }) => {
    

  return (
    <div className='border border-gray-100 bg-gray-700 shadow-md rounded-lg p-4 m-3 
         transition-transform duration-300 ease-in-out 
         hover:scale-105 hover:shadow-lg text-white '>

      <Link to={`/product/${product.id}`}>
        <div className='flex justify-center items-center shadow-md rounded-md bg-gray-200 h-52 w-full overflow-hidden mb-2'>
          <img src={product.image_url} alt={product.pname} className='h-full object-cover' />
        </div>
      </Link>

      <div className='relative'>
        <Link to={`/product/${product.id}`}>
          <div className='min-w-0'>
            <h3 className='font-semibold text-lg'>{product.pname}</h3>
            <p><strong>Category:</strong> {product.category}</p>
            <p className='truncate max-w-48 sm:max-w-60 md:max-w-64 lg:max-w-70'>{product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
          </div>
        </Link>

        
      </div>
    </div>
  );
};

export default Productcard;
