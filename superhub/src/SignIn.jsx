import React, { useState ,useContext} from "react";
import api from "./api/axios";
import Logo from "./assets/logo1.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Background from "./Background";
// import { ProductContext } from "./ProductContext";

const SignInPage = () => {
  // const{setLocaltoken,setLocalusername} = useContext(ProductContext)
    const navigate = useNavigate();
     const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
 
      const signinData = {
        
        email,
        password,
 
      };
  
      try {
        const response = await api.post("/login", signinData);
       alert("Logined successfully!");
        // setLocaltoken(response.data.token);
        // setLocalusername(response.data.user.username);
        localStorage.setItem("username",response.data.user.username);
        
        localStorage.setItem("token", response.data.token); 
   

      navigate("/");
      }  catch (error) {
  if (error.response && error.response.status === 401) {
    // login-specific error from backend
    setErrors([error.response.data.error]); // assuming error is a string
  } else {
    alert(
      "Login failed: " + (error.response?.data?.message || error.message)
    );
  }
}

    };
  
    const isFormValid = () => {
      return (
       
        email.trim() !== "" &&
        password !== ""
      
      );
    };

  return (<>
    <Background />
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

      {/* Logo above the form */}
      <Link to="/" className="flex  items-center mb-6">
        <img src={Logo} alt="Company Logo" className="h-10 w-auto mb-2" />
        <span className="font-bold text-xl text-contrast1">Super Hub</span>
      </Link>

      {/* Signin form */}
      <div className="max-w-md w-full space-y-6 bg-contrast2 p-8 rounded-lg shadow-md border border-border">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-contrast1">
            Login  Account
          </h2>
          <p className="mt-2 text-sm text-text"> Good to see you again </p>
             <p className="mt-2 text-sm text-text"> let's get back to work! </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
              Email<span className="text-primary">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              className="block w-full px-3 py-2 border border-border placeholder-text/50 text-contrast1 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
              {errors.email &&
             <span className="text-red-600 text-sm"  >
                  {errors.email.map((msg, i) => (
      <div key={i}>{msg}</div>
    ))}

            </span>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text mb-1">
              Password<span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="block w-full px-3 py-2 border border-border placeholder-text/50 text-contrast1 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 cursor-pointer text-text`}
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              />

            </div>
            {errors.password &&
             <span className="text-red-600 text-sm"  >
               {errors.password.map((msg, i) => (
      <div key={i}>{msg}</div>
    ))}

            </span>}
          </div>

        {errors.length > 0 && (
  <div className="text-red-600 text-sm">
    {errors.map((err, i) => (
      <p key={i}>{err}</p>
    ))}
  </div>
)}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-2 px-4 rounded-md text-sm font-medium text-contrast2 ${
              isFormValid()
                ? "bg-primary hover:bg-contrast1"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Login
          </button>
        </form>

        {/* Already have an account */}
        <div className="text-center text-sm text-text mt-4">
          <p>
            Don't have an account?{" "}
            <Link to ="/signup" className="font-medium text-primary hover:text-contrast1">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-text/50 mt-6">
          <p>Powered by SuperHub</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignInPage;

