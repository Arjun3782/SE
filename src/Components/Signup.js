import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  // console.log("Logging info--> ",signupInfo);
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Please fill all the fields");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await axios.post(url, signupInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.data;
      const { message, success, error } = result;
      if (success) {
        console.log(result);
        console.log("Signup form submitted");
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (error) {
        const errDetails = response.data.details.message;
        return handleError(errDetails);
      } else {
        return handleError(message);
      }
    } catch (error) {
      if(error.response){
        const errDetails = error.response.data.error.details[0].message;
        handleError(errDetails);
      }
      else{
        handleError(error);
      }
    }
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            autoFocus
            placeholder="Enter your name"
            value={signupInfo.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={signupInfo.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={signupInfo.password}
          />
        </div>
        <button type="submit" className="signup-btn">
          Signup
        </button>
        <span>
          Already have an account?
          <Link to="/login">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Signup;
