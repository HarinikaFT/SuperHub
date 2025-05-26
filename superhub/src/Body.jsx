import { useContext } from 'react';
import { ProductContext } from './ProductContext.jsx';
import Productcard from './ProductCard.jsx';
import NotFound from './assets/notfound.jpg';
import Footer from './FooterSec.jsx';



const Body = () => {
  const {
    filteredProducts,
    currentPage,
    setCurrentPage,
    perPage,
  } = useContext(ProductContext);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + perPage);

  return (

    <>
     
    <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 rounded-md gap-4 px-2 bg-gradient-to-r  from-gray-200 via-gray-100 to-gray-200'>
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <Productcard key={index} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center  bg-bg justify-center min-h-[60vh] w-full px-4">
            <img
              src={NotFound}
              alt="Not found"
              className="object-cover w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl h-auto rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      <div className='flex flex-wrap justify-center items-center gap-4 mt-4 px-4 py-2 shadow-md rounded-md'>
        <button
          className='fa-solid fa-arrow-left text-text hover:text-contrast1 disabled:opacity-50'
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        <span className='text-text hover:text-contrast1 text-base sm:text-lg'>
          {currentPage} / {totalPages}
        </span>
        <button
          className='fa-solid fa-arrow-right text-text hover:text-contrast1 disabled:opacity-50'
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </div>
      <Footer />
    </>
  );
};

export default Body;
