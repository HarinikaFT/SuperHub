import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import HeroSection from "./HeroSec.jsx";

import Body from "./Body.jsx";
import ProductProvider from "./ProductContext.jsx";

import NotFound from "./NotFound.jsx";
import SignInPage from "./SignIn.jsx";
import SignUpPage from "./Signup.jsx";
import ProductView from "./Productview.jsx";

import RequestPage from "./Requestpage.jsx";
import AcceptReject from "./AcceptReject.jsx";

import MyProduct from "./MyProduct.jsx";
import EditProduct from "./EditProduct.jsx";


function App() {
  // const isLoggedIn = !!localStorage.getItem("token");
  
  // console.log(isLoggedIn)
  return (
    <BrowserRouter>
  
      <ProductProvider >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Body />
              </>
            }
          />

          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/requests" element={  <RequestPage /> } />
          <Route path="/accept_reject" element={  <AcceptReject /> } />
          
          
          <Route
            path="/myproduct"
            element={ <MyProduct /> }
          />
      
        
          
       <Route path="/products/edit/:id" element={ <EditProduct />} />

          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
