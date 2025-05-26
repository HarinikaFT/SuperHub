import React, { useState } from "react";
import api from "./api/axios";
import Logo from './assets/logo1.png';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 
import Background from "./Background";


const SignUpPage = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setErrors([]);
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const signupData = {
      username,
      email,
      password,
      password_confirmation: confirmPassword,
      security_question: securityQuestion,
      security_answer: securityAnswer,
    };

    try {
      const response = await api.post("/signup", signupData);
      alert("Account created successfully!");

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        
        setErrors(error.response.data.errors);
      } else {
        
      
      alert(
        "Signup failed: " + (error.response?.data?.message || error.message)
      );
    }
    }
  };

  const isFormValid = () => {
    return (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      securityQuestion !== "" &&
      securityAnswer.trim() !== ""
    );
  };

  return ( <>
      <Background />
    <div className="min-h-screen  flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
   
      <Link to="/" className="flex  items-center mb-6">
        <img src={Logo} alt="Company Logo" className="h-10 w-auto mb-2" />
        <span className="font-bold text-xl text-contrast1">Super Hub</span>
      </Link>

      {/* Signup form */}
      <div className="max-w-md w-full space-y-6 bg-contrast2 p-8 rounded-lg shadow-md border border-border">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-contrast1">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-text">Join our community today</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text mb-1">
              Username<span className="text-primary">*</span>
            </label>
            <input
              id="username"
              type="text"

              required
              className="block w-full px-3 py-2 border border-border placeholder-text/50 text-contrast1 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />{errors.username &&
            <span className="text-red-600"  >
               {errors.username.map((msg, i) => (
      <div key={i}>{msg}</div>
    ))}

            </span>
}
          </div>

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
             <span className="text-red-600 text-sm" >
               {errors.password.map((msg, i) => (
      <div key={i}>{msg}</div>
    ))}

            </span>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-1">
              Confirm Password<span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="block w-full px-3 py-2 border border-border placeholder-text/50 text-contrast1 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i
                className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 cursor-pointer text-text`}
                onClick={toggleConfirmPasswordVisibility}
                aria-label="Toggle confirm password visibility"
              />
            </div>
              {errors.password_confirmation &&
             <span className="text-red-600 text-sm"  >
               {errors.password_confirmation.map((msg, i) => (
      <div key={i}>{msg}</div>
    ))}

            </span>}
          </div>

          {/* Security Question */}
          <div>
            <label htmlFor="securityQuestion" className="block text-sm font-medium text-text mb-1">
              Security Question<span className="text-primary">*</span>
            </label>
            <select
              id="securityQuestion"
              className="block w-full px-3 py-2 border border-border text-text rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
            >
              <option value="">Select a security question</option>
              <option value="color">What is your favorite color?</option>
              <option value="highschool">What was your high school name?</option>
              <option value="bestfriend">Who is your best friend?</option>
              <option value="pet">What was your first pet's name?</option>
              <option value="city">In what city were you born?</option>
            </select>
              {errors.security_question && (
  <span className="text-red-600 text-sm">
    {errors.security_question.map((msg, i) => (
      <div key={i}>{msg}</div>
    ))}
  </span>
)}
          </div>

          {/* Security Answer */}
          <div>
            <label htmlFor="securityAnswer" className="block text-sm font-medium text-text mb-1">
              Security Answer<span className="text-primary">*</span>
            </label>
            <input
              id="securityAnswer"
              type="text"
              required
              className="block w-full px-3 py-2 border border-border placeholder-text/50 text-contrast1 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Your answer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
            />
           {errors.security_answer && (
  <span className="text-red-600 text-sm">
    {errors.security_question.map((msg, i) => (
      <div key={i}>{msg}</div>
    ))}
  </span>
)}
          </div>

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
            Create Account
          </button>
        </form>

        {/* Already have an account */}
        <div className="text-center text-sm text-text mt-4">
          <p>
            Already have an account?{" "}
            <Link to ="/signin" className="font-medium text-primary hover:text-contrast1">
              Sign In
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

export default SignUpPage;
