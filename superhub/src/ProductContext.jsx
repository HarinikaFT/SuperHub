import { createContext, useEffect, useState } from "react";
import api from "./api/axios.js"; // Axios instance
import { useNavigate } from "react-router-dom";


export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // products from /other_products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const perPage = 8;
  const [priceRange, setPriceRange] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
 const [userName, setUserName] = useState("");
 const[all,setAll] = useState(true);
  // const[localusername,setLocalusername] =useState("");
  // const[localtoken,setLocaltoken] =  useState("");
  const navigate = useNavigate();

  
  const token = localStorage.getItem("token")
  useEffect(() => {
   
    setIsLoggedIn(!!token);
  }, [token]);

// console.log(isLoggedIn)
  useEffect(() => {
    
    
    const fetchProducts = async () => {
      try {
        let response;
        if (isLoggedIn) {
          response = await api.get("/other_products");
        } else {
          response = await api.get("/products");
        }
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  

    fetchProducts();
  }, [isLoggedIn]);

  

  //filter products

 useEffect(() => {
  const fetchFiltered = async () => {
    try {
      const response = await api.get("/products", {
        params: {
          category,
          search_term: searchTerm,
          price_range: priceRange,
        },
      });
      setFilteredProducts(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  fetchFiltered();
}, [category, searchTerm, priceRange]);

   

  //
  const username = localStorage.getItem("username")

  useEffect(() => {
    if (isLoggedIn) {
      setUserName(username);
    }
  }, [isLoggedIn]);




  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  

    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };
 
  
 
  const toggleNewProduct = () =>{
    setIsNewOpen(!isNewOpen)
    
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        setFilteredProducts,
        currentPage,
        setCurrentPage,
        perPage,
        category,
        setCategory,
     
        searchTerm,
        setSearchTerm,
        priceRange,
        setPriceRange,
        isLoggedIn,
        userName,
        setUserName,
        handleLogout,
        all,
        setAll,
        isNewOpen,setIsNewOpen,
        toggleNewProduct
        
      
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
